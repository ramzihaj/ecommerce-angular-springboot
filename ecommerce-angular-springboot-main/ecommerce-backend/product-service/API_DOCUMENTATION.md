# Product Service - REST API Documentation

Base URL: `http://localhost:8082/api`

## Categories API

### Get All Categories
```http
GET /categories
```
Returns all categories with product count.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Canapés & Fauteuils",
      "description": "Collection de canapés et fauteuils",
      "imageUrl": "https://example.com/image.jpg",
      "parentId": null,
      "displayOrder": 1,
      "productCount": 45
    }
  ]
}
```

### Get Root Categories
```http
GET /categories/root
```
Returns only root categories with their subcategories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Salon",
      "subcategories": [
        {
          "id": 11,
          "name": "Canapés 3 places"
        }
      ]
    }
  ]
}
```

### Get Category by ID
```http
GET /categories/{id}
```

### Get Subcategories
```http
GET /categories/{id}/subcategories
```

### Create Category
```http
POST /categories
Content-Type: application/json

{
  "name": "Nouvelle Catégorie",
  "description": "Description",
  "imageUrl": "https://example.com/image.jpg",
  "parentId": null,
  "displayOrder": 1
}
```

### Update Category
```http
PUT /categories/{id}
Content-Type: application/json
```

### Delete Category
```http
DELETE /categories/{id}
```

---

## Products API

### Get All Products (Paginated)
```http
GET /products?page=0&size=12&sortBy=createdAt
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [...],
    "totalElements": 100,
    "totalPages": 9,
    "currentPage": 0,
    "pageSize": 12
  }
}
```

### Get Product by ID
```http
GET /products/{id}
```

### Get Products by Category
```http
GET /products/category/{categoryId}?page=0&size=12
```

### Search Products
```http
GET /products/search?keyword=canape&page=0&size=12
```

### Filter Products
```http
GET /products/filter?categoryId=1&minPrice=100&maxPrice=1000&brand=IKEA&page=0&size=12&sortBy=price
```

**Query Parameters:**
- `categoryId` (optional): Filter by category
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `brand` (optional): Filter by brand
- `page` (default: 0): Page number
- `size` (default: 12): Items per page
- `sortBy` (default: createdAt): Sort field

### Get Featured Products
```http
GET /products/featured?limit=8
```

### Get New Arrivals
```http
GET /products/new-arrivals?limit=8
```

### Get Most Viewed
```http
GET /products/most-viewed?limit=8
```

### Get All Brands
```http
GET /products/brands
```

### Create Product
```http
POST /products
Content-Type: application/json

{
  "name": "Canapé Moderne",
  "description": "Description du produit",
  "price": 899.99,
  "discountPrice": 799.99,
  "stockQuantity": 20,
  "categoryId": 1,
  "brand": "IKEA",
  "sku": "CANAPE-001",
  "imageUrl": "https://example.com/image.jpg",
  "featured": true,
  "newArrival": false,
  "active": true
}
```

### Update Product
```http
PUT /products/{id}
Content-Type: application/json
```

### Delete Product
```http
DELETE /products/{id}
```

---

## Content API

### Get All Contents
```http
GET /contents
```

### Get Active Contents
```http
GET /contents/active
```

### Get Content by Key
```http
GET /contents/key/{key}
```

**Example:**
```http
GET /contents/key/about
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "about",
    "title": "À Propos de Darna",
    "content": "Contenu en français...",
    "contentAr": "المحتوى بالعربية...",
    "metaTitle": "À Propos - Darna",
    "metaDescription": "Description...",
    "active": true,
    "createdAt": "2024-11-04T12:00:00",
    "updatedAt": "2024-11-04T12:00:00"
  }
}
```

### Get Content by ID
```http
GET /contents/{id}
```

### Create Content
```http
POST /contents
Content-Type: application/json

{
  "key": "terms",
  "title": "Conditions d'utilisation",
  "content": "Contenu en français",
  "contentAr": "المحتوى بالعربية",
  "metaTitle": "Conditions",
  "metaDescription": "Description",
  "active": true
}
```

### Update Content
```http
PUT /contents/{id}
Content-Type: application/json
```

### Delete Content
```http
DELETE /contents/{id}
```

---

## Error Responses

All endpoints return standard error format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detail 1", "Detail 2"]
}
```

### HTTP Status Codes
- `200 OK`: Successful GET, PUT, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## CORS Configuration

Allowed origins:
- `http://localhost:4200` (Angular default)
- `http://localhost:4201` (Alternative port)
- `http://localhost:3000` (React)

---

## Pagination

All paginated endpoints accept:
- `page`: Page number (0-indexed, default: 0)
- `size`: Items per page (default: 12)
- `sortBy`: Sort field (default: createdAt)

Response includes:
- `content`: Array of items
- `totalElements`: Total number of items
- `totalPages`: Total number of pages
- `currentPage`: Current page number
- `pageSize`: Items per page

---

## Swagger Documentation

Access interactive API documentation:
```
http://localhost:8082/swagger-ui.html
```

OpenAPI JSON:
```
http://localhost:8082/v3/api-docs
```
