package app.cms.repository.shared;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

/**
 * Created by adeliadjuarto on 10/5/17.
 */
@NoRepositoryBean
public interface AttachmentRepository<T> extends JpaRepository<T, Long> {
    public List<T> findByRequestId(String requestId);
}
