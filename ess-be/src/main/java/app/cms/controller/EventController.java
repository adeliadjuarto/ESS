package app.cms.controller;

import app.cms.model.Event;
import app.cms.repository.EventRepository;
import app.cms.repository.UserRepository;
import app.cms.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by adeliadjuarto on 10/24/17.
 */
@Controller
@SessionAttributes("event")
public class EventController {
    @Autowired
    private EventService eventService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;


    @RequestMapping("/event")
    public String events(Model model) throws Exception {
        model.addAttribute("events", eventRepository.findByIsActive(true));
        model.addAttribute("currPage", "event");
        return "event/index";
    }

    @RequestMapping("event/create")
    public String createEvents(Model model) throws Exception {
        model.addAttribute("users", userRepository.findByIsActive(true));
        model.addAttribute("currPage", "event");
        return "event/create";
    }

    @RequestMapping("/event/save")
    public String saveEvent(@RequestParam("summary") String summary,
                            @RequestParam("userIds[]") Long[] userIds,
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
        eventService.addEvent(start, end, summary, userIds, isAllDayEvent);
        return "redirect:/event";
    }

    @RequestMapping("event/edit/{id}")
    public String editEvent(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("event", eventRepository.findOne(id));
        model.addAttribute("users", userRepository.findByIsActive(true));
        model.addAttribute("currPage", "event");
        return "event/edit";
    }

    @RequestMapping(value = "event/update", method = RequestMethod.POST)
    public String updateEvent(
            @ModelAttribute("event") Event event,
            BindingResult bindingResult,
            @RequestParam(name = "userIds[]", required = false) Long[] userIds,
            @RequestParam("start") String inputStart,
            @RequestParam("end") String inputEnd,
            @RequestParam("allDay")String[] allDayValue,
            SessionStatus status
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
        eventService.updateEvent(event.getId(), start, end, event.getTitle(), userIds, isAllDayEvent);
        status.setComplete();
        return "redirect:/event";
    }

    @RequestMapping("/event/delete/{id}")
    public String deleteEvent(@PathVariable(value = "id") Long id) throws  Exception {
       eventService.deleteEvent(id);
        return "redirect:/event";
    }

}
