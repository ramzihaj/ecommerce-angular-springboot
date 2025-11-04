package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    
    Optional<Content> findByKey(String key);
    
    List<Content> findByActiveTrue();
    
    boolean existsByKey(String key);
}
