package com.cpe.springboot.sse;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;


@Service
public class SseService {

    private SseEmitter emitter;
    private Long lastId = 0L;


    public SseEmitter subscribe() {
        this.emitter = new SseEmitter(600000L);
        try {
            this.emitter.send(SseEmitter.event()
                    .name("message")
                    .id("" + lastId++)
                    .data("connexion"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return this.emitter;
    }

    public void sendMessage(String messageName, Object data) {
        if (this.emitter != null){
            try {
                this.emitter.send(SseEmitter.event()
                        .name(messageName)
                        .id("" + ++lastId)
                        .data(data));
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error send in sse emiter.");
            }
        }
    }
}