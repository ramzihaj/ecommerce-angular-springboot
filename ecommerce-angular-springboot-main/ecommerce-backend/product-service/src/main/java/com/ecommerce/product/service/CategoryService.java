package com.ecommerce.product.service;

import com.ecommerce.common.exception.ResourceNotFoundException;
import com.ecommerce.product.dto.CategoryDto;
import com.ecommerce.product.entity.Category;
import com.ecommerce.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    @Cacheable(value = "categories", key = "#id")
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return mapToDto(category);
    }
    
    @Cacheable(value = "categories")
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }
    
    @Cacheable(value = "rootCategories")
    public List<CategoryDto> getRootCategories() {
        return categoryRepository.findRootCategories()
                .stream()
                .map(this::mapToDtoWithSubcategories)
                .toList();
    }
    
    public List<CategoryDto> getSubcategories(Long parentId) {
        return categoryRepository.findByParentId(parentId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
    
    @Transactional
    @CacheEvict(value = {"categories", "rootCategories"}, allEntries = true)
    public CategoryDto createCategory(CategoryDto categoryDto) {
        if (categoryRepository.existsByName(categoryDto.getName())) {
            throw new IllegalArgumentException("Category with this name already exists");
        }
        
        Category category = Category.builder()
                .name(categoryDto.getName())
                .description(categoryDto.getDescription())
                .imageUrl(categoryDto.getImageUrl())
                .displayOrder(categoryDto.getDisplayOrder())
                .build();
        
        if (categoryDto.getParentId() != null) {
            Category parent = categoryRepository.findById(categoryDto.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category", "id", categoryDto.getParentId()));
            category.setParent(parent);
        }
        
        Category savedCategory = categoryRepository.save(category);
        return mapToDto(savedCategory);
    }
    
    @Transactional
    @CacheEvict(value = {"categories", "rootCategories"}, allEntries = true)
    public CategoryDto updateCategory(Long id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setImageUrl(categoryDto.getImageUrl());
        category.setDisplayOrder(categoryDto.getDisplayOrder());
        
        Category updatedCategory = categoryRepository.save(category);
        return mapToDto(updatedCategory);
    }
    
    @Transactional
    @CacheEvict(value = {"categories", "rootCategories"}, allEntries = true)
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", "id", id);
        }
        categoryRepository.deleteById(id);
    }
    
    private CategoryDto mapToDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .parentId(category.getParent() != null ? category.getParent().getId() : null)
                .displayOrder(category.getDisplayOrder())
                .productCount(category.getProducts() != null ? category.getProducts().size() : 0)
                .build();
    }
    
    private CategoryDto mapToDtoWithSubcategories(Category category) {
        CategoryDto dto = mapToDto(category);
        
        if (category.getSubcategories() != null && !category.getSubcategories().isEmpty()) {
            List<CategoryDto> subcategoryDtos = category.getSubcategories()
                    .stream()
                    .map(this::mapToDto)
                    .toList();
            dto.setSubcategories(subcategoryDtos);
        }
        
        return dto;
    }
}
