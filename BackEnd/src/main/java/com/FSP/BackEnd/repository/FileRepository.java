package com.FSP.BackEnd.repository;

import com.FSP.BackEnd.model.FileEntity;
import com.FSP.BackEnd.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByUser(UserEntity user);
}
