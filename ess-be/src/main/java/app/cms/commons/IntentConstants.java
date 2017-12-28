package app.cms.commons;

import java.util.Arrays;
import java.util.List;

/**
 * Created by willemchua on 12/22/17.
 */
public class IntentConstants {

    public static final String LEAVE_BALANCE_REQUEST = "leave_balance_request";
    public static final String LEAVE_REQUEST = "leave_request";

    public static final String GREET = "greet";

    public static final List<String> IntentConstants = Arrays.asList(
            LEAVE_BALANCE_REQUEST,
            LEAVE_REQUEST,
            GREET
    );

}
