package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Rate;
import pl.dmcs.gamesapp.repository.RateRepository;

import java.util.List;

@Service
public class RateService implements CRUDService<Rate> {

    @Autowired
    RateRepository rateRepository;

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
}
