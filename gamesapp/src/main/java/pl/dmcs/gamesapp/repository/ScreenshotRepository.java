package pl.dmcs.gamesapp.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Screenshot;

@Repository
public interface ScreenshotRepository extends JpaRepository<Screenshot, Long> {

    Screenshot findById(long id);

    Screenshot findAllByGame(Game game);

    Screenshot findAllByUser(AppUser user);

    Screenshot findAllByGameAndUser(Game game, AppUser user);
}
