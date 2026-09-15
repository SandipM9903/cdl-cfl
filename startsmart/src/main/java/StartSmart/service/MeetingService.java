package StartSmart.service;

import StartSmart.dto.CflContactInfoResponse;
import StartSmart.dto.MeetingCreateRequest;
import StartSmart.dto.MeetingResponse;

import java.util.List;

public interface MeetingService {
    CflContactInfoResponse getCflContacts(Long cflEmpId);
    List<MeetingResponse> getUpcomingMeetings(Long cflEmpId);
    List<MeetingResponse> getHistoryMeetings(Long cflEmpId);
    MeetingResponse scheduleMeeting(MeetingCreateRequest request);
    MeetingResponse updateMeetingStatus(Long meetingId, String status);
}
