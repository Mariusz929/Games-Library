package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findById(long id);

    Role findByName(String name);
}
