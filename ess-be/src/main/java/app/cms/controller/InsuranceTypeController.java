package app.cms.controller;

import app.cms.model.InsuranceType;
import app.cms.repository.InsuranceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
@Controller
@SessionAttributes("insuranceType")
public class InsuranceTypeController {
    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;

    @RequestMapping("/insurance-type")
    public String InsuranceType(Model model) throws Exception {
        model.addAttribute("insuranceTypes", insuranceTypeRepository.findAll());
        model.addAttribute("currPage", "insurance-type");
        return "insurance-type/index";
    }

    @RequestMapping("insurance-type/create")
    public String createInsuranceType(Model model) throws Exception {
        model.addAttribute("insuranceType", new InsuranceType());
        model.addAttribute("currPage", "insurance-type");
        return "insurance-type/create";
    }

    @RequestMapping(value = "insurance-type/save", method = RequestMethod.POST)
    public String saveInsuranceType(@ModelAttribute InsuranceType insuranceType,
                                    SessionStatus status) {
        insuranceTypeRepository.save(insuranceType);
        status.setComplete();
        return "redirect:/insurance-type";
    }

    @RequestMapping("insurance-type/edit/{id}")
    public String editInsuranceType(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("insuranceType", insuranceTypeRepository.findOne(id));
        model.addAttribute("currPage", "insurance-type");
        return "insurance-type/edit";
    }

    @RequestMapping(value = "insurance-type/delete/{id}")
    public String deleteInsuranceType(@PathVariable(value = "id") Long id) {
        insuranceTypeRepository.delete(id);
        return "redirect:/insurance-type";
    }
}
