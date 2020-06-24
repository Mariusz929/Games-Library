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

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

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
    Set<Game> geMytGames() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        return user.getFavourites();
    }

    @GetMapping(value = "/upcoming")
    List<Game> geUpcomingGames() throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat("dd/MM/yy");
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

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addGame(@RequestBody Game game) throws IOException {
        gameService.addOne(game);
        return ResponseEntity.ok().build();
    }
}
