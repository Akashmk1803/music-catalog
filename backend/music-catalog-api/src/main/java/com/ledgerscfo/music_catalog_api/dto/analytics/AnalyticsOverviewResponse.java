package com.ledgerscfo.music_catalog_api.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnalyticsOverviewResponse {

    private long totalSongs;

    private long completedSongs;

    private long listeningSongs;

    private long plannedSongs;

    private double averageRating;
}