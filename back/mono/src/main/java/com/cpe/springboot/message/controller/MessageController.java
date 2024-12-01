package com.cpe.springboot.message.controller;


import com.cpe.springboot.message.dto.in.MessageVM;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface MessageController {

    @GetMapping("/all")
    ResponseEntity<List<com.cpe.springboot.message.dto.out.MessageDTO>> getAll();

    @GetMapping("/conversation/{senderId}/{receiverId}")
    ResponseEntity<List<com.cpe.springboot.message.dto.out.MessageDTO>> getAllByReceiverAndSenderId(@PathVariable("senderId") int senderId, @PathVariable("receiverId") int receiverId);

    @GetMapping("/sender/{senderId}")
    ResponseEntity<List<com.cpe.springboot.message.dto.out.MessageDTO>> getBySenderId(@PathVariable int senderId);

    @GetMapping("/recipient/{recipientId}")
    ResponseEntity<List<com.cpe.springboot.message.dto.out.MessageDTO>> getByRecipientId(@PathVariable int recipientId);

    @GetMapping("/{messageId}")
    ResponseEntity<com.cpe.springboot.message.dto.out.MessageDTO> getMessageById(@PathVariable int messageId);

    @GetMapping("/last")
    ResponseEntity<com.cpe.springboot.message.dto.out.MessageDTO> getLastMessage();

    @PostMapping("/post")
    ResponseEntity<com.cpe.springboot.message.dto.out.MessageDTO> addMessage(@RequestBody com.cpe.springboot.message.dto.in.MessageDTO newMessage);

    @PostMapping("/create")
    ResponseEntity<com.cpe.springboot.message.dto.out.MessageDTO> addMessage(@RequestBody MessageVM newMessage);

    @PutMapping("/edit/{messageToUpdateId}")
    ResponseEntity<com.cpe.springboot.message.dto.out.MessageDTO> editMessage(@PathVariable int messageToUpdateId, @RequestBody String newMessage);

    @DeleteMapping("/{messageToDeleteId}/{triggererId}")
    ResponseEntity<Boolean> deleteMessage(@PathVariable int messageToDeleteId, @PathVariable int triggererId);
}
