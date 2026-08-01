package com.ledgerscfo.music_catalog_api.service;

import com.ledgerscfo.music_catalog_api.dto.LibraryItemRequest;
import com.ledgerscfo.music_catalog_api.dto.LibraryItemResponse;
import com.ledgerscfo.music_catalog_api.entity.LibraryItem;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.exception.DuplicateLibraryItemException;
import com.ledgerscfo.music_catalog_api.exception.LibraryItemNotFoundException;
import com.ledgerscfo.music_catalog_api.repository.LibraryItemRepository;
import org.springframework.stereotype.Service;
import com.ledgerscfo.music_catalog_api.dto.library.SaveLibraryItemRequest;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;

@Service
public class LibraryItemService {

    private final LibraryItemRepository libraryItemRepository;

    public LibraryItemService(LibraryItemRepository libraryItemRepository) {
        this.libraryItemRepository = libraryItemRepository;
    }

    public LibraryItemResponse addLibraryItem(SaveLibraryItemRequest request, User user) {

        if (request.getAppleCatalogId() != null &&
                libraryItemRepository.findByAppleCatalogIdAndUserId(
                        request.getAppleCatalogId(),
                        user.getId()
                ).isPresent()) {

            throw new DuplicateLibraryItemException(
                    "This song is already in your library."
            );
        }

        LibraryItem item = new LibraryItem();

        item.setTitle(request.getTitle());
        item.setArtist(request.getArtist());
        item.setAlbum(request.getAlbum());
        item.setGenre(request.getGenre());
        item.setReleaseYear(request.getReleaseYear());
        item.setRating(request.getRating());
        item.setStatus(request.getStatus());
        item.setNotes(request.getNotes());

        item.setUser(user);

        item.setAppleCatalogId(request.getAppleCatalogId());
        item.setArtworkUrl(request.getArtworkUrl());
        item.setPreviewUrl(request.getPreviewUrl());

        LibraryItem savedItem = libraryItemRepository.save(item);
        return mapToResponse(savedItem);
    }

    public List<LibraryItemResponse> getMyLibrary(User user) {

        return libraryItemRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public LibraryItemResponse updateLibraryItem(Long id,
                                         LibraryItemRequest request,
                                         User user) {

        LibraryItem item = libraryItemRepository.findById(id)
                .orElseThrow(() ->
                        new LibraryItemNotFoundException(
                                "Library item not found"));

        // Security check
        if (!item.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException(
                    "You are not allowed to update this item");
        }

        item.setTitle(request.getTitle());
        item.setArtist(request.getArtist());
        item.setAlbum(request.getAlbum());
        item.setGenre(request.getGenre());
        item.setReleaseYear(request.getReleaseYear());
        item.setRating(request.getRating());
        item.setStatus(request.getStatus());
        item.setNotes(request.getNotes());

        LibraryItem updated = libraryItemRepository.save(item);

        return mapToResponse(updated);
    }

    public void deleteLibraryItem(Long id, User user) {

        LibraryItem item = libraryItemRepository.findById(id)
                .orElseThrow(() ->
                        new LibraryItemNotFoundException(
                                "Library item not found"));;

        // Security check
        if (!item.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException(
                    "You are not allowed to delete this item");
        }

        libraryItemRepository.delete(item);
    }

    private LibraryItemResponse mapToResponse(LibraryItem item) {

        LibraryItemResponse response = new LibraryItemResponse();

        response.setId(item.getId());
        response.setTitle(item.getTitle());
        response.setArtist(item.getArtist());
        response.setAlbum(item.getAlbum());
        response.setGenre(item.getGenre());
        response.setReleaseYear(item.getReleaseYear());
        response.setRating(item.getRating());
        response.setStatus(item.getStatus());
        response.setNotes(item.getNotes());
        response.setCreatedAt(item.getCreatedAt());

        response.setAppleCatalogId(item.getAppleCatalogId());
        response.setArtworkUrl(item.getArtworkUrl());
        response.setPreviewUrl(item.getPreviewUrl());

        return response;
    }

    public List<LibraryItemResponse> searchByTitle(
            String title,
            User user) {

        return libraryItemRepository
                .findByUserAndTitleContainingIgnoreCase(user, title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<LibraryItemResponse> searchLibrary(
            String keyword,
            User user) {

        return libraryItemRepository
                .searchLibrary(user, keyword)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}