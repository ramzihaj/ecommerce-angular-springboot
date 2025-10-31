package com.ecommerce.product.controller;

import com.ecommerce.common.dto.ApiResponse;
import com.ecommerce.common.dto.PageResponse;
import com.ecommerce.product.dto.ProductDto;
import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product management API")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ApiResponse<ProductDto>> getProduct(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(product));
    }
    
    @GetMapping
    @Operation(summary = "Get all products with pagination")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy
    ) {
        PageResponse<ProductDto> products = productService.getAllProducts(page, size, sortBy);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get products by category")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        PageResponse<ProductDto> products = productService.getProductsByCategory(categoryId, page, size);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search products")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        PageResponse<ProductDto> products = productService.searchProducts(keyword, page, size);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/filter")
    @Operation(summary = "Filter products")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> filterProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String brand,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy
    ) {
        PageResponse<ProductDto> products = productService.filterProducts(
                categoryId, minPrice, maxPrice, brand, page, size, sortBy
        );
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/featured")
    @Operation(summary = "Get featured products")
    public ResponseEntity<ApiResponse<List<ProductDto>>> getFeaturedProducts(
            @RequestParam(defaultValue = "8") int limit
    ) {
        List<ProductDto> products = productService.getFeaturedProducts(limit);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/new-arrivals")
    @Operation(summary = "Get new arrivals")
    public ResponseEntity<ApiResponse<List<ProductDto>>> getNewArrivals(
            @RequestParam(defaultValue = "8") int limit
    ) {
        List<ProductDto> products = productService.getNewArrivals(limit);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/most-viewed")
    @Operation(summary = "Get most viewed products")
    public ResponseEntity<ApiResponse<List<ProductDto>>> getMostViewed(
            @RequestParam(defaultValue = "8") int limit
    ) {
        List<ProductDto> products = productService.getMostViewed(limit);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @GetMapping("/brands")
    @Operation(summary = "Get all brands")
    public ResponseEntity<ApiResponse<List<String>>> getAllBrands() {
        List<String> brands = productService.getAllBrands();
        return ResponseEntity.ok(ApiResponse.success(brands));
    }
    
    @PostMapping
    @Operation(summary = "Create new product")
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(@Valid @RequestBody ProductRequest request) {
        ProductDto product = productService.createProduct(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product created successfully", product));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update product")
    public ResponseEntity<ApiResponse<ProductDto>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request
    ) {
        ProductDto product = productService.updateProduct(id, request);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", product));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }
}
