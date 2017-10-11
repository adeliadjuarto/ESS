package app.cms.repository;

import app.cms.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/6/17.
 */
public interface DocumentRepository extends JpaRepository<Document, Long> {
    public List<Document> findByIsActive(Boolean isActive);
    public List<Document> findByCategoryAndIsActive(String category, Boolean isActive);
    public List<Document> findByCategoryAndYearAndTitleContainingAndIsActive(String category,
                                                                             String year,
                                                                             String name,
                                                                             Boolean isActive);
    @Query(value = "SELECT DISTINCT year FROM Document WHERE isActive = 1")
    public List<String> getAllDocumentYear();
}
