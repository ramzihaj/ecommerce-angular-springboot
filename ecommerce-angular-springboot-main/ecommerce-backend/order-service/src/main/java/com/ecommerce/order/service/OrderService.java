package com.ecommerce.order.service;

import com.ecommerce.common.dto.PageResponse;
import com.ecommerce.common.exception.ResourceNotFoundException;
import com.ecommerce.order.dto.*;
import com.ecommerce.order.entity.Order;
import com.ecommerce.order.entity.OrderItem;
import com.ecommerce.order.entity.OrderStatus;
import com.ecommerce.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        return mapToDto(order);
    }
    
    public OrderDto getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "orderNumber", orderNumber));
        return mapToDto(order);
    }
    
    public PageResponse<OrderDto> getOrdersByUserId(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> orderPage = orderRepository.findByUserId(userId, pageable);
        return mapToPageResponse(orderPage);
    }
    
    public PageResponse<OrderDto> getAllOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> orderPage = orderRepository.findAll(pageable);
        return mapToPageResponse(orderPage);
    }
    
    @Transactional
    public OrderDto createOrder(OrderRequest request) {
        // Calculate amounts
        BigDecimal totalAmount = BigDecimal.ZERO;
        BigDecimal discountAmount = BigDecimal.ZERO;
        
        for (OrderItemRequest itemRequest : request.getItems()) {
            BigDecimal itemPrice = itemRequest.getDiscountPrice() != null 
                ? itemRequest.getDiscountPrice() 
                : itemRequest.getPrice();
            
            BigDecimal itemTotal = itemPrice.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
            
            if (itemRequest.getDiscountPrice() != null) {
                BigDecimal itemDiscount = itemRequest.getPrice()
                    .subtract(itemRequest.getDiscountPrice())
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
                discountAmount = discountAmount.add(itemDiscount);
            }
        }
        
        // Calculate shipping and tax (simplified logic)
        BigDecimal shippingFee = totalAmount.compareTo(BigDecimal.valueOf(50)) >= 0 
            ? BigDecimal.ZERO 
            : BigDecimal.valueOf(5.99);
        
        BigDecimal taxAmount = totalAmount.multiply(BigDecimal.valueOf(0.10)); // 10% tax
        
        BigDecimal finalAmount = totalAmount.add(shippingFee).add(taxAmount);
        
        // Create order
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .userId(request.getUserId())
                .status(OrderStatus.PENDING)
                .totalAmount(totalAmount)
                .discountAmount(discountAmount)
                .shippingFee(shippingFee)
                .taxAmount(taxAmount)
                .finalAmount(finalAmount)
                .shippingAddress(request.getShippingAddress())
                .paymentMethod(request.getPaymentMethod())
                .notes(request.getNotes())
                .build();
        
        // Create order items
        List<OrderItem> items = request.getItems().stream()
                .map(itemRequest -> {
                    BigDecimal price = itemRequest.getDiscountPrice() != null 
                        ? itemRequest.getDiscountPrice() 
                        : itemRequest.getPrice();
                    BigDecimal subtotal = price.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
                    
                    return OrderItem.builder()
                            .order(order)
                            .productId(itemRequest.getProductId())
                            .productName("Product " + itemRequest.getProductId()) // Should fetch from product service
                            .quantity(itemRequest.getQuantity())
                            .price(itemRequest.getPrice())
                            .discountPrice(itemRequest.getDiscountPrice())
                            .size(itemRequest.getSize())
                            .color(itemRequest.getColor())
                            .subtotal(subtotal)
                            .build();
                })
                .toList();
        
        order.setItems(items);
        
        Order savedOrder = orderRepository.save(order);
        return mapToDto(savedOrder);
    }
    
    @Transactional
    public OrderDto updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        order.setStatus(status);
        
        // Update timestamps based on status
        switch (status) {
            case SHIPPED:
                order.setShippedAt(LocalDateTime.now());
                order.setTrackingNumber(generateTrackingNumber());
                break;
            case DELIVERED:
                order.setDeliveredAt(LocalDateTime.now());
                break;
            case CANCELLED:
                order.setCancelledAt(LocalDateTime.now());
                break;
        }
        
        Order updatedOrder = orderRepository.save(order);
        return mapToDto(updatedOrder);
    }
    
    @Transactional
    public OrderDto cancelOrder(Long id, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        
        if (order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.DELIVERED) {
            throw new IllegalStateException("Cannot cancel order that has been shipped or delivered");
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        order.setCancelledAt(LocalDateTime.now());
        order.setCancellationReason(reason);
        
        Order cancelledOrder = orderRepository.save(order);
        return mapToDto(cancelledOrder);
    }
    
    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private String generateTrackingNumber() {
        return "TRK-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
    }
    
    private OrderDto mapToDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems().stream()
                .map(item -> OrderItemDto.builder()
                        .id(item.getId())
                        .productId(item.getProductId())
                        .productName(item.getProductName())
                        .productImageUrl(item.getProductImageUrl())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .discountPrice(item.getDiscountPrice())
                        .size(item.getSize())
                        .color(item.getColor())
                        .subtotal(item.getSubtotal())
                        .build())
                .toList();
        
        return OrderDto.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUserId())
                .items(itemDtos)
                .status(order.getStatus())
                .totalAmount(order.getTotalAmount())
                .discountAmount(order.getDiscountAmount())
                .shippingFee(order.getShippingFee())
                .taxAmount(order.getTaxAmount())
                .finalAmount(order.getFinalAmount())
                .shippingAddress(order.getShippingAddress())
                .paymentMethod(order.getPaymentMethod())
                .paymentId(order.getPaymentId())
                .trackingNumber(order.getTrackingNumber())
                .createdAt(order.getCreatedAt())
                .shippedAt(order.getShippedAt())
                .deliveredAt(order.getDeliveredAt())
                .build();
    }
    
    private PageResponse<OrderDto> mapToPageResponse(Page<Order> orderPage) {
        List<OrderDto> content = orderPage.getContent()
                .stream()
                .map(this::mapToDto)
                .toList();
        
        return PageResponse.<OrderDto>builder()
                .content(content)
                .pageNumber(orderPage.getNumber())
                .pageSize(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .last(orderPage.isLast())
                .first(orderPage.isFirst())
                .build();
    }
}
