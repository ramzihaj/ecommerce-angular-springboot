package com.ecommerce.product.service;

import com.ecommerce.product.dto.DashboardStatsDto;
import com.ecommerce.product.repository.CategoryRepository;
import com.ecommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatsService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    @Cacheable(value = "dashboardStats")
    public DashboardStatsDto getDashboardStats() {
        log.info("Calculating dashboard statistics");
        
        Long totalProducts = productRepository.count();
        Long activeProducts = totalProducts; // Tous les produits sont actifs par défaut
        Long totalCategories = categoryRepository.count();
        Long outOfStockProducts = productRepository.countByStockQuantityLessThanEqual(0);
        Long featuredProducts = productRepository.countByIsFeaturedTrue();
        Long newArrivals = 0L; // TODO: Implémenter logique basée sur createdAt
        
        // Calculate average price
        Double averagePrice = productRepository.findAll()
                .stream()
                .map(product -> product.getDiscountPrice() != null && 
                               product.getDiscountPrice().compareTo(product.getPrice()) < 0 
                               ? product.getDiscountPrice() 
                               : product.getPrice())
                .mapToDouble(BigDecimal::doubleValue)
                .average()
                .orElse(0.0);
        
        // Count distinct brands
        Long totalBrands = productRepository.findAll()
                .stream()
                .map(product -> product.getBrand())
                .filter(brand -> brand != null && !brand.isEmpty())
                .distinct()
                .count();
        
        return DashboardStatsDto.builder()
                .totalProducts(totalProducts)
                .activeProducts(activeProducts)
                .totalCategories(totalCategories)
                .outOfStockProducts(outOfStockProducts)
                .featuredProducts(featuredProducts)
                .newArrivals(newArrivals)
                .averagePrice(averagePrice)
                .totalBrands(totalBrands)
                .build();
    }
}
