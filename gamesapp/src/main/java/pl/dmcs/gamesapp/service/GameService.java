package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.repository.GameRepository;

import java.util.List;

@Service
public class GameService implements CRUDService<Game> {

    @Autowired
    GameRepository gameRepository;

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
        gameRepository.save(game);
    }

    @Override
    public void deleteOne(Game game) {
        gameRepository.delete(game);
    }

    @Override
    public void deleteAll(List<Game> gameList) {
        gameRepository.deleteAll(gameList);
    }
}
