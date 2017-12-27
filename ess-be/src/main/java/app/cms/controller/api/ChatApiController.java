package app.cms.controller.api;

import app.cms.model.Chat;
import app.cms.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by willemchua on 11/13/17.
 */
@RestController
public class ChatApiController {

    @Autowired
    private ChatService chatService;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/chat")
    public Chat getChat(
            @RequestParam("m") String message
    ) throws Exception {
        return chatService.chat(message);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/chat/save-attachment", method = RequestMethod.POST)
    public Chat saveRequestAttachment(
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        return chatService.saveAttachment(file);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/chat/new")
    public Chat getNewChat() throws Exception {
        return chatService.newChat();
    }
}
