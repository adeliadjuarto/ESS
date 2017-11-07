package app.cms.provider;

import app.cms.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class UsernameAuditorAware implements AuditorAware<String> {
    @Autowired
    private AuthenticationService authService;
    @Override
    public String getCurrentAuditor() {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        String username = "system";

        if (securityContext != null && securityContext.getAuthentication() != null) {
            username = authService.getCurrentUser().getName();
        }

        return username;
    }
}
