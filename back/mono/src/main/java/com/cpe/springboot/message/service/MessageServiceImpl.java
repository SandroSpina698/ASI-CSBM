package com.cpe.springboot.message.service;

import com.cpe.springboot.message.controller.MessageRepository;
import com.cpe.springboot.message.dto.in.MessageVM;
import com.cpe.springboot.message.dto.out.MessageDTO;
import com.cpe.springboot.message.exceptions.MessageNotFoundException;
import com.cpe.springboot.message.exceptions.ReceiverNotFoundException;
import com.cpe.springboot.message.exceptions.SenderNotFoundException;
import com.cpe.springboot.message.model.MessageModel;
import com.cpe.springboot.user.controller.UserRepository;
import com.cpe.springboot.user.model.UserModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Override
    public List<MessageDTO> getAllMessages() {
        List<MessageModel> allMessagesEntities = messageRepository.findAll();
        return allMessagesEntities.stream().map(MessageModel::toDTOOut).toList();
    }

    @Override
    public List<MessageDTO> getMessagesBySenderAndReceiver(int senderId, int receiverId) {
        log.info("Getting all messages for sender {} and receiver {}", senderId, receiverId);
        List<MessageModel> messages = messageRepository
                .findAllByReceiver_IdAndSender_IdOrderByCreationDateAsc(receiverId, senderId)
                .orElse(Collections.emptyList());
        return messages.stream().map(MessageModel::toDTOOut).toList();
    }

    @Override
    public List<MessageDTO> getMessagesBySenderId(int senderId) {
        List<MessageModel> messages = messageRepository.findAllBySender_Id(senderId)
                .orElse(Collections.emptyList());
        return messages.stream().map(MessageModel::toDTOOut).toList();
    }

    @Override
    public List<MessageDTO> getMessagesByReceiverId(int recipientId) {
        List<MessageModel> messages = messageRepository.findAllByReceiver_Id(recipientId)
                .orElse(Collections.emptyList());
        return messages.stream().map(MessageModel::toDTOOut).toList();
    }

    @Override
    public MessageDTO getMessageById(int messageId) {
        MessageModel message = messageRepository.findById(messageId)
                .orElseThrow(() -> new MessageNotFoundException("Message not found"));
        return message.toDTOOut();
    }

    @Override
    public MessageDTO getLastMessage() {
        MessageModel message = messageRepository.findFirstByOrderByCreationDateAsc()
                .orElseThrow(() -> new MessageNotFoundException("Message not found"));
        return message.toDTOOut();
    }

    @Override
    public MessageDTO addMessage(com.cpe.springboot.message.dto.in.MessageDTO newMessage) {
        MessageModel savedMessage = newMessage.toModel();
        return messageRepository.save(savedMessage).toDTOOut();
    }

    @Override
    public MessageDTO addMessage(MessageVM newMessage) {
        UserModel receiverModel = userRepository.findById(newMessage.getReceiver()).orElseThrow(() -> new ReceiverNotFoundException("Receiver not found"));
        UserModel senderModel = userRepository.findById(newMessage.getSender()).orElseThrow(() -> new SenderNotFoundException("Sender not found"));

        MessageModel savedMessage = MessageModel
                .builder()
                .receiver(receiverModel)
                .sender(senderModel)
                .content(newMessage.getContent())
                .creationDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .build();

        return messageRepository.save(savedMessage).toDTOOut();
    }

    @Override
    public MessageDTO editMessage(int messageToUpdateId, String newMessageContent) {
        MessageModel message = messageRepository.findById(messageToUpdateId)
                .orElseThrow(() -> new MessageNotFoundException("Message not found"));
        message.setContent(newMessageContent);
        return messageRepository.save(message).toDTOOut();
    }

    @Override
    public boolean deleteMessage(int messageToDeleteId, int triggererId) throws IllegalAccessException {
        MessageModel message = messageRepository.findById(messageToDeleteId)
                .orElseThrow(() -> new MessageNotFoundException("Message not found"));

        if (message.getSender().getId() != triggererId && message.getReceiver().getId() != triggererId) {
            throw new IllegalAccessException("Action interdite");
        }

        messageRepository.delete(message);
        return true;
    }
}

