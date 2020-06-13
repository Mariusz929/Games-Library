package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.AppUser;
import pl.dmcs.gamesapp.repository.AppUserRepository;
import pl.dmcs.gamesapp.repository.RoleRepository;

import java.util.List;

@Service
public class AppUserService implements CRUDService<AppUser> {

    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    RoleRepository roleRepository;

    //TODO password encryption
    @Override
    public void addOne(AppUser user) {
        appUserRepository.save(user);
    }

    @Override
    public void addAll(List<AppUser> userList) {
        appUserRepository.saveAll(userList);
    }

    @Override
    public AppUser getOne(long id) {
        return appUserRepository.findById(id);
    }

    @Override
    public List<AppUser> getAll() {
        return appUserRepository.findAll();
    }

    @Override
    public void updateOne(AppUser user) {
        appUserRepository.save(user);
    }

    @Override
    public void deleteOne(AppUser user) {
        appUserRepository.delete(user);
    }

    @Override
    public void deleteAll(List<AppUser> userList) {
        appUserRepository.deleteAll(userList);
    }
}
