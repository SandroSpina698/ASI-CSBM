package com.cpe.springboot.message.service;

import com.cpe.springboot.message.dto.out.MessageDTO;

import java.util.List;

public interface MessageService {

    /**
     * @return a list of all Message DTO
     */
    List<MessageDTO> getAllMessages();

    /**
     * Get a specific conversation, one side, we have to do the opposite way then to get the whole discussion
     * @param senderId - The message creator
     * @param receiverId - The message recipient
     * @return - One side of a discussion
     */
    List<MessageDTO> getMessagesBySenderAndReceiver(int senderId, int receiverId);

    /**
     * Get all the messages sent by a given user.
     * @param senderId - The messages creator
     * @return - All the messages sent by a given user from its ID.
     */
    List<MessageDTO> getMessagesBySenderId(int senderId);

    /**
     * Get all the messages received by a given user.
     * @param recipientId - The messages recipient
     * @return - All the messages received by a given user from its ID.
     */
    List<MessageDTO> getMessagesByReceiverId(int recipientId);

    /**
     * Get one message
     * @param messageId - The message ID
     * @return The corresponding message
     */
    MessageDTO getMessageById(int messageId);

    /**
     * Get the most recent message
     * @return - The most recently added message in the db
     */
    MessageDTO getLastMessage();

    /**
     * Saves a message from DTO
     * @param newMessage - The message to save
     * @return The added message if it was
     */
    MessageDTO addMessage(com.cpe.springboot.message.dto.in.MessageDTO newMessage);

    /**
     * Saves a message from VM (only sender and receiver IDs)
     * @param newMessage - The message to save
     * @return The added message if it was
     */
    MessageDTO addMessage(com.cpe.springboot.message.dto.in.MessageVM newMessage);

    /**
     * Edit an existing message
     * @param messageToUpdateId - The ID of the message to update
     * @param newMessageContent - The new content
     * @return - The edited message if it worked
     */
    MessageDTO editMessage(int messageToUpdateId, String newMessageContent);

    /**
     * Delete a message
     * @param messageToDeleteId - The id of the message we want to delete
     * @param triggererId - The user who wants to delete the message
     * @return true if it worked; false otherwise
     * @throws IllegalAccessException
     */
    boolean deleteMessage(int messageToDeleteId, int triggererId) throws IllegalAccessException;

}
