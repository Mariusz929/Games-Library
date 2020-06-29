package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Rate;
import pl.dmcs.gamesapp.service.AppUserService;
import pl.dmcs.gamesapp.service.GameService;
import pl.dmcs.gamesapp.service.RateService;

import java.util.Collections;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/rates")
public class RatesController {

    @Autowired
    AppUserService appUserService;
    @Autowired
    GameService gameService;
    @Autowired
    RateService rateService;

    @GetMapping(value = "/{id}")
    Map<String, Double> getGameRate(@PathVariable("id") long id) {
        double sum = 0.0;
        for (Rate rate : rateService.getAllByGame(id)) {
            sum += rate.getRate();
        }
        return Collections.singletonMap("sum", Math.round(sum / rateService.getAllByGame(id).size() * 100.0) / 100.0);
    }

    @GetMapping(value = "/myRate/{id}")
    Map<String, Double> geMyGames(@PathVariable("id") long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        if (rateService.getByGameAndUser(id, user) == null) {
            return Collections.singletonMap("sum", 0.0);
        } else return Collections.singletonMap("sum", rateService.getByGameAndUser(id, user).getRate());
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> updateGame(@PathVariable("id") long id, @RequestBody double rate) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = appUserService.getOne(auth.getName());
        if (rateService.getByGameAndUser(id, user) != null) {
            Rate updateRate = rateService.getByGameAndUser(id, user);
            updateRate.setRate(rate);
            rateService.updateOne(updateRate);
            return ResponseEntity.ok().build();
        } else rateService.addOne(new Rate(gameService.getOne(id), user, rate));
        return ResponseEntity.ok().build();
    }
}
