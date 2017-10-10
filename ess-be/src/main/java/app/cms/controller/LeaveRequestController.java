package app.cms.controller;

import app.cms.model.Attachment;
import app.cms.model.LeaveRequest;
import app.cms.repository.AttachmentRepository;
import app.cms.repository.LeaveRequestRepository;
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
 * Created by adeliadjuarto on 9/29/17.
 */
@Controller
@SessionAttributes("request")
public class LeaveRequestController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private AttachmentRepository attachmentRepository;

    private static final String APPLICATION_PDF = "application/pdf";
    private static final String JPG = "image/jpg";
    private static final String PNG = "image/png";

    @RequestMapping("/leave-request")
    public String requestTypes(Model model) throws Exception {
        model.addAttribute("requests", leaveRequestRepository.findByIsActive(true));
        model.addAttribute("currPage", "leave-request");
        return "leave-request/index";
    }

    @RequestMapping("leave-request/preview/{id}")
    public HttpServletResponse previewAttachment(@PathVariable(value = "id") Long id,
                              HttpServletResponse response) throws Exception {
        Attachment document = attachmentRepository.findOne(id);
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

    @RequestMapping("/leave-request/approve/{id}")
    public String approveRequest(Model model, @PathVariable("id") Long id) throws Exception {
        LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
        leaveRequest.setIsApproved(true);
        leaveRequestRepository.save(leaveRequest);
        return "redirect:/leave-request";
    }

    @RequestMapping("/leave-request/reject/{id}")
    public String rejectRequest(Model model, @PathVariable("id") Long id) throws Exception {
        model.addAttribute("request", leaveRequestRepository.findOne(id));
        model.addAttribute("currPage", "leave-request");
        return "leave-request/reject";
    }

    @RequestMapping(value = "/leave-request/reject", method = RequestMethod.POST)
    public String saveRejectedRequest(@ModelAttribute("request") LeaveRequest request,
                                      SessionStatus status) throws Exception {
        request.setIsApproved(false);
        leaveRequestRepository.save(request);
        status.setComplete();
        return "redirect:/leave-request";
    }
}
