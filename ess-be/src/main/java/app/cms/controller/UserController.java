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
    public String createUser(Model model) throws Exception {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleRepository.findAll());
        model.addAttribute("currPage", "user");
        return "user/create";
    }

    @RequestMapping(value = "user/save", method = RequestMethod.POST)
    public String saveUser(@ModelAttribute User user,
                           @RequestParam("roleId") Long roleId,
                           SessionStatus status) {
        user.setIsActive(true);
        user.setRole(roleRepository.findOne(roleId));
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
        status.setComplete();
        return "redirect:/user";
    }

    @RequestMapping("user/edit/{id}")
    public String editUser(Model model, @PathVariable(value = "id") Long id) throws Exception {
        model.addAttribute("user", userRepository.findOne(id));
        model.addAttribute("roles", roleRepository.findAll());
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

}
