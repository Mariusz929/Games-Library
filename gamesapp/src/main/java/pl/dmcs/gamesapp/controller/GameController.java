package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.service.GameService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping
    List<Game> getGames() {
        return gameService.getAll();
    }

}
