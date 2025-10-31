package com.ecommerce.order.dto;

import com.ecommerce.common.entity.Address;
import com.ecommerce.order.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Order items are required")
    private List<OrderItemRequest> items;
    
    @NotNull(message = "Shipping address is required")
    private Address shippingAddress;
    
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;
    
    private String notes;
}
