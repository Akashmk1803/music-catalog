package com.ledgerscfo.music_catalog_api.controller;

import com.ledgerscfo.music_catalog_api.dto.analytics.AnalyticsOverviewResponse;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.service.AnalyticsService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ledgerscfo.music_catalog_api.dto.analytics.GenreAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.RatingAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.StatusAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.ReleaseYearAnalyticsResponse;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/overview")
    public AnalyticsOverviewResponse getOverview(
            @AuthenticationPrincipal User user) {

        return analyticsService.getOverview(user);
    }

    @GetMapping("/genres")
    public List<GenreAnalyticsResponse> getGenres(
            @AuthenticationPrincipal User user) {

        return analyticsService.getGenreAnalytics(user);
    }

    @GetMapping("/ratings")
    public List<RatingAnalyticsResponse> getRatings(
            @AuthenticationPrincipal User user) {

        return analyticsService.getRatingAnalytics(user);
    }

    @GetMapping("/status")
    public List<StatusAnalyticsResponse> getStatus(
            @AuthenticationPrincipal User user) {

        return analyticsService.getStatusAnalytics(user);
    }

    @GetMapping("/release-years")
    public List<ReleaseYearAnalyticsResponse> getReleaseYears(
            @AuthenticationPrincipal User user) {

        return analyticsService.getReleaseYearAnalytics(user);
    }
}