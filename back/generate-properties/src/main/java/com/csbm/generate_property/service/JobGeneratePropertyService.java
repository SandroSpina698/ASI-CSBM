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
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import static tp.cpe.ImgToProperties.getPropertiesFromImg;

public class JobGeneratePropertyService {
    private final ObjectMapper om = new ObjectMapper();

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
            e.printStackTrace();
            System.out.println("Parsing error");
        }
        sendResponseToMono(generateProperties(propsRequest));
    }

    public PropsRequest generateProperties(PropsRequest propsRequest)  {
        //String imgUrl = propsRequest.getMetadata().get("url");
        String imgUrl = "http://localhost:10000/imgs/default-2.jpg";

        URL imageUrl = null;
        try {
            imageUrl = new URL(imgUrl);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            System.out.println("Url build error");
        }

        BufferedImage image = null;
        try {
            image = ImageIO.read(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Image reading error from url : " + imageUrl);
        }

        System.out.println("Beginning generation of properties ...");
        Map<String, Float> properties = getPropertiesFromImg(imgUrl, 100f, 4,(new Random()).nextFloat(), false);
        System.out.println("End of generation ...");

        for (Map.Entry<String, Float> propEntry : properties.entrySet()){
            propsRequest.getMetadata().put(propEntry.getKey(),String.valueOf(propEntry.getValue()));
        }

        return propsRequest;
    }

    public void sendResponseToMono(PropsRequest propsRequest) {
        String url = monoServer;
        Boolean response = restTemplate.postForObject(url, propsRequest, Boolean.class);
    }
}
