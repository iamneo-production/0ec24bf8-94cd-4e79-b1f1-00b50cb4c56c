package com.example.reacts.Service;

import com.example.reacts.Model.Profile;
import com.example.reacts.Repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {
    @Autowired
    ProfileRepo profileRepo ;
    public Profile createProfile(Profile userProfile) {
        return profileRepo.save(userProfile);
    }

    public List<Profile> getAllProfiles() {

        return profileRepo.findAll();
    }
}
