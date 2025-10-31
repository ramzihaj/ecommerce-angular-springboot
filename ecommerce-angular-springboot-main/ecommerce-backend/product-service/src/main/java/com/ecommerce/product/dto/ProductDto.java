package com.ecommerce.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Integer discountPercent;
    private Integer stockQuantity;
    private Long categoryId;
    private String categoryName;
    private String brand;
    private List<String> imageUrls;
    private Set<String> availableColors;
    private Set<String> availableSizes;
    private Double averageRating;
    private Integer reviewCount;
    private Boolean isFeatured;
    private String sku;
}
