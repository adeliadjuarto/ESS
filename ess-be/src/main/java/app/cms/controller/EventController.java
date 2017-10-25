package app.cms.controller;

import app.cms.service.GoogleCalendarService;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

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
    @ResponseBody
    @RequestMapping("/event/save")
    public Event saveEvent() throws Exception {
        Boolean isAllDayEvent = false;
        Long start = null;
        Long end = null;
        start = System.currentTimeMillis();
        end = System.currentTimeMillis()+ (60*60*1000);
        String summary = "ESS Event 2";
        return googleCalendarService.addEvent(start, end, summary, isAllDayEvent);
    }

    @ResponseBody
    @RequestMapping("/event/list")
    public Iterable<Event> eventList() throws Exception {
        return googleCalendarService.viewEvents();
    }

}
