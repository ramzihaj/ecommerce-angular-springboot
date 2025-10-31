package com.ecommerce.product.service;

import com.ecommerce.common.dto.PageResponse;
import com.ecommerce.common.exception.ResourceNotFoundException;
import com.ecommerce.product.dto.ProductDto;
import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.entity.Category;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.repository.CategoryRepository;
import com.ecommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    @Cacheable(value = "products", key = "#id")
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        
        // Increment view count
        product.setViewCount(product.getViewCount() + 1);
        productRepository.save(product);
        
        return mapToDto(product);
    }
    
    public PageResponse<ProductDto> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<Product> productPage = productRepository.findAll(pageable);
        return mapToPageResponse(productPage);
    }
    
    public PageResponse<ProductDto> getProductsByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByCategoryId(categoryId, pageable);
        return mapToPageResponse(productPage);
    }
    
    public PageResponse<ProductDto> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.searchProducts(keyword, pageable);
        return mapToPageResponse(productPage);
    }
    
    public PageResponse<ProductDto> filterProducts(
            Long categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String brand,
            int page,
            int size,
            String sortBy
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<Product> productPage = productRepository.filterProducts(
                categoryId, minPrice, maxPrice, brand, pageable
        );
        return mapToPageResponse(productPage);
    }
    
    @Cacheable(value = "featuredProducts")
    public List<ProductDto> getFeaturedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findFeaturedProducts(pageable)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
    
    public List<ProductDto> getNewArrivals(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findNewArrivals(pageable)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
    
    public List<ProductDto> getMostViewed(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findMostViewed(pageable)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
    
    @Transactional
    @CacheEvict(value = {"products", "featuredProducts"}, allEntries = true)
    public ProductDto createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
        
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .discountPercent(request.getDiscountPercent())
                .stockQuantity(request.getStockQuantity())
                .category(category)
                .brand(request.getBrand())
                .imageUrls(request.getImageUrls())
                .availableColors(request.getAvailableColors())
                .availableSizes(request.getAvailableSizes())
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .sku(request.getSku())
                .build();
        
        Product savedProduct = productRepository.save(product);
        return mapToDto(savedProduct);
    }
    
    @Transactional
    @CacheEvict(value = {"products", "featuredProducts"}, allEntries = true)
    public ProductDto updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
        
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setDiscountPercent(request.getDiscountPercent());
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(category);
        product.setBrand(request.getBrand());
        product.setImageUrls(request.getImageUrls());
        product.setAvailableColors(request.getAvailableColors());
        product.setAvailableSizes(request.getAvailableSizes());
        product.setIsFeatured(request.getIsFeatured());
        product.setSku(request.getSku());
        
        Product updatedProduct = productRepository.save(product);
        return mapToDto(updatedProduct);
    }
    
    @Transactional
    @CacheEvict(value = {"products", "featuredProducts"}, allEntries = true)
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productRepository.deleteById(id);
    }
    
    public List<String> getAllBrands() {
        return productRepository.findAllBrands();
    }
    
    private ProductDto mapToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .discountPercent(product.getDiscountPercent())
                .stockQuantity(product.getStockQuantity())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .brand(product.getBrand())
                .imageUrls(product.getImageUrls())
                .availableColors(product.getAvailableColors())
                .availableSizes(product.getAvailableSizes())
                .averageRating(product.getAverageRating())
                .reviewCount(product.getReviewCount())
                .isFeatured(product.getIsFeatured())
                .sku(product.getSku())
                .build();
    }
    
    private PageResponse<ProductDto> mapToPageResponse(Page<Product> productPage) {
        List<ProductDto> content = productPage.getContent()
                .stream()
                .map(this::mapToDto)
                .toList();
        
        return PageResponse.<ProductDto>builder()
                .content(content)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .first(productPage.isFirst())
                .build();
    }
}
