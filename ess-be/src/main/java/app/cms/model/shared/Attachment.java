package app.cms.model.shared;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 10/5/17.
 */
@Setter
@Getter
@MappedSuperclass
public abstract class Attachment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    @Column(name = "request_id")
    protected String requestId;
    protected String path;
}
