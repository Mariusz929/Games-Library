package pl.dmcs.gamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.service.AppUserService;
import pl.dmcs.gamesapp.service.EmailService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class ContactController {

    @Autowired
    private EmailService emailService;
    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private AppUserService appUserService;

    @RequestMapping(value = "/contact", method = RequestMethod.POST)
    public ResponseEntity<Object> messageSend(@RequestBody SimpleMailMessage message) {
        System.out.println(message.getSubject());
        System.out.println(message.getText());
        if (message.getSubject() == null) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            AppUser user = appUserService.getOne(auth.getName());
            message.setSubject(user.getEmail());
        }
        System.out.println(message.getSubject());
        System.out.println(message.getText());
        emailService.sendMessage("mycinemaapp@gmail.com", "Question from: " + message.getSubject(), message.getText());
        return ResponseEntity.ok().build();
    }
}
