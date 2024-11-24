package com.cpe.springboot.message.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionTranslator {
    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<String> handleMessageNotFoundException(MessageNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The searched message was not found");
    }

    @ExceptionHandler(ReceiverNotFoundException.class)
    public ResponseEntity<String> handleReceiverNotFoundException(ReceiverNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The message's receiver could not be found");
    }

    @ExceptionHandler(SenderNotFoundException.class)
    public ResponseEntity<String> handleReceiverNotFoundException(SenderNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The message's sender could not be found");
    }
}
