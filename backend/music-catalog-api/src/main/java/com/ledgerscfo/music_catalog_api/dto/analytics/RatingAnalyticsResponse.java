package com.ledgerscfo.music_catalog_api.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RatingAnalyticsResponse {

    private Integer rating;
    private long count;

}