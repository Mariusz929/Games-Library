package pl.dmcs.gamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findById(long id);

    List<Review> findAllByGame(Game game);
}
