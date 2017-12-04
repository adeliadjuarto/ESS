package app.cms.service;

import app.cms.controller.api.LeaveRequestApiController;
import app.cms.controller.api.OvertimeRequestApiController;
import app.cms.controller.api.PayrollApiController;
import app.cms.controller.api.ReimbursementRequestApiController;
import app.cms.model.*;
import app.cms.repository.PayrollRepository;
import app.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static app.cms.commons.MenuConstants.*;

/**
 * Created by willemchua on 11/13/17.
 */
@Service
public class ChatService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private PayrollApiController payrollApiController;

    @Autowired
    private LeaveRequestApiController leaveRequestApiController;

    @Autowired
    private OvertimeRequestApiController overtimeRequestApiController;

    @Autowired
    private ReimbursementRequestApiController reimbursementRequestApiController;

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
                case LEAVE_STATUS:
                    return chatLeaveStatus();
                case OVERTIME_STATUS:
                    return chatOvertimeStatus();
                case REIMBURSEMENT_STATUS:
                    return chatReimbursementStatus();
                case HOME:
                    return newChat();
                default:
                    return new Chat(Arrays.asList("Menu belum dibuat"));
            }
        } else {
            return chatNonPredefined(message);
        }
    }

    private Chat chatReimbursementStatus() throws Exception {
        String message = "Berikut adalah daftar pengajuan reimbursement dan statusnya:\n";
        String status = "";
        for(ReimbursementRequest request: reimbursementRequestApiController.getRequest()) {
            String reimbursementStatus = request.getIsApproved() == null ? "Pending" : request.getIsApproved() ? "Diterima" : "Ditolak";
            status = status.concat(request.getTitle() + ": " + reimbursementStatus + "\n");
        }
        List<String> messages = Arrays.asList(message, status);
        List<String> buttons = Arrays.asList(HOME);
        return new Chat(messages, buttons);
    }

    private Chat chatOvertimeStatus() throws Exception {
        String message = "Berikut adalah daftar pengajuan lembur dan statusnya:";
        String status = "";
        for(OvertimeRequest request: overtimeRequestApiController.getRequest()) {
            String overtimeStatus = request.getIsApproved() == null ? "Pending" : request.getIsApproved() ? "Diterima" : "Ditolak";
            status = status.concat(request.getTitle() + ": " + overtimeStatus + "\n");
        }
        List<String> messages = Arrays.asList(message, status);
        List<String> buttons = Arrays.asList(HOME);
        return new Chat(messages, buttons);
    }

    private Chat chatLeaveStatus() throws Exception {
        String message = "Berikut adalah daftar pengajuan cuti dan statusnya:" + System.lineSeparator();
        String status = "";
        for(LeaveRequest request: leaveRequestApiController.getRequest()) {
            String leaveStatus = request.getIsApproved() == null ? "Pending" : request.getIsApproved() ? "Diterima" : "Ditolak";
            status = status.concat(request.getTitle() + ": " + leaveStatus + System.lineSeparator());
        }
        List<String> messages = Arrays.asList(message, status);
        List<String> buttons = Arrays.asList(HOME);
        return new Chat(messages, buttons);
    }

    private Chat chatRequest() {
        String message = "Silahkan pilih tipe request yang ingin diajukan";
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(
                REQUEST_LEAVE,
                REQUEST_OVERTIME,
                REQUEST_REIMBURSEMENT
        );
        return new Chat(messages, buttons);
    }

    private Chat chatStatus() {
        String message = "Silahkan pilih tipe status yang ingin dilihat";
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(
                PAYROLL_STATUS,
                LEAVE_STATUS,
                OVERTIME_STATUS,
                REIMBURSEMENT_STATUS
        );
        return new Chat(messages, buttons);
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
        User user = authService.getCurrentUser();
        Integer leaveBalance = user.getAnnualLeave();
        String message = "Sisa jatah cuti tahunan anda adalah " + leaveBalance + " hari.";
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);
        return new Chat(messages, buttons);
    }

    private Chat chatPayrollStatus() throws Exception {
        Payroll current = payrollApiController.getCurrentPayroll();
        String message = "Status gaji anda pada bulan " + current.getMonthName() +
                         ": " + current.getPayrollStatus();
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);
        return new Chat(messages, buttons);
    }

    private Chat chatNonPredefined(String message) {
        return new Chat(Arrays.asList(message));
    }

    public Chat newChat() {
        String message = "Selamat datang di chatbot HR. Tekan tombol di bawah untuk " +
                         "mengajukan permintaan atau ketik pesan anda secara langsung" +
                         " untuk dijawab langsung oleh bot HR";
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(
                REQUEST,
                STATUS,
                EVENTS,
                LEAVE_BALANCE
        );
        return new Chat(messages, buttons);
    }
}
