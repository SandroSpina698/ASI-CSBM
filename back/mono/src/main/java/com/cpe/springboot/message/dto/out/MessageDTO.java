package com.cpe.springboot.message.dto.out;

import com.cpe.springboot.message.model.MessageModel;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class MessageDTO implements Serializable {
    private static final long serialVersionUID = 27365465476568049L;

    private Integer id;
    private UserDTO receiver;
    private UserDTO sender;
    private String content;
    private LocalDateTime creationDate;
    private LocalDateTime lastModifiedDate;

    MessageModel toModel() {
        return MessageModel.builder()
                .creationDate(creationDate)
                .lastModifiedDate(lastModifiedDate)
                .content(content)
                .sender(new UserModel(sender))
                .receiver(new UserModel(receiver))
                .build();
    }
}
