package app.cms.handler;

import app.cms.model.User;
import app.cms.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by adeliadjuarto on 11/7/17.
 */
@Service
public class AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private static final String JSON_TYPE = "application/json";
    @Autowired
    private AuthenticationService authService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException,
            ServletException {
        String source = request.getParameter("source");
        if (source != null && source.equalsIgnoreCase("cms")) {
            getRedirectStrategy().sendRedirect(request, response, "/");
        } else {
            User user = authService.getCurrentUser();
            response.setContentType(JSON_TYPE);
            ObjectMapper mapper = new ObjectMapper();
            String jsonInString = mapper.writeValueAsString(user);
            response.getWriter().print(jsonInString);
            response.getWriter().flush();
            response.getWriter().close();
        }
    }
}
