package app.cms.service;

import app.cms.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Created by adeliadjuarto on 11/7/17.
 */
@Service
public class AuthenticationService {
    public User getCurrentUser () {
        return (User) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
    }
}
