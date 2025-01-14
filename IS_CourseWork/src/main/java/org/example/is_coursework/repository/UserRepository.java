package org.example.is_coursework.repository;

import org.example.is_coursework.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByLoginAndPassword(String login, String password);
    User getByLogin(String login);
    long count();
    User getById(Long id);
    List<User> findAllByRoleScientificSupervisor(boolean scientificSupervisor);
}