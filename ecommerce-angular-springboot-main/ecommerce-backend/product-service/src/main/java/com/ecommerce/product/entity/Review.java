package com.ecommerce.product.entity;

import com.ecommerce.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_product", columnList = "product_id"),
    @Index(name = "idx_user", columnList = "user_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @NotNull(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "user_name")
    private String userName;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    @Column(nullable = false)
    private Integer rating;
    
    @NotBlank(message = "Review comment is required")
    @Column(length = 2000)
    private String comment;
    
    @Column(name = "is_verified_purchase")
    @Builder.Default
    private Boolean isVerifiedPurchase = false;
}
