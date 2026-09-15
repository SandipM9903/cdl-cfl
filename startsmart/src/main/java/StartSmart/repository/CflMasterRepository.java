package StartSmart.repository;

import StartSmart.entity.CflMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CflMasterRepository extends JpaRepository<CflMaster, Long> {
    Optional<CflMaster> findByEmpId(Long empId);
    Optional<CflMaster> findByCflEmail(String cflEmail);
}
