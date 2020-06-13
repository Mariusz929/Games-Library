package pl.dmcs.gamesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.gamesapp.model.Role;
import pl.dmcs.gamesapp.repository.RoleRepository;

import java.util.List;

@Service
public class RoleService implements CRUDService<Role> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void addOne(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void addAll(List<Role> roleList) {
        roleRepository.saveAll(roleList);
    }

    @Override
    public Role getOne(long id) {
        return roleRepository.findById(id);
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public void updateOne(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void deleteOne(Role role) {
        roleRepository.delete(role);
    }

    @Override
    public void deleteAll(List<Role> roleList) {
        roleRepository.deleteAll(roleList);
    }
}
