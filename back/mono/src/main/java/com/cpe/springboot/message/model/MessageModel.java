package com.cpe.springboot.message.model;

import com.cpe.springboot.message.dto.in.MessageDTO;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "message")
public class MessageModel implements Serializable {
    private static final long serialVersionUID = -2765465476568049L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "receiver_id", nullable = false)
    private UserModel receiver;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private UserModel sender;

    @Column(name = "content", nullable = false, length = 500)
    private String content;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDateTime creationDate;

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;

    public MessageDTO toDTOIn() {
        return new MessageDTO(new UserDTO(this.receiver), new UserDTO(this.receiver), this.content);
    }

    public com.cpe.springboot.message.dto.out.MessageDTO toDTOOut() {
        return new com.cpe.springboot.message.dto.out.MessageDTO(this.id,new UserDTO(this.receiver), new UserDTO(this.sender), this.content, this.creationDate, this.lastModifiedDate);
    }
}