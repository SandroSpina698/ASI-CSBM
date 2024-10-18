package com.csbm.generate_property.model.DTO;


import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PropsRequest {
    private int job_id;
    private Map<String,String> metadata;
}