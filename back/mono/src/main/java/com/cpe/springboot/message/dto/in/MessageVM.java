package com.cpe.springboot.message.dto.in;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageVM implements Serializable {
    private static final long serialVersionUID = 26365465476568049L;

    private Integer receiver;
    private Integer sender;
    private String content;
}
