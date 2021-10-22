package com.koopey.api.controller;

import com.koopey.api.configuration.jwt.JwtTokenUtility;
import com.koopey.api.model.entity.Asset;
import com.koopey.api.model.entity.Classification;
import com.koopey.api.model.entity.Tag;
import com.koopey.api.service.ClassificationService;
import com.koopey.api.service.GoogleService;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("classification")
public class ClassificationController {

    @Autowired
    private JwtTokenUtility jwtTokenUtility;

    @Autowired
    private ClassificationService classificationService; 

    @PostMapping(value = "create", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> create(@RequestHeader(name = "Authorization") String authenticationHeader,
            @RequestBody Classification classification) {

        UUID id = jwtTokenUtility.getIdFromAuthenticationHeader(authenticationHeader);

        classification.setOwnerId(id);
        classificationService.save(classification);

        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @PostMapping(value = "delete", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> delete(@RequestBody Classification classification) {

        classificationService.delete(classification);

        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @PostMapping(value = "update", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> update(@RequestBody Classification classification) {

        classificationService.save(classification);

        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @GetMapping(value = "read/me/many", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Classification>> readMyClassifications(
            @RequestHeader(name = "Authorization") String authenticationHeader) {

        UUID id = jwtTokenUtility.getIdFromAuthenticationHeader(authenticationHeader);

        List<Classification> classifications = classificationService.findByOwnerId(id);

        if (classifications.isEmpty()) {
            return new ResponseEntity<List<Classification>>(Collections.EMPTY_LIST, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<Classification>>(classifications, HttpStatus.OK);
        }
    }

    @GetMapping(value = "read/{classificationId}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Classification> read(@PathVariable("classificationId") UUID classificationId) {

        Optional<Classification> classification = classificationService.findById(classificationId);

        if (classification.isPresent()) {
            return new ResponseEntity<Classification>(classification.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Classification>(classification.get(), HttpStatus.NOT_FOUND);
        }

    }
    

    @PostMapping(value = "search/tags", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Asset>> searchTags(@RequestBody(required = true) List<Tag> tags) {

        List<Asset> assets = classificationService.findAssets(tags);

        if (assets.isEmpty()) {
            return new ResponseEntity<List<Asset>>(assets, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Asset>>(assets, HttpStatus.NO_CONTENT);
        }
    }

   
    
}
