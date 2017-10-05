package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 7/6/17.
 */
@Entity
@Table(name = "documents")
@Setter
@Getter
public class Document extends BaseEntity {
    public Document() {
    }

    public Document(String category, String title, String path) {
        this.category = category;
        this.title = title;
        this.path = path;
        this.year = year;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String title;
    private String path;
    private String year;
}
