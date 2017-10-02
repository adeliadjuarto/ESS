package app.cms.controller;

import app.cms.model.LeaveRequest;
import app.cms.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

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
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(false);
        leaveRequestRepository.save(leaveRequest);
        return "redirect:/leave-request";
    }
}
