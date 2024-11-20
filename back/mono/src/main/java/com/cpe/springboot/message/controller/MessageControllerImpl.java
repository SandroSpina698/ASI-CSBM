package com.cpe.springboot.message.controller;

import com.cpe.springboot.message.dto.out.MessageDTO;
import com.cpe.springboot.message.model.MessageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageControllerImpl implements MessageController {

    private final MessageRepository messageRepository;

    @Override
    public ResponseEntity<List<MessageDTO>> getAll() {
        List<MessageModel> allMessagesEntities = Optional.of(messageRepository.findAll()).orElseGet(Collections::emptyList);

        if (allMessagesEntities.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<MessageDTO> messageDTOList = allMessagesEntities
                .stream()
                .map(MessageModel::toDTOOut)
                .toList();

        return ResponseEntity.ok(messageDTOList);
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getAllByReceiverAndSenderId(int senderId, int receiverId) {
        List<MessageModel> messages = messageRepository
                .findAllByReceiver_IdAndSender_IdOrderByCreationDateAsc(receiverId, senderId)
                .orElse(Collections.emptyList());

        List<MessageDTO> messageDTOs = messages.stream()
                .map(MessageModel::toDTOOut)
                .toList();

        return ResponseEntity.ok(messageDTOs);
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getBySenderId(int senderId) {
        List<MessageModel> messages = messageRepository
                .findAllBySender_Id(senderId)
                .orElse(Collections.emptyList());

        List<MessageDTO> messageDTOs = messages.stream()
                .map(MessageModel::toDTOOut)
                .toList();

        return ResponseEntity.ok(messageDTOs);
    }

    @Override
    public ResponseEntity<List<MessageDTO>> getByRecipientId(int recipientId) {
        List<MessageModel> messages = messageRepository
                .findAllByReceiver_Id(recipientId)
                .orElse(Collections.emptyList());

        List<MessageDTO> messageDTOs = messages.stream()
                .map(MessageModel::toDTOOut)
                .toList();

        return ResponseEntity.ok(messageDTOs);
    }

    @Override
    public ResponseEntity<MessageDTO> getMessageById(int messageId) {
        MessageModel messages;
        try {
            messages = messageRepository
                    .findById(messageId).orElseThrow(NoSuchElementException::new);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(messages.toDTOOut());
    }

    @Override
    public ResponseEntity<MessageDTO> getLastMessage() {
        MessageModel message;
        try {
            message = messageRepository.findFirstByOrderByCreationDateAsc().orElseThrow(NoSuchElementException::new);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(message.toDTOOut());
    }

    @Override
    public ResponseEntity<MessageDTO> addMessage(com.cpe.springboot.message.dto.in.MessageDTO newMessage) {
        MessageModel savedMessage = newMessage.toModel();

        return ResponseEntity.ok(messageRepository.save(savedMessage).toDTOOut());
    }

    @Override
    public ResponseEntity<MessageDTO> editMessage(int messageToUpdateId, String newMessageContent) {
        try {
            MessageModel message = messageRepository.findById(messageToUpdateId)
                    .orElseThrow(NoSuchElementException::new);

            message.setContent(newMessageContent);

            MessageModel updatedMessage = messageRepository.save(message);

            return ResponseEntity.ok(updatedMessage.toDTOOut());
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }


    @Override
    public ResponseEntity<Boolean> deleteMessage(int messageToDeleteId, int triggererId) {
        try {
            MessageModel message = messageRepository.findById(messageToDeleteId)
                    .orElseThrow(NoSuchElementException::new);

            if (message.getSender().getId() != triggererId && message.getReceiver().getId() != triggererId) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
            }

            messageRepository.delete(message);

            return ResponseEntity.ok(true);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
