package app.cms.repository;

import app.cms.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    public Payroll findByUserIdAndMonth(Long userId, Integer month);

    public List<Payroll> findByUserIdAndPayrollStatus(Long userId, String payrollStatus);

    public Payroll findFirstByUserIdAndPayrollStatusOrderByMonthDesc(Long userId, String payrollStatus);
}
