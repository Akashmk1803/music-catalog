package com.ledgerscfo.music_catalog_api.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GenreAnalyticsResponse {

    private String genre;
    private long count;

}