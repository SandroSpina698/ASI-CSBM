package com.csbm.generate_picture.model.DAO;

import java.util.Map;

public class JobResultDAO {

    private int job_id;
    private Map<String,String> metadata;

    public JobResultDAO(int jobId, Map<String, String> metadata) {
        this.job_id = jobId;
        this.metadata = metadata;
    }
}
