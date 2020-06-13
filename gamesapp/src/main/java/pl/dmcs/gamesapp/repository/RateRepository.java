package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Rate;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

    Rate findById(long id);

    Rate findAllByGameAndUser(Game game, AppUser user);
}
