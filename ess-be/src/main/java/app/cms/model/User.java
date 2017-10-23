package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 9/27/17.
 */
@Entity
@Table(name = "users")
@Setter
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String name;
    private String password;
    private String phone;
    @Column(name = "annual_leave")
    private Integer annualLeave;
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "superordinate_id", referencedColumnName = "id")
    private User superordinate;

}
