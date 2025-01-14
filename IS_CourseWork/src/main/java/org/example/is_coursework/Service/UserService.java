package org.example.is_coursework.Service;

import jakarta.persistence.NoResultException;
import org.example.is_coursework.entities.User;
import org.example.is_coursework.repository.UserRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public void save(User user){
        userRepository.save(user);
    }
    public User getByLogin(String username) {
        return userRepository.getByLogin(username);
    }
    public UserDetailsService userDetailsService() {
        return this::getByLogin;
    }
    public long sizeUsers(){
        return userRepository.count();
    }
    public User getByLoginAndPassword(String username, String password) {
        return userRepository.findByLoginAndPassword(username, password);
    }
    public User getById(Long id){
        return userRepository.getById(id);
    }
    public List<User> getAll(){
        return userRepository.findAll();
    }
    public List<User> getAllByScientific_supervisor(){
        return userRepository.findAllByRoleScientificSupervisor(true);
    }
}
