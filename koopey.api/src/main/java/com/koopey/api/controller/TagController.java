package com.koopey.api.controller;

import com.koopey.api.model.entity.Tag;
import com.koopey.api.model.type.TagType;
import com.koopey.api.service.TagService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping(value= "create", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UUID> create(@RequestBody Tag tag) {     
        tag = tagService.save(tag);
        return new ResponseEntity<UUID>(tag.getId(), HttpStatus.CREATED);
    }

    @PostMapping(value="delete", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> delete(@RequestBody Tag tag) {     
        tagService.delete(tag);
        return new ResponseEntity<Void>( HttpStatus.OK);
    }

    @PostMapping(value="update", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> update(@RequestBody Tag tag) {     
        tagService.save(tag);
        return new ResponseEntity<Void>( HttpStatus.OK);
    }

    @GetMapping(value="read/{tagId}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Tag> read(@PathVariable("tagId") UUID tagId) {

        Optional<Tag> tag = tagService.findById(tagId);

        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value="read/many", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Tag>> readMany(@RequestHeader(name = "Content-Language") String language ) {
        
        List<Tag> tags = tagService.findAll(language);

        if (tags.isEmpty()) {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);           
        }
    }

    @GetMapping("read/many/popular")
    public ResponseEntity<List<Tag>> popular() {
        List<Tag> tags = tagService.findByType(TagType.NORMAL.toString());
        return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);
    }

    @GetMapping(value="read/suggestions/{str}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
        MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Tag>> readSuggestions(@RequestHeader(name = "Content-Language") String language , @PathVariable("str") String str) {
        
        List<Tag> tags = tagService.findSuggestions(str,language);

        if (tags.isEmpty()) {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);           
        }
    }

    @PostMapping("search")
    public ResponseEntity<List<Tag>> search(@RequestBody Tag tag) {

        List<Tag> tags= tagService.findAll();     

        if (tags.isEmpty()) {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);           
        }
       
    }
}