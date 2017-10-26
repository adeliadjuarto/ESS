package app.cms.controller.api;

import app.cms.service.GoogleCalendarService;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by adeliadjuarto on 10/26/17.
 */
@RestController
public class EventApiController {
    @Autowired
    private GoogleCalendarService googleCalendarService;

    @RequestMapping("/events")
    public Iterable<Event> events() throws Exception {
        return googleCalendarService.viewEvents();
    }

    @RequestMapping(value = "/events", method = RequestMethod.POST)
    public String saveEvent(@RequestParam("isAllDayEvent") Boolean isAllDayEvent,
                            @RequestParam("start") Long start,
                            @RequestParam(value = "end", required = false) Long end,
                            @RequestParam("summary") String summary) throws Exception {
        googleCalendarService.addEvent(start, end, summary, isAllDayEvent);
        return "Event successfully added to calendar!";
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.POST)
    public String updateEvent(@PathVariable("id") String id,
                              @RequestParam("isAllDayEvent") Boolean isAllDayEvent,
                              @RequestParam("start") Long start,
                              @RequestParam(value = "end", required = false) Long end,
                              @RequestParam("summary") String summary) throws Exception {
        googleCalendarService.updateEvent(id, start, end, summary, isAllDayEvent);
        return "Event successfully edited!";
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.DELETE)
    public String deleteEvent(@PathVariable("id") String id) throws Exception {
        googleCalendarService.deleteEvent(id);
        return "Event successfully deleted from calendar!";
    }

}
