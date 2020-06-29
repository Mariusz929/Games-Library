package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Rate;
import pl.dmcs.gamesapp.repository.GameRepository;
import pl.dmcs.gamesapp.repository.RateRepository;

import java.util.List;

@Service
public class RateService implements CRUDService<Rate> {

    @Autowired
    RateRepository rateRepository;
    @Autowired
    GameRepository gameRepository;

    @Override
    public void addOne(Rate rate) {
        rateRepository.save(rate);
    }

    @Override
    public void addAll(List<Rate> rateList) {
        rateRepository.saveAll(rateList);
    }

    @Override
    public Rate getOne(long id) {
        return rateRepository.findById(id);
    }

    @Override
    public List<Rate> getAll() {
        return rateRepository.findAll();
    }

    @Override
    public void updateOne(Rate rate) {
        rateRepository.save(rate);
    }

    @Override
    public void deleteOne(Rate rate) {
        rateRepository.delete(rate);
    }

    @Override
    public void deleteAll(List<Rate> rateListt) {
        rateRepository.deleteAll(rateListt);
    }

    public List<Rate> getAllByGame(long id) {
        return rateRepository.findAllByGame(gameRepository.getOne(id));
    }

    public Rate getByGameAndUser(long id, AppUser user) {
        return rateRepository.findByGameAndUser(gameRepository.getOne(id), user);
    }
}
