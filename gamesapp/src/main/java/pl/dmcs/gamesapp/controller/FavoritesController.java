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
import java.util.Collections;
import java.util.Map;
import java.util.Set;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    @Autowired
    AppUserService appUserService;
    @Autowired
    GameService gameService;

    @Transactional
    @RequestMapping(value = "/check/{id}", method = RequestMethod.GET)
    public Map<String, Boolean> isUsersFavorite(@PathVariable("id") long gameId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        if (user.getFavourites().contains(gameService.getOne(gameId))) {
            return Collections.singletonMap("success", true);
        } else return Collections.singletonMap("success", false);
    }

    @Transactional
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addFavorite(@RequestBody long gameId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        Set<Game> favorites = user.getFavourites();
        favorites.add(gameService.getOne(gameId));
        user.setFavourites(favorites);
        appUserService.updateOne(user);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<Object> removeFavorite(@RequestBody long gameId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        user.getFavourites().remove(gameService.getOne(gameId));
        appUserService.updateOne(user);
        return ResponseEntity.ok().build();
    }
}
