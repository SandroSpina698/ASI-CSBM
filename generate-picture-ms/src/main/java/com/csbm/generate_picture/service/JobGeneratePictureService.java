package com.csbm.generate_picture.service;

import com.csbm.generate_picture.model.DTO.ImageRequestDTO;
import org.springframework.jms.annotation.JmsListener;

public class JobGeneratePictureService {

    @JmsListener(destination = "gen-pic",containerFactory = "jmsListenerContainerFactory")
    public void receivedMessage(String imageRequestDTO) {
        System.out.println("Message reçu depuis le topic genPic : " + imageRequestDTO);
    }
}
