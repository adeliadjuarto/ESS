package app.cms.service;

import app.cms.controller.EventController;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;
import com.google.api.services.calendar.model.Events;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by adeliadjuarto on 10/25/17.
 */
@Service
public class GoogleCalendarService {
    /** Calendar ID. */
    private static final String CALENDAR_ID =
            "0lvq02sj88pineh3c58tgro63s@group.calendar.google.com";

    /** Application name. */
    private static final String APPLICATION_NAME =
            "ESS - Google Calendar API";

    /** Directory to store user credentials for this application. */
    private static final java.io.File DATA_STORE_DIR = new java.io.File(
            System.getProperty("user.home"), ".credentials/calendar-java-ess");

    /** Global instance of the {@link FileDataStoreFactory}. */
    private static FileDataStoreFactory DATA_STORE_FACTORY;

    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY =
            JacksonFactory.getDefaultInstance();

    /** Global instance of the HTTP transport. */
    private static HttpTransport HTTP_TRANSPORT;

    /** Global instance of the scopes required by this quickstart.
     *
     * If modifying these scopes, delete your previously saved credentials
     * at ~/.credentials/calendar-java-quickstart
     */
    private static final List<String> SCOPES =
            Arrays.asList(CalendarScopes.CALENDAR);

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }

    /**
     * Creates an authorized Credential object.
     * @return an authorized Credential object.
     * @throws IOException
     */
    public static Credential authorize() throws IOException {
        // Load client secrets.
        InputStream in =
                EventController.class.getResourceAsStream("/client_secret.json");
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                        .setDataStoreFactory(DATA_STORE_FACTORY)
                        .setAccessType("offline")
                        .build();
        Credential credential = new AuthorizationCodeInstalledApp(
                flow, new LocalServerReceiver()).authorize("user");
        return credential;
    }

    /**
     * Build and return an authorized Calendar client service.
     * @return an authorized Calendar client service
     * @throws IOException
     */
    public static com.google.api.services.calendar.Calendar
    getCalendarService() throws IOException {
        Credential credential = authorize();
        return new com.google.api.services.calendar.Calendar.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public Event addEvent(Long inputStart,
                          Long inputEnd,
                          String summary,
                          Boolean isAllDayEvent) throws IOException {
        Event event = new Event();
        event.setSummary(summary);
        EventDateTime start = new EventDateTime();
        EventDateTime end = new EventDateTime();
        if (!isAllDayEvent) {
            start.setDateTime(new DateTime(inputStart));
            end.setDateTime(new DateTime(inputEnd));
        } else {
            start.setDate(new DateTime(true, inputStart, 0));
            end.setDate(new DateTime(true, (inputEnd+86400000), 0));
        }
        start.setTimeZone("Asia/Jakarta");
        end.setTimeZone("Asia/Jakarta");
        event.setStart(start);
        event.setEnd(end);

        Event.Reminders reminders = new Event.Reminders();
        EventReminder reminder = new EventReminder();
        List<EventReminder> reminderLists = new ArrayList<>();
        reminder.setMethod("popup");
        reminder.setMinutes(10);
        reminderLists.add(reminder);
        reminders.setOverrides(reminderLists);
        event.setReminders(reminders);
        event.getReminders().setUseDefault(false);

        com.google.api.services.calendar.Calendar service =
                getCalendarService();
        return service.events().insert(CALENDAR_ID, event).execute();
    }

    public Event updateEvent(String id,
                             Long inputStart,
                             Long inputEnd,
                             String summary,
                             Boolean isAllDayEvent) throws IOException {
        com.google.api.services.calendar.Calendar service =
                getCalendarService();
        Event event = service.events().get(CALENDAR_ID, id).execute();
        event.setSummary(summary);
        EventDateTime start = new EventDateTime();
        EventDateTime end = new EventDateTime();
        if (!isAllDayEvent) {
            start.setDateTime(new DateTime(inputStart));
            end.setDateTime(new DateTime(inputEnd));
        } else {
            start.setDate(new DateTime(true, inputStart, 0));
            end.setDate(new DateTime(true, (inputEnd+86400000), 0));
        }

        start.setTimeZone("Asia/Jakarta");
        end.setTimeZone("Asia/Jakarta");
        event.setStart(start);
        event.setEnd(end);

        return service.events().update(CALENDAR_ID, id, event).execute();
    }

    public void deleteEvent(String id) throws IOException {
        com.google.api.services.calendar.Calendar service =
                getCalendarService();
        service.events().delete(CALENDAR_ID, id).execute();
    }

    public List<Event> viewEvents() throws IOException {
        // Build a new authorized API client service.
        // Note: Do not confuse this class with the
        //   com.google.api.services.calendar.model.Calendar class.
        com.google.api.services.calendar.Calendar service =
                getCalendarService();

        // List the next 10 events from the ESS calendar.
        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = service.events().list(CALENDAR_ID)
                .setMaxResults(10)
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        return events.getItems();
    }
}
