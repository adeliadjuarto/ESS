package app.cms.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by willemchua on 12/22/17.
 */
@Getter
@Setter
public class Intent {
    public Double confidence;
    public String name;

    public Intent() {

    }
}
