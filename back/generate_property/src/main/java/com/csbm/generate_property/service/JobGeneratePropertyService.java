package com.csbm.generate_property.service;

import com.csbm.generate_property.model.DTO.PropsRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import tp.cpe.ImgToProperties;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.*;

public class JobGeneratePropertyService {
    private final ObjectMapper om = new ObjectMapper();

    @Value("${generate.server}")
    private String serverGen;

    @Value("${mono.server}")
    private String monoServer;

    @Autowired
    private RestTemplate restTemplate;

    @JmsListener(destination = "gen-props",containerFactory = "jmsListenerContainerFactory")
    public void receivedMessage(String json) {
        PropsRequest propsRequest = null;
        try{
            propsRequest = om.readValue(json, PropsRequest.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Parsing error");
        }
        sendResponseToMono(generateProperties(propsRequest));
    }

    public PropsRequest generateProperties(PropsRequest propsRequest)  {
        try {

            String url = serverGen + "/prompt/req";
//        String url = propsRequest.getMetadata().get("url");
        System.out.println("Beginning generation of properties ...");
        String imgUrl = propsRequest.getMetadata().get("url");
        URL imageUrl = new URL(imgUrl);
        BufferedImage image = ImageIO.read(imageUrl);
        Set<Integer> colors = new HashSet<>();

        int sumOfColors = 0;

        // Loop through every pixel
        for (int y = 0; y < image.getHeight(); y++) {
            for (int x = 0; x < image.getWidth(); x++) {
                int rgb = image.getRGB(x, y);  // Get RGB value
                if (colors.add(rgb)) {  // Add only distinct values
                    sumOfColors += rgb;  // Add the value to the sum
                }
            }
        }

        Map<String, Float> result = ImgToProperties.getPropertiesFromImg(imgUrl, 100f, sumOfColors,(new Random()).nextFloat(), false);
        System.out.println("End of generation ...");

        return propsRequest;
    } catch (IOException e) {
        e.printStackTrace();
    };
        return propsRequest;
    }

    public void sendResponseToMono(PropsRequest propsRequest) {
        String url = monoServer;
        System.out.println("Response to mono server ... (url : "+propsRequest.getMetadata().get("url")+")");
        Boolean response = restTemplate.postForObject(url, propsRequest, Boolean.class);
    }
}
