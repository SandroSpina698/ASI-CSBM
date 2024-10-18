package com.cpe.springboot.sse;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@CrossOrigin
@AllArgsConstructor
public class SseController {
    private final SseService sseService;

    @GetMapping("/subscribe")
    public SseEmitter subscribe(){
        return sseService.subscribe();
    }

}
