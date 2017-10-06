package app.cms.controller.api;

import app.cms.model.Document;
import app.cms.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by adeliadjuarto on 10/6/17.
 */
@RestController
public class DocumentApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private DocumentRepository documentRepository;
    private static final String APPLICATION_PDF = "application/pdf";

    @RequestMapping("/documents")
    public Iterable<Document> getDocuments(
            @RequestParam("category") String category,
            @RequestParam("year") String year,
            @RequestParam(value = "title", defaultValue = "") String title
    ) throws Exception {
        return documentRepository.findByCategoryAndYearAndTitleContaining(category, year, title);
    }

    @RequestMapping("/documents/{id}")
    public Document findDocument(@PathVariable("id") Long id) throws Exception {
        return documentRepository.findOne(id);
    }

    @RequestMapping("/documents/{id}/download")
    public HttpServletResponse downloadDocument(@PathVariable("id") Long id,
                                                HttpServletResponse response) throws Exception {
        Document document = documentRepository.findOne(id);
        File file = new File(directoryPath + document.getPath());
        InputStream inputStream = new FileInputStream(file);
        response.setContentType(APPLICATION_PDF);
        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(inputStream, response.getOutputStream());
        response.flushBuffer();
        return response;
    }

    @RequestMapping("/document-years")
    public Iterable<String> getDocumentYears() throws Exception {
        return documentRepository.getAllDocumentYear();
    }
}
