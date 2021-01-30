package com.phamvanquyen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.phamvanquyen.entity.UserEntity;

public interface UserRepositoty extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserName(String userName);

    List<UserEntity> findByRole(String role);

    @Query(value = "select * from user order by id asc limit ?1,?2", nativeQuery = true)
    List<UserEntity> getUsers(int offset, int limit);

}
