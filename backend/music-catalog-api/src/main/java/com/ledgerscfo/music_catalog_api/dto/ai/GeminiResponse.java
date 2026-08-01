package com.ledgerscfo.music_catalog_api.dto.ai;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GeminiResponse {

    private List<Candidate> candidates;

}