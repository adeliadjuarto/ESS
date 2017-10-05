package app.cms.repository;

import app.cms.model.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 10/5/17.
 */
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    public List<Attachment> findByRequestIdAndCategory(Long requestId, String category);
}
