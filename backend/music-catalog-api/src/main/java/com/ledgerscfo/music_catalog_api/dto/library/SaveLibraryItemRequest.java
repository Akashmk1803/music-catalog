package com.ledgerscfo.music_catalog_api.dto.library;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SaveLibraryItemRequest {

    private Long appleCatalogId;

    @NotBlank(message = "Title is required")
    private String title;

    private String artist;

    private String album;

    private String genre;

    private Integer releaseYear;

    private String artworkUrl;

    private String previewUrl;

    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer rating;

    private String status;

    private String notes;
}