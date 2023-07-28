package com.examly.springapp.service;

import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserModelRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    UserModelRepository userModelRepository;
    private final String SECRET_KEY = "Hey this is the private key please hide this";

    public String generateToken(String email) {

        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000) ;
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact()
                ;
    }

    public Claims getClaimsFromToken(String token) {

        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public String validateTheJwtTokenAndGetEmail(String jwtTokenFromHeader) {
        try{
            String email = getClaimsFromToken(jwtTokenFromHeader).getSubject();
            System.out.println("Email from claims is" +email);
             Date expirationDate = getClaimsFromToken(jwtTokenFromHeader).getExpiration();
             Date now = new Date();
             if (expirationDate != null && expirationDate.before(now)) {
                 throw new RuntimeException("Token Expired for"+email);
             }
             return email;
        }catch(Exception e){
            System.out.println(e.getLocalizedMessage());
            System.out.println(e.getMessage());
            return e.getLocalizedMessage();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userModelRepository.findUserByEmail(username);

        if (userModel != null) {
            return new org.springframework.security.core.userdetails.User(
                    userModel.getEmail(),
                    userModel.getPassword(),
                    Collections.emptyList()
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
