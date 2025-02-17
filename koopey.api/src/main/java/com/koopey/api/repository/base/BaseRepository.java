package com.koopey.api.repository.base;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<E, I extends Serializable> extends JpaRepository<E, I> {

}
