package app.cms.controller.api;

import app.cms.model.RequestType;
import app.cms.repository.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by adeliadjuarto on 10/9/17.
 */
@RestController
public class RequestTypeApiController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @RequestMapping("/request-types")
    public Iterable<RequestType> getRequestTypes
            (@RequestParam("category") String category) throws Exception {
        return requestTypeRepository.findByIsActiveAndCategory(true, category);
    }
}
