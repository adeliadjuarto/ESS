package app.cms.repository;

import app.cms.model.ReimbursementRequest;
import app.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 10/11/17.
 */
public interface ReimbursementRequestRepository extends JpaRepository<ReimbursementRequest, String> {
    public List<ReimbursementRequest> findByIsActive(Boolean isActive);
    public List<ReimbursementRequest> findByUserAndIsActive(User user, Boolean isActive);
    public List<ReimbursementRequest> findByUserInAndIsActiveAndIsApprovedNull(List<User> users, Boolean isActive);
}
