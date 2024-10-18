package com.cpe.springboot.job.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @OneToMany(mappedBy = "job", fetch = FetchType.LAZY)
    private List<JobStep> steps;
    @Enumerated(EnumType.STRING)
    private JobStatus status;
    @ElementCollection
    @CollectionTable(name = "job_metadata", joinColumns = @JoinColumn(name = "job_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    private Map<String, String> metadata;
}
