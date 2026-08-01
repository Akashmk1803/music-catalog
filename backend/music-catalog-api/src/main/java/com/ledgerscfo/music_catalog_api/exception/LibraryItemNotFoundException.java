package com.ledgerscfo.music_catalog_api.exception;

public class LibraryItemNotFoundException extends RuntimeException {

    public LibraryItemNotFoundException(String message) {
        super(message);
    }

}