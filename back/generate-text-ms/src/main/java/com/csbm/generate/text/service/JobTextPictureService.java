package com.csbm.generate.text.service;

import com.csbm.generate.text.model.DTO.TextGenerateDTO;
import com.csbm.generate.text.model.DTO.TextRequestDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.web.client.RestTemplate;

public class JobTextPictureService {
    private final ObjectMapper om = new ObjectMapper();

    @Value("${generate.server}")
    private String serverGen;

    @Value("${mono.server}")
    private String monoServer;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TextGenerateDTO textGenerateDTO;

    @JmsListener(destination = "gen-text",containerFactory = "jmsListenerContainerFactory")
    public void receivedMessage(String json) {
        TextRequestDTO textRequestDTO = null;
        try{
            textRequestDTO = om.readValue(json, TextRequestDTO.class);
            textGenerateDTO.setPrompt(textRequestDTO.getMetadata().get("prompt"));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Parsing error");
        }
        sendResponseToMono(generateText(textGenerateDTO,textRequestDTO));
    }

    public TextRequestDTO generateText(TextGenerateDTO textGenerateDTO, TextRequestDTO textRequestDTO) {
        String url = serverGen + "/api/generate";
        System.out.println("Beginning generation ...");
        JsonNode response = restTemplate.postForObject(url, textGenerateDTO, JsonNode.class);
        System.out.println("End of generation ...");
        textRequestDTO.getMetadata().put("description", response.get("response").asText());
        return textRequestDTO;
    }

    public void sendResponseToMono(TextRequestDTO textRequestDTO) {
        String url = monoServer;
        System.out.println("Response to mono server ... (description : "+ textRequestDTO.getMetadata().get("description")+")");
        Boolean response = restTemplate.postForObject(url, textRequestDTO, Boolean.class);
    }
}
