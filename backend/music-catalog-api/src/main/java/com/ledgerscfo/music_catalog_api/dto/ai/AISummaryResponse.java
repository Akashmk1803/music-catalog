package com.ledgerscfo.music_catalog_api.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AISummaryResponse {

    private String summary;

    private String favoriteGenre;

    private double averageRating;

    private long totalSongs;

    private long completedSongs;

    private long listeningSongs;

    private long plannedSongs;
}