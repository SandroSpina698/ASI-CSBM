package com.cpe.springboot.generation.controller;

import com.cpe.springboot.generation.model.ResultDTO;
import com.cpe.springboot.job.model.JobResultDTO;
import com.cpe.springboot.store.model.CardGenerationOrder;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(value = "/card-generation")
@RestController
@AllArgsConstructor
public class CardGenerationGenerationController {

    private final CardGenerationService generationService;

    @RequestMapping(method = RequestMethod.POST, value = "/generate")
    public int generate(@RequestBody CardGenerationOrder generationOrder){
        return generationService.generate(generationOrder);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/continue")
    public boolean continueGeneration(@RequestBody ResultDTO resultDTO){
        return generationService.continueGeneration(resultDTO);
    }
}
