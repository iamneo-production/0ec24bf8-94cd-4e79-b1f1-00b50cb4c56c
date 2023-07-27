package com.example.reacts.Service;


import com.example.reacts.Model.UserModel;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.reacts.Repository.UserModelRepository;




@Service

public class UserModelService  {

	@Autowired
	private  UserModelRepository userModelRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;





	public boolean userAldreadyExist(String username) {
		return userModelRepository.findUserByEmail(username) != null;
	}

	public UserModel saveUser(UserModel userModel) {

		userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
		return userModelRepository.save(userModel);
	}







  public UserModel findUserByEmail(String email){
		return userModelRepository.findUserByEmail(email);
  }


  public boolean getUserByEmailAndPassword(String email,String password){

		UserModel user = userModelRepository.findUserByEmail(email);
		if(user ==null){
			return  false;
		}
		System.out.println(user.getEmail());
		return true;

  }



}
