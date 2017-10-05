package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 9/29/17.
 */
@Entity
@Table(name = "roles")
@Setter
@Getter
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String code;
}
