package app.cms.service;

import app.cms.controller.api.LeaveRequestApiController;
import app.cms.controller.api.OvertimeRequestApiController;
import app.cms.controller.api.PayrollApiController;
import app.cms.controller.api.ReimbursementRequestApiController;
import app.cms.model.*;
import app.cms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static app.cms.commons.MenuConstants.*;
import static app.cms.commons.IntentConstants.*;
import static org.springframework.util.StringUtils.isEmpty;

/**
 * Created by willemchua on 11/13/17.
 */
@Service
public class ChatService {

    @Value("${file-directory-path}")
    private String directoryPath;
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
    private OvertimeRequestRepository overtimeRequestRepository;
    @Autowired
    private ReimbursementRequestRepository reimbursementRequestRepository;
    @Autowired
    private LeaveRequestAttachmentRepository leaveRequestAttachmentRepository;
    @Autowired
    private OvertimeRequestAttachmentRepository overtimeRequestAttachmentRepository;
    @Autowired
    private ReimbursementRequestAttachmentRepository reimbursementRequestAttachmentRepository;
    @Autowired
    private RequestSessionRepository requestSessionRepository;
    @Autowired
    private ChatState chatState;

    private final static String RASA_URL = "http://localhost:5000/parse?q=";

    public Chat chat(String message) throws Exception {
        String menu;
        String currentState = chatState.getState();
        if(isEmpty(currentState) || message.equals(HOME)) {
            menu = message;
        } else {
            menu = currentState;
        }
        if(!menu.equals(currentState) && !MenuConstants.contains(menu)) {
            return chatNonPredefined(message);
        }
        switch(menu) {
            case REQUEST:
                return chatRequest();
            case STATUS:
                return chatStatus();
            case REQUEST_LEAVE:
                return chatRequestLeave(message);
            case REQUEST_OVERTIME:
                return chatRequestOvertime(message);
            case REQUEST_REIMBURSEMENT:
                return chatRequestReimbursement(message);
            case LEAVE_BALANCE:
                return chatLeaveBalance();
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
        String message = "Tolong lampirkan dokumen";
        String type = "leave";
        List<String> neededFields = LEAVE_REQUEST_FIELDS;

        User user = authService.getCurrentUser();
        RequestSession requestSession = requestSessionRepository
                .findFirstByUserAndType(user, type);
        if (requestSession == null) {
            requestSession = new RequestSession(user, type);
            message = "Request session created";
            isValid = false;
        }
        if (!chatState.getIsInitiation()) {
            requestSession.addData(chatState.getField(), input);
        }
        for (String field : neededFields) {
            String value = requestSession.getValue(field);
            if (isEmpty(value)) {
                message = "Tolong masukkan " + field;
                if (field.equals("tanggal mulai") || field.equals("tanggal selesai")) {
                    message += " (Format: dd mmm yyyy (22 Des 2017) atau dd MMM yyyy (22 Desember 2017))";
                }
                isValid = false;
                chatState.setField(field);
                break;
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
            leaveRequest = leaveRequestRepository.save(leaveRequest);
            requestSessionRepository.delete(requestSession);
            chatState.setRequestId(leaveRequest.getId());
            chatState.setField("dokumen");
        }

        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);


        chatState.setState(REQUEST_LEAVE);
        return new Chat(messages, buttons);
    }

    private Chat chatRequestOvertime(String input) {
        if (!chatState.getState().equals(REQUEST_OVERTIME)) {
            chatState.setIsInitiation(true);
        } else {
            chatState.setIsInitiation(false);
        }
        Boolean isValid = true;
        String message = "Tolong lampirkan dokumen";
        String type = "overtime";
        List<String> neededFields = OVERTIME_REQUEST_FIELDS;

        User user = authService.getCurrentUser();
        RequestSession requestSession = requestSessionRepository
                .findFirstByUserAndType(user, type);
        if (requestSession == null) {
            requestSession = new RequestSession(user, type);
            isValid = false;
        }
        if (!chatState.getIsInitiation()) {
            requestSession.addData(chatState.getField(), input);
        }
        for (String field : neededFields) {
            String value = requestSession.getValue(field);
            if (isEmpty(value)) {
                message = "Tolong masukkan " + field;
                if (field.equals("tanggal")) {
                    message += " (Format: dd mmm yyyy (22 Des 2017) atau dd MMM yyyy (22 Desember 2017))";
                } else if (field.equals("jam mulai") || field.equals("jam selesai")) {
                    message += " (Format: hh:mm (12:30))";
                }
                isValid = false;
                chatState.setField(field);
                break;
            }
        }

        requestSessionRepository.save(requestSession);

        if (isValid) {
            //save data to repository & delete this request session
            String title = requestSession.getValue("judul");
            String description = requestSession.getValue("keterangan");
            Long eventDate = Long.parseLong(requestSession.getValue("tanggal"));
            Long start = Long.parseLong(requestSession.getValue("jam mulai"));
            Long end = Long.parseLong(requestSession.getValue("jam selesai"));

            OvertimeRequest overtimeRequest = new OvertimeRequest(
                    title, description, eventDate, start, end, user);
            overtimeRequestRepository.save(overtimeRequest);
            requestSessionRepository.delete(requestSession);
            chatState.setRequestId(overtimeRequest.getId());
            chatState.setField("dokumen");
        }

        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);

        chatState.setState(REQUEST_OVERTIME);
        return new Chat(messages, buttons);
    }

