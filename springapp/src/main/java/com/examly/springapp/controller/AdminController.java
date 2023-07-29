package com.examly.springapp.controller;

import com.examly.springapp.model.NewCard;
import com.examly.springapp.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    CardService cardService;

    // approve or reject pending application
    @PutMapping("/admin/edit_card_status")
    public ResponseEntity<?> editNewCard(@RequestBody NewCard newCard) throws Exception {

        NewCard approveOrRejectedCard = cardService.editCardStatus(newCard);

        return ResponseEntity.ok(approveOrRejectedCard);
    }

    @GetMapping("admin/getAllCards")
    public ResponseEntity<?> getAllCards() {
        List<NewCard> allCards = cardService.getAllCards();
        return ResponseEntity.ok(allCards);
    }

    @PutMapping("admin/edit_card_by_id/{id}")
    public ResponseEntity<?> editCardById(@PathVariable("id") Integer id, @RequestBody NewCard newCard)
            throws Exception {
        NewCard editedCard = cardService.editCardById(id, newCard);
        return ResponseEntity.ok(editedCard);
    }
}
