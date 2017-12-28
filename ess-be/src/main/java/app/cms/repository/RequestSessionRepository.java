package app.cms.repository;

import app.cms.model.RequestSession;
import app.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 12/15/17.
 */
public interface RequestSessionRepository extends JpaRepository<RequestSession, Long> {
    RequestSession findFirstByUserAndType(User user, String type);
}
