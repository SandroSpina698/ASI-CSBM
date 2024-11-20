package com.cpe.springboot.message.dto.in;

import com.cpe.springboot.message.model.MessageModel;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class MessageDTO implements Serializable {
    private static final long serialVersionUID = 27365465476568049L;

    private UserDTO receiver;
    private UserDTO sender;
    private String content;

    public MessageModel toModel() {
        return MessageModel.builder()
                .creationDate(LocalDate.now())
                .lastModifiedDate(LocalDate.now())
                .content(content)
                .sender(new UserModel(sender))
                .receiver(new UserModel(receiver))
                .build();
    }
}
