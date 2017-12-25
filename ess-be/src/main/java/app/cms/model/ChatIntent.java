package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

/**
 * Created by willemchua on 12/22/17.
 */
@Getter
@Setter
public class ChatIntent {

    public String text;
    public ArrayList<ChatEntity> entities;
    public Intent intent;
    public ArrayList<Intent> intent_ranking;

    public ChatIntent() {
    }
}
