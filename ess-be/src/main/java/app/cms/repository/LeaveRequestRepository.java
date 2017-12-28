package app.cms.repository;

import app.cms.model.LeaveRequest;
import app.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, String> {
    public List<LeaveRequest> findByIsActive(Boolean isActive);
    public List<LeaveRequest> findByUserAndIsActive(User user, Boolean isActive);
    public List<LeaveRequest> findByUserInAndIsActiveAndIsApprovedIsNull(List<User> users, Boolean isActive);
}
