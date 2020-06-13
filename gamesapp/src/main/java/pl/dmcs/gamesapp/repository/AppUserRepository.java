package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    AppUser findById(long id);

    AppUser findByEmail(String email);

    AppUser findByLogin(String login);
}
