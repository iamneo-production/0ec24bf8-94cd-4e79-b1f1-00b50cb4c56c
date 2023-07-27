package com.example.reacts.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.reacts.Model.UserModel;

import java.util.Optional;

@Repository
public interface UserModelRepository extends JpaRepository<UserModel, Integer> {

    UserModel findByEmailAndPassword(String email, String password);
    UserModel findUserByEmail(String username);

}
