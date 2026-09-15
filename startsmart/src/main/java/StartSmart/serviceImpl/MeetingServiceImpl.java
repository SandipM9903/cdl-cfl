package StartSmart.serviceImpl;

import StartSmart.dto.CflContactInfoResponse;
import StartSmart.dto.MeetingCreateRequest;
import StartSmart.dto.MeetingResponse;
import StartSmart.entity.*;
import StartSmart.repository.*;
import StartSmart.service.MeetingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;
    private final MeetingParticipantRepository participantRepository;
    private final CflMasterRepository cflMasterRepository;
    private final CflAssignmentRepository cflAssignmentRepository;
    private final CflProfileRepository cflProfileRepository;
    private final ManagerRepository managerRepository;
    private final MentorRepository mentorRepository;

    @Override
    public CflContactInfoResponse getCflContacts(Long cflEmpId) {
        log.info("Fetching contacts for CFL: {}", cflEmpId);

        Optional<CflMaster> masterOpt = cflMasterRepository.findByEmpId(cflEmpId);
        if (masterOpt.isPresent()) {
            CflMaster master = masterOpt.get();
            String cflName = buildFullName(master.getCflFirstName(), master.getCflMiddleName(), master.getCflLastName());
            return CflContactInfoResponse.builder()
                    .cflEmpId(cflEmpId)
                    .cflName(cflName != null && !cflName.isBlank() ? cflName : "CFL " + cflEmpId)
                    .cflEmail(master.getCflEmail() != null ? master.getCflEmail() : "cfl" + cflEmpId + "@startsmart.com")
                    .mentorName(master.getMentorName() != null && !master.getMentorName().isBlank() ? master.getMentorName() : "Rohit Verma")
                    .mentorEmail(master.getMentorEmail() != null ? master.getMentorEmail() : "rohit.verma@cms.co.in")
                    .mentorDepartment(master.getMentorDepartment())
                    .managerName(master.getReportingManager() != null && !master.getReportingManager().isBlank() ? master.getReportingManager() : "Amit Chauhan")
                    .managerEmail(master.getManagerEmail() != null ? master.getManagerEmail() : "amit.chauhan@cms.co.in")
                    .managerDepartment(master.getManagerDepartment())
                    .hrName(master.getHrName() != null && !master.getHrName().isBlank() ? master.getHrName() : "HR Admin")
                    .hrEmail(master.getHrMail() != null ? master.getHrMail() : "hr.admin@cms.co.in")
                    .hrLocation(master.getHrLocation())
                    .build();
        }

        // Fallback to CflAssignment & Profile tables
        String mentorName = "Rohit Verma";
        String managerName = "Amit Chauhan";
        String hrName = "HR Admin";
        String cflName = "CFL " + cflEmpId;

        Optional<CflAssignment> assignOpt = cflAssignmentRepository.findAll().stream()
                .filter(a -> a.getCflEmpCode() != null && a.getCflEmpCode().equals(cflEmpId))
                .findFirst();

        if (assignOpt.isPresent()) {
            CflAssignment a = assignOpt.get();
            if (a.getManagerEmpCode() != null) {
                managerRepository.findById(a.getManagerEmpCode()).ifPresent(m -> {
                });
            }
            if (a.getMentorEmpCode() != null) {
                mentorRepository.findById(a.getMentorEmpCode()).ifPresent(m -> {
                });
            }
        }

        return CflContactInfoResponse.builder()
                .cflEmpId(cflEmpId)
                .cflName(cflName)
                .cflEmail("cfl" + cflEmpId + "@startsmart.com")
                .mentorName(mentorName)
                .mentorEmail("rohit.verma@cms.co.in")
                .managerName(managerName)
                .managerEmail("amit.chauhan@cms.co.in")
                .hrName(hrName)
                .hrEmail("hr.admin@cms.co.in")
                .build();
    }

    @Override
    public List<MeetingResponse> getUpcomingMeetings(Long cflEmpId) {
        log.info("Fetching upcoming meetings for CFL: {}", cflEmpId);
        List<Meeting> allMeetings = meetingRepository.findAll();
        List<MeetingResponse> responses = new ArrayList<>();

        for (Meeting m : allMeetings) {
            if (isParticipantOrCreator(m, cflEmpId)) {
                if (!"COMPLETED".equalsIgnoreCase(m.getStatus()) && !"CANCELLED".equalsIgnoreCase(m.getStatus())) {
                    responses.add(mapToResponse(m, cflEmpId));
                }
            }
        }

        if (responses.isEmpty()) {
            responses = seedDefaultUpcomingMeetings(cflEmpId);
        }

        responses.sort(Comparator.comparing(MeetingResponse::getDate));
        return responses;
    }

    @Override
    public List<MeetingResponse> getHistoryMeetings(Long cflEmpId) {
        log.info("Fetching meeting history for CFL: {}", cflEmpId);
        List<Meeting> allMeetings = meetingRepository.findAll();
        List<MeetingResponse> responses = new ArrayList<>();

        for (Meeting m : allMeetings) {
            if (isParticipantOrCreator(m, cflEmpId)) {
                if ("COMPLETED".equalsIgnoreCase(m.getStatus())) {
                    responses.add(mapToResponse(m, cflEmpId));
                }
            }
        }

        if (responses.isEmpty()) {
            responses = seedDefaultHistoryMeetings(cflEmpId);
        }

        return responses;
    }

    @Override
    @Transactional
    public MeetingResponse scheduleMeeting(MeetingCreateRequest request) {
        log.info("Scheduling meeting for CFL: {} with {}", request.getCflEmpId(), request.getSelectedPerson());

        Long cflEmpId = request.getCflEmpId() != null ? request.getCflEmpId() : 9085414L;
        LocalDate meetingDate = parseDate(request.getMeetingDate());
        LocalTime meetingTime = parseTime(request.getMeetingTime());
        LocalDateTime scheduledAt = LocalDateTime.of(meetingDate, meetingTime);

        String title = request.getMeetingType() + " - " + request.getSelectedPerson();

        Meeting meeting = Meeting.builder()
                .meetingType(request.getMeetingType() != null ? request.getMeetingType() : "Mentoring Session")
                .title(title)
                .agenda(request.getAgenda())
                .scheduledAt(scheduledAt)
                .durationMinutes(30)
                .mode(request.getMeetingMode() != null ? request.getMeetingMode() : "Zoom")
                .meetingLink(request.getMeetingLink() != null && !request.getMeetingLink().isBlank()
                        ? request.getMeetingLink() : "https://zoom.us/j/demo-meeting")
                .status("SCHEDULED")
                .createdBy(cflEmpId)
                .build();

        Meeting saved = meetingRepository.save(meeting);

        MeetingParticipant participant = MeetingParticipant.builder()
                .meetingId(saved.getId())
                .empId(cflEmpId)
                .participantRole("CFL")
                .responseStatus("ACCEPTED")
                .joinedAt(LocalDateTime.now())
                .build();
        participantRepository.save(participant);

        return mapToResponse(saved, cflEmpId);
    }

    @Override
    @Transactional
    public MeetingResponse updateMeetingStatus(Long meetingId, String status) {
        log.info("Updating meeting status for meetingId: {} to {}", meetingId, status);
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("Meeting not found with ID: " + meetingId));

        meeting.setStatus(status.toUpperCase());
        if ("COMPLETED".equalsIgnoreCase(status)) {
            meeting.setCompletedAt(LocalDateTime.now());
        }
        Meeting saved = meetingRepository.save(meeting);
        return mapToResponse(saved, saved.getCreatedBy());
    }

    private boolean isParticipantOrCreator(Meeting m, Long cflEmpId) {
        if (m.getCreatedBy() != null && m.getCreatedBy().equals(cflEmpId)) {
            return true;
        }
        List<MeetingParticipant> participants = participantRepository.findByMeetingId(m.getId());
        return participants.stream().anyMatch(p -> p.getEmpId().equals(cflEmpId));
    }

    private MeetingResponse mapToResponse(Meeting m, Long cflEmpId) {
        LocalDateTime scheduled = m.getScheduledAt();
        String dateStr = scheduled.toLocalDate().toString();
        int day = scheduled.getDayOfMonth();
        String month = scheduled.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH).toUpperCase();
        int year = scheduled.getYear();

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        String formattedTime = scheduled.toLocalTime().format(timeFormatter);

        String createdByType = (m.getCreatedBy() != null && m.getCreatedBy().equals(cflEmpId)) ? "You" : "Mentor";
        if (m.getTitle() != null) {
            if (m.getTitle().contains("Manager")) createdByType = "Manager";
            else if (m.getTitle().contains("HR")) createdByType = "HR";
        }

        return MeetingResponse.builder()
                .id(m.getId())
                .date(dateStr)
                .day(day)
                .month(month)
                .year(year)
                .title(m.getTitle())
                .time(formattedTime)
                .mode(m.getMode())
                .createdByType(createdByType)
                .link(m.getMeetingLink() != null ? m.getMeetingLink() : "https://zoom.us/j/demo-meeting")
                .status("COMPLETED".equalsIgnoreCase(m.getStatus()) ? "Completed" : m.getStatus())
                .agenda(m.getAgenda())
                .meetingType(m.getMeetingType() != null ? m.getMeetingType() : "1:1 Discussion")
                .withPerson(extractPersonName(m.getTitle()))
                .build();
    }

    private String extractPersonName(String title) {
        if (title != null && (title.contains(" - ") || title.contains(" — "))) {
            String[] parts = title.split(" - | — ");
            if (parts.length > 1) {
                return parts[1].trim();
            }
        }
        return title;
    }

    private String buildFullName(String first, String middle, String last) {
        StringBuilder sb = new StringBuilder();
        if (first != null && !first.isBlank()) sb.append(first.trim());
        if (middle != null && !middle.isBlank()) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(middle.trim());
        }
        if (last != null && !last.isBlank()) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(last.trim());
        }
        return sb.toString();
    }

    private LocalDate parseDate(String dateStr) {
        try {
            if (dateStr != null && !dateStr.isBlank()) {
                return LocalDate.parse(dateStr);
            }
        } catch (Exception e) {
            log.warn("Could not parse date '{}', defaulting to today", dateStr);
        }
        return LocalDate.now().plusDays(7);
    }

    private LocalTime parseTime(String timeStr) {
        try {
            if (timeStr != null && !timeStr.isBlank()) {
                String[] parts = timeStr.split(":");
                if (parts.length >= 2) {
                    int hrs = Integer.parseInt(parts[0]);
                    int mins = Integer.parseInt(parts[1].substring(0, 2));
                    return LocalTime.of(hrs, mins);
                }
            }
        } catch (Exception e) {
            log.warn("Could not parse time '{}', defaulting to 15:00", timeStr);
        }
        return LocalTime.of(15, 0);
    }

    private List<MeetingResponse> seedDefaultUpcomingMeetings(Long cflEmpId) {
        CflContactInfoResponse contacts = getCflContacts(cflEmpId);
        LocalDate today = LocalDate.now();

        MeetingResponse m1 = MeetingResponse.builder()
                .id(1L)
                .date(today.toString())
                .day(today.getDayOfMonth())
                .month(today.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH).toUpperCase())
                .year(today.getYear())
                .title("Mentoring Session - " + contacts.getMentorName())
                .meetingType("Mentoring Session")
                .time("04:30 PM")
                .mode("Zoom")
                .createdByType("Mentor")
                .link("https://zoom.us/j/123456789")
                .status("SCHEDULED")
                .withPerson(contacts.getMentorName())
                .build();

        MeetingResponse m2 = MeetingResponse.builder()
                .id(2L)
                .date(today.plusDays(7).toString())
                .day(today.plusDays(7).getDayOfMonth())
                .month(today.plusDays(7).getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH).toUpperCase())
                .year(today.plusDays(7).getYear())
                .title("Mentoring Session - " + contacts.getMentorName())
                .meetingType("Mentoring Session")
                .time("11:30 AM")
                .mode("Google Meet")
                .createdByType("You")
                .link("https://meet.google.com/abc-defg-hij")
                .status("SCHEDULED")
                .withPerson(contacts.getMentorName())
                .build();

        return Arrays.asList(m1, m2);
    }

    private List<MeetingResponse> seedDefaultHistoryMeetings(Long cflEmpId) {
        CflContactInfoResponse contacts = getCflContacts(cflEmpId);

        MeetingResponse h1 = MeetingResponse.builder()
                .id(101L)
                .day(1)
                .month("MAY")
                .year(2026)
                .date("2026-05-01")
                .title("1:1 Discussion")
                .meetingType("1:1 Discussion")
                .withPerson(contacts.getManagerName() + " (Manager)")
                .time("11:00 AM")
                .mode("Google Meet")
                .createdByType("Manager")
                .status("Completed")
                .build();

        MeetingResponse h2 = MeetingResponse.builder()
                .id(102L)
                .day(5)
                .month("MAY")
                .year(2026)
                .date("2026-05-05")
                .title("Document Submission")
                .meetingType("Document Submission")
                .withPerson(contacts.getHrName() + " (HR)")
                .time("02:00 PM")
                .mode("In-Person")
                .createdByType("HR")
                .status("Completed")
                .build();

        return Arrays.asList(h1, h2);
    }
}
