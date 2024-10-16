package com.csbm.generate_picture.model.DTO;

import com.csbm.generate_picture.model.DAO.JobResultDAO;

import java.util.Map;

public class JobResultDTO {

    private int job_id;
    private Map<String,String> metadata;

    JobResultDAO toDao() {
        return new JobResultDAO(this.job_id,this.metadata);
    }
}
