package com.ecommerce.order.dto;

import com.ecommerce.common.entity.Address;
import com.ecommerce.order.entity.OrderStatus;
import com.ecommerce.order.entity.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    
    private Long id;
    private String orderNumber;
    private Long userId;
    private List<OrderItemDto> items;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;
    private BigDecimal taxAmount;
    private BigDecimal finalAmount;
    private Address shippingAddress;
    private PaymentMethod paymentMethod;
    private String paymentId;
    private String trackingNumber;
    private LocalDateTime createdAt;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}
