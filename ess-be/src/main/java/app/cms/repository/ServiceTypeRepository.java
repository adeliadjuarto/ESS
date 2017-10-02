package app.cms.repository;

import app.cms.model.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
}
