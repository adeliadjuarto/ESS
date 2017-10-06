package app.cms.controller;

import app.cms.model.RequestType;
import app.cms.repository.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Created by adeliadjuarto on 9/29/17.
 */
@Controller
@SessionAttributes("requestType")
public class RequestTypeController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @RequestMapping("/request-type")
    public String requestTypes(Model model) throws Exception {
        model.addAttribute("requestTypes", requestTypeRepository.findByIsActive(true));
        model.addAttribute("currPage", "request-type");
        return "request-type/index";
    }

    @RequestMapping("request-type/create")
    public String createRequestType(Model model) throws Exception {
        model.addAttribute("requestType", new RequestType());
        model.addAttribute("currPage", "request-type");
        return "request-type/create";
    }

    @RequestMapping(value = "request-type/save", method = RequestMethod.POST)
    public String saveRequestType(@ModelAttribute RequestType requestType,
                                    SessionStatus status) {
        requestType.setIsActive(true);
        requestTypeRepository.save(requestType);
        status.setComplete();
        return "redirect:/request-type";
    }

    @RequestMapping("request-type/edit/{id}")
    public String editRequestType(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("requestType", requestTypeRepository.findOne(id));
        model.addAttribute("currPage", "request-type");
        return "request-type/edit";
    }

    @RequestMapping(value = "request-type/delete/{id}")
    public String deleteRequestType(@PathVariable(value = "id") Long id) {
        RequestType requestType = requestTypeRepository.findOne(id);
        requestType.setIsActive(false);
        requestTypeRepository.save(requestType);
        return "redirect:/request-type";
    }
}
