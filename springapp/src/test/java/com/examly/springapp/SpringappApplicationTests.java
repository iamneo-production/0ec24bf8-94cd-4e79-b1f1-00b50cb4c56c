<<<<<<< HEAD
package com.examly.springapp;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.io.File;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.examly.springapp.model.Profile;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class) 
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {
	
	 @Autowired
	    private MockMvc mockMvc;

	 
	 Profile profile= new Profile(1L,"Type","name","address","mobile","email","123",1L);
	
	@Test
    public void testGetProfileAll() throws Exception {
    	
        mockMvc.perform(get("/admin/profile"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testCaseGetProfileById() throws Exception {
    	
        mockMvc.perform(get("/admin/profile").param("id", "1"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
        
    
    @Test
    public void testCreateProfile() throws Exception {
    
        mockMvc.perform(MockMvcRequestBuilders.post("/admin/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(profile)))
                .andExpect(MockMvcResultMatchers.status().isCreated());

    }
    
    
    @Test
    public void test_case1() {
    String directoryPath = "src/main/java/com/examly/springapp/controller";
     File directory = new File(directoryPath);
     assertTrue(directory.exists() && directory.isDirectory());;
     }


   @Test
   public void test_case2() {
   String filePath = "src/main/java/com/examly/springapp/controller/ProfileController.java";
   File file = new File(filePath);
   assertTrue(file.exists() && file.isFile());;

    }
   
  
  private String asJsonString(Object object) throws JsonProcessingException {
      ObjectMapper objectMapper = new ObjectMapper();                                   
      return objectMapper.writeValueAsString(object);
  }

}
=======
package com.examly.springapp;


import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.junit.Test;
import org.junit.jupiter.api.Test; 
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class SpringappApplicationTests {

	@Autowired
    private MockMvc mockMvc;
	
	@Test
	@Transactional
    public void BE_spring_add_user() throws Exception {
        String newUser = "{\"email\":\"test@gmail.com\",\"password\":\"Test@123\",\"username\":\"test123\",\"mobileNumber\":\"9876543210\",\"userRole\":\"user\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newUser)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_spring_add_profile() throws Exception {
        String newProfile = "{\"profileId\":\"01\",\"userModel\":\"Panuser\",\"firstName\":\"ABC\",\"middleName\":\"XYZ\",\"lastName\":\"J\",\"address\":\"chennai\",\"email\":\"abcxyz@gmail.com\",\"mobile\":\"9876543210\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/user/addProfile")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newProfile)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
	@Test
	@Transactional
    public void BE_spring_get_profile() throws Exception {
	 	mockMvc.perform(MockMvcRequestBuilders.get("/user/getProfile")
		.contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_spring_update_profile() throws Exception {
        String newProfile = "{\"profileId\":\"01\",\"userModel\":\"Panuser\",\"firstName\":\"ABC\",\"middleName\":\"XYZ\",\"lastName\":\"J\",\"address\":\"chennai\",\"email\":\"abcxyz@gmail.com\",\"mobile\":\"9876543210\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/user/editProfile")
		.param("profileId","01")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newProfile)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
}
>>>>>>> main
