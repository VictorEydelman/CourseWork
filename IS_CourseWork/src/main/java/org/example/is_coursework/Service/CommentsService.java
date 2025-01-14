package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Comments;
import org.example.is_coursework.entities.Intermediate_result;
import org.example.is_coursework.repository.CommentsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;
    public CommentsService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    public void save(Comments comment) {
        commentsRepository.save(comment);
    }
    public List<Comments> getByIntermediate_result_Id(long intermediate_result) {
        return commentsRepository.getAllByIntermediateresult_Id(intermediate_result);
    }
}
