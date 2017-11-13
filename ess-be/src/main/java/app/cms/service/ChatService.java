package app.cms.service;

import app.cms.model.Chat;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static app.cms.commons.MenuConstants.*;

/**
 * Created by willemchua on 11/13/17.
 */
@Service
public class ChatService {

    public Chat chat(String message) throws Exception {
        if(MenuConstants.contains(message)) {
            switch(message) {
                case REQUEST:
                    return chatRequest();
                case STATUS:
                    return chatStatus();
                case REQUEST_LEAVE:
                    return chatRequestLeave();
                case REQUEST_OVERTIME:
                    return chatRequestOvertime();
                case REQUEST_REIMBURSEMENT:
                    return chatRequestReimbursement();
                case EVENTS:
                    return chatEvents();
                case LEAVE_BALANCE:
                    return chatLeaveBalance();
                case PAYROLL_STATUS:
                    return chatPayrollStatus();
            }
        } else {
            return chatNonPredefined(message);
        }

        return null;
    }

    private Chat chatRequest() {
        List<String> buttons = Arrays.asList(
                REQUEST_LEAVE,
                REQUEST_OVERTIME,
                REQUEST_REIMBURSEMENT
        );
        return new Chat("Silahkan pilih tipe request yang ingin diajukan", buttons);
    }

    private Chat chatStatus() {
        return new Chat("Silahkan pilih tipe status yang ingin dilihat");
    }

    private Chat chatRequestLeave() {
        return new Chat();
    }

    private Chat chatRequestOvertime() {
        return new Chat();
    }

    private Chat chatRequestReimbursement() {
        return new Chat();
    }

    private Chat chatEvents() {
        return new Chat();
    }

    private Chat chatLeaveBalance() {
        return new Chat();
    }

    private Chat chatPayrollStatus() {
        return new Chat();
    }

    private Chat chatNonPredefined(String message) {
        return new Chat();
    }

}
