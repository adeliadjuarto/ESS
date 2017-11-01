package app.cms.controller;

import app.cms.model.Payroll;
import app.cms.model.User;
import app.cms.repository.PayrollRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by adeliadjuarto on 11/1/17.
 */
@Controller
@SessionAttributes("payroll")
public class PayrollController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PayrollRepository payrollRepository;

    private static final String APPLICATION_PDF = "application/pdf";

    @RequestMapping("/payroll")
    public String payroll(Model model) throws Exception {
        model.addAttribute("payrolls", payrollRepository.findAll());
        model.addAttribute("currPage", "payroll");
        return "payroll/index";
    }

    @RequestMapping("payroll/edit/{id}")
    public String editPayroll(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("payroll", payrollRepository.findOne(id));
        model.addAttribute("currPage", "payroll");
        return "payroll/edit";
    }

    @RequestMapping(value = "payroll/update", method = RequestMethod.POST)
    public String updatePayroll(RedirectAttributes model,
                             @ModelAttribute("payroll") Payroll payroll,
                             @RequestParam("file") MultipartFile file,
                             HttpServletRequest request,
                             BindingResult bindingResult,
                             SessionStatus status) {
        if (!file.getOriginalFilename().isEmpty()) {
            if (!file.getContentType().equals(APPLICATION_PDF)) {
                model.addFlashAttribute("fileErrMsg", "The file must be a file of type pdf.");
                return "redirect:" + request.getHeader("Referer");
            }
            String pathName = saveFileToDirectory(file);
            payroll.setPath(pathName);
        }
        payroll.setIsProcessed(true);
        payrollRepository.save(payroll);
        status.setComplete();
        return "redirect:/payroll";
    }

//    @RequestMapping("file-management/download/{id}")
//    public String downloadFile(@PathVariable(value = "id") Long id,
//                               HttpServletResponse response) throws Exception {
//        Document document = documentRepository.findOne(id);
//        File file = new File(directoryPath + document.getPath());
//        InputStream is = new FileInputStream(file);
//        response.setContentType(APPLICATION_PDF);
//        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
//        response.setHeader("Content-Length", String.valueOf(file.length()));
//        FileCopyUtils.copy(is, response.getOutputStream());
//        return "redirect:/file-management";
//    }

    @RequestMapping("payroll/preview/{id}")
    public HttpServletResponse previewFile(@PathVariable(value = "id") Long id,
                              HttpServletResponse response) throws Exception {
        Payroll payroll = payrollRepository.findOne(id);
        File file = new File(directoryPath + payroll.getPath());
        InputStream is = new FileInputStream(file);
        response.setContentType(APPLICATION_PDF);
        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(is, response.getOutputStream());
        return response;
    }

    @RequestMapping("payroll/generate")
    @ResponseBody
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

    private String saveFileToDirectory (MultipartFile file) {
        String pathName = getPath(file.getOriginalFilename());
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(directoryPath + pathName);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pathName;
    }

    private String getPath(String fileName) {
        return "payroll/" + UUID.randomUUID().toString() + fileName;
    }
}
