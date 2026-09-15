package StartSmart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "ss_cfl_master", schema = "startsmart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CflMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bu_head_name")
    private String buHeadName;

    @Column(name = "category")
    private String category;

    @Column(name = "cfl_department")
    private String cflDepartment;

    @Column(name = "cfl_department_description", columnDefinition = "TEXT")
    private String cflDepartmentDescription;

    @Column(name = "cfl_designation")
    private String cflDesignation;

    @Column(name = "cfl_email")
    private String cflEmail;

    @Column(name = "cfl_first_name")
    private String cflFirstName;

    @Column(name = "cfl_last_name")
    private String cflLastName;

    @Column(name = "cfl_location")
    private String cflLocation;

    @Column(name = "cfl_mgr_quarter_status")
    private String cflMgrQuarterStatus;

    @Column(name = "cfl_middle_name")
    private String cflMiddleName;

    @Column(name = "cfl_project")
    private String cflProject;

    @Column(name = "cfl_project_classification")
    private String cflProjectClassification;

    @Column(name = "cfl_sub_department")
    private String cflSubDepartment;

    @Column(name = "cfl_sub_dept_description", columnDefinition = "TEXT")
    private String cflSubDeptDescription;

    @Column(name = "college_branch")
    private String collegeBranch;

    @Column(name = "college_name")
    private String collegeName;

    @Column(name = "contact")
    private String contact;

    @Column(name = "email_acceptance")
    private String emailAcceptance;

    @Column(name = "email_declined")
    private String emailDeclined;

    @Column(name = "emp_id")
    private Long empId;

    @Column(name = "extended_date")
    private LocalDate extendedDate;

    @Column(name = "extended_mentoring_date")
    private LocalDate extendedMentoringDate;

    @Column(name = "extended_probation_date")
    private LocalDate extendedProbationDate;

    @Column(name = "file_data", columnDefinition = "TEXT")
    private String fileData;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "goal_setting_review_extended_date")
    private LocalDate goalSettingReviewExtendedDate;

    @Column(name = "goal_setting_review_status_hr_to_mgr")
    private String goalSettingReviewStatusHrToMgr;

    @Column(name = "goal_setting_status_hr_to_mgr")
    private String goalSettingStatusHrToMgr;

    @Column(name = "hr_id")
    private Long hrId;

    @Column(name = "hr_location")
    private String hrLocation;

    @Column(name = "hr_mail")
    private String hrMail;

    @Column(name = "hr_meeting_extended_date")
    private LocalDate hrMeetingExtendedDate;

    @Column(name = "hr_name")
    private String hrName;

    @Column(name = "hsc_result")
    private String hscResult;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "manager_department")
    private String managerDepartment;

    @Column(name = "manager_designation")
    private String managerDesignation;

    @Column(name = "manager_location")
    private String managerLocation;

    @Column(name = "manager_meeting_extended_date")
    private LocalDate managerMeetingExtendedDate;

    @Column(name = "mentor_department")
    private String mentorDepartment;

    @Column(name = "mentor_designation")
    private String mentorDesignation;

    @Column(name = "mentor_email")
    private String mentorEmail;

    @Column(name = "mentor_location")
    private String mentorLocation;

    @Column(name = "mentor_name")
    private String mentorName;

    @Column(name = "non_technical_skills", columnDefinition = "TEXT")
    private String nonTechnicalSkills;

    @Column(name = "otp")
    private String otp;

    @Column(name = "post_graduate_result")
    private String postGraduateResult;

    @Column(name = "probation_status")
    private String probationStatus;

    @Column(name = "reporting_manager")
    private String reportingManager;

    @Column(name = "manager_email")
    private String managerEmail;

    @Column(name = "ssc_result")
    private String sscResult;

    @Column(name = "sub_area")
    private String subArea;

    @Column(name = "technical_skills", columnDefinition = "TEXT")
    private String technicalSkills;

    @Column(name = "under_graduate_result")
    private String underGraduateResult;

    @Column(name = "cfl_vertical")
    private String cflVertical;

    @Column(name = "year")
    private String year;

    @Column(name = "cfl_screen_time")
    private String cflScreenTime;

    @Column(name = "probation_date")
    private LocalDate probationDate;

    @Column(name = "department_change")
    private String departmentChange;

    @Column(name = "location_change")
    private String locationChange;

    @Column(name = "manager_change")
    private String managerChange;

    @Column(name = "mentor_change")
    private String mentorChange;

    @Column(name = "project_change")
    private String projectChange;
}
