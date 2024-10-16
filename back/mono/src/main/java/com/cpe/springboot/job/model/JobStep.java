package com.cpe.springboot.job.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobStep {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @ElementCollection
    @CollectionTable(name = "job_step_metadata", joinColumns = @JoinColumn(name = "job_step_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    private Map<String, String> metadata;

    private String type;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @Transient
    private Runnable runnable;
}
