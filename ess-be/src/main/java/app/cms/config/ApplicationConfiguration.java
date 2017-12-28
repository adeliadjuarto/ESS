package app.cms.config;

import app.cms.model.ChatState;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by adeliadjuarto on 12/15/17.
 */
@Configuration
public class ApplicationConfiguration {
    @Bean
    public ChatState chatState(){
        return new ChatState();
    }
}
