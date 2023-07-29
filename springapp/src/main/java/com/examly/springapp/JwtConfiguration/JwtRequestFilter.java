package com.examly.springapp.JwtConfiguration;

import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserModelRepository;
import com.examly.springapp.service.JwtService;
import com.examly.springapp.service.UserModelService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {



@Autowired
JwtService jwtService;

 @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if(header !=null && header.startsWith("Bearer ")){
          String  jwtTokenFromHeader = header.substring(7);

            String userEmailFromToken = jwtService.validateTheJwtTokenAndGetEmail(jwtTokenFromHeader);


            if (userEmailFromToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {


                UserDetails userDetails = jwtService.loadUserByUsername(userEmailFromToken);


                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}