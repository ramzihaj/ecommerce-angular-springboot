-- Script de données de test pour E-Commerce

-- ========================================
-- BASE: ecommerce_users
-- ========================================
\c ecommerce_users;

-- Utilisateurs de test (password: test123)
-- BCrypt hash pour "test123": $2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq
INSERT INTO users (username, email, password, first_name, last_name, phone, role, active, created_at, updated_at)
VALUES 
('admin', 'admin@ecommerce.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Admin', 'User', '+33 6 12 34 56 78', 'ADMIN', true, NOW(), NOW()),
('john.doe', 'john.doe@example.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'John', 'Doe', '+33 6 23 45 67 89', 'USER', true, NOW(), NOW()),
('jane.smith', 'jane.smith@example.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Jane', 'Smith', '+33 6 34 56 78 90', 'USER', true, NOW(), NOW()),
('vendor', 'vendor@ecommerce.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Vendor', 'Shop', '+33 6 45 67 89 01', 'VENDOR', true, NOW(), NOW());

-- ========================================
-- BASE: ecommerce_products
-- ========================================
\c ecommerce_products;

-- Catégories
INSERT INTO category (name, description, image_url, display_order, active, created_at, updated_at)
VALUES 
('Electronics', 'Electronic devices and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661', 1, true, NOW(), NOW()),
('Fashion', 'Clothing, shoes, and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050', 2, true, NOW(), NOW()),
('Home & Garden', 'Furniture and home decor', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a', 3, true, NOW(), NOW()),
('Sports', 'Sports equipment and activewear', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211', 4, true, NOW(), NOW()),
('Books', 'Books and magazines', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d', 5, true, NOW(), NOW());

-- Sous-catégories
INSERT INTO category (name, description, parent_id, display_order, active, created_at, updated_at)
VALUES 
('Smartphones', 'Mobile phones and accessories', 1, 1, true, NOW(), NOW()),
('Laptops', 'Laptops and notebooks', 1, 2, true, NOW(), NOW()),
('Men Fashion', 'Men clothing and accessories', 2, 1, true, NOW(), NOW()),
('Women Fashion', 'Women clothing and accessories', 2, 2, true, NOW(), NOW());

-- Produits Electronics
INSERT INTO product (name, description, price, discount_price, stock_quantity, category_id, brand, sku, image_url, featured, new_arrival, best_seller, active, created_at, updated_at)
VALUES 
('iPhone 15 Pro Max', 'Latest Apple smartphone with A17 chip', 1299.99, 1199.99, 50, 6, 'Apple', 'IPH15PM256', 'https://images.unsplash.com/photo-1592286927505-2fd1eb7311d4', true, true, true, true, NOW(), NOW()),
('Samsung Galaxy S24 Ultra', 'Premium Android smartphone', 1199.99, 1099.99, 45, 6, 'Samsung', 'SGS24U512', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c', true, true, false, true, NOW(), NOW()),
('MacBook Pro 16"', 'Powerful laptop for professionals', 2499.99, 2299.99, 30, 7, 'Apple', 'MBP16M3', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', true, false, true, true, NOW(), NOW()),
('Dell XPS 15', 'High-performance Windows laptop', 1799.99, 1699.99, 25, 7, 'Dell', 'DELLXPS15', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', false, true, false, true, NOW(), NOW()),
('Sony WH-1000XM5', 'Premium noise-cancelling headphones', 399.99, 349.99, 100, 1, 'Sony', 'SONYWH1000XM5', 'https://images.unsplash.com/photo-1545127398-14699f92334b', true, false, true, true, NOW(), NOW());

-- Produits Fashion
INSERT INTO product (name, description, price, stock_quantity, category_id, brand, sku, image_url, featured, new_arrival, active, created_at, updated_at)
VALUES 
('Men Classic T-Shirt', 'Comfortable cotton t-shirt', 29.99, 200, 8, 'Nike', 'NIKE-TS-001', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', false, false, true, NOW(), NOW()),
('Women Summer Dress', 'Elegant floral dress', 79.99, 150, 9, 'Zara', 'ZARA-DR-001', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', true, true, true, NOW(), NOW()),
('Running Shoes', 'Professional running shoes', 129.99, 80, 4, 'Adidas', 'ADIDAS-RS-001', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', true, false, true, NOW(), NOW()),
('Leather Jacket', 'Premium leather jacket', 299.99, 40, 8, 'Levi''s', 'LEVIS-LJ-001', 'https://images.unsplash.com/photo-1551028719-00167b16eac5', false, true, true, NOW(), NOW());

-- Produits Home & Garden
INSERT INTO product (name, description, price, discount_price, stock_quantity, category_id, brand, sku, image_url, featured, active, created_at, updated_at)
VALUES 
('Modern Sofa', 'Comfortable 3-seater sofa', 899.99, 799.99, 20, 3, 'IKEA', 'IKEA-SOFA-001', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', true, true, NOW(), NOW()),
('Coffee Table', 'Wooden coffee table', 199.99, 179.99, 50, 3, 'IKEA', 'IKEA-CT-001', 'https://images.unsplash.com/photo-1565191999001-551c187427bb', false, true, NOW(), NOW());

-- Avis produits
INSERT INTO review (product_id, user_id, rating, title, comment, verified_purchase, helpful_count, created_at, updated_at)
VALUES 
(1, 2, 5, 'Excellent phone!', 'The iPhone 15 Pro Max is amazing. Camera quality is outstanding!', true, 15, NOW(), NOW()),
(1, 3, 4, 'Great but expensive', 'Love the phone but it''s quite pricey', true, 8, NOW(), NOW()),
(2, 2, 5, 'Best Android phone', 'Samsung Galaxy S24 Ultra is the best Android phone I''ve ever used', true, 12, NOW(), NOW()),
(3, 3, 5, 'Perfect for work', 'MacBook Pro 16" is perfect for video editing and development', true, 20, NOW(), NOW()),
(5, 2, 5, 'Best headphones', 'Sony WH-1000XM5 has the best noise cancellation', true, 25, NOW(), NOW());

-- Contenu statique (About, etc.)
INSERT INTO contents (key, title, content, content_ar, meta_title, meta_description, is_active, created_at, updated_at)
VALUES 
('about', 
 'À Propos de Darna', 
 'Darna est votre destination pour du mobilier tunisien de qualité, alliant tradition et modernité. Depuis notre création, nous nous engageons à proposer des meubles tunisiens de haute qualité, fabriqués localement par des artisans passionnés. Notre mission est de transformer votre maison en un espace de vie exceptionnel.\n\nChaque pièce de notre collection est soigneusement sélectionnée pour son design, sa qualité et son confort. Nous travaillons avec des fabricants tunisiens renommés pour vous offrir le meilleur du savoir-faire local.\n\nNous soutenons l''économie locale et valorisons le savoir-faire tunisien. Tous nos produits sont fabriqués en Tunisie par des artisans locaux, avec des matériaux de qualité et un contrôle rigoureux.',
 'دارنا هي وجهتك للأثاث التونسي الجيد، الذي يجمع بين التقاليد والحداثة. منذ إنشائنا، التزمنا بتقديم أثاث تونسي عالي الجودة، مصنوع محليًا من قبل حرفيين متحمسين. مهمتنا هي تحويل منزلك إلى مساحة معيشية استثنائية.',
 'À Propos de Darna - Mobilier Tunisien de Qualité',
 'Découvrez Darna, votre spécialiste du mobilier tunisien. Meubles fabriqués en Tunisie par des artisans locaux avec garantie 5 ans.',
 true,
 NOW(),
 NOW()),
('contact', 
 'Contactez-nous', 
 'Notre équipe est à votre disposition pour répondre à toutes vos questions. N''hésitez pas à nous contacter par téléphone, email ou via notre formulaire de contact.\n\nAdresse: Tunis, Tunisie\nTéléphone: +216 XX XXX XXX\nEmail: contact@darna.tn\nHoraires: Lun-Sam: 9h-18h',
 'فريقنا تحت تصرفكم للإجابة على جميع أسئلتك. لا تتردد في الاتصال بنا عبر الهاتف أو البريد الإلكتروني أو من خلال نموذج الاتصال الخاص بنا.',
 'Contactez Darna',
 'Contactez notre équipe pour toute question sur nos produits et services.',
 true,
 NOW(),
 NOW());

-- ========================================
-- BASE: ecommerce_orders
-- ========================================
\c ecommerce_orders;

-- Commandes de test
INSERT INTO "order" (order_number, user_id, status, total_amount, shipping_fee, tax_amount, final_amount, shipping_address_street, shipping_address_city, shipping_address_postal_code, shipping_address_country, payment_method, created_at, updated_at)
VALUES 
('ORD-1730000001-ABC123', 2, 'DELIVERED', 1299.99, 0, 129.99, 1429.98, '123 Main St', 'Paris', '75001', 'France', 'CREDIT_CARD', NOW() - INTERVAL '10 days', NOW() - INTERVAL '3 days'),
('ORD-1730000002-DEF456', 2, 'SHIPPED', 399.99, 5.99, 39.99, 445.97, '123 Main St', 'Paris', '75001', 'France', 'PAYPAL', NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days'),
('ORD-1730000003-GHI789', 3, 'PENDING', 79.99, 5.99, 7.99, 93.97, '456 Oak Ave', 'Lyon', '69001', 'France', 'CREDIT_CARD', NOW() - INTERVAL '1 day', NOW());

-- Items de commandes
INSERT INTO order_item (order_id, product_id, product_name, quantity, price, subtotal, created_at, updated_at)
VALUES 
(1, 1, 'iPhone 15 Pro Max', 1, 1199.99, 1199.99, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
(2, 5, 'Sony WH-1000XM5', 1, 349.99, 349.99, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
(3, 7, 'Women Summer Dress', 1, 79.99, 79.99, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- ========================================
-- Statistiques
-- ========================================
\c ecommerce_products;
SELECT 'Test Data Created Successfully!' as status;

\c ecommerce_users;
SELECT 'Users:', COUNT(*) FROM users;

\c ecommerce_products;
SELECT 'Categories:', COUNT(*) FROM category;
SELECT 'Products:', COUNT(*) FROM product;
SELECT 'Reviews:', COUNT(*) FROM review;
SELECT 'Contents:', COUNT(*) FROM contents;

\c ecommerce_orders;
SELECT 'Orders:', COUNT(*) FROM "order";
