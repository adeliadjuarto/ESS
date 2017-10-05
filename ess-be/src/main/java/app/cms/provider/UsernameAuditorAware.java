package app.cms.provider;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class UsernameAuditorAware implements AuditorAware<String> {

    @Override
    public String getCurrentAuditor() {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        String username = "system";

        if (securityContext != null && securityContext.getAuthentication() != null) {
            username = securityContext.getAuthentication().getName();
        }

        return username;
    }
}
