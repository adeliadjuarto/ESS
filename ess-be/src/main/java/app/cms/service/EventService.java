package app.cms.service;

import app.cms.model.Event;
import app.cms.model.EventAttendee;
import app.cms.model.User;
import app.cms.repository.EventRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by adeliadjuarto on 11/7/17.
 */
@Service
public class EventService {
    @Autowired
    private GoogleCalendarService googleCalendarService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getEvents () throws IOException {
        return eventRepository.findByIsActive(true);
    }

    public Event addEvent (Long start,
                           Long end,
                           String summary,
                           Long[] userIds,
                           Boolean isAllDayEvent) throws IOException {
        String googleEventId = googleCalendarService.addEvent(start, end, summary, isAllDayEvent);
        List<EventAttendee> eventAttendees = new ArrayList<>();
        EventAttendee eventAttendee = null;
        User user = null;
        for (Long userId : userIds) {
            user = userRepository.findOne(userId);
            eventAttendee = new EventAttendee(user);
            eventAttendees.add(eventAttendee);
        }
        Event event = new Event(googleEventId, summary, start, end, eventAttendees);
        return eventRepository.save(event);
    }

    public Event updateEvent (Long id,
                              Long start,
                              Long end,
                              String summary,
                              Long[] userIds,
                              Boolean isAllDayEvent) throws IOException {
        Event event = eventRepository.findOne(id);
        List<EventAttendee> eventAttendees = new ArrayList<>();
        EventAttendee eventAttendee = null;
        User user = null;
        for (Long userId : userIds) {
            user = userRepository.findOne(userId);
            eventAttendee = new EventAttendee(user);
            eventAttendees.add(eventAttendee);
        }
        event.update(summary, start, end, eventAttendees);
        eventRepository.save(event);
        googleCalendarService.updateEvent(event.getGoogleEventId(), start, end, summary, isAllDayEvent);
        return event;
    }

    public void deleteEvent (Long id) throws IOException {
        Event event = eventRepository.findOne(id);
        event.setIsActive(false);
        eventRepository.save(event);
        googleCalendarService.deleteEvent(event.getGoogleEventId());
    }
}
