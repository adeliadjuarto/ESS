package app.cms.controller;

import app.cms.model.Document;
import app.cms.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Created by adeliadjuarto on 7/6/17.
 */
@Controller
@SessionAttributes("file")
public class DocumentController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private DocumentRepository documentRepository;

    private static final String APPLICATION_PDF = "application/pdf";

    @RequestMapping("/file-management")
    public String fileManagement(Model model) throws Exception {
        model.addAttribute("files", documentRepository.findByIsActive(true));
        model.addAttribute("currPage", "document");
        return "file-management/index";
    }

    @RequestMapping("file-management/create")
    public String createFile(Model model) throws Exception {
        model.addAttribute("file", new Document());
        model.addAttribute("currPage", "document");
        return "file-management/create";
    }

    @RequestMapping(value = "file-management/add", method = RequestMethod.POST)
    public String addFile(@ModelAttribute Document document,
                          @RequestParam("file") MultipartFile file,
                          @RequestParam("category") String category,
                          Model model) {
        if (!file.getContentType().equals(APPLICATION_PDF)) {
            model.addAttribute("file", document);
            model.addAttribute("currPage", "document");
            model.addAttribute("fileErrMsg", "The file must be a file of type pdf.");
            return "file-management/create";
        }

        File directory = new File(directoryPath + "documents/");
        if (!directory.exists()) {
            directory.mkdir();
        }
        String pathName = saveFileToDirectory(file);
        document.setPath(pathName);
        document.setCategory(category);
        document.setIsActive(true);
        documentRepository.save(document);
        return "redirect:/file-management";
    }

    @RequestMapping("file-management/edit/{id}")
    public String editFile(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("file", documentRepository.findOne(id));
        model.addAttribute("currPage", "document");
        return "file-management/edit";
    }

    @RequestMapping(value = "file-management/update", method = RequestMethod.POST)
    public String updateFile(@ModelAttribute("file") Document document,
                             BindingResult bindingResult,
                             @RequestParam("file") MultipartFile file,
                             @RequestParam("category") String category,
                             SessionStatus status) {
        if (!file.getOriginalFilename().isEmpty()) {
            try {
                Path oldPath = Paths.get(directoryPath + document.getPath());
                Files.delete(oldPath);
            } catch (IOException e) {
                e.printStackTrace();
            }
            String pathName = saveFileToDirectory(file);
            document.setPath(pathName);
        }
        document.setCategory(category);
        documentRepository.save(document);
        status.setComplete();
        return "redirect:/file-management";
    }

    @RequestMapping(value = "file-management/delete/{id}")
    public String deleteFile(@PathVariable(value = "id") Long id) {
        Document document = documentRepository.findOne(id);
//        try {
//            Path oldPath = Paths.get(directoryPath + document.getPath());
//            Files.delete(oldPath);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        document.setIsActive(false);
        documentRepository.save(document);
        return "redirect:/file-management";
    }

    @RequestMapping("file-management/download/{id}")
    public String downloadFile(@PathVariable(value = "id") Long id,
                               HttpServletResponse response) throws Exception {
        Document document = documentRepository.findOne(id);
        File file = new File(directoryPath + document.getPath());
        InputStream is = new FileInputStream(file);
        response.setContentType(APPLICATION_PDF);
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(is, response.getOutputStream());
        return "redirect:/file-management";
    }

    @RequestMapping("file-management/preview/{id}")
    public String previewFile(@PathVariable(value = "id") Long id,
                               HttpServletResponse response) throws Exception {
        Document document = documentRepository.findOne(id);
        File file = new File(directoryPath + document.getPath());
        InputStream is = new FileInputStream(file);
        response.setContentType(APPLICATION_PDF);
        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(is, response.getOutputStream());
        return "redirect:/file-management";
    }

    private String getFileName(String path) {
        Path p = Paths.get(path);
        return p.getFileName().toString();
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
        return "documents/" + UUID.randomUUID().toString() + fileName;
    }
}

