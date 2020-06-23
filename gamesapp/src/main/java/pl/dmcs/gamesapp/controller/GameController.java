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
        System.out.println(auth.getName());
        System.out.println(user.getLogin());
        return user.getFovourites();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addGame(@RequestBody Game game) throws IOException {
        gameService.addOne(game);
        return ResponseEntity.ok().build();
    }
}
