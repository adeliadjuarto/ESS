package app.cms.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
@Entity
@Table(name = "providers")
@Setter
@Getter
public class Provider extends BaseEntity {
    public Provider() {
    }

    public Provider(String city, String name, String bpjs, String address, String telephone, String fax, ProviderType providerType, ServiceType serviceType, InsuranceType insuranceType) {
        this.city = city.toUpperCase();
        this.name = name;
        this.bpjs = bpjs;
        this.address = address;
        this.telephone = telephone;
        this.fax = fax;
        this.providerType = providerType;
        this.serviceType = serviceType;
        this.insuranceType = insuranceType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String name;
    private String bpjs;
    private String address;
    private String telephone;
    private String fax;
    @ManyToOne
    @JoinColumn(name = "provider_type_id", referencedColumnName = "id")
    private ProviderType providerType;
    @ManyToOne
    @JoinColumn(name = "service_type_id", referencedColumnName = "id")
    private ServiceType serviceType;
    @ManyToOne
    @JoinColumn(name = "insurance_type_id", referencedColumnName = "id")
    private InsuranceType insuranceType;
}
