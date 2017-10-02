package app.cms.controller.api;

import app.cms.model.InsuranceType;
import app.cms.model.Provider;
import app.cms.model.ProviderType;
import app.cms.repository.InsuranceTypeRepository;
import app.cms.repository.ProviderRepository;
import app.cms.repository.ProviderTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by adeliadjuarto on 7/13/17.
 */
@RestController
public class ProviderApiController {
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProviderTypeRepository providerTypeRepository;
    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;

    @RequestMapping("/providers")
    public Page<Provider>
    searchProviders(
            @RequestParam("city") String city,
            @RequestParam(value = "provider-type", required = false) Long providerTypeId,
            @RequestParam(value = "insurance-type", required = false) Long insuranceTypeId,
            Pageable pageable
    ) throws Exception {
        city = city.toUpperCase();
        ProviderType providerType;
        InsuranceType insuranceType;
        if (providerTypeId == null && insuranceTypeId == null) {
            return providerRepository.findByCity(city, pageable);
        } else if (providerTypeId == null && insuranceTypeId != null) {
            insuranceType = insuranceTypeRepository.findOne(insuranceTypeId);
            return providerRepository.findByCityAndInsuranceType(city, insuranceType, pageable);
        } else if (providerTypeId != null && insuranceTypeId == null) {
            providerType = providerTypeRepository.findOne(providerTypeId);
            return providerRepository.findByCityAndProviderType(city, providerType, pageable);
        } else {
            insuranceType = insuranceTypeRepository.findOne(insuranceTypeId);
            providerType = providerTypeRepository.findOne(providerTypeId);
            return providerRepository.
                    findByCityAndProviderTypeAndInsuranceType(city, providerType, insuranceType, pageable);
        }
    }

    @RequestMapping("/providers/{id}")
    public Provider findProvider(@PathVariable("id") Long id) throws Exception {
        return providerRepository.findOne(id);
    }

    @RequestMapping("/provider-cities")
    public Iterable<String> findProviderCities() throws Exception {
        return providerRepository.getCityLists();
    }
}