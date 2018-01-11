package app.cms.model;

import app.cms.model.shared.BaseEntity;
import app.cms.model.shared.Request;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

/**
 * Created by adeliadjuarto on 10/12/17.
 */
@Entity
@Table(name = "overtime_requests")
@Setter
@Getter
public class OvertimeRequest extends Request {
    public OvertimeRequest () {}
    public OvertimeRequest (String title, String description, Long eventDate,
                            Long start, Long end, User user) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.start = start;
        this.end = end;
        this.user = user;
        this.isApproved = null;
        this.isActive = true;
    }
    private Long eventDate;
    private Long start;
    private Long end;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToMany
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private List<OvertimeRequestAttachment> attachments;

    public String getEventDate() {
        Date date = new Date(this.eventDate);
        DateFormat format = new SimpleDateFormat("dd MMM yyyy");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }

    public String getStart() {
        Date date = new Date(this.start);
        DateFormat format = new SimpleDateFormat("HH:mm");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }

    public String getEnd() {
        Date date = new Date(this.end);
        DateFormat format = new SimpleDateFormat("HH:mm");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }
}
