package StartSmart.controller;

import StartSmart.dto.*;
import StartSmart.entity.*;
import StartSmart.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class GoalController {

    private final GoalStageRepository goalStageRepository;
    private final GoalCycleRepository goalCycleRepository;
    private final GoalWorkflowRepository goalWorkflowRepository;
    private final MeetingRepository meetingRepository;
    private final MeetingParticipantRepository meetingParticipantRepository;
    private final ProbationEvaluationRepository probationEvaluationRepository;
    private final CflAssignmentRepository cflAssignmentRepository;
    private final ManagerRepository managerRepository;
    private final CflProfileRepository cflProfileRepository;

    // Static fallback database cohort matching frontend
    private static final Map<Long, String> CFL_NAME_FALLBACKS = new HashMap<>();
    static {
        CFL_NAME_FALLBACKS.put(9085412L, "Manpreet Kaur");
        CFL_NAME_FALLBACKS.put(9085413L, "Amit Chauhan");
        CFL_NAME_FALLBACKS.put(9085414L, "Rohit Verma");
        CFL_NAME_FALLBACKS.put(9085415L, "Yajnadutta Mishra");
        CFL_NAME_FALLBACKS.put(9085492L, "Amulya B S");
        CFL_NAME_FALLBACKS.put(9085493L, "Gagana C");
        CFL_NAME_FALLBACKS.put(9085494L, "Manoj Kumar V");
        CFL_NAME_FALLBACKS.put(9085499L, "Manpreet Kaur");
    }

    @GetMapping("/goals/stages")
    public ResponseEntity<List<GoalStage>> getGoalStages() {
        log.info("Request to get all goal stages (quarters)");
        if (goalStageRepository.count() == 0) {
            log.info("Goal stages table is empty. Seeding default G30, G60, G90 stages.");
            goalStageRepository.save(GoalStage.builder()
                    .stageCode("G30")
                    .stageName("30 Days")
                    .sequenceNo(1)
                    .durationDays(30)
                    .active(true)
                    .build());
            goalStageRepository.save(GoalStage.builder()
                    .stageCode("G60")
                    .stageName("60 Days")
                    .sequenceNo(2)
                    .durationDays(60)
                    .active(true)
                    .build());
            goalStageRepository.save(GoalStage.builder()
                    .stageCode("G90")
                    .stageName("90 Days")
                    .sequenceNo(3)
                    .durationDays(90)
                    .active(true)
                    .build());
        }
        return ResponseEntity.ok(goalStageRepository.findAll());
    }

    @PostMapping("/goals/initiate")
    public ResponseEntity<Map<String, String>> initiateGoalSetting(@RequestBody GoalInitiateRequest request) {
        log.info("Request to initiate goal setting: stageId={}, manager={}", request.getStageId(), request.getManagerEmpCode());

        // 1. Create or Find GoalCycle for 2026
        GoalCycle cycle = goalCycleRepository.findByYearAndStatus(2026, "ACTIVE")
                .orElseGet(() -> goalCycleRepository.save(GoalCycle.builder()
                        .year(2026)
                        .cycleName("Goal Cycle 2026")
                        .startDate(LocalDate.of(2026, 1, 1))
                        .endDate(LocalDate.of(2026, 12, 31))
                        .status("ACTIVE")
                        .build()));

        // 2. Create Meeting
        Meeting meeting = Meeting.builder()
                .meetingType("GOAL_SETTING")
                .title(request.getMeetingTitle())
                .agenda(request.getMeetingAgenda())
                .scheduledAt(request.getScheduledAt() != null ? request.getScheduledAt() : LocalDateTime.now().plusDays(1))
                .durationMinutes(request.getDurationMinutes())
                .mode("ONLINE")
                .meetingLink(request.getMeetingLink() != null ? request.getMeetingLink() : "https://meet.google.com/abc-xyz")
                .status("SCHEDULED")
                .createdBy(1001L) // Mock HR User
                .build();
        meeting = meetingRepository.save(meeting);

        // 3. Save Meeting Participants
        MeetingParticipant managerPart = MeetingParticipant.builder()
                .meetingId(meeting.getId())
                .empId(request.getManagerEmpCode())
                .participantRole("MANAGER")
                .responseStatus("PENDING")
                .build();
        meetingParticipantRepository.save(managerPart);

        if (request.getCflEmpCodes() != null) {
            for (Long cflCode : request.getCflEmpCodes()) {
                MeetingParticipant cflPart = MeetingParticipant.builder()
                        .meetingId(meeting.getId())
                        .empId(cflCode)
                        .participantRole("CFL")
                        .responseStatus("PENDING")
                        .build();
                meetingParticipantRepository.save(cflPart);

                // 4. Create/Update GoalWorkflow
                GoalWorkflow workflow = goalWorkflowRepository.findByCycleIdAndStageIdAndCflEmpId(
                        cycle.getId(), request.getStageId(), cflCode)
                        .orElse(GoalWorkflow.builder()
                                .cycleId(cycle.getId())
                                .stageId(request.getStageId())
                                .cflEmpId(cflCode)
                                .hrEmpId(1001L)
                                .managerEmpId(request.getManagerEmpCode())
                                .status("MEETING_SCHEDULED")
                                .build());

                workflow.setInitialMeetingId(meeting.getId());
                workflow.setStatus("MEETING_SCHEDULED");
                goalWorkflowRepository.save(workflow);
            }
        }

        return ResponseEntity.ok(Map.of("message", "Goal setting initiated and meetings scheduled successfully"));
    }

    @GetMapping("/goals/workflows")
    public ResponseEntity<List<GoalWorkflowResponse>> getGoalWorkflows() {
        log.info("Request to get all Goal Workflows");
        List<GoalWorkflow> workflows = goalWorkflowRepository.findAll();
        List<GoalWorkflowResponse> responses = new ArrayList<>();

        for (GoalWorkflow w : workflows) {
            String cflName = cflProfileRepository.findById(w.getCflEmpId())
                    .map(CflProfile::getName)
                    .orElse(CFL_NAME_FALLBACKS.getOrDefault(w.getCflEmpId(), "CFL " + w.getCflEmpId()));

            String managerName = managerRepository.findById(w.getManagerEmpId())
                    .map(Manager::getName)
                    .orElse("Manager " + w.getManagerEmpId());

            String stageName = goalStageRepository.findById(w.getStageId())
                    .map(GoalStage::getStageName)
                    .orElse("Stage " + w.getStageId());

            String meetingLink = "—";
            LocalDateTime meetingTime = null;
            if (w.getInitialMeetingId() != null) {
                Optional<Meeting> meet = meetingRepository.findById(w.getInitialMeetingId());
                if (meet.isPresent()) {
                    meetingLink = meet.get().getMeetingLink();
                    meetingTime = meet.get().getScheduledAt();
                }
            }

            // progress fallback or random goal check
            int progress = 0;
            if ("GOALS_SUBMITTED".equalsIgnoreCase(w.getStatus()) || "APPROVED".equalsIgnoreCase(w.getStatus())) {
                progress = 100;
            } else if ("GOAL_ENABLED".equalsIgnoreCase(w.getStatus())) {
                progress = 25;
            }

            responses.add(GoalWorkflowResponse.builder()
                    .id(w.getId())
                    .cycleId(w.getCycleId())
                    .stageId(w.getStageId())
                    .stageName(stageName)
                    .cflEmpId(w.getCflEmpId())
                    .cflName(cflName)
                    .managerEmpId(w.getManagerEmpId())
                    .managerName(managerName)
                    .status(w.getStatus())
                    .meetingLink(meetingLink)
                    .meetingTime(meetingTime)
                    .goalProgress(progress)
                    .meetingCompletedAt(w.getMeetingCompletedAt())
                    .unlockedAt(w.getUnlockedAt())
                    .goalSubmittedAt(w.getGoalSubmittedAt())
                    .build());
        }

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/goals/workflows/{id}/complete-meeting")
    public ResponseEntity<Map<String, String>> completeMeeting(@PathVariable Long id) {
        log.info("Request to complete goal initiation meeting for workflow ID: {}", id);
        GoalWorkflow workflow = goalWorkflowRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workflow not found"));

        workflow.setMeetingCompletedAt(LocalDateTime.now());
        workflow.setUnlockedAt(LocalDateTime.now());
        workflow.setStatus("GOAL_ENABLED");
        goalWorkflowRepository.save(workflow);

        if (workflow.getInitialMeetingId() != null) {
            meetingRepository.findById(workflow.getInitialMeetingId()).ifPresent(m -> {
                m.setStatus("COMPLETED");
                m.setCompletedAt(LocalDateTime.now());
                meetingRepository.save(m);
            });
        }

        return ResponseEntity.ok(Map.of("message", "Meeting marked completed. Goals unlocked for CFL."));
    }

    @GetMapping("/goals/workflow/cfl/{cflEmpId}")
    public ResponseEntity<List<GoalWorkflowResponse>> getWorkflowByCfl(@PathVariable Long cflEmpId) {
        log.info("Request to get active Goal Workflows for CFL: {}", cflEmpId);
        List<GoalWorkflow> workflows = goalWorkflowRepository.findByCflEmpId(cflEmpId);
        List<GoalWorkflowResponse> responses = new ArrayList<>();

        for (GoalWorkflow w : workflows) {
            String cflName = cflProfileRepository.findById(w.getCflEmpId())
                    .map(CflProfile::getName)
                    .orElse(CFL_NAME_FALLBACKS.getOrDefault(w.getCflEmpId(), "CFL " + w.getCflEmpId()));

            String managerName = managerRepository.findById(w.getManagerEmpId())
                    .map(Manager::getName)
                    .orElse("Manager " + w.getManagerEmpId());

            String stageName = goalStageRepository.findById(w.getStageId())
                    .map(GoalStage::getStageName)
                    .orElse("Stage " + w.getStageId());

            String meetingLink = "—";
            LocalDateTime meetingTime = null;
            if (w.getInitialMeetingId() != null) {
                Optional<Meeting> meet = meetingRepository.findById(w.getInitialMeetingId());
                if (meet.isPresent()) {
                    meetingLink = meet.get().getMeetingLink();
                    meetingTime = meet.get().getScheduledAt();
                }
            }

            int progress = 0;
            if ("GOALS_SUBMITTED".equalsIgnoreCase(w.getStatus()) || "APPROVED".equalsIgnoreCase(w.getStatus())) {
                progress = 100;
            } else if ("GOAL_ENABLED".equalsIgnoreCase(w.getStatus())) {
                progress = 25;
            }

            responses.add(GoalWorkflowResponse.builder()
                    .id(w.getId())
                    .cycleId(w.getCycleId())
                    .stageId(w.getStageId())
                    .stageName(stageName)
                    .cflEmpId(w.getCflEmpId())
                    .cflName(cflName)
                    .managerEmpId(w.getManagerEmpId())
                    .managerName(managerName)
                    .status(w.getStatus())
                    .meetingLink(meetingLink)
                    .meetingTime(meetingTime)
                    .goalProgress(progress)
                    .meetingCompletedAt(w.getMeetingCompletedAt())
                    .unlockedAt(w.getUnlockedAt())
                    .goalSubmittedAt(w.getGoalSubmittedAt())
                    .build());
        }

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/probation/evaluations")
    public ResponseEntity<List<ProbationEvaluationResponse>> getProbationEvaluations() {
        log.info("Request to get probation evaluations for HR screen");

        // Seed default Rohit Verma probation evaluation if ss_probation_evaluation is completely empty
        if (probationEvaluationRepository.count() == 0) {
            log.info("Seeding template Rohith Verma/other probation evaluations");
            
            // Search for Rohit Verma (9085414) in database managers
            // Seed Vikram Reddy (2003) BU Head and Mrudul Mangoli HR
            ProbationEvaluation evaluation = ProbationEvaluation.builder()
                    .cflEmpId(9085414L) // Rohit Verma
                    .dueDate(LocalDate.of(2026, 9, 2))
                    .managerEmpId(2001L) // Ankit Chauhan
                    .managerRating(4)
                    .managerFeedback("Highly recommended for confirmation")
                    .managerSubmittedAt(LocalDateTime.of(2026, 9, 2, 14, 0))
                    .hrStatus("Confirmed")
                    .hrComment("Approved confirmation based on reviews")
                    .hrActionAt(LocalDateTime.of(2026, 9, 8, 11, 0))
                    .finalStatus("Confirm")
                    .build();
            probationEvaluationRepository.save(evaluation);
        }

        List<CflAssignment> assignments = cflAssignmentRepository.findAll();
        List<ProbationEvaluationResponse> responses = new ArrayList<>();

        for (CflAssignment a : assignments) {
            String cflName = cflProfileRepository.findById(a.getCflEmpCode())
                    .map(CflProfile::getName)
                    .orElse(CFL_NAME_FALLBACKS.getOrDefault(a.getCflEmpCode(), "CFL " + a.getCflEmpCode()));

            String managerName = managerRepository.findById(a.getManagerEmpCode())
                    .map(Manager::getName)
                    .orElse("Manager " + a.getManagerEmpCode());

            Optional<ProbationEvaluation> evalOpt = probationEvaluationRepository.findByCflEmpId(a.getCflEmpCode());

            if (evalOpt.isPresent()) {
                ProbationEvaluation e = evalOpt.get();
                responses.add(ProbationEvaluationResponse.builder()
                        .id(e.getId())
                        .cflEmpId(e.getCflEmpId())
                        .cflName(cflName)
                        .managerName(managerName)
                        .stage(e.getHrStatus() != null ? e.getHrStatus() : "Confirmed")
                        .submittedOn(e.getDueDate())
                        .recommendation(e.getFinalStatus() != null ? e.getFinalStatus() : "Confirm")
                        .buHeadApproval("Vikram Reddy") // Vikram Reddy is standard BU Head approval in database
                        .buHeadApprovalDate(e.getManagerSubmittedAt() != null ? e.getManagerSubmittedAt().plusDays(3) : LocalDateTime.now())
                        .hrApproval("Mrudul Mangoli") // Mrudul Mangoli is standard HR approval
                        .hrApprovalDate(e.getHrActionAt())
                        .build());
            } else {
                responses.add(ProbationEvaluationResponse.builder()
                        .cflEmpId(a.getCflEmpCode())
                        .cflName(cflName)
                        .managerName(managerName)
                        .stage("Not Eligible Yet")
                        .recommendation("—")
                        .buHeadApproval("—")
                        .hrApproval("—")
                        .build());
            }
        }

        return ResponseEntity.ok(responses);
    }
}
