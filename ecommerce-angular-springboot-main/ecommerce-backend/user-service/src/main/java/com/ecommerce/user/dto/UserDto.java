package com.ecommerce.user.dto;

import com.ecommerce.common.entity.Address;
import com.ecommerce.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Address address;
    private Set<Role> roles;
    private Boolean emailVerified;
    private String profileImageUrl;
}
