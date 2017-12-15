package app.cms.service;

import app.cms.controller.api.LeaveRequestApiController;
import app.cms.controller.api.OvertimeRequestApiController;
import app.cms.controller.api.PayrollApiController;
import app.cms.controller.api.ReimbursementRequestApiController;
import app.cms.model.*;
import app.cms.repository.LeaveRequestRepository;
import app.cms.repository.RequestSessionRepository;
import app.cms.repository.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static app.cms.commons.MenuConstants.*;
import static org.springframework.util.StringUtils.isEmpty;

/**
 * Created by willemchua on 11/13/17.
 */
@Service
public class ChatService {

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

    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private RequestSessionRepository requestSessionRepository;

    @Autowired
    private ChatState chatState;

    public Chat chat(String message) throws Exception {
        String menu;
        String currentState = chatState.getState();
        if(isEmpty(currentState) || message.equals(HOME)) {
            menu = message;
        } else {
            menu = currentState;
        }
        switch(menu) {
            case REQUEST:
                return chatRequest();
            case STATUS:
                return chatStatus();
            case REQUEST_LEAVE:
                return chatRequestLeave(message);
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

    private Chat chatRequestLeave(String input) {
        if (!chatState.getState().equals(REQUEST_LEAVE)) {
            chatState.setIsInitiation(true);
        } else {
            chatState.setIsInitiation(false);
        }
        Boolean isValid = true;
        String message = "Data lengkap, pengajuan sudah dibuat!";
        String type = "leave";
        List<String> neededFields = LEAVE_REQUEST_FIELDS;

        User user = authService.getCurrentUser();
        RequestSession requestSession = requestSessionRepository
                .findFirstByUserAndType(user, type);
        if (requestSession == null) {
            requestSession = new RequestSession(user, type);
            message = "Request session created";
        } else {
            if (!chatState.getIsInitiation()) {
                requestSession.addData(chatState.getField(), input);
            }
            for (String field : neededFields) {
                String value = requestSession.getValue(field);
                if (isEmpty(value)) {
                    message = "Tolong masukkan " + field;
                    isValid = false;
                    chatState.setField(field);
                    break;
                }
            }
        }

        requestSessionRepository.save(requestSession);

        if (isValid) {
            //save data to repository & delete this request session
            String title = requestSession.getValue("judul");
            String description = requestSession.getValue("keterangan");
            Long start = Long.parseLong(requestSession.getValue("tanggal mulai"));
            Long end = Long.parseLong(requestSession.getValue("tanggal selesai"));

            RequestType requestType = requestTypeRepository.findOne(
                    Long.parseLong(requestSession.getValue("jenis pengajuan cuti"))
            );
            LeaveRequest leaveRequest = new LeaveRequest(
                    title, description, start, end, requestType, user);
            leaveRequestRepository.save(leaveRequest);
            requestSessionRepository.delete(requestSession);
            resetChatState();
        }

        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);


        chatState.setState(REQUEST_LEAVE);
        return new Chat(messages, buttons);
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
        resetChatState();
        return new Chat(messages, buttons);
    }

    private void resetChatState() {
        chatState.setState("");
        chatState.setField("");
        chatState.setIsInitiation(true);
    }
}
