-- =====================================================
-- Schéma de base de données adapté pour le marché tunisien
-- PostgreSQL 18 - Currency: TND (Dinar Tunisien)
-- =====================================================

-- ========================================
-- BASE: ecommerce_products_tn
-- ========================================
\c ecommerce_products_tn;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des catégories adaptée au marché tunisien
CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100), -- Nom en arabe
    description TEXT,
    description_ar TEXT,
    parent_id BIGINT REFERENCES category(id) ON DELETE CASCADE,
    image_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des produits avec prix en TND
CREATE TABLE product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_ar VARCHAR(200), -- Nom en arabe
    description TEXT,
    description_ar TEXT,
    price_tnd DECIMAL(10, 3) NOT NULL, -- Prix en dinars tunisiens
    discount_price_tnd DECIMAL(10, 3),
    stock_quantity INTEGER DEFAULT 0,
    category_id BIGINT REFERENCES category(id) ON DELETE SET NULL,
    brand VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    image_url VARCHAR(500),
    images JSONB, -- Galerie d'images
    specifications JSONB, -- Caractéristiques techniques
    dimensions JSONB, -- Dimensions (L x l x H)
    weight_kg DECIMAL(8, 2), -- Poids en kg
    material VARCHAR(200), -- Matériau
    material_ar VARCHAR(200),
    color VARCHAR(100),
    color_ar VARCHAR(100),
    featured BOOLEAN DEFAULT false,
    new_arrival BOOLEAN DEFAULT false,
    best_seller BOOLEAN DEFAULT false,
    made_in_tunisia BOOLEAN DEFAULT false, -- Produit tunisien
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des avis
CREATE TABLE review (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES product(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimisation
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_price ON product(price_tnd);
CREATE INDEX idx_product_active ON product(active);
CREATE INDEX idx_product_featured ON product(featured);
CREATE INDEX idx_review_product ON review(product_id);
CREATE INDEX idx_review_rating ON review(rating);

-- ========================================
-- BASE: ecommerce_users_tn
-- ========================================
\c ecommerce_users_tn;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs adaptée pour la Tunisie
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20), -- Format tunisien: +216 XX XXX XXX
    role VARCHAR(20) DEFAULT 'USER', -- USER, VENDOR, ADMIN
    active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des adresses tunisiennes
CREATE TABLE address (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    address_type VARCHAR(20) DEFAULT 'SHIPPING', -- SHIPPING, BILLING
    full_name VARCHAR(200),
    phone VARCHAR(20),
    street_address VARCHAR(300),
    building VARCHAR(100), -- Immeuble/Résidence
    floor_number VARCHAR(10), -- Étage
    apartment VARCHAR(10), -- Appartement
    city VARCHAR(100) NOT NULL, -- Tunis, Sfax, Sousse, etc.
    delegation VARCHAR(100), -- Délégation
    postal_code VARCHAR(10), -- Code postal tunisien
    governorate VARCHAR(100) NOT NULL, -- Gouvernorat
    landmark TEXT, -- Point de repère
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone);
CREATE INDEX idx_address_user ON address(user_id);

-- ========================================
-- BASE: ecommerce_orders_tn
-- ========================================
\c ecommerce_orders_tn;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des commandes
CREATE TABLE "order" (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    total_amount_tnd DECIMAL(10, 3) NOT NULL,
    shipping_fee_tnd DECIMAL(10, 3) DEFAULT 0,
    discount_amount_tnd DECIMAL(10, 3) DEFAULT 0,
    final_amount_tnd DECIMAL(10, 3) NOT NULL,
    
    -- Adresse de livraison
    shipping_full_name VARCHAR(200),
    shipping_phone VARCHAR(20),
    shipping_street VARCHAR(300),
    shipping_building VARCHAR(100),
    shipping_floor VARCHAR(10),
    shipping_apartment VARCHAR(10),
    shipping_city VARCHAR(100),
    shipping_delegation VARCHAR(100),
    shipping_postal_code VARCHAR(10),
    shipping_governorate VARCHAR(100),
    shipping_landmark TEXT,
    
    -- Méthode de paiement tunisienne
    payment_method VARCHAR(50), -- CASH_ON_DELIVERY, BANK_TRANSFER, D17, KONNECT, FLOUCI
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    payment_reference VARCHAR(100),
    
    -- Livraison
    delivery_method VARCHAR(50), -- STANDARD, EXPRESS, PICKUP
    estimated_delivery_date DATE,
    tracking_number VARCHAR(100),
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des items de commande
CREATE TABLE order_item (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES "order"(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(200),
    product_sku VARCHAR(100),
    quantity INTEGER NOT NULL,
    price_tnd DECIMAL(10, 3) NOT NULL,
    discount_tnd DECIMAL(10, 3) DEFAULT 0,
    subtotal_tnd DECIMAL(10, 3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de suivi des commandes
CREATE TABLE order_tracking (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES "order"(id) ON DELETE CASCADE,
    status VARCHAR(50),
    description TEXT,
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_order_user ON "order"(user_id);
CREATE INDEX idx_order_status ON "order"(status);
CREATE INDEX idx_order_date ON "order"(created_at);
CREATE INDEX idx_order_item_order ON order_item(order_id);

-- ========================================
-- BASE: ecommerce_payments_tn
-- ========================================
\c ecommerce_payments_tn;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des paiements
CREATE TABLE payment (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    payment_method VARCHAR(50), -- CASH_ON_DELIVERY, BANK_TRANSFER, D17, KONNECT, FLOUCI, CLICTOPAY
    amount_tnd DECIMAL(10, 3) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED, REFUNDED
    transaction_id VARCHAR(200),
    gateway_response JSONB,
    refund_amount_tnd DECIMAL(10, 3),
    refund_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_payment_order ON payment(order_id);
CREATE INDEX idx_payment_status ON payment(status);

-- Message de confirmation
SELECT 'Tunisia schema created successfully!' as status;
