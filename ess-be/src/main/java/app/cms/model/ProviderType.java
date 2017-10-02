package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
@Entity
@Table(name = "provider_types")
@Setter
@Getter
public class ProviderType extends BaseEntity {
    public ProviderType() {
    }

    public ProviderType(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
