package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 10/5/17.
 */
@Entity
@Table(name = "attachments")
@Setter
@Getter
public class Attachment {
    public Attachment () {}
    public Attachment (Long requestId, String category, String path) {
        this.requestId = requestId;
        this.category = category;
        this.path = path;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "request_id")
    private Long requestId;
    private String category;
    private String path;
}
