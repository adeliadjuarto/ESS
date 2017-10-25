package app.cms.controller;

import app.cms.service.GoogleCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by adeliadjuarto on 10/24/17.
 */
@Controller
public class EventController {
    @Autowired
    private GoogleCalendarService googleCalendarService;

    @RequestMapping("/event")
    public String events(Model model) throws Exception {
        model.addAttribute("currPage", "event");
        return "event/index";
    }
    @RequestMapping("/event/save")
    public String testEvents(Model model) throws Exception {

        return "success";
    }
}
