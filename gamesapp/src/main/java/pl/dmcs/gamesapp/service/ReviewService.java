package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.model.Review;
import pl.dmcs.gamesapp.repository.ReviewRepository;

import java.util.List;

@Service
public class ReviewService implements CRUDService<Review> {

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public void addOne(Review review) {
        reviewRepository.save(review);
    }

    @Override
    public void addAll(List<Review> reviewList) {
        reviewRepository.saveAll(reviewList);
    }

    @Override
    public Review getOne(long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @Override
    public void updateOne(Review review) {
        reviewRepository.save(review);
    }

    @Override
    public void deleteOne(Review review) {
        reviewRepository.delete(review);
    }

    @Override
    public void deleteAll(List<Review> reviewList) {
        reviewRepository.deleteAll(reviewList);
    }

    public List<Review> getByGame(Game game) {
        return reviewRepository.findAllByGame(game);
    }
}
