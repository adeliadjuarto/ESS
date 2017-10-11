package app.cms.controller;

import app.cms.model.ProviderType;
import app.cms.repository.ProviderTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Created by adeliadjuarto on 7/6/17.
 */
@Controller
@SessionAttributes("type")
public class ProviderTypeController {
    @Autowired
    private ProviderTypeRepository providerTypeRepository;

    @RequestMapping("/provider-type")
    public String providerType(Model model) throws Exception {
        model.addAttribute("types", providerTypeRepository.findByIsActive(true));
        model.addAttribute("currPage", "provider-type");
        return "provider-type/index";
    }

    @RequestMapping("provider-type/create")
    public String createProviderType(Model model) throws Exception {
        model.addAttribute("type", new ProviderType());
        model.addAttribute("currPage", "provider-type");
        return "provider-type/create";
    }

    @RequestMapping(value = "provider-type/save", method = RequestMethod.POST)
    public String saveProviderType(@ModelAttribute("type") ProviderType type,
                                   SessionStatus status) {
        type.setIsActive(true);
        providerTypeRepository.save(type);
        status.setComplete();
        return "redirect:/provider-type";
    }

    @RequestMapping("provider-type/edit/{id}")
    public String editProviderType(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("type", providerTypeRepository.findOne(id));
        model.addAttribute("currPage", "provider-type");
        return "provider-type/edit";
    }

    @RequestMapping(value = "provider-type/delete/{id}")
    public String deleteProviderType(@PathVariable(value = "id") Long id) {
        ProviderType type = providerTypeRepository.findOne(id);
        type.setIsActive(false);
        providerTypeRepository.save(type);
        return "redirect:/provider-type";
    }
}
