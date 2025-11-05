package com.ecommerce.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    
    private Long totalProducts;
    private Long activeProducts;
    private Long totalCategories;
    private Long outOfStockProducts;
    private Long featuredProducts;
    private Long newArrivals;
    private Double averagePrice;
    private Long totalBrands;
}
