package com.ecommerce.order.controller;

import com.ecommerce.common.dto.ApiResponse;
import com.ecommerce.common.dto.PageResponse;
import com.ecommerce.order.dto.OrderDto;
import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.entity.OrderStatus;
import com.ecommerce.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order management API")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class OrderController {
    
    private final OrderService orderService;
    
    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<ApiResponse<OrderDto>> getOrder(@PathVariable Long id) {
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.success(order));
    }
    
    @GetMapping("/number/{orderNumber}")
    @Operation(summary = "Get order by order number")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderByNumber(@PathVariable String orderNumber) {
        OrderDto order = orderService.getOrderByNumber(orderNumber);
        return ResponseEntity.ok(ApiResponse.success(order));
    }
    
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get orders by user ID")
    public ResponseEntity<ApiResponse<PageResponse<OrderDto>>> getUserOrders(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<OrderDto> orders = orderService.getOrdersByUserId(userId, page, size);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }
    
    @GetMapping
    @Operation(summary = "Get all orders (Admin)")
    public ResponseEntity<ApiResponse<PageResponse<OrderDto>>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<OrderDto> orders = orderService.getAllOrders(page, size);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }
    
    @PostMapping
    @Operation(summary = "Create new order")
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(@Valid @RequestBody OrderRequest request) {
        OrderDto order = orderService.createOrder(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order created successfully", order));
    }
    
    @PutMapping("/{id}/status")
    @Operation(summary = "Update order status")
    public ResponseEntity<ApiResponse<OrderDto>> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {
        OrderDto order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
    }
    
    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel order")
    public ResponseEntity<ApiResponse<OrderDto>> cancelOrder(
            @PathVariable Long id,
            @RequestParam(required = false) String reason
    ) {
        OrderDto order = orderService.cancelOrder(id, reason);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled", order));
    }
}
