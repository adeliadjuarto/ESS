package app.cms.repository;

import app.cms.model.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface RequestTypeRepository extends JpaRepository<RequestType, Long> {
    public List<RequestType> findByIsActiveOrderByCategoryAsc(Boolean isActive, String category);
    public List<RequestType> findByIsActive(Boolean isActive);
    public List<RequestType> findByIsActiveAndCategory(Boolean isActive, String category);
}
