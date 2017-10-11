package app.cms.controller;

import app.cms.model.ReimbursementRequest;
import app.cms.model.ReimbursementRequestAttachment;
import app.cms.repository.ReimbursementRequestAttachmentRepository;
import app.cms.repository.ReimbursementRequestRepository;
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
 * Created by adeliadjuarto on 10/11/17.
 */
@Controller
@SessionAttributes("request")
public class ReimbursementRequestController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private ReimbursementRequestRepository reimbursementRequestRepository;
    @Autowired
    private ReimbursementRequestAttachmentRepository attachmentRepository;

    private static final String APPLICATION_PDF = "application/pdf";
    private static final String JPG = "image/jpg";
    private static final String PNG = "image/png";

    @RequestMapping("/reimbursement-request")
    public String requests(Model model) throws Exception {
        model.addAttribute("requests", reimbursementRequestRepository.findByIsActive(true));
        model.addAttribute("currPage", "reimbursement-request");
        return "reimbursement-request/index";
    }

    @RequestMapping("reimbursement-request/preview/{id}")
    public HttpServletResponse previewAttachment(@PathVariable(value = "id") Long id,
                                                 HttpServletResponse response) throws Exception {
        ReimbursementRequestAttachment document = attachmentRepository.findOne(id);
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

    @RequestMapping("/reimbursement-request/approve/{id}")
    public String approveRequest(Model model, @PathVariable("id") String id) throws Exception {
        ReimbursementRequest request = reimbursementRequestRepository.findOne(id);
        request.setIsApproved(true);
        reimbursementRequestRepository.save(request);
        return "redirect:/reimbursement-request";
    }

    @RequestMapping("/reimbursement-request/reject/{id}")
    public String rejectRequest(Model model, @PathVariable("id") String id) throws Exception {
        model.addAttribute("request", reimbursementRequestRepository.findOne(id));
        model.addAttribute("currPage", "reimbursement-request");
        return "reimbursement-request/reject";
    }

    @RequestMapping(value = "/reimbursement-request/reject", method = RequestMethod.POST)
    public String saveRejectedRequest(@ModelAttribute("request") ReimbursementRequest request,
                                      SessionStatus status) throws Exception {
        request.setIsApproved(false);
        reimbursementRequestRepository.save(request);
        status.setComplete();
        return "redirect:/reimbursement-request";
    }
}
