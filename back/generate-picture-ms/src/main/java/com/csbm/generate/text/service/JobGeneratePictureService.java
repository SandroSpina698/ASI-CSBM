package com.csbm.generate.text.service;

import com.csbm.generate.text.model.DTO.ImageRequestDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.web.client.RestTemplate;

public class JobGeneratePictureService {
    private final ObjectMapper om = new ObjectMapper();

    @Value("${generate.server}")
    private String serverGen;

    @Value("${mono.server}")
    private String monoServer;

    @Autowired
    private RestTemplate restTemplate;

    @JmsListener(destination = "gen-pic",containerFactory = "jmsListenerContainerFactory")
    public void receivedMessage(String json) {
        ImageRequestDTO imageRequestDTO = null;
        try{
            imageRequestDTO = om.readValue(json, ImageRequestDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Parsing error");
        }
        sendResponseToMono(generatePicture(imageRequestDTO));
    }

    public ImageRequestDTO generatePicture(ImageRequestDTO imageRequestDTO) {
        String url = serverGen + "/prompt/req";
        System.out.println("Beginning generation ...");
        JsonNode response = restTemplate.postForObject(url, imageRequestDTO, JsonNode.class);
        System.out.println("End of generation ...");
        imageRequestDTO.getMetadata().put("url",serverGen+response.get("url").asText());
        return imageRequestDTO;
    }

    public void sendResponseToMono(ImageRequestDTO imageRequestDTO) {
        String url = monoServer;
        System.out.println("Response to mono server ... (url : "+imageRequestDTO.getMetadata().get("url")+")");
        Boolean response = restTemplate.postForObject(url, imageRequestDTO, Boolean.class);
    }
}
