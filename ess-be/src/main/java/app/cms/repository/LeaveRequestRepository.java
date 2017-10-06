package app.cms.repository;

import app.cms.model.LeaveRequest;
import app.cms.model.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    public List<LeaveRequest> findByIsActive(Boolean isActive);
}
