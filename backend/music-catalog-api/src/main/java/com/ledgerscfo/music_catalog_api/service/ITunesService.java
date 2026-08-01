package com.ledgerscfo.music_catalog_api.service;

import com.ledgerscfo.music_catalog_api.dto.ITunesResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ledgerscfo.music_catalog_api.dto.search.SearchResultDto;

import java.util.List;

@Service
public class ITunesService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public ITunesService(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    public List<SearchResultDto> search(String query, String type) {

        String url = "https://itunes.apple.com/search?term={query}&entity={type}";

        String json = restClient.get()
                .uri(url, query, type)
                .retrieve()
                .body(String.class);

        try {

            ITunesResponse response =
                    objectMapper.readValue(json, ITunesResponse.class);

            return response.getResults()
                    .stream()
                    .map(song -> new SearchResultDto(
                            song.getTrackId(),
                            song.getTrackName(),
                            song.getArtistName(),
                            song.getPrimaryGenreName(),
                            song.getReleaseDate(),
                            song.getArtworkUrl100(),
                            song.getPreviewUrl()
                    ))
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse iTunes response", e);
        }
    }
}