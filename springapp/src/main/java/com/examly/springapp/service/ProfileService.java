package com.examly.springapp.service;

import com.examly.springapp.model.Profile;
import com.examly.springapp.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {
    @Autowired
    ProfileRepo profileRepo;

    public Profile createProfile(Profile userProfile) {
        return profileRepo.save(userProfile);
    }

    public List<Profile> getAllProfiles() {

        return profileRepo.findAll();
    }
}
