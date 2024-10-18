package com.cpe.springboot.store.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CardGenerationOrder {
    private int user_id;
    private int store_id;
    private String promptImage;
    private String promptDescription;
}
