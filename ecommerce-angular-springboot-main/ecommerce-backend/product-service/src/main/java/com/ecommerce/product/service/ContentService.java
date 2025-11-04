package com.ecommerce.product.service;

import com.ecommerce.product.dto.ContentDto;
import com.ecommerce.product.entity.Content;
import com.ecommerce.product.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentService {
    
    private final ContentRepository contentRepository;
    
    public List<ContentDto> getAllContents() {
        return contentRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<ContentDto> getActiveContents() {
        return contentRepository.findByActiveTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public ContentDto getContentByKey(String key) {
        Content content = contentRepository.findByKey(key)
                .orElseThrow(() -> new RuntimeException("Content not found with key: " + key));
        return mapToDto(content);
    }
    
    public ContentDto getContentById(Long id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found with id: " + id));
        return mapToDto(content);
    }
    
    @Transactional
    public ContentDto createContent(ContentDto dto) {
        if (contentRepository.existsByKey(dto.getKey())) {
            throw new RuntimeException("Content already exists with key: " + dto.getKey());
        }
        
        Content content = Content.builder()
                .key(dto.getKey())
                .title(dto.getTitle())
                .content(dto.getContent())
                .contentAr(dto.getContentAr())
                .metaTitle(dto.getMetaTitle())
                .metaDescription(dto.getMetaDescription())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
        
        Content saved = contentRepository.save(content);
        log.info("Created new content with key: {}", saved.getKey());
        return mapToDto(saved);
    }
    
    @Transactional
    public ContentDto updateContent(Long id, ContentDto dto) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found with id: " + id));
        
        content.setTitle(dto.getTitle());
        content.setContent(dto.getContent());
        content.setContentAr(dto.getContentAr());
        content.setMetaTitle(dto.getMetaTitle());
        content.setMetaDescription(dto.getMetaDescription());
        if (dto.getActive() != null) {
            content.setActive(dto.getActive());
        }
        
        Content updated = contentRepository.save(content);
        log.info("Updated content with id: {}", id);
        return mapToDto(updated);
    }
    
    @Transactional
    public void deleteContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found with id: " + id);
        }
        contentRepository.deleteById(id);
        log.info("Deleted content with id: {}", id);
    }
    
    private ContentDto mapToDto(Content content) {
        return ContentDto.builder()
                .id(content.getId())
                .key(content.getKey())
                .title(content.getTitle())
                .content(content.getContent())
                .contentAr(content.getContentAr())
                .metaTitle(content.getMetaTitle())
                .metaDescription(content.getMetaDescription())
                .active(content.getActive())
                .createdAt(content.getCreatedAt())
                .updatedAt(content.getUpdatedAt())
                .build();
    }
}
