package com.ledgerscfo.music_catalog_api.controller;

import com.ledgerscfo.music_catalog_api.dto.ai.AISummaryResponse;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.service.AIService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/summary")
    public AISummaryResponse generateSummary(
            @AuthenticationPrincipal User user) {

        return aiService.generateSummary(user);
    }
}