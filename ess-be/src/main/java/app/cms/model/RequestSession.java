package app.cms.model;

import app.cms.model.shared.BaseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by adeliadjuarto on 12/15/17.
 */
@Entity
@Table(name = "request_sessions")
@Setter
@Getter
public class RequestSession extends BaseEntity {
    public RequestSession() {}
    public RequestSession(User user, String type) {
        this.type = type;
        this.user = user;
        this.data = "{}";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    private String type;
    private String data;

    public void addData(String key, String value) {
        try {
            Map<String, String> map = new ObjectMapper().readValue(data, HashMap.class);
            map.put(key, value);
            this.data = new ObjectMapper().writeValueAsString(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getValue(String key) {
        try {
            Map<String, String> map = getDataAsMap();
            return (String) map.get(key);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public Map<String, String> getDataAsMap() {
        try {
            return new ObjectMapper().readValue(data, HashMap.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Collections.EMPTY_MAP;
    }
}
