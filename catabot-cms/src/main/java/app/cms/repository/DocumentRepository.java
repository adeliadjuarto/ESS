package app.cms.repository;

import app.cms.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/6/17.
 */
public interface DocumentRepository extends JpaRepository<Document, Long> {
    public List<Document> findByCategory(String category);

    public List<Document> findByCategoryAndYearAndTitleContaining(String category, String year, String name);

    @Query(value = "SELECT DISTINCT year FROM Document")
    public List<String> getAllDocumentYear();
}
