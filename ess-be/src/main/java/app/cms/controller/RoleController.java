package app.cms.controller;

import app.cms.model.InsuranceType;
import app.cms.model.Role;
import app.cms.repository.InsuranceTypeRepository;
import app.cms.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
@Controller
@SessionAttributes("role")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping("/role")
    public String roles(Model model) throws Exception {
        model.addAttribute("roles", roleRepository.findAll());
        model.addAttribute("currPage", "role");
        return "role/index";
    }

    @RequestMapping("role/create")
    public String createRole(Model model) throws Exception {
        model.addAttribute("role", new Role());
        model.addAttribute("currPage", "role");
        return "role/create";
    }

    @RequestMapping(value = "role/save", method = RequestMethod.POST)
    public String saveRole(@ModelAttribute Role role,
                                    SessionStatus status) {
        roleRepository.save(role);
        status.setComplete();
        return "redirect:/role";
    }

    @RequestMapping("role/edit/{id}")
    public String editRole(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("role", roleRepository.findOne(id));
        model.addAttribute("currPage", "role");
        return "role/edit";
    }

    @RequestMapping(value = "role/delete/{id}")
    public String deleteRole(@PathVariable(value = "id") Long id) {
        roleRepository.delete(id);
        return "redirect:/role";
    }
}
