package app.cms.controller.api;

import app.cms.model.Payroll;
import app.cms.model.User;
import app.cms.repository.PayrollRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
@RestController
public class PayrollApiController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PayrollRepository payrollRepository;
    private static final String APPLICATION_PDF = "application/pdf";

    @RequestMapping("/payrolls/current")
    public Payroll getCurrentPayroll() throws Exception {
        Long userId = 1l;
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Integer month = cal.get(Calendar.MONTH);
        return payrollRepository.findByUserIdAndMonth(userId, month);
    }

    @RequestMapping("/payrolls/latest-paid")
    public Payroll getLatestPaidPayroll() throws Exception {
        Long userId = 1l;
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Integer month = cal.get(Calendar.MONTH);
        month -= 1;
        return payrollRepository.findByUserIdAndMonth(userId, month);
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

    @RequestMapping("payroll/generate")
    public String generateEmptyPayroll() {
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Integer month = cal.get(Calendar.MONTH);

        List<User> users = userRepository.findByIsActive(true);
        for (User user : users) {
            Payroll payroll = new Payroll(user, month);
            payrollRepository.save(payroll);
        }
        return "Empty payrolls have been generated!";
    }
}
