package app.cms.controller.api;

import app.cms.model.Event;
import app.cms.service.EventService;
import app.cms.service.GoogleCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by adeliadjuarto on 10/26/17.
 */
@RestController
public class EventApiController {
    @Autowired
    private GoogleCalendarService googleCalendarService;
    @Autowired
    private EventService eventService;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/events")
    public Iterable<Event> events() throws Exception {
        return eventService.getEvents();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/events", method = RequestMethod.POST)
    public String saveEvent(@RequestParam("isAllDayEvent") Boolean isAllDayEvent,
                            @RequestParam("start") Long start,
                            @RequestParam("end") Long end,
                            @RequestParam("summary") String summary,
                            @RequestParam("userIds[]") Long[] userIds) throws Exception {
        eventService.addEvent(start, end, summary, userIds, isAllDayEvent);
        return "Event telah ditambahkan ke kalender!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/events/{id}", method = RequestMethod.POST)
    public String updateEvent(@PathVariable("id") Long id,
                              @RequestParam("isAllDayEvent") Boolean isAllDayEvent,
                              @RequestParam("start") Long start,
                              @RequestParam("end") Long end,
                              @RequestParam("summary") String summary,
                              @RequestParam("userIds[]") Long[] userIds) throws Exception {
        eventService.updateEvent(id, start, end, summary, userIds, isAllDayEvent);
        return "Event telah diedit!";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/events/{id}", method = RequestMethod.DELETE)
    public String deleteEvent(@PathVariable("id") Long id) throws Exception {
        eventService.deleteEvent(id);
        return "Event telah dihapus dari kalender!";
    }

}
