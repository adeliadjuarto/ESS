package app.cms.controller.api;

import app.cms.model.Payroll;
import app.cms.model.User;
import app.cms.repository.PayrollRepository;
import app.cms.repository.UserRepository;
import app.cms.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DateFormatSymbols;
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
    private AuthenticationService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PayrollRepository payrollRepository;
    private static final String APPLICATION_PDF = "application/pdf";


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/payroll/current")
    public Payroll getCurrentPayroll() throws Exception {
        Long userId = authService.getCurrentUser().getId();
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Integer month = cal.get(Calendar.MONTH);
        Integer year = cal.get(Calendar.YEAR);
        String monthString = getMonthName(month) + year.toString();
        return payrollRepository.findByUserIdAndMonth(userId, monthString);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/payroll/processed")
    public List<Payroll> getProcessedPayroll() throws Exception {
        Long userId = authService.getCurrentUser().getId();
        String payrollStatus = "processed";
        return payrollRepository.findByUserIdAndPayrollStatus(userId, payrollStatus);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/payroll/{id}/download")
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

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("payroll/generate")
    public String generateEmptyPayroll() {
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Integer month = cal.get(Calendar.MONTH);
        Integer year = cal.get(Calendar.YEAR);
        String monthString = getMonthName(month) + " " + year.toString();

        List<User> users = userRepository.findByIsActive(true);
        for (User user : users) {
            Payroll payroll = new Payroll(user, monthString);
            payrollRepository.save(payroll);
        }
        return "Empty payrolls have been generated!";
    }

    private String getMonthName (Integer month) {
        return new DateFormatSymbols().getMonths()[month];
    }
}
