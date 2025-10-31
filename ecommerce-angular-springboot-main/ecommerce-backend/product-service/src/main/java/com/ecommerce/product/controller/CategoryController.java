package com.ecommerce.product.controller;

import com.ecommerce.common.dto.ApiResponse;
import com.ecommerce.product.dto.CategoryDto;
import com.ecommerce.product.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categories")
@CrossOrigin(origins = {"http://localhost:4200"})
public class CategoryController {
    
    private final CategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAllCategories()));
    }
    
    @GetMapping("/root")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getRootCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getRootCategories()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDto>> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryById(id)));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@RequestBody CategoryDto dto) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.createCategory(dto)));
    }
}
