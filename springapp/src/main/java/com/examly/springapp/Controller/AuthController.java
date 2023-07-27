package com.example.reacts.Controller;

import com.example.reacts.Model.JwtResponse;
import com.example.reacts.Model.UserModel;

import com.example.reacts.Service.JwtService;
import com.example.reacts.Service.UserModelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    UserModelService userModelService;
    @Autowired
    JwtService jwtService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @PostMapping("/user/signup")
    public ResponseEntity <?> saveUser(@RequestBody UserModel userModel) {

        if(userModelService.userAldreadyExist(userModel.getEmail())){
            return new ResponseEntity<>("User already exists, please login",HttpStatus.CONFLICT);
        }
        UserModel savedUser  = userModelService.saveUser(userModel);

      return savedUser ==null
              ? new ResponseEntity<>("Error creating user",HttpStatus.INTERNAL_SERVER_ERROR)
              : ResponseEntity.ok(savedUser);
    }

//    @PostMapping("/user/login")
//  //  @ResponseBody
//    public ResponseEntity<?> loginUser(@RequestBody UserModel loginData) {
//        UserModel user = userModelService.findUserByEmail(loginData.getEmail());
//        return user != null
//                ? ResponseEntity.ok(user)
//                : new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND)
//                ;
//    }

    @PostMapping("/")
    //  @ResponseBody
    public ResponseEntity<?> login(@RequestBody UserModel loginData) {
        UserModel user = userModelService.findUserByEmail(loginData.getEmail());
        return user != null
                ? ResponseEntity.ok(user)
                : new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND)
                ;
    }



    // Jwt implementation for login .

    @PostMapping("user/login")
    public ResponseEntity<?> jwtLogin(@RequestBody UserModel user){

        if(userModelService.getUserByEmailAndPassword(user.getEmail(), passwordEncoder.encode(user.getPassword()))){
            // if the user has correct credentials then we need to generate a jwt token
            UserModel userModel = userModelService.findUserByEmail(user.getEmail());
            String jwtToken = jwtService.generateToken(user.getEmail());

            JwtResponse userWithJwtToken = new JwtResponse(userModel,jwtToken);

           return ResponseEntity.ok(userWithJwtToken);
        }
        return new ResponseEntity<>("Invalid Credentials",HttpStatus.FORBIDDEN);
    }
}
