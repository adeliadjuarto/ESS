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
import org.springframework.web.bind.annotation.*;

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

    @CrossOrigin(origins = "http://localhost:4200")
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
            return providerRepository.findByCityAndIsActive(city, true, pageable);
        } else if (providerTypeId == null && insuranceTypeId != null) {
            insuranceType = insuranceTypeRepository.findOne(insuranceTypeId);
            return providerRepository
                    .findByCityAndInsuranceTypeAndIsActive(city, insuranceType, true, pageable);
        } else if (providerTypeId != null && insuranceTypeId == null) {
            providerType = providerTypeRepository.findOne(providerTypeId);
            return providerRepository
                    .findByCityAndProviderTypeAndIsActive(city, providerType, true, pageable);
        } else {
            insuranceType = insuranceTypeRepository.findOne(insuranceTypeId);
            providerType = providerTypeRepository.findOne(providerTypeId);
            return providerRepository
                    .findByCityAndProviderTypeAndInsuranceTypeAndIsActive
                            (city, providerType, insuranceType,true, pageable);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/providers/{id}")
    public Provider findProvider(@PathVariable("id") Long id) throws Exception {
        return providerRepository.findOne(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/provider-cities")
    public Iterable<String> findProviderCities() throws Exception {
        return providerRepository.getCityLists();
    }
}