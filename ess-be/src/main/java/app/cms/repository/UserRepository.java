package app.cms.repository;

import app.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 9/27/17.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findByIsActive(Boolean isActive);
    public List<User> findByIsActiveAndIdNot(Boolean isActive, Long id);
    public List<User> findByIsActiveTrueAndSuperordinate(User user);
    public User findByUsernameAndIsActive(String username, Boolean isActive);
}
