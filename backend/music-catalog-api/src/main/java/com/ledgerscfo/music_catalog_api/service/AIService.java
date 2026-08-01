package com.ledgerscfo.music_catalog_api.service;

import com.ledgerscfo.music_catalog_api.dto.ai.*;
import com.ledgerscfo.music_catalog_api.entity.LibraryItem;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.repository.LibraryItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final RestClient restClient;
    private final LibraryItemRepository libraryItemRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    public AIService(RestClient restClient,
                     LibraryItemRepository libraryItemRepository) {
        this.restClient = restClient;
        this.libraryItemRepository = libraryItemRepository;
    }

    public AISummaryResponse generateSummary(User user) {

        List<LibraryItem> library = libraryItemRepository.findAllByUser(user);

        long totalSongs = library.size();

        long completedSongs = library.stream()
                .filter(item -> item.getStatus() != null)
                .filter(item -> item.getStatus().equalsIgnoreCase("Completed"))
                .count();

        long listeningSongs = library.stream()
                .filter(item -> item.getStatus() != null)
                .filter(item -> item.getStatus().equalsIgnoreCase("Listening"))
                .count();

        long plannedSongs = library.stream()
                .filter(item -> item.getStatus() != null)
                .filter(item -> item.getStatus().equalsIgnoreCase("Planned"))
                .count();

        double averageRating = library.stream()
                .filter(item -> item.getRating() != null)
                .mapToInt(LibraryItem::getRating)
                .average()
                .orElse(0);

        Map<String, Long> genreCounts = library.stream()
                .filter(item -> item.getGenre() != null)
                .collect(Collectors.groupingBy(
                        LibraryItem::getGenre,
                        Collectors.counting()
                ));

        String favoriteGenre = genreCounts.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

        String prompt = """
                Analyze this user's music library.
        
                Total Songs: %d
                Favorite Genre: %s
                Average Rating: %.2f
        
                Completed Songs: %d
                Listening Songs: %d
                Planned Songs: %d
        
                Write a friendly summary in 4-5 sentences.
                Mention listening habits.
                Suggest two genres the user may also enjoy.
                """
                .formatted(
                        totalSongs,
                        favoriteGenre,
                        averageRating,
                        completedSongs,
                        listeningSongs,
                        plannedSongs
                );

        GeminiRequest request =
                new GeminiRequest(
                        List.of(
                                new Content(
                                        List.of(
                                                new Part(prompt)
                                        )
                                )
                        )
                );

        GeminiResponse response = restClient.post()
                .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent")
                .header("x-goog-api-key", apiKey)
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        String summary =
                response.getCandidates()
                        .getFirst()
                        .getContent()
                        .getParts()
                        .getFirst()
                        .getText();

        return new AISummaryResponse(
                summary,
                favoriteGenre,
                Math.round(averageRating * 100) / 100.0,
                totalSongs,
                completedSongs,
                listeningSongs,
                plannedSongs
        );
    }
}