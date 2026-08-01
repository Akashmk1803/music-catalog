package com.ledgerscfo.music_catalog_api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LibraryItemResponse {

    private Long id;
    private String title;
    private String artist;
    private String album;
    private String genre;
    private Integer releaseYear;
    private Integer rating;
    private String status;
    private String notes;
    private LocalDateTime createdAt;

    private Long appleCatalogId;
    private String artworkUrl;
    private String previewUrl;

}