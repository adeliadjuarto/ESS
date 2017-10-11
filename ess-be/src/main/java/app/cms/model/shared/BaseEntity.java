package app.cms.model.shared;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1962042912423195489L;

    @Column(name = "created_by")
    @CreatedBy
    protected String createdBy;

    @Column(name = "created_at")
    @CreatedDate
    protected Long createdDate;

    @Column(name = "updated_by")
    @LastModifiedBy
    protected String updatedBy;

    @Column(name = "updated_at")
    @LastModifiedDate
    protected Long updatedDate;

    @Column(name = "is_active")
    protected Boolean isActive;
  
}
