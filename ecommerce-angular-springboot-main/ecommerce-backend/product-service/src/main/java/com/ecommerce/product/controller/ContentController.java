package com.ecommerce.product.controller;

import com.ecommerce.common.dto.ApiResponse;
import com.ecommerce.product.dto.ContentDto;
import com.ecommerce.product.service.ContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
@Tag(name = "Content Management")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ContentController {
    
    private final ContentService contentService;
    
    @GetMapping
    @Operation(summary = "Get all contents")
    public ResponseEntity<ApiResponse<List<ContentDto>>> getAllContents() {
        return ResponseEntity.ok(ApiResponse.success(contentService.getAllContents()));
    }
    
    @GetMapping("/active")
    @Operation(summary = "Get all active contents")
    public ResponseEntity<ApiResponse<List<ContentDto>>> getActiveContents() {
        return ResponseEntity.ok(ApiResponse.success(contentService.getActiveContents()));
    }
    
    @GetMapping("/key/{key}")
    @Operation(summary = "Get content by key")
    public ResponseEntity<ApiResponse<ContentDto>> getContentByKey(@PathVariable String key) {
        return ResponseEntity.ok(ApiResponse.success(contentService.getContentByKey(key)));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get content by ID")
    public ResponseEntity<ApiResponse<ContentDto>> getContentById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(contentService.getContentById(id)));
    }
    
    @PostMapping
    @Operation(summary = "Create new content")
    public ResponseEntity<ApiResponse<ContentDto>> createContent(@RequestBody ContentDto dto) {
        return ResponseEntity.ok(ApiResponse.success(contentService.createContent(dto)));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update content")
    public ResponseEntity<ApiResponse<ContentDto>> updateContent(
            @PathVariable Long id, 
            @RequestBody ContentDto dto) {
        return ResponseEntity.ok(ApiResponse.success(contentService.updateContent(id, dto)));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete content")
    public ResponseEntity<ApiResponse<Void>> deleteContent(@PathVariable Long id) {
        contentService.deleteContent(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
