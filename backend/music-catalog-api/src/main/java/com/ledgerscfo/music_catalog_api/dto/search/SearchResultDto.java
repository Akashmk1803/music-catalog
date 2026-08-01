package com.ledgerscfo.music_catalog_api.dto.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDto {

    private Long appleCatalogId;
    private String title;
    private String artistName;
    private String genre;
    private String releaseDate;
    private String artworkUrl;
    private String previewUrl;
}