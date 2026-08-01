package com.ledgerscfo.music_catalog_api.exception;

public class DuplicateLibraryItemException extends RuntimeException {

    public DuplicateLibraryItemException(String message) {
        super(message);
    }

}