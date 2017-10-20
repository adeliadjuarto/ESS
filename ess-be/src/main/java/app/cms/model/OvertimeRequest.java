package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

/**
 * Created by adeliadjuarto on 10/12/17.
 */
@Entity
@Table(name = "overtime_requests")
@Setter
@Getter
public class OvertimeRequest extends BaseEntity{
    public OvertimeRequest () {}
    public OvertimeRequest (String title, String description, Long eventDate,
                            Long startTime, Long endTime, User user) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.startTime = startTime;
        this.endTime = endTime;
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
    private Long eventDate;
    private Long startTime;
    private Long endTime;
    @Column(name = "rejection_note")
    private String rejectionNote;
    @Column(name = "is_approved")
    private Boolean isApproved;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToMany
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private List<OvertimeRequestAttachment> attachments;
}
