package com.examly.springapp.repository;

import com.examly.springapp.model.DocsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocRepo extends JpaRepository<DocsModel,Integer> {
    DocsModel findDocsModelByEmail(String email);
    DocsModel findDocsModelById(Integer id);
}
