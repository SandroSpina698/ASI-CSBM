package com.cpe.springboot.message.controller;

import com.cpe.springboot.message.dto.in.MessageVM;
import com.cpe.springboot.message.dto.out.MessageDTO;
import com.cpe.springboot.message.service.MessageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageControllerImpl implements MessageController {

    private final MessageServiceImpl messageService;

    @Override
    public ResponseEntity<List<MessageDTO>> getAll() {
        List<MessageDTO> messageDTOList = messageService.getAllMessages();
        if (messageDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(messageDTOList);
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getAllByReceiverAndSenderId(int senderId, int receiverId) {
        return ResponseEntity.ok(messageService.getMessagesBySenderAndReceiver(senderId, receiverId));
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getBySenderId(int senderId) {
        return ResponseEntity.ok(messageService.getMessagesBySenderId(senderId));
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getByRecipientId(int recipientId) {
        return ResponseEntity.ok(messageService.getMessagesByReceiverId(recipientId));
    }

    @Override
    public ResponseEntity<MessageDTO> getMessageById(int messageId) {
        return ResponseEntity.ok(messageService.getMessageById(messageId));
    }

    @Override
    public ResponseEntity<MessageDTO> getLastMessage() {
        return ResponseEntity.ok(messageService.getLastMessage());
    }

    @Override
    public ResponseEntity<MessageDTO> addMessage(com.cpe.springboot.message.dto.in.MessageDTO newMessage) {
        return ResponseEntity.ok(messageService.addMessage(newMessage));
    }

    @Override
    public ResponseEntity<MessageDTO> addMessage(MessageVM newMessage) {
        return ResponseEntity.ok(messageService.addMessage(newMessage));
    }

    @Override
    public ResponseEntity<MessageDTO> editMessage(int messageToUpdateId, String newMessageContent) {
        return ResponseEntity.ok(messageService.editMessage(messageToUpdateId, newMessageContent));
    }

    @Override
    public ResponseEntity<Boolean> deleteMessage(int messageToDeleteId, int triggererId) {
        try {
            return ResponseEntity.ok(messageService.deleteMessage(messageToDeleteId, triggererId));
        } catch (IllegalAccessException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        }
    }
}
