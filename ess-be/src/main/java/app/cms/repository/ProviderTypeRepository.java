package app.cms.repository;

import app.cms.model.ProviderType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by adeliadjuarto on 7/5/17.
 */
public interface ProviderTypeRepository extends JpaRepository<ProviderType, Long> {
    public ProviderType findFirstByName(String name);

    public List<ProviderType> findByOrderByNameAsc();
}
