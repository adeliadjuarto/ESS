package app.cms.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by adeliadjuarto on 12/15/17.
 */
@Setter
@Getter
public class ChatState {
    public ChatState() {
        this.state = "";
    }
    private String state;
    private String field;
    private Boolean isInitiation;
    private String requestId;
}
