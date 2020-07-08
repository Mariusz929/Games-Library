package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Review;
import pl.dmcs.gamesapp.model.ReviewDTO;
import pl.dmcs.gamesapp.service.AppUserService;
import pl.dmcs.gamesapp.service.GameService;
import pl.dmcs.gamesapp.service.ReviewService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;
    @Autowired
    GameService gameService;
    @Autowired
    AppUserService appUserService;

    @GetMapping("/{id}")
    List<ReviewDTO> getGameReviews(@PathVariable("id") long id) {
        List<ReviewDTO> result = new ArrayList<>();
        for (Review review : reviewService.getByGame(gameService.getOne(id))) {
            result.add(new ReviewDTO(review.getUser().getLogin(), review.getText()));
        }
        return result;
    }

    @RequestMapping(value = "/add/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> addReview(@PathVariable("id") long gameId, @RequestBody ReviewDTO reviewDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        Review review = new Review(gameService.getOne(gameId), user, reviewDTO.getText());
        reviewService.addOne(review);
        return ResponseEntity.ok().build();
    }
}
