package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.service.AppUserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class LoginController {

    @Autowired
    AppUserService appUserService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Object> register(@RequestBody AppUser user){
        appUserService.addOne(user);
        return ResponseEntity.ok().build();
    }
}
