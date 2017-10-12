package app.cms.controller;

import app.cms.model.OvertimeRequest;
import app.cms.model.OvertimeRequestAttachment;
import app.cms.repository.OvertimeRequestAttachmentRepository;
import app.cms.repository.OvertimeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by adeliadjuarto on 10/12/17.
 */
@Controller
@SessionAttributes("request")
public class OvertimeRequestController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private OvertimeRequestRepository overtimeRequestRepository;
    @Autowired
    private OvertimeRequestAttachmentRepository attachmentRepository;

    private static final String APPLICATION_PDF = "application/pdf";
    private static final String JPG = "image/jpg";
    private static final String PNG = "image/png";

    @RequestMapping("/overtime-request")
    public String requests(Model model) throws Exception {
        model.addAttribute("requests", overtimeRequestRepository.findByIsActive(true));
        model.addAttribute("currPage", "overtime-request");
        return "overtime-request/index";
    }

    @RequestMapping("overtime-request/preview/{id}")
    public HttpServletResponse previewAttachment(@PathVariable(value = "id") Long id,
                                                 HttpServletResponse response) throws Exception {
        OvertimeRequestAttachment document = attachmentRepository.findOne(id);
        File file = new File(directoryPath + document.getPath());
        InputStream is = new FileInputStream(file);
        String extension = file.getPath().substring(file.getPath().lastIndexOf('.') + 1);
        String fileType = "";
        switch (extension) {
            case "pdf":
                fileType = APPLICATION_PDF;
                break;
            case "jpg":
                fileType = JPG;
                break;
            case "png":
                fileType = PNG;
        }
        response.setContentType(fileType);
        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(is, response.getOutputStream());
        return response;
    }

    @RequestMapping("/overtime-request/approve/{id}")
    public String approveRequest(Model model, @PathVariable("id") String id) throws Exception {
        OvertimeRequest request = overtimeRequestRepository.findOne(id);
        request.setIsApproved(true);
        overtimeRequestRepository.save(request);
        return "redirect:/overtime-request";
    }

    @RequestMapping("/overtime-request/reject/{id}")
    public String rejectRequest(Model model, @PathVariable("id") String id) throws Exception {
        model.addAttribute("request", overtimeRequestRepository.findOne(id));
        model.addAttribute("currPage", "overtime-request");
        return "overtime-request/reject";
    }

    @RequestMapping(value = "/overtime-request/reject", method = RequestMethod.POST)
    public String saveRejectedRequest(@ModelAttribute("request") OvertimeRequest request,
                                      SessionStatus status) throws Exception {
        request.setIsApproved(false);
        overtimeRequestRepository.save(request);
        status.setComplete();
        return "redirect:/overtime-request";
    }
}
