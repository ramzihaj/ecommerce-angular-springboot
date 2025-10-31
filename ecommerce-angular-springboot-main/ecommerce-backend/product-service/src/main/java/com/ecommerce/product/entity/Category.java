package com.ecommerce.product.entity;

import com.ecommerce.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {
    
    @NotBlank(message = "Category name is required")
    @Column(unique = true, nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;
    
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Category> subcategories = new HashSet<>();
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Product> products = new HashSet<>();
    
    @Column(name = "display_order")
    private Integer displayOrder;
}
