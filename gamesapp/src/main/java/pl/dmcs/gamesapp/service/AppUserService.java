package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.model.Role;
import pl.dmcs.gamesapp.repository.AppUserRepository;
import pl.dmcs.gamesapp.repository.RateRepository;
import pl.dmcs.gamesapp.repository.RoleRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service(value = "userService")
public class AppUserService implements CRUDService<AppUser>, UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RateRepository rateRepository;

    @Override
    public void addOne(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles().isEmpty()) {
            user.setRoles(Collections.singleton(roleRepository.findByName("ROLE_REGULAR_USER")));
        }
        appUserRepository.save(user);
    }

    @Override
    public void addAll(List<AppUser> userList) {
        for (AppUser user : userList) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        appUserRepository.saveAll(userList);
    }

    @Override
    public AppUser getOne(long id) {
        return appUserRepository.findById(id);
    }

    public AppUser getOne(String login) {
        return appUserRepository.findByLogin(login);
    }

    @Override
    public List<AppUser> getAll() {
        return appUserRepository.findAll();
    }

    @Transactional
    @Override
    public void updateOne(AppUser user) {
        user.setRoles(appUserRepository.findById(user.getId()).getRoles());
        if (user.getFavourites() == null) {
            user.setFavourites(appUserRepository.findById(user.getId()).getFavourites());
        }
        if (user.getReviews() == null) {
            user.setReviews(appUserRepository.findById(user.getId()).getReviews());
        }
        if (user.getScreenshots() == null) {
            user.setScreenshots(appUserRepository.findById(user.getId()).getScreenshots());
        }
        if (user.getTutorials() == null) {
            user.setTutorials(appUserRepository.findById(user.getId()).getTutorials());
        }
        appUserRepository.save(user);
    }

    @Override
    public void deleteOne(AppUser user) {
        rateRepository.deleteAll(rateRepository.findAllByUser(user));
        appUserRepository.delete(user);
    }

    @Override
    public void deleteAll(List<AppUser> userList) {
        appUserRepository.deleteAll(userList);
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), getAuthority(user));
    }

    public Collection<GrantedAuthority> getAuthority(AppUser user) {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (Role role : user.getRoles()) {
            GrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
            grantedAuthorities.add(authority);
        }
        return grantedAuthorities;
    }
}
