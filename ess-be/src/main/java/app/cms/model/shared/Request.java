package app.cms.model.shared;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Created by adeliadjuarto on 1/11/18.
 */
@Setter
@Getter
@MappedSuperclass
public abstract class Request extends BaseEntity {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(
            name = "system-uuid",
            strategy = "uuid2")
    protected String id;
    protected String title;
    protected String description;
    @Column(name = "rejection_note")
    protected String rejectionNote;
    @Column(name = "is_approved")
    protected Boolean isApproved;
}
