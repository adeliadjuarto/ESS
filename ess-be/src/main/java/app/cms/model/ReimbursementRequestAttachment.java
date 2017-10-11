package app.cms.model;

import app.cms.model.shared.Attachment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by adeliadjuarto on 10/11/17.
 */
@Entity
@Table(name = "reimbursement_request_attachments")
@Getter
@Setter
public class ReimbursementRequestAttachment extends Attachment {
    public ReimbursementRequestAttachment () {}
    public ReimbursementRequestAttachment (String requestId, String path) {
        this.requestId = requestId;
        this.path = path;
        this.isActive = true;
    }
}
