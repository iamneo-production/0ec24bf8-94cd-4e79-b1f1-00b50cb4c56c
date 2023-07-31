package com.examly.springapp.repository;

import com.examly.springapp.model.NewCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends JpaRepository<NewCard, Integer> {
    NewCard findNewCardById(Integer id);

    NewCard findNewCardByEmailId(String email);
}
