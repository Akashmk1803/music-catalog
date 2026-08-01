package com.ledgerscfo.music_catalog_api.repository;

import com.ledgerscfo.music_catalog_api.entity.LibraryItem;
import com.ledgerscfo.music_catalog_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LibraryItemRepository extends JpaRepository<LibraryItem, Long> {

    List<LibraryItem> findByUser(User user);
    Optional<LibraryItem> findById(Long id);
    List<LibraryItem> findByUserAndTitleContainingIgnoreCase(
            User user,
            String title
    );

    @Query("""
    SELECT l FROM LibraryItem l
    WHERE l.user = :user
    AND (
    LOWER(l.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(l.artist) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(l.album) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(l.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))
    )
    """)
    List<LibraryItem> searchLibrary(
            @Param("user") User user,
            @Param("keyword") String keyword
    );

    Optional<LibraryItem> findByAppleCatalogIdAndUserId(Long appleCatalogId, Long userId);

    long countByUser(User user);

    long countByUserAndStatusIgnoreCase(User user, String status);

    List<LibraryItem> findAllByUser(User user);
}