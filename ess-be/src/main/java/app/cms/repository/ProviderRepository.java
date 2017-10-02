package app.cms.repository;

import app.cms.model.InsuranceType;
import app.cms.model.Provider;
import app.cms.model.ProviderType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    public Page<Provider> findByCityAndProviderTypeAndInsuranceType(String city,
                                                                    ProviderType providerType,
                                                                    InsuranceType insuranceType,
                                                                    Pageable pageable);

    public Page<Provider> findByCityAndProviderType(String city, ProviderType providerType, Pageable pageable);

    public Page<Provider> findByCityAndInsuranceType(String city, InsuranceType insuranceType, Pageable pageable);

    public Page<Provider> findByCity(String city, Pageable pageable);

    @Query(value = "SELECT DISTINCT city FROM Provider order by city asc")
    public List<String> getCityLists();
}
