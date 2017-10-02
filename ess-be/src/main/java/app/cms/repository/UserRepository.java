package app.cms.repository;

import app.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 9/27/17.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findByIsActive(Boolean isActive);
}
