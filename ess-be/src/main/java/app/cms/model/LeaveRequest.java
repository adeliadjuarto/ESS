package app.cms.model;

import app.cms.model.shared.BaseEntity;
import app.cms.model.shared.Request;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

/**
 * Created by adeliadjuarto on 9/29/17.
 */
@Entity
@Table(name = "leave_requests")
@Setter
@Getter
public class LeaveRequest extends Request {
    public LeaveRequest () {}
    public LeaveRequest (String title, String description, Long start, Long end,
                         RequestType requestType, User user) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.requestType = requestType;
        this.user = user;
        this.isApproved = null;
        this.isActive = true;
    }
    private Long start;
    private Long end;
    @ManyToOne
    @JoinColumn(name = "request_type_id", referencedColumnName = "id")
    private RequestType requestType;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToMany
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private List<LeaveRequestAttachment> attachments;

    public String getStart() {
        Date date = new Date(this.start);
        DateFormat format = new SimpleDateFormat("dd MMM yyyy HH:mm");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }

    public String getEnd() {
        Date date = new Date(this.end);
        DateFormat format = new SimpleDateFormat("dd MMM yyyy HH:mm");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }
}
