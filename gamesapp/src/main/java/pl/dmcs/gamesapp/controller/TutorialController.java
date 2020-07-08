package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Tutorial;
import pl.dmcs.gamesapp.service.AppUserService;
import pl.dmcs.gamesapp.service.GameService;
import pl.dmcs.gamesapp.service.TutorialService;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/tutorials")
public class TutorialController {

    @Autowired
    TutorialService tutorialService;
    @Autowired
    GameService gameService;
    @Autowired
    AppUserService appUserService;

    @GetMapping
    List<Tutorial> getTutorials() {
        return tutorialService.getAll();
    }

    @GetMapping("/{id}")
    Tutorial getTutorial(@PathVariable("id") long id) {
        return tutorialService.getOne(id);
    }

    @Transactional
    @GetMapping("/game/{id}")
    List<Tutorial> getGameTutorials(@PathVariable("id") long gameId) {
        return tutorialService.getByGame(gameService.getOne(gameId));
    }

    @RequestMapping(value = "/add/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> addTutorial(@PathVariable("id") long gameId, @RequestBody Tutorial tutorial) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        tutorial.setGame(gameService.getOne(gameId));
        tutorial.setUser(user);
        tutorialService.addOne(tutorial);
        return ResponseEntity.ok().build();
    }
}
