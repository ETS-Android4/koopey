package com.koopey.api.repository;

import com.koopey.api.model.entity.Transaction;
import com.koopey.api.repository.base.AuditRepository;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TransactionRepository extends AuditRepository<Transaction, UUID> {

        public long countByAssetId(UUID assetId);

        public long countByBuyerId(UUID userId);

        public long countByDestinationIdAndSellerIdAndBuyerIdAndSourceIdAndAssetId(UUID destinationId, UUID sellerId,
                        UUID buyerId, UUID sourceId, UUID assetId);

        public long countByIdAndAssetId(UUID id, UUID assetId);

        public long countByIdAndBuyerId(UUID id, UUID buyerId);

        public long countByIdAndSellerId(UUID id, UUID sellerId);

        public long countBySellerId(UUID userId);

        @Transactional
        public void deleteByAssetId(UUID assetId);

        @Transactional
        public void deleteByBuyerId(UUID userId);

        @Transactional
        public void deleteByDestinationId(UUID locationId);

        @Transactional
        public void deleteBySellerId(UUID userId);

        @Transactional
        public void deleteBySourceId(UUID locationId);

        public List<Transaction> findByAssetId(UUID assetId);

        public Page<List<Transaction>> findByAssetId(UUID assetId, Pageable pagable);

        public List<Transaction> findByAssetIdNotNullAndBuyerIdAndDestinationIdNotNullAndSellerIdNotNullAndSourceIdNotNull(UUID userId);

        public Page<List<Transaction>> findByAssetIdNotNullAndBuyerIdAndDestinationIdNotNullAndSellerIdNotNullAndSourceIdNotNull(UUID userId, Pageable pagable);

        public List<Transaction> findByAssetIdNotNullAndSellerIdAndSourceIdNotNull(UUID userId);

        public Page<List<Transaction>> findByAssetIdNotNullAndSellerIdAndSourceIdNotNull(UUID userId, Pageable pagable);

        public List<Transaction> findByAssetIdNotNullAndSellerIdNotNullAndSourceIdNotNullAndType(String type);

        public Page<List<Transaction>> findByAssetIdNotNullAndSellerIdNotNullAndSourceIdNotNullAndType(String type, Pageable pagable);

        public List<Transaction> findByBuyerId(UUID userId);

        public Page<List<Transaction>> findByBuyerId(UUID userId, Pageable pagable);

        public List<Transaction> findByBuyerIdOrSellerId(UUID userAId, UUID userBId);

        public Page<List<Transaction>> findByBuyerIdOrSellerId(UUID userAId, UUID userBId, Pageable pagable);

        public List<Transaction> findByBuyerIdOrSellerIdAndEndBetween(UUID userAId, UUID userBId, Date start, Date end);

        public Page<List<Transaction>> findByBuyerIdOrSellerIdAndEndBetween(UUID userAId, UUID userBId, Date start,
                        Date end, Pageable pagable);

        public List<Transaction> findByDestinationId(UUID locationId);

        public Page<List<Transaction>> findByDestinationId(UUID locationId, Pageable pagable);

        public List<Transaction> findBySellerId(UUID userId);

        public Page<List<Transaction>> findBySellerId(UUID userId, Pageable pagable);

        public List<Transaction> findBySourceId(UUID locationId);

        public Page<List<Transaction>> findBySourceId(UUID locationId, Pageable pagable);

}
