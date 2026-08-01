package com.ledgerscfo.music_catalog_api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ITunesSong {

    private Long trackId;

    private String trackName;
    private String artistName;
    private String collectionName;
    private String primaryGenreName;
    private String releaseDate;
    private String previewUrl;
    private String artworkUrl100;
}