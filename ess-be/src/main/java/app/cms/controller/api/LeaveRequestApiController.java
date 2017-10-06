package app.cms.controller.api;

import app.cms.model.Attachment;
import app.cms.model.LeaveRequest;
import app.cms.model.RequestType;
import app.cms.model.User;
import app.cms.repository.AttachmentRepository;
import app.cms.repository.LeaveRequestRepository;
import app.cms.repository.RequestTypeRepository;
import app.cms.repository.UserRepository;
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
    private AttachmentRepository attachmentRepository;

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
            Attachment a = new Attachment(leaveRequest.getId(), "Leave", pathName);
            attachmentRepository.save(a);
        }

        return "Leave request successfully created!";
    }

    @RequestMapping(value = "/leave-requests/{id}", method = RequestMethod.DELETE)
    public String deleteRequest(@PathVariable("id") Long id) throws Exception {
        List<Attachment> attachments = attachmentRepository.findByRequestIdAndCategory(id, "Leave");
        attachmentRepository.delete(attachments);
        leaveRequestRepository.delete(id);
        return "Leave request successfully deleted!";
    }

    @RequestMapping(value = "/leave-requests/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") Long id,
                                @RequestParam("notes") String notes) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(false);
        leaveRequest.setRejectionNote(notes);
        leaveRequestRepository.save(leaveRequest);
        return "You have rejected this request";
    }

    @RequestMapping(value = "/leave-requests/{id}/approve")
    public String approveRequest(@PathVariable("id") Long id) throws Exception {
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
