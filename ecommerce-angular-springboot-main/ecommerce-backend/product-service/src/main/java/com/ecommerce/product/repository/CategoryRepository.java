package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    Optional<Category> findByName(String name);
    
    @Query("SELECT c FROM Category c WHERE c.parent IS NULL ORDER BY c.displayOrder")
    List<Category> findRootCategories();
    
    @Query("SELECT c FROM Category c WHERE c.parent.id = :parentId ORDER BY c.displayOrder")
    List<Category> findByParentId(Long parentId);
    
    boolean existsByName(String name);
}
