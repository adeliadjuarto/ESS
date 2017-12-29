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
 * Created by adeliadjuarto on 10/2/17.
 */
@RestController
public class LeaveRequestApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LeaveRequestAttachmentRepository attachmentRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-requests")
    public Iterable<LeaveRequest> getRequest() throws Exception {
        User user = authService.getCurrentUser();
        return leaveRequestRepository.findByUserAndIsActive(user, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-approvals", method = RequestMethod.GET)
    public Iterable<LeaveRequest> getRequestsOfSubordinate() throws Exception {
        User user = authService.getCurrentUser();
        List<User> subordinates = userRepository.findByIsActiveTrueAndSuperordinate(user);
        return leaveRequestRepository.findByUserInAndIsActiveAndIsApprovedIsNull(subordinates, true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/leave-requests/{id}")
    public LeaveRequest getRequestDetail(@PathVariable("id") String id) throws Exception {
        return leaveRequestRepository.findOne(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-requests", method = RequestMethod.POST)
    public String createRequest(@RequestParam("title") String title,
                                @RequestParam("description") String description,
                                @RequestParam("start") Long start,
                                @RequestParam("end") Long end,
                                @RequestParam("requestTypeId") Long requestTypeId,
                                @RequestParam("attachments[]") MultipartFile[] attachments)
            throws Exception {
        User user = authService.getCurrentUser();
        RequestType requestType = requestTypeRepository.findOne(requestTypeId);
        LeaveRequest leaveRequest
                = new LeaveRequest(title, description, start, end, requestType, user);
        leaveRequest = leaveRequestRepository.save(leaveRequest);
        for (MultipartFile attachment : attachments) {
            String pathName = saveFileToDirectory(attachment);
            LeaveRequestAttachment a = new LeaveRequestAttachment(leaveRequest.getId(), pathName);
            attachmentRepository.save(a);
        }

        return "Leave request successfully created!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-requests/{id}", method = RequestMethod.DELETE)
    public String deleteRequest(@PathVariable("id") String id) throws Exception {
        List<LeaveRequestAttachment> attachments = attachmentRepository.findByRequestId(id);
        for (LeaveRequestAttachment attachment : attachments) {
            attachment.setIsActive(false);
            attachmentRepository.save(attachment);
        }
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsActive(false);
        leaveRequestRepository.save(leaveRequest);
        return "Leave request successfully deleted!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-approvals/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") String id,
                                @RequestParam("notes") String notes) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(false);
        leaveRequest.setRejectionNote(notes);
        leaveRequestRepository.save(leaveRequest);
        return "You have rejected this request";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/leave-approvals/{id}/approve")
    public String approveRequest(@PathVariable("id") String id) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(true);

        if(leaveRequest.getRequestType().getName() == "Annual Leave") {
            Integer annualLeave = userRepository.findOne(leaveRequest.getUser().getId()).getAnnualLeave();
            userRepository.findOne(leaveRequest.getUser().getId()).setAnnualLeave(--annualLeave);
        }

        leaveRequestRepository.save(leaveRequest);
        return "You have approved this request";
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
