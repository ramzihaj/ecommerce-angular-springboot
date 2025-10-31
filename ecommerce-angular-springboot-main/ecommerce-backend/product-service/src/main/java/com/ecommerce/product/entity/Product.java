package com.ecommerce.product.entity;

import com.ecommerce.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_name", columnList = "name"),
    @Index(name = "idx_category", columnList = "category_id"),
    @Index(name = "idx_brand", columnList = "brand")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {
    
    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(length = 2000)
    private String description;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @DecimalMin(value = "0.0", message = "Discount price must be positive")
    @Column(name = "discount_price", precision = 10, scale = 2)
    private BigDecimal discountPrice;
    
    @Column(name = "discount_percent")
    private Integer discountPercent;
    
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Column(nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    private String brand;
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "color")
    @Builder.Default
    private Set<String> availableColors = new HashSet<>();
    
    @ElementCollection
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "size")
    @Builder.Default
    private Set<String> availableSizes = new HashSet<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();
    
    @Column(name = "average_rating")
    @Builder.Default
    private Double averageRating = 0.0;
    
    @Column(name = "review_count")
    @Builder.Default
    private Integer reviewCount = 0;
    
    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;
    
    @Column(name = "view_count")
    @Builder.Default
    private Long viewCount = 0L;
    
    private String sku;
    
    @Column(name = "meta_title")
    private String metaTitle;
    
    @Column(name = "meta_description")
    private String metaDescription;
}
