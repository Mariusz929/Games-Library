package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Game findById(long id);

    List<Game> findAllByGenre(String genre);

    List<Game> findAllByProducer(String producer);
}
