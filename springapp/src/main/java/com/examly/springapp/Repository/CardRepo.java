package com.example.reacts.Repository;

import com.example.reacts.Model.NewCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends JpaRepository<NewCard,Integer> {
    NewCard findNewCardById(Integer id);

    NewCard findNewCardByEmailId(String email);
}
