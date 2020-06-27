package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Game;
import pl.dmcs.gamesapp.service.AppUserService;
import pl.dmcs.gamesapp.service.GameService;

import javax.transaction.Transactional;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    GameService gameService;
    @Autowired
    AppUserService appUserService;

    @GetMapping
    List<Game> getGames() {
        return gameService.getAll();
    }

    @GetMapping(value = "/my-games")
    List<Game> geMyGames() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        return gameService.getByUser(user);
    }

    @GetMapping(value = "/upcoming")
    List<Game> geUpcomingGames() throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date currentDate = new Date();
        df.format(currentDate);
        List<Game> result = new ArrayList<>();
        for (Game game : gameService.getAll()) {
            if (df.parse(game.getReleaseDate()).after(currentDate)) {
                result.add(game);
            }
        }
        return result;
    }

    @GetMapping("/details/{id}")
    Game getGame(@PathVariable("id") long id) {
        return gameService.getOne(id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addGame(@RequestBody Game game) throws IOException {
        gameService.addOne(game);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<Object> deleteGame(@RequestBody int id) {
        gameService.deleteOne(gameService.getOne(id));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<Object> updateGame(@RequestBody Game game) {
        gameService.updateOne(game);
        return ResponseEntity.ok().build();
    }
}
