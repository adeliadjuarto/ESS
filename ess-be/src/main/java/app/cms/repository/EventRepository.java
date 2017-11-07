package app.cms.repository;

import app.cms.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 11/7/17.
 */
public interface EventRepository extends JpaRepository<Event, Long> {
    public List<Event> findByIsActive(Boolean isActive);
}
