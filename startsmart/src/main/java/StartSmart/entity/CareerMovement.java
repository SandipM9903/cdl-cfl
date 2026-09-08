package StartSmart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ss_career_movement", schema = "startsmart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cfl_emp_id", nullable = false)
    private Long cflEmpId;

    @Column(name = "suggested_role_id")
    private Long suggestedRoleId;

    @Column(name = "skill_gap", columnDefinition = "TEXT")
    private String skillGap;

    @Column(name = "backup_allowed")
    private Boolean backupAllowed;

    @Column(name = "backup_for_emp_id")
    private Long backupForEmpId;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "status", nullable = false, length = 30)
    private String status;
}
