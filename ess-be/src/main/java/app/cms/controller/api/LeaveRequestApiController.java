package app.cms.controller.api;

import app.cms.model.LeaveRequest;
import app.cms.model.RequestType;
import app.cms.model.User;
import app.cms.repository.LeaveRequestRepository;
import app.cms.repository.RequestTypeRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by adeliadjuarto on 10/2/17.
 */
@RestController
public class LeaveRequestApiController {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/leave-requests", method = RequestMethod.POST)
    public String createRequest(@RequestParam("title") String title,
                                @RequestParam("description") String description,
                                @RequestParam("start") Long start,
                                @RequestParam("end") Long end,
                                @RequestParam("requestTypeId") Long requestTypeId,
                                @RequestParam("userId") Long userId) {
        RequestType requestType = requestTypeRepository.findOne(requestTypeId);
        User user = userRepository.findOne(userId);
        LeaveRequest leaveRequest
                = new LeaveRequest(title, description, start, end, requestType, user);
        leaveRequestRepository.save(leaveRequest);
        return "Leave request successfully created!";
    }

    @RequestMapping(value = "/leave-requests/{id}", method = RequestMethod.DELETE)
    public String deleteRequest(@PathVariable("id") Long id) {
        leaveRequestRepository.delete(id);
        return "Leave request successfully deleted!";
    }

    @RequestMapping(value = "/leave-requests/{id}/reject", method = RequestMethod.POST)
    public String rejectRequest(@PathVariable("id") Long id,
                                @RequestParam("notes") String notes) {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(false);
        leaveRequest.setRejectionNote(notes);
        leaveRequestRepository.save(leaveRequest);
        return "You have rejected this request";
    }

    @RequestMapping(value = "/leave-requests/{id}/approve")
    public String approveRequest(@PathVariable("id") Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(true);
        leaveRequestRepository.save(leaveRequest);
        return "You have approved this request";
    }

}
