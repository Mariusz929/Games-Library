package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.service.AppUserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class LoginController {

    @Autowired
    AppUserService appUserService;

    @RequestMapping(value = {"/login", "/"})
    public String index() {
        return "Hello World!";
    }

    @GetMapping(value = {"/users"})
    List<AppUser> getUsers() {
        return appUserService.getAll();
    }
}
