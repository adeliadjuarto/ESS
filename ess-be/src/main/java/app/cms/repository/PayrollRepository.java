package app.cms.repository;

import app.cms.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    public Payroll findByUserIdAndMonth(Long userId, Integer month);

    public Payroll findFirstByUserIdAndPayrollStatusOrderByMonthDesc(Long userId, String payrollStatus);
}
