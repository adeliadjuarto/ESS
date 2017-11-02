package app.cms.model;

import app.cms.model.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.text.DateFormatSymbols;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
@Entity
@Table(name = "payrolls")
@Setter
@Getter
public class Payroll extends BaseEntity {
    public Payroll () {}
    public Payroll (User user, Integer month) {
        this.user = user;
        this.month = month;
        this.payrollStatus = "pending";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String path;
    private Integer month;
    private String payrollStatus;

    public String getMonthName () {
        return new DateFormatSymbols().getMonths()[this.month-1];
    }
}
