package app.cms.repository;

import app.cms.model.InsuranceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface InsuranceTypeRepository extends JpaRepository<InsuranceType, Long> {
    public List<InsuranceType> findByIsActiveOrderByNameAsc(Boolean isActive);
    public List<InsuranceType> findByIsActive(Boolean isActive);
}
