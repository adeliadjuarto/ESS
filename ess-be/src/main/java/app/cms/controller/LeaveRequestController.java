package app.cms.controller;

import app.cms.model.LeaveRequest;
import app.cms.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Created by adeliadjuarto on 9/29/17.
 */
@Controller
@SessionAttributes("request")
public class LeaveRequestController {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @RequestMapping("/leave-request")
    public String requestTypes(Model model) throws Exception {
        model.addAttribute("requests", leaveRequestRepository.findAll());
        model.addAttribute("currPage", "leave-request");
        return "leave-request/index";
    }

    @RequestMapping("/leave-request/approve/{id}")
    public String approveRequest(Model model, @PathVariable("id") Long id) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(true);
        leaveRequestRepository.save(leaveRequest);
        return "redirect:/leave-request";
    }

    @RequestMapping("/leave-request/reject/{id}")
    public String rejectRequest(Model model, @PathVariable("id") Long id) throws Exception {
        model.addAttribute("request", leaveRequestRepository.findOne(id));
        model.addAttribute("currPage", "leave-request");
        return "leave-request/reject";
    }

    @RequestMapping(value = "/leave-request/reject", method = RequestMethod.POST)
    public String saveRejectedRequest(@ModelAttribute("request") LeaveRequest request,
                                      SessionStatus status) throws Exception {
        request.setIsApproved(false);
        leaveRequestRepository.save(request);
        status.setComplete();
        return "redirect:/leave-request";
    }
}
