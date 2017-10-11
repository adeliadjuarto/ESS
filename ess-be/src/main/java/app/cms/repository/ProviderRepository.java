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
    public Page<Provider> findByCityAndProviderTypeAndInsuranceTypeAndIsActive(String city,
                                                                    ProviderType providerType,
                                                                    InsuranceType insuranceType,
                                                                    Boolean isActive,
                                                                    Pageable pageable);
    public Page<Provider> findByCityAndProviderTypeAndIsActive(String city,
                                                               ProviderType providerType,
                                                               Boolean isActive,
                                                               Pageable pageable);
    public Page<Provider> findByCityAndInsuranceTypeAndIsActive(String city,
                                                                InsuranceType insuranceType,
                                                                Boolean isActive,
                                                                Pageable pageable);
    public Page<Provider> findByCityAndIsActive(String city, Boolean isActive, Pageable pageable);
    public List<Provider> findByIsActive(Boolean isActive);
    @Query(value = "SELECT DISTINCT city FROM Provider WHERE isActive = 1 order by city asc")
    public List<String> getCityLists();
}
