package app.cms.controller.api;

import app.cms.model.Payroll;
import app.cms.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
@RestController
public class PayrollApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private PayrollRepository payrollRepository;
    private static final String APPLICATION_PDF = "application/pdf";

    @RequestMapping("/payrolls/{id}")
    public Payroll getPayroll(@PathVariable("id") Long id) throws Exception {
        return payrollRepository.findOne(id);
    }

    @RequestMapping("/payrolls/{id}/download")
    public HttpServletResponse downloadPayroll(@PathVariable("id") Long id,
                                                HttpServletResponse response) throws Exception {
        Payroll document = payrollRepository.findOne(id);
        File file = new File(directoryPath + document.getPath());
        InputStream inputStream = new FileInputStream(file);
        response.setContentType(APPLICATION_PDF);
        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(inputStream, response.getOutputStream());
        response.flushBuffer();
        return response;
    }
}
