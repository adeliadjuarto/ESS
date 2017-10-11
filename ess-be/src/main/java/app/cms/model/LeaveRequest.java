package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

/**
 * Created by adeliadjuarto on 9/29/17.
 */
@Entity
@Table(name = "leave_requests")
@Setter
@Getter
public class LeaveRequest extends BaseEntity {
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
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(
            name = "system-uuid",
            strategy = "uuid2")
    private String id;
    private String title;
    private String description;
    private Long start;
    private Long end;
    @Column(name = "rejection_note")
    private String rejectionNote;
    @Column(name = "is_approved")
    private Boolean isApproved;
    @ManyToOne
    @JoinColumn(name = "request_type_id", referencedColumnName = "id")
    private RequestType requestType;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToMany
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private List<LeaveRequestAttachment> attachments;
}
