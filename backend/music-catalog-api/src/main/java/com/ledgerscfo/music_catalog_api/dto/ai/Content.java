package com.ledgerscfo.music_catalog_api.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Content {

    private List<Part> parts;

}