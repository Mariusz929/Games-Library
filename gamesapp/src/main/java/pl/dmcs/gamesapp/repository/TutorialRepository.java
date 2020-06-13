package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Tutorial;

@Repository
public interface TutorialRepository extends JpaRepository<Tutorial, Long> {

    Tutorial findById(long id);

    Tutorial findAllByGame(Game game);

    Tutorial findAllByUser(AppUser user);
}
