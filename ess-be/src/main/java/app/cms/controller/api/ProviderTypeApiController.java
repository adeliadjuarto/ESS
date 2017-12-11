package app.cms.controller.api;

import app.cms.model.ProviderType;
import app.cms.repository.ProviderTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by adeliadjuarto on 7/14/17.
 */
@RestController
public class ProviderTypeApiController {
    @Autowired
    private ProviderTypeRepository providerTypeRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/provider-types")
    public Iterable<ProviderType> getProviderTypes() throws Exception {
        return providerTypeRepository.findByIsActiveOrderByNameAsc(true);
    }
}
