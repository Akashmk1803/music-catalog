package com.ledgerscfo.music_catalog_api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Entity
@Table(name = "library_items")
public class LibraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String artist;

    private String album;

    private String genre;

    private Integer releaseYear;

    private Integer rating;

    private String status;

    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public LibraryItem() {
        this.createdAt = LocalDateTime.now();
    }

    private Long appleCatalogId;

    private String artworkUrl;

    private String previewUrl;

}