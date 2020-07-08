package pl.dmcs.gamesapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.dmcs.gamesapp.model.*;
import pl.dmcs.gamesapp.service.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class DbSeeder implements CommandLineRunner {

    @Autowired
    RoleService roleService;
    @Autowired
    AppUserService appUserService;
    @Autowired
    GameService gameService;
    @Autowired
    RateService rateService;
    @Autowired
    ReviewService reviewService;
    @Autowired
    ScreenshotService screenshotService;
    @Autowired
    TutorialService tutorialService;


    @Override
    public void run(String... args) throws Exception {

        /*Role regularUserRole = new Role("ROLE_REGULAR_USER");
        Role adminRole = new Role("ROLE_ADMIN");
        roleService.addAll(Arrays.asList(regularUserRole, adminRole));

        AppUser testUser = new AppUser("user@mail.com", "user", "password", Collections.singleton(regularUserRole));
        AppUser testUser2 = new AppUser("user2@mail.com", "user2", "password", Collections.singleton(regularUserRole));
        AppUser testAdmin = new AppUser("admin@mail.com", "admin", "admin", Collections.singleton(adminRole));
        appUserService.addAll(Arrays.asList(testUser, testUser2, testAdmin));

        Game game1 = new Game("diablo 2", "aRPG", "ktoś", "ktoś2", "super gra", "2021-11-01", null);
        Game game2 = new Game("test", "RTS", "ktoś3", "ktoś2", "fajna gra", "2018-11-01", null);
        gameService.addAll(Arrays.asList(game1, game2));

        Rate rate1 = new Rate(game1, testUser, 5);
        Rate rate2 = new Rate(game1, testUser2, 7);
        Rate rate3 = new Rate(game2, testUser, 8);
        Rate rate4 = new Rate(game2, testUser2, 3);
        rateService.addAll(Arrays.asList(rate1, rate2, rate3, rate4));

        Review review1 = new Review(game1, testUser, "fajna");
        Review review2 = new Review(game1, testUser, "podoba mi sie");
        Review review3 = new Review(game1, testUser2, "super gierka");
        reviewService.addAll(Arrays.asList(review1, review2, review3));

        Screenshot screenshot1 = new Screenshot("zrzut", game1, testUser, null);
        Screenshot screenshot2 = new Screenshot("zrzut2", game1, testUser, null);
        Screenshot screenshot3 = new Screenshot("zrzutek", game1, testUser2, null);
        screenshotService.addAll(Arrays.asList(screenshot1, screenshot2, screenshot3));

        Tutorial tutorial1 = new Tutorial("jak zabic baala", game1, testUser, null);
        Tutorial tutorial2 = new Tutorial("jak pokonac diablo", game1, testUser, null);
        Tutorial tutorial3 = new Tutorial("jak zabic baala", game1, testUser2, null);
        tutorialService.addAll(Arrays.asList(tutorial1, tutorial2, tutorial3));

        //ADDING FAVORITES
        Set<Game> favGames = new HashSet<>(Arrays.asList(game1, game2));
        testUser.setFavourites(favGames);
        testUser2.setFavourites(Collections.singleton(game1));
        appUserService.updateOne(testUser);
        appUserService.updateOne(testUser2);

        //TESTING PURPOSE
        Set<Review> reviewList = gameService.getOne(1).getReviews();
        System.out.println(reviewList);
        for (Review review : reviewList) {
            System.out.println(review.getText());
        }*/
    }
}
