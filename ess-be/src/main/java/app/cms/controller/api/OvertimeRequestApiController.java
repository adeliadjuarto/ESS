package app.cms.controller.api;

import app.cms.model.LeaveRequest;
import app.cms.model.OvertimeRequest;
import app.cms.model.OvertimeRequestAttachment;
import app.cms.model.User;
import app.cms.repository.OvertimeRequestAttachmentRepository;
import app.cms.repository.OvertimeRequestRepository;
import app.cms.repository.UserRepository;
import app.cms.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

/**
 * Created by adeliadjuarto on 10/12/17.
 */
@RestController
public class OvertimeRequestApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private OvertimeRequestRepository overtimeRequestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OvertimeRequestAttachmentRepository attachmentRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-requests")
    public Iterable<OvertimeRequest> getRequest() throws Exception {
        User user = authService.getCurrentUser();
        return overtimeRequestRepository.findByUserAndIsActive(user, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-approvals")
    public Iterable<OvertimeRequest> getRequestsOfSubordinate() throws Exception {
        User user = authService.getCurrentUser();
        List<User> subordinates = userRepository.findByIsActiveTrueAndSuperordinate(user);
        return overtimeRequestRepository.findByUserInAndIsActiveAndIsApprovedNull(subordinates, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/overtime-requests/{id}")
    public OvertimeRequest getRequestDetail(@PathVariable("id") String id) throws Exception {
        return overtimeRequestRepository.findOne(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-requests", method = RequestMethod.POST)
    public String createRequest(@RequestParam("title") String title,
                                @RequestParam("description") String description,
                                @RequestParam("eventDate") Long eventDate,
                                @RequestParam("startTime") Long startTime,
                                @RequestParam("endTime") Long endTime,
                                @RequestParam("attachments[]") MultipartFile[] attachments)
            throws Exception {
        User user = authService.getCurrentUser();
        OvertimeRequest request
                = new OvertimeRequest(title, description, eventDate, startTime, endTime, user);
        request = overtimeRequestRepository.save(request);
        for (MultipartFile attachment : attachments) {
            String pathName = saveFileToDirectory(attachment);
            OvertimeRequestAttachment a = new OvertimeRequestAttachment(request.getId(), pathName);
            attachmentRepository.save(a);
        }

        return "Request lembur telah dibuat dan menunggu approval!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-requests/{id}", method = RequestMethod.DELETE)
    public String deleteRequest(@PathVariable("id") String id) throws Exception {
        List<OvertimeRequestAttachment> attachments = attachmentRepository.findByRequestId(id);
        for (OvertimeRequestAttachment attachment : attachments) {
            attachment.setIsActive(false);
            attachmentRepository.save(attachment);
        }
        OvertimeRequest request = overtimeRequestRepository.findOne(id);
        request.setIsActive(false);
        overtimeRequestRepository.save(request);
        return "Request lembur telah dihapus!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-requests/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") String id,
                                @RequestParam("notes") String notes) throws Exception {
        OvertimeRequest request = overtimeRequestRepository.findOne(id);
        request.setIsApproved(false);
        request.setRejectionNote(notes);
        overtimeRequestRepository.save(request);
        return "Request telah ditolak";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/overtime-requests/{id}/approve")
    public String approveRequest(@PathVariable("id") String id) throws Exception {
        OvertimeRequest request = overtimeRequestRepository.findOne(id);
        request.setIsApproved(true);
        overtimeRequestRepository.save(request);
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
