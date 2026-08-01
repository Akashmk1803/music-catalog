package com.ledgerscfo.music_catalog_api.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StatusAnalyticsResponse {

    private String status;
    private long count;

}