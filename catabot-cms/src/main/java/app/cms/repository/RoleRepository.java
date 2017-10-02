package app.cms.repository;

import app.cms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
}
