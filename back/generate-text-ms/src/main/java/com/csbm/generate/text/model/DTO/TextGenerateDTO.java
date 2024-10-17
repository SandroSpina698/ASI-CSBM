package com.csbm.generate.text.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TextGenerateDTO {
    private String model;
    private String prompt;
    private Boolean stream;

    public TextGenerateDTO(String model,Boolean stream){
        this.model = model;
        this.stream = stream;
    }
}
