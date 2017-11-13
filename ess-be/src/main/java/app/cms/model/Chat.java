package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by willemchua on 11/13/17.
 */
@Getter
@Setter
public class Chat {

    private String text;
    private String sender;
    private List<String> buttons = new ArrayList<>();
    private final static String BOT_IDENTIFIER = "bot";

    public Chat() {}

    public Chat(String text) {
        this.text = text;
        this.sender = BOT_IDENTIFIER;
    }

    public Chat(String text, List<String> buttons) {
        this.text = text;
        this.sender = BOT_IDENTIFIER;
        this.buttons = buttons;
    }
}
