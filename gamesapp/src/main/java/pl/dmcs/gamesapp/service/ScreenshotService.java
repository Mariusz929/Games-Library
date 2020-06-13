package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Screenshot;
import pl.dmcs.gamesapp.repository.ScreenshotRepository;

import java.util.List;

@Service
public class ScreenshotService implements CRUDService<Screenshot> {

    @Autowired
    ScreenshotRepository screenshotRepository;

    @Override
    public void addOne(Screenshot screenshot) {
        screenshotRepository.save(screenshot);
    }

    @Override
    public void addAll(List<Screenshot> screenshotList) {
        screenshotRepository.saveAll(screenshotList);
    }

    @Override
    public Screenshot getOne(long id) {
        return screenshotRepository.findById(id);
    }

    @Override
    public List<Screenshot> getAll() {
        return screenshotRepository.findAll();
    }

    @Override
    public void updateOne(Screenshot screenshot) {
        screenshotRepository.save(screenshot);
    }

    @Override
    public void deleteOne(Screenshot screenshot) {
        screenshotRepository.delete(screenshot);
    }

    @Override
    public void deleteAll(List<Screenshot> screenshotList) {
        screenshotRepository.deleteAll(screenshotList);
    }
}
