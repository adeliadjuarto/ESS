package app.cms.model;

import org.springframework.data.auditing.DateTimeProvider;

import java.util.Calendar;

public class AuditingDateTimeProvider implements DateTimeProvider {

    @Override
    public Calendar getNow() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        return calendar;
    }
}