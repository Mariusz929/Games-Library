package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.service.AppUserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    AppUserService appUserService;

    @GetMapping
    List<AppUser> getUsers() {
        return appUserService.getAll();
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<Object> deleteUser(@RequestBody int id) {
        appUserService.deleteOne(appUserService.getOne(id));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<Object> updateUser(@RequestBody AppUser user) {
        appUserService.updateOne(user);
        return ResponseEntity.ok().build();
    }
}
