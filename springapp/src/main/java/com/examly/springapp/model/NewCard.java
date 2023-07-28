package com.examly.springapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class NewCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String status = "in_progress" ;
    String  areaName ;
    String  birthDate;
    String profileUrl ;
    String emailId;
    String fatherName;
    String  firstName;
    String gender;
    String  houseNo;
    String  lastName;
    String  motherName;
    String  nationality;
    String peAreaName;
    String peHouseNo;
    String  peNationality;
    String pePincode;
    String peState;
    String  peStreetName;
    String  phoneNumber1;
    String  phoneNumber2;
    String  pincode;
    String  state;
    String streetName;
    String aadhaarNumber ;

}
