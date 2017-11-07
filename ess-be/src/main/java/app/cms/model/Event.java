package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by adeliadjuarto on 11/7/17.
 */
@Entity
@Table(name = "events")
@Setter
@Getter
public class Event extends BaseEntity {
    public Event () {}
    public Event (String googleEventId,
                  Long start, Long end,
                  List<EventAttendee> eventAttendees) {
        this.googleEventId = googleEventId;
        this.start = start;
        this.end = end;
        this.eventAttendees = eventAttendees;
        this.isActive = true;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "google_event_id")
    private String googleEventId;
    private Long start;
    private Long end;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<EventAttendee> eventAttendees;
}
