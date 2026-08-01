package com.ledgerscfo.music_catalog_api.controller;

import com.ledgerscfo.music_catalog_api.service.ITunesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ledgerscfo.music_catalog_api.dto.search.SearchResultDto;
import java.util.List;

@RestController
public class ITunesController {

    private final ITunesService itunesService;

    public ITunesController(ITunesService itunesService) {
        this.itunesService = itunesService;
    }

    @GetMapping("/api/search")
    public List<SearchResultDto> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "song") String type) {

        return itunesService.search(query, type);
    }
}