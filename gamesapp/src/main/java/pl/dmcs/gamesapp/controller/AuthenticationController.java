package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pl.dmcs.gamesapp.config.JwtToken;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.LoginUser;
import pl.dmcs.gamesapp.model.Token;
import pl.dmcs.gamesapp.service.AppUserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private AppUserService userService;

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody LoginUser loginUser) {
        final AppUser user = userService.getOne(loginUser.getLogin());
        final String token = jwtToken.generateToken(user);
        return ResponseEntity.ok(Token.of(token));
    }

}
