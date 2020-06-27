package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.repository.AppUserRepository;
import pl.dmcs.gamesapp.repository.GameRepository;
import pl.dmcs.gamesapp.repository.RateRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Service
public class GameService implements CRUDService<Game> {

    @Autowired
    GameRepository gameRepository;
    @Autowired
    RateRepository rateRepository;
    @Autowired
    AppUserRepository appUserRepository;

    @Override
    public void addOne(Game game) {
        gameRepository.save(game);
    }

    @Override
    public void addAll(List<Game> gameList) {
        gameRepository.saveAll(gameList);
    }

    @Override
    public Game getOne(long id) {
        return gameRepository.findById(id);
    }

    @Override
    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    @Override
    public void updateOne(Game game) {
        game.setReviews(gameRepository.findById(game.getId()).getReviews());
        game.setScreenshots(gameRepository.findById(game.getId()).getScreenshots());
        game.setTutorials(gameRepository.findById(game.getId()).getTutorials());
        gameRepository.save(game);
    }

    @Transactional
    @Override
    public void deleteOne(Game game) {
        rateRepository.deleteAll(rateRepository.findAllByGame(game));
        for (AppUser user : appUserRepository.findAll()) {
            user.getFavourites().remove(game);
        }
        gameRepository.delete(game);
    }

    @Override
    public void deleteAll(List<Game> gameList) {
        gameRepository.deleteAll(gameList);
    }

    @Transactional
    public List<Game> getByUser(AppUser user) {
        return gameRepository.findAllByUsersContains(user);
    }
}
