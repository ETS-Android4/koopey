package com.koopey.api.repository;

import com.koopey.api.model.entity.Review;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends BaseRepository<Review, UUID>{

    public Long countByAssetId(UUID assetId);

    public Long countByClientId(UUID clientId);

    public List<Review> findByAssetId(UUID assetId);

    public List<Review> findByClientId(UUID clientId);

}