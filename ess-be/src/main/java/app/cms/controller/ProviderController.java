package app.cms.controller;

import app.cms.model.*;
import app.cms.model.excel.Doctor;
import app.cms.model.excel.Hospital;
import app.cms.repository.InsuranceTypeRepository;
import app.cms.repository.ProviderRepository;
import app.cms.repository.ProviderTypeRepository;
import app.cms.repository.ServiceTypeRepository;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.javafunk.excelparser.SheetParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
@Controller
@SessionAttributes("provider")
public class ProviderController {
    @Value("${file-directory-path}")
    private String directoryPath;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProviderTypeRepository providerTypeRepository;
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;
    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;
    private static final String EXCEL_FILE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    @RequestMapping("/provider")
    public String provider(Model model) throws Exception {
        model.addAttribute("providers", providerRepository.findByIsActive(true));
        model.addAttribute("currPage", "provider");
        return "provider/index";
    }

    @RequestMapping("provider/import-provider")
    public String importProvider(Model model) throws Exception {
        model.addAttribute("insuranceTypes", insuranceTypeRepository.findByIsActive(true));
        model.addAttribute("currPage", "provider");
        return "provider/import";
    }

    @RequestMapping("provider/download-template")
    public void downloadTemplate(HttpServletResponse response) throws Exception {
        String path = "static/template/providers.xlsx";
        File file = new File(getClass().getClassLoader().getResource(path).getFile());
        InputStream is = new FileInputStream(file);
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
        response.setHeader("Content-Length", String.valueOf(file.length()));
        FileCopyUtils.copy(is, response.getOutputStream());
    }

    @RequestMapping("provider/create")
    public String createProvider(Model model) throws Exception {
        model.addAttribute("provider", new Provider());
        model.addAttribute("providerTypes", providerTypeRepository.findByIsActive(true));
        model.addAttribute("insuranceTypes", insuranceTypeRepository.findByIsActive(true));
        model.addAttribute("serviceTypes", serviceTypeRepository.findAll());
        model.addAttribute("currPage", "provider");
        return "provider/create";
    }

    @RequestMapping(value = "provider/save", method = RequestMethod.POST)
    public String saveProvider(@ModelAttribute Provider provider,
                               @RequestParam("providerType") Long providerTypeId,
                               @RequestParam("insuranceType") Long insuranceTypeId,
                               @RequestParam("serviceType") Long serviceTypeId,
                               SessionStatus status) {
        provider.setProviderType(providerTypeRepository.findOne(providerTypeId));
        provider.setInsuranceType(insuranceTypeRepository.findOne(insuranceTypeId));
        provider.setServiceType(serviceTypeRepository.findOne(serviceTypeId));
        provider.setCity(provider.getCity().toUpperCase());
        provider.setIsActive(true);
        providerRepository.save(provider);
        status.setComplete();
        return "redirect:/provider";
    }

    @RequestMapping("provider/edit/{id}")
    public String editProvider(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("provider", providerRepository.findOne(id));
        model.addAttribute("providerTypes", providerTypeRepository.findByIsActive(true));
        model.addAttribute("insuranceTypes", insuranceTypeRepository.findByIsActive(true));
        model.addAttribute("serviceTypes", serviceTypeRepository.findAll());
        model.addAttribute("currPage", "provider");
        return "provider/edit";
    }

    @RequestMapping(value = "provider/delete/{id}")
    public String deleteProvider(@PathVariable(value = "id") Long id) {
        Provider provider = providerRepository.findOne(id);
        provider.setIsActive(false);
        providerRepository.save(provider);
        return "redirect:/provider";
    }

    @RequestMapping(value = "/save-excel-provider", method = RequestMethod.POST)
    public String saveExcelProvider(@RequestParam("file") MultipartFile file,
                                    @RequestParam("insuranceType") Long insuranceTypeId,
                                    Model model)
            throws Exception {
        if (!file.getContentType().equals(EXCEL_FILE)) {
            model.addAttribute("insuranceTypes", insuranceTypeRepository.findByIsActive(true));
            model.addAttribute("currPage", "provider");
            model.addAttribute("fileErrMsg",
                    "The file must be a file of type excel.");
            return "provider/import";
        }

        InsuranceType insuranceType = insuranceTypeRepository.findOne(insuranceTypeId);
        saveRawatInapDataFromExcel(file, insuranceType);
        saveRawatJalanDataFromExcel(file, insuranceType);
        saveMCUDataFromExcel(file, insuranceType);

        return "redirect:/provider";
    }

    private void saveRawatInapDataFromExcel (MultipartFile file,
                                             InsuranceType insuranceType) throws Exception {
        ProviderType providerType = providerTypeRepository.findFirstByNameAndIsActive("RS", true);
        if (providerType == null) {
            providerType = providerTypeRepository.save(new ProviderType("RS"));
        }
        InputStream in = file.getInputStream();
        String sheetName = "RAWAT INAP";
        SheetParser parser = new SheetParser();
        Sheet sheet = new XSSFWorkbook(in).getSheet(sheetName);
        List<Hospital> rawatInapLists = parser.createEntity(sheet, Hospital.class, error -> {throw error;});
        for (Hospital i : rawatInapLists) {
            if (i.getProvider() != null && !i.getProvider().isEmpty()) {
                Provider provider = new Provider(i.getCity(), i.getProvider(),
                        i.getBpjs(), i.getAddress(), i.getTelephone(), i.getFax(), providerType,
                        serviceTypeRepository.findOne(1l), insuranceType);
                providerRepository.save(provider);
            }
        }
    }

    private void saveRawatJalanDataFromExcel (MultipartFile file,
                                              InsuranceType insuranceType) throws Exception {
        ProviderType providerType;
        InputStream in = file.getInputStream();
        String sheetName = "RAWAT JALAN";
        SheetParser parser = new SheetParser();
        Sheet sheet = new XSSFWorkbook(in).getSheet(sheetName);
        List<Doctor> rawatJalanLists = parser.createEntity(sheet, Doctor.class, error -> {throw error;});
        for (Doctor i : rawatJalanLists) {
            if (i.getName() != null && !i.getName().isEmpty()) {
                providerType = providerTypeRepository.findFirstByNameAndIsActive(i.getType(), true);
                if (providerType == null) {
                    providerType = providerTypeRepository.save(new ProviderType(i.getType()));
                }
                Provider provider = new Provider(i.getCity(), i.getName(), "", i.getAddress(),
                        i.getTelephone(), "", providerType, serviceTypeRepository.findOne(2l),
                        insuranceType);
                providerRepository.save(provider);
            }
        }
    }

    private void saveMCUDataFromExcel (MultipartFile file,
                                       InsuranceType insuranceType) throws Exception {
        ProviderType providerType;
        InputStream in = file.getInputStream();
        String sheetName = "MCU";
        SheetParser parser = new SheetParser();
        Sheet sheet = new XSSFWorkbook(in).getSheet(sheetName);
        List<Doctor> mcuLists = parser.createEntity(sheet, Doctor.class, error -> {throw error;});

        for (Doctor i : mcuLists) {
            if (i.getName() != null && !i.getName().isEmpty()) {
                providerType = providerTypeRepository.findFirstByNameAndIsActive(i.getType(), true);
                if (providerType == null) {
                    providerType = providerTypeRepository.save(new ProviderType(i.getType()));
                }
                Provider provider = new Provider(i.getCity(), i.getName(), "", i.getAddress(),
                        i.getTelephone(), "", providerType, serviceTypeRepository.findOne(3l),
                        insuranceType);
                providerRepository.save(provider);
            }
        }
    }
}
