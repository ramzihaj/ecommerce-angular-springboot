package com.ecommerce.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    public void sendOrderConfirmation(String to, String orderNumber) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Order Confirmation - " + orderNumber);
            message.setText("Your order " + orderNumber + " has been confirmed. Thank you for shopping with us!");
            
            mailSender.send(message);
            log.info("Order confirmation email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
        }
    }
    
    public void sendOrderStatusUpdate(String to, String orderNumber, String status) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Order Status Update - " + orderNumber);
            message.setText("Your order " + orderNumber + " status has been updated to: " + status);
            
            mailSender.send(message);
            log.info("Order status email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
        }
    }
}
