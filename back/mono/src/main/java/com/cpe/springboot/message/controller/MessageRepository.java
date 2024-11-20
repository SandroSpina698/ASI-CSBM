package com.cpe.springboot.message.controller;

import com.cpe.springboot.message.model.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<MessageModel, Integer> {
    Optional<List<MessageModel>> findAllByReceiver_Id(Integer receiver_id);

    Optional<List<MessageModel>> findAllBySender_Id(Integer sender_id);

    Optional<List<MessageModel>> findAllByReceiver_IdAndSender_IdOrderByCreationDateAsc(Integer receiver_id, Integer sender_id);

    Optional<MessageModel> findDistinctFirstByReceiver_IdAndSender_IdOrderByCreationDateAsc(Integer receiver_id, Integer sender_id);

    Optional<MessageModel> findFirstByOrderByCreationDateAsc();
}
