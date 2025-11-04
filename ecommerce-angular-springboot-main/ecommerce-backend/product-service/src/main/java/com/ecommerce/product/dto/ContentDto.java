package com.ecommerce.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentDto {
    
    private Long id;
    private String key;
    private String title;
    private String content;
    private String contentAr;
    private String metaTitle;
    private String metaDescription;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
