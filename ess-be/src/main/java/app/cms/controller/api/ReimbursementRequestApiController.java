package app.cms.controller.api;

import app.cms.model.*;
import app.cms.repository.*;
import app.cms.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

/**
 * Created by adeliadjuarto on 10/11/17.
 */
@RestController
public class ReimbursementRequestApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private ReimbursementRequestRepository reimbursementRequestRepository;
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReimbursementRequestAttachmentRepository attachmentRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-requests")
    public Iterable<ReimbursementRequest> getRequest() throws Exception {
        User user = authService.getCurrentUser();
        return reimbursementRequestRepository.findByUserAndIsActive(user, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-approvals")
    public Iterable<ReimbursementRequest> getRequestsOfSubordinate() throws Exception {
        User user = authService.getCurrentUser();
        List<User> subordinates = userRepository.findByIsActiveTrueAndSuperordinate(user);
        return reimbursementRequestRepository.findByUserInAndIsActiveAndIsApprovedNull(subordinates, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/reimbursement-requests/{id}")
    public ReimbursementRequest getRequestDetail(@PathVariable("id") String id) throws Exception {
        return reimbursementRequestRepository.findOne(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-requests", method = RequestMethod.POST)
    public String createRequest(@RequestParam("title") String title,
                                @RequestParam("description") String description,
                                @RequestParam("eventDate") Long eventDate,
                                @RequestParam("amount") Long amount,
                                @RequestParam("requestTypeId") Long requestTypeId,
                                @RequestParam("attachments[]") MultipartFile[] attachments)
            throws Exception {
        User user = authService.getCurrentUser();
        RequestType requestType = requestTypeRepository.findOne(requestTypeId);
        ReimbursementRequest request
                = new ReimbursementRequest(title, description, eventDate, amount, requestType, user);
        request = reimbursementRequestRepository.save(request);
        for (MultipartFile attachment : attachments) {
            String pathName = saveFileToDirectory(attachment);
            ReimbursementRequestAttachment a = new ReimbursementRequestAttachment(request.getId(), pathName);
            attachmentRepository.save(a);
        }

        return "Request reimbursement telah dibuat dan menunggu approval!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-requests/{id}", method = RequestMethod.DELETE)
    public String deleteRequest(@PathVariable("id") String id) throws Exception {
        List<ReimbursementRequestAttachment> attachments = attachmentRepository.findByRequestId(id);
        for (ReimbursementRequestAttachment attachment : attachments) {
            attachment.setIsActive(false);
            attachmentRepository.save(attachment);
        }
        ReimbursementRequest request = reimbursementRequestRepository.findOne(id);
        request.setIsActive(false);
        reimbursementRequestRepository.save(request);
        return "Request reimbursement telah dihapus!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-approvals/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") String id,
                                @RequestParam("notes") String notes) throws Exception {
        ReimbursementRequest request = reimbursementRequestRepository.findOne(id);
        request.setIsApproved(false);
        request.setRejectionNote(notes);
        reimbursementRequestRepository.save(request);
        return "Request telah ditolak";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/reimbursement-approvals/{id}/approve")
    public String approveRequest(@PathVariable("id") String id) throws Exception {
        ReimbursementRequest request = reimbursementRequestRepository.findOne(id);
        request.setIsApproved(true);
        reimbursementRequestRepository.save(request);
        return "Request telah disetujui";
    }

    private String saveFileToDirectory (MultipartFile file) {
        String pathName = getPath(file.getOriginalFilename());
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(directoryPath + pathName);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pathName;
    }

    private String getPath(String fileName) {
        return "attachments/" + UUID.randomUUID().toString() + fileName;
    }

}
