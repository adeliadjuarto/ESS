package app.cms.repository;

import app.cms.model.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface RequestTypeRepository extends JpaRepository<RequestType, Long> {
    public List<RequestType> findByOrderByCategoryAsc(String category);
}
