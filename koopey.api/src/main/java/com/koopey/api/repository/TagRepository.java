package com.koopey.api.repository;

import com.koopey.api.model.entity.Tag;
import com.koopey.api.repository.base.AuditRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends AuditRepository<Tag, UUID> {

    @Query("SELECT t.id, t.cn, t.type FROM Tag t" )
    List<Tag> findAllChinese();

    Page<Tag> findByCnContains(String str, Pageable pagable);

    List<Tag> findTop10ByCnContains(String str);

    @Query("SELECT t.id, t.en, t.type FROM Tag t" )
    List<Tag> findAllEnglish();

    Page<Tag> findByEnContains(String str, Pageable pagable);

    List<Tag> findTop10ByEnContains(String str);

    @Query("SELECT t.id, t.de, t.type FROM Tag t" )
    List<Tag> findAllGerman();

    Page<Tag> findByDeContains(String str, Pageable pagable); 

    List<Tag> findTop10ByDeContains(String str);

    @Query("SELECT t.id, t.es, t.type FROM Tag t" )
    List<Tag> findAllSpanish();

    Page<Tag> findByEsContains(String str, Pageable pagable);

    List<Tag> findTop10ByEsContains(String str);

    @Query("SELECT t.id, t.fr, t.type FROM Tag t" )
    List<Tag> findAllFrench();

    Page<Tag> findByFrContains(String str, Pageable pagable);

    List<Tag> findTop10ByFrContains(String str);

    @Query("SELECT t.id, t.it, t.type FROM Tag t" )
    List<Tag> findAllItalian();

    Page<Tag> findByItContains(String str, Pageable pagable);

    List<Tag> findTop10ByItContains(String str);

    @Query("SELECT t.id, t.nl, t.type FROM Tag t" )
    List<Tag> findAllDutch();

    Page<Tag> findByNlContains(String str, Pageable pagable);

    List<Tag> findTop10ByNlContains(String str);

    @Query("SELECT t.id, t.pt, t.type FROM Tag t" )
    List<Tag> findAllPortuguese();

    Page<Tag> findByPtContains(String str, Pageable pagable);

    List<Tag> findTop10ByPtContains(String str);

    List<Tag> findByType(String type);

}