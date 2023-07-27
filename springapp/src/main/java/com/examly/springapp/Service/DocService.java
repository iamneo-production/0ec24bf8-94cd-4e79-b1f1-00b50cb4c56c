package com.example.reacts.Service;

import com.example.reacts.Model.DocsModel;
import com.example.reacts.Repository.DocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class DocService {
    @Autowired
    DocRepo docRepo;
    public DocsModel  createDoc(byte[] doc,String email) {
        DocsModel document = new DocsModel();
        document.setDocument(doc);
        document.setEmail(email);
        return docRepo.save(document);
    }

    public byte[] getDocument(String email) {
      DocsModel docsModel = docRepo.findDocsModelByEmail(email);
        return docsModel.getDocument();
    }

    public DocsModel editDocument(byte[] editedDoc,String email) {

        DocsModel savedDocOfUser = docRepo.findDocsModelByEmail(email);
        savedDocOfUser.setDocument(editedDoc);
        return docRepo.save(savedDocOfUser);
    }
}
