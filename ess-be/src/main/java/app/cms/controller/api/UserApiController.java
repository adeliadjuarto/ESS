package app.cms.controller.api;

import app.cms.model.User;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by adeliadjuarto on 10/5/17.
 */
@RestController
public class UserApiController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/users/current")
    public User getCurrentUser() throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getPrincipal().toString();
        System.out.println(username);
        User user = userRepository.findByUsernameAndIsActive(username, true);
        return user;
    }
}
