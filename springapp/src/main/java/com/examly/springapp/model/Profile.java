package com.examly.springapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    long temp ;
    String email;
    String password;
    String username;
    String mobileNumber;
    String userRole;
    String fname ;
    long tmep2;

    
 
    public Profile(long temp, String email, String password, String username, String mobileNumber, String userRole,
            String fname, long tmep2) {
        this.temp = temp;
        this.email = email;
        this.password = password;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
        this.fname = fname;
        this.tmep2 = tmep2;
    }

    
}
