package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Tutorial;
import pl.dmcs.gamesapp.repository.TutorialRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TutorialService implements CRUDService<Tutorial> {

    @Autowired
    TutorialRepository tutorialRepository;

    @Override
    public void addOne(Tutorial tutorial) {
        tutorialRepository.save(tutorial);
    }

    @Override
    public void addAll(List<Tutorial> tutorialList) {
        tutorialRepository.saveAll(tutorialList);
    }

    @Override
    public Tutorial getOne(long id) {
        return tutorialRepository.findById(id);
    }

    @Override
    public List<Tutorial> getAll() {
        return tutorialRepository.findAll();
    }

    @Override
    public void updateOne(Tutorial tutorial) {
        tutorialRepository.save(tutorial);
    }

    @Override
    public void deleteOne(Tutorial tutorial) {
        tutorialRepository.delete(tutorial);
    }

    @Override
    public void deleteAll(List<Tutorial> tutorialList) {
        tutorialRepository.deleteAll(tutorialList);
    }

    @Transactional
    public List<Tutorial> getByGame(Game game) {
        return tutorialRepository.findAllByGame(game);
    }
}
