package com.examly.springapp.service;

import com.examly.springapp.model.NewCard;
import com.examly.springapp.repository.CardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.List;

@Service
public class CardService {



    @Autowired
    CardRepo cardRepo;

    public NewCard addNewCard(NewCard newCard) {
        return cardRepo.save(newCard);
    }

    public NewCard editCardStatus(NewCard newCard) throws Exception {
        NewCard cardInDB = cardRepo.findNewCardById(newCard.getId());
        if (cardInDB != null) {
            String status = newCard.getStatus();

            cardInDB.setStatus(status);
            return cardRepo.save(cardInDB);
        } else {
            throw new Exception("Card/Application not found ");
        }
    }

    public List<NewCard> getAllCards() {
        return cardRepo.findAll();
    }

    public NewCard getCardById(Integer id) {
        return cardRepo.findNewCardById(id);
    }

    public NewCard editCard(String email, NewCard newCard) {

        NewCard savedCard = cardRepo.findNewCardByEmailId(email);
        String status = newCard.getStatus();

        if (status.compareTo("approved")==0) {
            System.out.println("Status from frontend is: " + status);
            long randomNumber = generateRandomNumber();
            savedCard.setAadhaarNumber(String.valueOf(randomNumber));
            System.out.println("randomNumber = " + randomNumber);
        }

        // savedCard.setId(id);
        savedCard.setStatus(newCard.getStatus());
        savedCard.setAreaName(newCard.getAreaName());
        savedCard.setBirthDate(newCard.getBirthDate());
        savedCard.setEmailId(newCard.getEmailId());
        savedCard.setFatherName(newCard.getFatherName());
        savedCard.setFirstName(newCard.getFirstName());
        savedCard.setGender(newCard.getGender());
        savedCard.setHouseNo(newCard.getHouseNo());
        savedCard.setLastName(newCard.getLastName());
        savedCard.setMotherName(newCard.getMotherName());
        savedCard.setNationality(newCard.getNationality());
        savedCard.setPeAreaName(newCard.getPeAreaName());
        savedCard.setPeHouseNo(newCard.getPeHouseNo());
        savedCard.setPeNationality(newCard.getPeNationality());
        savedCard.setPePincode(newCard.getPePincode());
        savedCard.setPeState(newCard.getPeState());
        savedCard.setPeStreetName(newCard.getPeStreetName());
        savedCard.setPhoneNumber1(newCard.getPhoneNumber1());
        savedCard.setPhoneNumber2(newCard.getPhoneNumber2());
        savedCard.setPincode(newCard.getPincode());
        savedCard.setState(newCard.getState());
        savedCard.setStreetName(newCard.getStreetName());
        return cardRepo.save(savedCard);

    }

    public NewCard getCardByEmail(String email) {
        return cardRepo.findNewCardByEmailId(email);
    }

    // not req
    public NewCard editCardById(Integer id, NewCard newCard) {

        // if (newCard.getStatus() == "approved") {
        //     NewCard savedCard = cardRepo.findNewCardById(id);
        //     long randomNumber = generateRandomNumber();
        //     savedCard.setAadhaarNumber(String.valueOf(randomNumber));
        //     return cardRepo.save(savedCard);
        // }

        return null;
    }

    public static long generateRandomNumber() {
        int numDigits = 12;
        if (numDigits <= 0 || numDigits > 18) {
            throw new IllegalArgumentException("Number of digits should be between 1 and 18 (inclusive).");
        }

        Random random = new Random();
        long min = (long) Math.pow(10, numDigits - 1);
        long max = (long) Math.pow(10, numDigits) - 1;

        return min + (long) (random.nextDouble() * (max - min + 1));
    }
}