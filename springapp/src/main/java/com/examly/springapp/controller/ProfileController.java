package com.examly.springapp.controller;

import com.examly.springapp.model.Profile;
import com.examly.springapp.service.ProfileService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController

@CrossOrigin
public class ProfileController {
    @Autowired
    ProfileService profileService;

    // for test case - creating profile
    @PostMapping("admin/profile")
    public ResponseEntity<?> addProfile(@RequestBody Profile userProfile){
        Profile savedUserProfile = profileService.createProfile(userProfile);


        return savedUserProfile != null
                ? new ResponseEntity<>(HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
                ;
    }

    @GetMapping("admin/profile")
    public ResponseEntity<?> getProfileAll(){

        List<Profile> allProfiles = profileService.getAllProfiles();

        return ResponseEntity.ok(allProfiles);
    }
}
