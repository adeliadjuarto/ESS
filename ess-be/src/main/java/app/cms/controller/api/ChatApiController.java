package app.cms.controller.api;

import app.cms.model.Chat;
import app.cms.model.Document;
import app.cms.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by willemchua on 11/13/17.
 */
@RestController
public class ChatApiController {

    @Autowired
    private ChatService chatService;

    @RequestMapping("/chat")
    public Chat getChat(
            @RequestParam("m") String message
    ) throws Exception {
        return chatService.chat(message);
    }

    @RequestMapping("/chat/new")
    public Chat getNewChat() throws Exception {
        return chatService.newChat();
    }

}
