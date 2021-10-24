package com.koopey.api.controller;

import com.koopey.api.configuration.jwt.JwtTokenUtility;
import com.koopey.api.model.entity.Competition;
import com.koopey.api.model.entity.Game;
import com.koopey.api.model.entity.User;
import com.koopey.api.service.CompetitionService;
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
@RequestMapping("competition")
public class CompetitionController {

    @Autowired
    private JwtTokenUtility jwtTokenUtility;

    @Autowired
    private CompetitionService competitionService;

    @PostMapping(value = "create", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> create(@RequestHeader(name = "Authorization") String authenticationHeader,
            @RequestBody Competition competition) {

        competitionService.save(competition);

        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @PostMapping(value = "delete", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> delete(@RequestBody Competition competition) {

        competitionService.delete(competition);

        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @PostMapping(value = "update", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> update(@RequestBody Competition competition) {

        competitionService.save(competition);

        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @GetMapping(value = "read/{competitionId}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Competition> read(@PathVariable("competitionId") UUID competitionId) {

        Optional<Competition> competition = competitionService.findById(competitionId);

        if (competition.isPresent()) {
            return new ResponseEntity<Competition>(competition.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Competition>(competition.get(), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(value = "search/my/games", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Game>> searchMyGames(
            @RequestHeader(name = "Authorization") String authenticationHeader) {

        UUID id = jwtTokenUtility.getIdFromAuthenticationHeader(authenticationHeader);

        List<Game> games = competitionService.findGames(id);

        if (games.isEmpty()) {
            return new ResponseEntity<List<Game>>(Collections.EMPTY_LIST, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<Game>>(games, HttpStatus.OK);
        }
    }

    @GetMapping(value = "search/my/user", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<User>> searchMyPlayers(
            @RequestHeader(name = "Authorization") String authenticationHeader) {

        UUID id = jwtTokenUtility.getIdFromAuthenticationHeader(authenticationHeader);

        List<User> competitions = competitionService.findPlayers(id);

        if (competitions.isEmpty()) {
            return new ResponseEntity<List<User>>(Collections.EMPTY_LIST, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<User>>(competitions, HttpStatus.OK);
        }
    }

    @PostMapping(value = "search", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<Competition>> search(@RequestBody Competition competition) {

        List<Competition> competitions = competitionService.findAll();

        if (competitions.isEmpty()) {
            return new ResponseEntity<List<Competition>>(competitions, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Competition>>(competitions, HttpStatus.NO_CONTENT);
        }
    }

}
