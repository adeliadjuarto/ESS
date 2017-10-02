package app.cms.controller.api;

import app.cms.model.InsuranceType;
import app.cms.repository.InsuranceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by adeliadjuarto on 7/14/17.
 */
@RestController
public class InsuranceTypeApiController {
    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;

    @RequestMapping("/insurance-types")
    public Iterable<InsuranceType> getInsuranceTypes() throws Exception {
        return insuranceTypeRepository.findByOrderByNameAsc();
    }
}
