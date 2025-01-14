package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Comments;
import org.example.is_coursework.entities.Intermediate_result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> getAllByIntermediateresult_Id(long intermediate_result);
}
