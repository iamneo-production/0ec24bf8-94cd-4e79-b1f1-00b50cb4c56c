package com.example.reacts.Controller;

import com.example.reacts.Model.DocsModel;
import com.example.reacts.Service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class DocController {
    @Autowired
    DocService docService;

    @PostMapping("user/add_doc")
    public ResponseEntity<?> addDoc(@RequestBody byte[] doc, @RequestParam("email") String email){
        System.out.println("---------------------------------------------------------");
        System.out.println(email);
       DocsModel savedDoc = docService.createDoc(doc,email);
        return ResponseEntity.ok(savedDoc);
    }

    @GetMapping("/user/view_doc")
    public byte[] viewDocument(@RequestParam("email") String email){
        System.out.println("hi there");
        System.out.println(email);
        // if no doc present then null is returnes
        return docService.getDocument(email);
    }

    @PutMapping("user/editDoc")
    public ResponseEntity<?> editDocument(Authentication auth,@RequestBody byte[] doc){

        DocsModel editedDoc = docService.editDocument(doc,auth.getName());


        return editedDoc !=null 
                ? ResponseEntity.ok(editedDoc)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND)
                ;
    }
}
