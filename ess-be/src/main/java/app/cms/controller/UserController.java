package app.cms.controller;

import app.cms.model.User;
import app.cms.repository.RoleRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by adeliadjuarto on 9/27/17.
 */
@Controller
@SessionAttributes("user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping("/user")
    public String user(Model model) throws Exception {
        model.addAttribute("users", userRepository.findByIsActive(true));
        model.addAttribute("currPage", "user");
        return "user/index";
    }

    @RequestMapping("user/create")
    public String createUser(Model model, SessionStatus status) throws Exception {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleRepository.findByIsActive(true));
        model.addAttribute("superordinates", userRepository.findByIsActive(true));
        model.addAttribute("currPage", "user");
        return "user/create";
    }

    @RequestMapping(value = "user/save", method = RequestMethod.POST)
    public String saveUser(RedirectAttributes model,
                           @ModelAttribute User user,
                           @RequestParam("roleId") Long roleId,
                           @RequestParam("superordinateId") Long superordinateId,
                           HttpServletRequest request,
                           SessionStatus status) {
        User superordinate = null;
        user.setIsActive(true);
        user.setRole(roleRepository.findOne(roleId));
        if (superordinateId != null) {
            superordinate = userRepository.findOne(superordinateId);
        }
        user.setSuperordinate(superordinate);
        if (superordinate != null) {
            if (!superordinateIsValid(superordinate, user)) {
                model.addFlashAttribute("user", user);
                model.addFlashAttribute("errMsg", "Superordinate is not valid.");
                return "redirect:" + request.getHeader("Referer");
            }
        }
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
        status.setComplete();
        return "redirect:/user";
    }

    @RequestMapping("user/edit/{id}")
    public String editUser(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("user", userRepository.findOne(id));
        model.addAttribute("roles", roleRepository.findByIsActive(true));
        model.addAttribute("superordinates", userRepository.findByIsActive(true));
        model.addAttribute("currPage", "user");
        return "user/edit";
    }

    @RequestMapping(value = "user/delete/{id}")
    public String deleteUser(@PathVariable(value = "id") Long id) {
        User user = userRepository.findOne(id);
        user.setIsActive(false);
        userRepository.save(user);
        return "redirect:/user";
    }

    private String hashPassword(String password) {
        String salt = BCrypt.gensalt();
        String encrypted = BCrypt.hashpw(password, salt);
        return encrypted;
    }

    private Boolean superordinateIsValid(User superordinate, User user) {
        Boolean isValid = true;
        while (superordinate != null) {
            if (superordinate.getId() == user.getId()) {
                isValid = false;
                break;
            }
            superordinate = superordinate.getSuperordinate();
        }
        return isValid;
    }

}
