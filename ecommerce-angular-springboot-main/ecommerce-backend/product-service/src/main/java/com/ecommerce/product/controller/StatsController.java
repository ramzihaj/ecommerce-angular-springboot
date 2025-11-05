package com.ecommerce.product.controller;

import com.ecommerce.common.dto.ApiResponse;
import com.ecommerce.product.dto.DashboardStatsDto;
import com.ecommerce.product.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
@Tag(name = "Statistics", description = "Dashboard and analytics statistics")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
public class StatsController {
    
    private final StatsService statsService;
    
    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard statistics", 
               description = "Get comprehensive statistics for the admin dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        DashboardStatsDto stats = statsService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
