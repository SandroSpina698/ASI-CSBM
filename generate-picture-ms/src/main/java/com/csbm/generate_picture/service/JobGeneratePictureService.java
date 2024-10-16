package com.csbm.generate_picture.service;

import com.csbm.generate_picture.model.DTO.JobResultDTO;
import org.springframework.jms.annotation.JmsListener;

public class JobGeneratePictureService {

    @JmsListener(destination = "genPic")
    public void processPictureGeneration(JobResultDTO jobResultDTO) {
        System.out.println();
    }
}
