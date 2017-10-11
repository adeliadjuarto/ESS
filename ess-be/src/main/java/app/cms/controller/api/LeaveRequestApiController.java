package app.cms.controller.api;

import app.cms.model.*;
import app.cms.repository.*;
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
 * Created by adeliadjuarto on 10/2/17.
 */
@RestController
public class LeaveRequestApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LeaveRequestAttachmentRepository attachmentRepository;

    @RequestMapping(value = "/leave-requests")
    public Iterable<LeaveRequest> getRequest
            (@RequestParam("requestTypeId") Long requestTypeId) throws Exception {
        RequestType requestType = requestTypeRepository.findOne(requestTypeId);
        return leaveRequestRepository.findByIsActiveAndRequestType(true, requestType);
    }

    @RequestMapping(value = "/leave-requests", method = RequestMethod.POST)
    public String createRequest(@RequestParam("title") String title,
                                @RequestParam("description") String description,
                                @RequestParam("start") Long start,
                                @RequestParam("end") Long end,
                                @RequestParam("requestTypeId") Long requestTypeId,
                                @RequestParam("userId") Long userId,
                                @RequestParam("attachments[]") MultipartFile[] attachments)
            throws Exception {
        RequestType requestType = requestTypeRepository.findOne(requestTypeId);
        User user = userRepository.findOne(userId);
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

    @RequestMapping(value = "/leave-requests/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") String id,
                                @RequestParam("notes") String notes) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(false);
        leaveRequest.setRejectionNote(notes);
        leaveRequestRepository.save(leaveRequest);
        return "You have rejected this request";
    }

    @RequestMapping(value = "/leave-requests/{id}/approve")
    public String approveRequest(@PathVariable("id") String id) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(true);
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
