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