    private Chat chatRequestReimbursement(String input) {
        if (!chatState.getState().equals(REQUEST_REIMBURSEMENT)) {
            chatState.setIsInitiation(true);
        } else {
            chatState.setIsInitiation(false);
        }
        Boolean isValid = true;
        String message = "Tolong lampirkan dokumen";
        String type = "reimbursement";
        List<String> neededFields = REIMBURSEMENT_REQUEST_FIELDS;

        User user = authService.getCurrentUser();
        RequestSession requestSession = requestSessionRepository
                .findFirstByUserAndType(user, type);
        if (requestSession == null) {
            requestSession = new RequestSession(user, type);
            isValid = false;
        }
        if (!chatState.getIsInitiation()) {
            requestSession.addData(chatState.getField(), input);
        }
        for (String field : neededFields) {
            String value = requestSession.getValue(field);
            if (isEmpty(value)) {
                message = "Tolong masukkan " + field;
                if (field.equals("tanggal")) {
                    message += " (Format: dd mmm yyyy (22 Des 2017) atau dd MMM yyyy (22 Desember 2017))";
                }
                isValid = false;
                chatState.setField(field);
                break;
            }
        }

        requestSessionRepository.save(requestSession);

        if (isValid) {
            //save data to repository & delete this request session
            String title = requestSession.getValue("judul");
            String description = requestSession.getValue("keterangan");
            Long eventDate = Long.parseLong(requestSession.getValue("tanggal"));
            Long amount = Long.parseLong(requestSession.getValue("jumlah"));

            RequestType requestType = requestTypeRepository.findOne(
                    Long.parseLong(requestSession.getValue("jenis pengajuan reimbursement"))
            );
            ReimbursementRequest reimbursementRequest = new ReimbursementRequest(
                    title, description, eventDate, amount, requestType, user);
            reimbursementRequestRepository.save(reimbursementRequest);
            requestSessionRepository.delete(requestSession);
            chatState.setRequestId(reimbursementRequest.getId());
            chatState.setField("dokumen");
        }

        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(HOME);

        chatState.setState(REQUEST_REIMBURSEMENT);
        return new Chat(messages, buttons);
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

    private Chat chatNonPredefined(String message) throws Exception{
        RestTemplate restTemplate = new RestTemplate();
        String url = RASA_URL.concat(message);
        ChatIntent intentResult = restTemplate.getForObject(url, ChatIntent.class);
        System.out.println(intentResult.intent.getName());
        switch(intentResult.intent.getName()) {
            case LEAVE_BALANCE_REQUEST:
                return chatLeaveBalance();
            case LEAVE_REQUEST:
                return chat(REQUEST_LEAVE);
            default:
                return new Chat();
        }
    }

    public Chat newChat() {
        String message = "Selamat datang di chatbot HR. Tekan tombol di bawah untuk " +
                         "mengajukan permintaan atau ketik pesan anda secara langsung" +
                         " untuk dijawab langsung oleh bot HR";
        List<String> messages = Arrays.asList(message);
        List<String> buttons = Arrays.asList(
                REQUEST,
                STATUS,
                LEAVE_BALANCE
        );
        String currentState = chatState.getState();
        System.out.println("Current state: "+currentState);
        if (!isEmpty(currentState)) {
            User user = authService.getCurrentUser();
            String type = "";
            if (currentState.equals(REQUEST_LEAVE)) {
                type = "leave";
            } else if (currentState.equals(REQUEST_OVERTIME)) {
                type = "overtime";
            } else if (currentState.equals(REQUEST_REIMBURSEMENT)) {
                type = "reimbursement";
            }
            RequestSession requestSession = requestSessionRepository.findFirstByUserAndType(user, type);
            requestSessionRepository.delete(requestSession);
        }

        resetChatState();
        return new Chat(messages, buttons);
    }

    public Chat saveAttachment(MultipartFile file) {
        String message = "Dokumen berhasil ditambahkan";
        String successMessage = "Data lengkap, pengajuan sudah dibuat!";
        String requestId = chatState.getRequestId();

        if (chatState.getState().equals(REQUEST_LEAVE)) {
            uploadLeaveRequestAttachment(file, requestId);
        } else if (chatState.getState().equals(REQUEST_OVERTIME)) {
            uploadOvertimeRequestAttachment(file, requestId);
        } else if (chatState.getState().equals(REQUEST_REIMBURSEMENT)) {
            uploadReimbursementRequestAttachment(file, requestId);
        }

        List<String> messages = Arrays.asList(message, successMessage);
        List<String> buttons = Arrays.asList(HOME);
        resetChatState();
        return new Chat(messages, buttons);
    }

    private void uploadReimbursementRequestAttachment(MultipartFile file, String requestId) {
        ReimbursementRequest request = reimbursementRequestRepository.findOne(requestId);
        String pathName = saveFileToDirectory(file);
        ReimbursementRequestAttachment a = new ReimbursementRequestAttachment(request.getId(), pathName);
        reimbursementRequestAttachmentRepository.save(a);
    }

    private void uploadOvertimeRequestAttachment(MultipartFile file, String requestId) {
        OvertimeRequest request = overtimeRequestRepository.findOne(requestId);
        String pathName = saveFileToDirectory(file);
        OvertimeRequestAttachment a = new OvertimeRequestAttachment(request.getId(), pathName);
        overtimeRequestAttachmentRepository.save(a);
    }

    private void uploadLeaveRequestAttachment(MultipartFile file, String requestId) {
        LeaveRequest request = leaveRequestRepository.findOne(requestId);
        String pathName = saveFileToDirectory(file);
        LeaveRequestAttachment a = new LeaveRequestAttachment(request.getId(), pathName);
        leaveRequestAttachmentRepository.save(a);
    }

    private void resetChatState() {
        chatState.setState("");
        chatState.setField("");
        chatState.setIsInitiation(true);
        chatState.setRequestId("");
    }

    private String saveFileToDirectory (MultipartFile file) {
        String pathName = getPath(file.getOriginalFilename());
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(directoryPath + pathName);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pathName;
    }

    private String getPath(String fileName) {
        return "attachments/" + UUID.randomUUID().toString() + fileName;
    }
}
