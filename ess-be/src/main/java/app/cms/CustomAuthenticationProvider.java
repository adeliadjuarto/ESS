package app.cms;

import app.cms.model.User;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by adeliadjuarto on 10/4/17.
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication)
    throws AuthenticationException {
        Boolean authSuccessful = false;
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        User user = userRepository.findByUsernameAndIsActive(name, true);
        if (user != null) {
            if (BCrypt.checkpw(password, user.getPassword())) {
                authSuccessful = true;
            }
        }

        if (authSuccessful) {
            return new UsernamePasswordAuthenticationToken(
            name, user.getPassword(), new ArrayList<>());
        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(
        UsernamePasswordAuthenticationToken.class);
    }

}
