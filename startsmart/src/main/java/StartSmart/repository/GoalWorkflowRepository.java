package StartSmart.repository;

import StartSmart.entity.GoalWorkflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoalWorkflowRepository extends JpaRepository<GoalWorkflow, Long> {
    List<GoalWorkflow> findByCflEmpId(Long cflEmpId);
    Optional<GoalWorkflow> findByCycleIdAndStageIdAndCflEmpId(Long cycleId, Long stageId, Long cflEmpId);
    List<GoalWorkflow> findByStageId(Long stageId);
}
