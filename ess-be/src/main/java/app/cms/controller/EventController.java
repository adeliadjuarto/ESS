package app.cms.controller;

import app.cms.service.GoogleCalendarService;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
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

    @RequestMapping("event/create")
    public String createEvents(Model model) throws Exception {
        model.addAttribute("currPage", "event");
        return "event/create";
    }

    @RequestMapping("/event/save")
    public String saveEvent(@RequestParam("summary") String summary,
                            @RequestParam("start") String inputStart,
                            @RequestParam("end") String inputEnd,
                            @RequestParam("allDay")String[] allDayValue
    ) throws Exception {
        Boolean isAllDayEvent = false;
        Long start = null;
        Long end = null;
        Date date = null;

        if (allDayValue.length == 2) {
            isAllDayEvent = true;
        } else {
            isAllDayEvent = false;
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        date = format.parse(inputStart);
        start = date.getTime();
        date = format.parse(inputEnd);
        end = date.getTime();
        googleCalendarService.addEvent(start, end, summary, isAllDayEvent);
        return "event/index";
    }

    @ResponseBody
    @RequestMapping("/event/list")
    public Iterable<Event> eventList() throws Exception {
        return googleCalendarService.viewEvents();
    }

}
