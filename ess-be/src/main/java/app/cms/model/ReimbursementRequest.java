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
 * Created by adeliadjuarto on 10/11/17.
 */
@Entity
@Table(name = "reimbursement_requests")
@Setter
@Getter
public class ReimbursementRequest extends Request {
    public ReimbursementRequest () {}
    public ReimbursementRequest (String title, String description, Long eventDate,
                                 Long amount, RequestType requestType, User user) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.amount = amount;
        this.requestType = requestType;
        this.user = user;
        this.isApproved = null;
        this.isActive = true;
    }
    private Long eventDate;
    private Long amount;
    @ManyToOne
    @JoinColumn(name = "request_type_id", referencedColumnName = "id")
    private RequestType requestType;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToMany
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private List<ReimbursementRequestAttachment> attachments;

    public String getEventDate() {
        Date date = new Date(this.eventDate);
        DateFormat format = new SimpleDateFormat("dd MMM yyyy HH:mm");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String formatted = format.format(date);
        return formatted;
    }
}
