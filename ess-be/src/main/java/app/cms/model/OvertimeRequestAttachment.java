package app.cms.model;

import app.cms.model.shared.Attachment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by adeliadjuarto on 10/12/17.
 */
@Entity
@Table(name = "overtime_request_attachments")
@Getter
@Setter
public class OvertimeRequestAttachment extends Attachment {
    public OvertimeRequestAttachment () {}
    public OvertimeRequestAttachment (String requestId, String path) {
        this.requestId = requestId;
        this.path = path;
        this.isActive = true;
    }
}
