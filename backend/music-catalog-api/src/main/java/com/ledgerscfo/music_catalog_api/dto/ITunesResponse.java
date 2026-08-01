package com.ledgerscfo.music_catalog_api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ITunesResponse {

    private Integer resultCount;
    private List<ITunesSong> results;
}