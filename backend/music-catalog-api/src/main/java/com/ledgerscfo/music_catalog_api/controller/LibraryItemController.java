package com.ledgerscfo.music_catalog_api.controller;

import com.ledgerscfo.music_catalog_api.dto.LibraryItemRequest;
import com.ledgerscfo.music_catalog_api.dto.LibraryItemResponse;
import com.ledgerscfo.music_catalog_api.entity.LibraryItem;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.service.LibraryItemService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.ledgerscfo.music_catalog_api.dto.library.SaveLibraryItemRequest;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryItemController {

    private final LibraryItemService libraryItemService;

    public LibraryItemController(LibraryItemService libraryItemService) {
        this.libraryItemService = libraryItemService;
    }

    @PostMapping
    public LibraryItemResponse addLibraryItem(
            @Valid
            @RequestBody SaveLibraryItemRequest request,
            @AuthenticationPrincipal User user) {

        return libraryItemService.addLibraryItem(request, user);
    }

    @GetMapping
    public List<LibraryItemResponse> getMyLibrary(
            @AuthenticationPrincipal User user) {

        return libraryItemService.getMyLibrary(user);
    }

    @PutMapping("/{id}")
    public LibraryItemResponse updateLibraryItem(
            @PathVariable Long id,
            @Valid
            @RequestBody LibraryItemRequest request,
            @AuthenticationPrincipal User user) {

        return libraryItemService.updateLibraryItem(id, request, user);
    }

    @DeleteMapping("/{id}")
    public String deleteLibraryItem(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {

        libraryItemService.deleteLibraryItem(id, user);

        return "Library item deleted successfully";
    }

    @GetMapping("/search")
    public List<LibraryItemResponse> searchByTitle(
            @RequestParam String title,
            @AuthenticationPrincipal User user) {

        return libraryItemService.searchByTitle(title, user);
    }

    @GetMapping("/search-all")
    public List<LibraryItemResponse> searchLibrary(
            @RequestParam String keyword,
            @AuthenticationPrincipal User user) {

        return libraryItemService.searchLibrary(keyword, user);
    }
}