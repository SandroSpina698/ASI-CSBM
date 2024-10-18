package com.csbm.generate_property.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Properties {
    private int id;
    private int cardId;
    private float energy;
    private float hp;
    private float defence;
    private float attack;
    private float price;
}
