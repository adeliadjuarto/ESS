package app.cms.commons;

import app.cms.model.ReimbursementRequest;

import java.util.Arrays;
import java.util.List;

/**
 * Created by willemchua on 11/13/17.
 */
public class MenuConstants {

    public static final String REQUEST_LEAVE = "Pengajuan Cuti";
    public static final String REQUEST_OVERTIME = "Pengajuan Lembur";
    public static final String REQUEST_REIMBURSEMENT = "Pengajuan Reimbursement";

    public static final String LEAVE_BALANCE = "Sisa jatah cuti";
    public static final String PAYROLL_STATUS = "Status payroll";

    public static final String REQUEST = "Pengajuan request";
    public static final String STATUS = "Lihat status";
    public static final String EVENTS = "Lihat agenda hari ini";

    public static final String LEAVE_STATUS = "Status pengajuan cuti";
    public static final String OVERTIME_STATUS = "Status pengajuan lembur";
    public static final String REIMBURSEMENT_STATUS = "Status pengajuan reimbursement";

    public static final String HOME = "Kembali ke menu awal";

    public static final List<String> MenuConstants = Arrays.asList(
            REQUEST,
            STATUS,
            EVENTS,
            LEAVE_BALANCE,
            PAYROLL_STATUS,
            LEAVE_STATUS,
            REIMBURSEMENT_STATUS,
            OVERTIME_STATUS,
            REQUEST_LEAVE,
            REQUEST_OVERTIME,
            REQUEST_REIMBURSEMENT,
            HOME
    );
}
