package com.ledgerscfo.music_catalog_api.service;

import com.ledgerscfo.music_catalog_api.dto.analytics.AnalyticsOverviewResponse;
import com.ledgerscfo.music_catalog_api.entity.LibraryItem;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.repository.LibraryItemRepository;
import org.springframework.stereotype.Service;
import com.ledgerscfo.music_catalog_api.dto.analytics.GenreAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.RatingAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.StatusAnalyticsResponse;
import com.ledgerscfo.music_catalog_api.dto.analytics.ReleaseYearAnalyticsResponse;

import java.util.List;

@Service
public class AnalyticsService {

    private final LibraryItemRepository libraryItemRepository;

    public AnalyticsService(LibraryItemRepository libraryItemRepository) {
        this.libraryItemRepository = libraryItemRepository;
    }

    public AnalyticsOverviewResponse getOverview(User user) {

        long totalSongs = libraryItemRepository.countByUser(user);

        long completedSongs =
                libraryItemRepository.countByUserAndStatusIgnoreCase(user, "Completed");

        long listeningSongs =
                libraryItemRepository.countByUserAndStatusIgnoreCase(user, "Listening");

        long plannedSongs =
                libraryItemRepository.countByUserAndStatusIgnoreCase(user, "Planned");

        List<LibraryItem> items =
                libraryItemRepository.findAllByUser(user);

        double averageRating = Math.round(
                items.stream()
                        .filter(item -> item.getRating() != null)
                        .mapToInt(LibraryItem::getRating)
                        .average()
                        .orElse(0) * 100
        ) / 100.0;

        return new AnalyticsOverviewResponse(
                totalSongs,
                completedSongs,
                listeningSongs,
                plannedSongs,
                averageRating
        );
    }

    public List<GenreAnalyticsResponse> getGenreAnalytics(User user) {

        return libraryItemRepository.findAllByUser(user)
                .stream()
                .filter(item -> item.getGenre() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        LibraryItem::getGenre,
                        java.util.stream.Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new GenreAnalyticsResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    public List<RatingAnalyticsResponse> getRatingAnalytics(User user) {

        return libraryItemRepository.findAllByUser(user)
                .stream()
                .filter(item -> item.getRating() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        LibraryItem::getRating,
                        java.util.stream.Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted(java.util.Map.Entry.comparingByKey())
                .map(entry -> new RatingAnalyticsResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    public List<StatusAnalyticsResponse> getStatusAnalytics(User user) {

        return libraryItemRepository.findAllByUser(user)
                .stream()
                .filter(item -> item.getStatus() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        LibraryItem::getStatus,
                        java.util.stream.Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new StatusAnalyticsResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    public List<ReleaseYearAnalyticsResponse> getReleaseYearAnalytics(User user) {

        return libraryItemRepository.findAllByUser(user)
                .stream()
                .filter(item -> item.getReleaseYear() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        LibraryItem::getReleaseYear,
                        java.util.stream.Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted(java.util.Map.Entry.comparingByKey())
                .map(entry -> new ReleaseYearAnalyticsResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }
}