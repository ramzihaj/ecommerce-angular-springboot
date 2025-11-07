-- Insertion de données test pour Tunisia E-Commerce

-- Catégories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('Mobilier', 'Meubles et décoration pour la maison', NOW(), NOW()),
('Électronique', 'Appareils électroniques et accessoires', NOW(), NOW()),
('Mode', 'Vêtements et accessoires', NOW(), NOW()),
('Artisanat', 'Produits artisanaux tunisiens', NOW(), NOW());

-- Produits  
INSERT INTO products (name, description, price, discount_price, discount_percent, stock_quantity, category_id, brand, sku, is_featured, average_rating, review_count, view_count, meta_title, meta_description, created_at, updated_at) VALUES
-- Mobilier
('Canapé Tunis Moderne', 'Canapé 3 places en tissu de qualité supérieure, design moderne et confortable. Fabriqué en Tunisie avec des matériaux durables.', 1999.99, 1699.99, 15, 8, 1, 'MaisonTN', 'MOB-CAN-001', true, 4.5, 12, 156, 'Canapé Moderne Tunisien', 'Canapé 3 places confortable made in Tunisia', NOW(), NOW()),

('Table Basse Carthage', 'Table basse en bois de chêne massif avec finition naturelle. Design inspiré de l''architecture carthaginoise.', 499.99, 449.99, 10, 15, 1, 'BoisNoble', 'MOB-TAB-002', true, 4.8, 8, 234, 'Table Basse Artisanale', 'Table basse en bois massif tunisien', NOW(), NOW()),

('Bibliothèque Medina', 'Grande bibliothèque murale avec 5 étagères, finition noyer. Parfaite pour organiser vos livres et objets déco.', 799.99, NULL, 0, 5, 1, 'MeublePlus', 'MOB-BIB-003', false, 4.2, 5, 89, 'Bibliothèque Moderne', 'Bibliothèque 5 étagères style médina', NOW(), NOW()),

-- Électronique
('Smart TV Samsung 55"', 'Téléviseur LED 4K Ultra HD avec Smart Hub et HDR. Garantie 2 ans. Livraison et installation incluses.', 2499.99, 2199.99, 12, 12, 2, 'Samsung', 'ELEC-TV-001', true, 4.7, 28, 456, 'Smart TV 4K Samsung', 'TV 55 pouces 4K HDR Smart Hub', NOW(), NOW()),

('Climatiseur Midea 12000 BTU', 'Climatiseur split system inverter, classe énergétique A++. Silencieux et économique. Installation disponible.', 1599.99, 1399.99, 13, 20, 2, 'Midea', 'ELEC-CLI-002', true, 4.6, 35, 678, 'Climatiseur Inverter 12000 BTU', 'Clim Midea économique et silencieux', NOW(), NOW()),

('Réfrigérateur LG 420L', 'Réfrigérateur No Frost avec compartiment congélateur. Design moderne inox. Garantie 5 ans compresseur.', 2199.99, NULL, 0, 6, 2, 'LG', 'ELEC-REF-003', false, 4.4, 18, 234, 'Frigo LG No Frost', 'Réfrigérateur 420L avec congélateur', NOW(), NOW()),

-- Mode
('Jebba Homme Traditionnel', 'Jebba tunisienne en coton léger, idéale pour l''été. Broderies artisanales au col. Disponible en plusieurs couleurs.', 159.99, 129.99, 19, 25, 3, 'TradiMode', 'MODE-JEB-001', true, 4.9, 42, 567, 'Jebba Tunisienne Authentique', 'Jebba homme coton brodé artisanal', NOW(), NOW()),

('Robe Sefsari Moderne', 'Sefsari moderne revisité avec des motifs contemporains. Tissu fluide et confortable. Fait main en Tunisie.', 249.99, 199.99, 20, 18, 3, 'ModeTN', 'MODE-SEF-002', true, 4.7, 31, 445, 'Sefsari Moderne Tunisien', 'Robe sefsari fait main motifs modernes', NOW(), NOW()),

('Chéchia Rouge Authentique', 'Chéchia traditionnelle 100% laine, fabriquée artisanalement à Tunis. Symbole du patrimoine tunisien.', 89.99, NULL, 0, 50, 3, 'ArtisanTN', 'MODE-CHE-003', false, 4.8, 22, 234, 'Chéchia Tunisienne Artisanale', 'Chéchia rouge laine artisan Tunis', NOW(), NOW()),

-- Artisanat
('Poterie Guellala Décorative', 'Vase en céramique peint à la main selon la tradition de Guellala (Djerba). Pièce unique d''artisanat tunisien.', 129.99, 109.99, 15, 8, 4, 'ArtDjerba', 'ART-POT-001', true, 5.0, 15, 345, 'Poterie Guellala Fait Main', 'Vase céramique artisanal Djerba', NOW(), NOW()),

('Tapis Berbère Kairouan', 'Tapis noué main selon la tradition de Kairouan. Laine vierge 100%. Motifs géométriques berbères. Pièce d''exception.', 3499.99, 2999.99, 14, 3, 4, 'TapisKairouan', 'ART-TAP-002', true, 5.0, 8, 678, 'Tapis Kairouan Authentique', 'Tapis berbère noué main laine vierge', NOW(), NOW()),

('Miroir Nabeul Mosaïque', 'Miroir décoratif encadré de mosaïque artisanale de Nabeul. Motifs floraux colorés. Fait main par des artisans.', 179.99, 159.99, 11, 12, 4, 'NabeulArt', 'ART-MIR-003', false, 4.6, 19, 234, 'Miroir Mosaïque Nabeul', 'Miroir artisanal mosaïque florale', NOW(), NOW());

-- Images des produits
INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'),
(1, 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800'),
(2, 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800'),
(3, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800'),
(4, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'),
(5, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800'),
(6, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800'),
(7, 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'),
(8, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'),
(9, 'https://images.unsplash.com/photo-1514327231620-59b07970390f?w=800'),
(10, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800'),
(11, 'https://images.unsplash.com/photo-1601887384935-c0e6e79b1a86?w=800'),
(12, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800');

-- Couleurs disponibles
INSERT INTO product_colors (product_id, color) VALUES
(1, 'Gris'),
(1, 'Beige'),
(1, 'Bleu marine'),
(2, 'Naturel'),
(2, 'Noyer'),
(7, 'Blanc'),
(7, 'Bleu'),
(7, 'Beige'),
(8, 'Noir'),
(8, 'Rouge'),
(8, 'Bleu'),
(9, 'Rouge');

-- Tailles disponibles (pour les vêtements)
INSERT INTO product_sizes (product_id, size) VALUES
(7, 'M'),
(7, 'L'),
(7, 'XL'),
(7, 'XXL'),
(8, 'S'),
(8, 'M'),
(8, 'L'),
(8, 'XL'),
(9, 'Unique');

-- Reviews
INSERT INTO reviews (product_id, user_id, rating, comment, created_at, updated_at) VALUES
(1, 1, 5, 'Excellent canapé, très confortable et bien fini. Livraison rapide. Je recommande !', NOW(), NOW()),
(1, 2, 4, 'Beau design, qualité correcte pour le prix. Petit bémol sur la couleur qui est légèrement différente des photos.', NOW(), NOW()),
(2, 1, 5, 'Table magnifique, le bois est de très belle qualité. Artisanat tunisien de grande classe !', NOW(), NOW()),
(4, 3, 5, 'Image superbe, son excellent. Installation impeccable par l''équipe. Très satisfait !', NOW(), NOW()),
(5, 2, 5, 'Clim silencieuse et efficace. Économie d''énergie notable. Installation professionnelle.', NOW(), NOW()),
(7, 1, 5, 'Jebba authentique et bien coupée. Les broderies sont magnifiques. Livraison soignée.', NOW(), NOW()),
(7, 3, 5, 'Produit de qualité, fidèle à la tradition. Mon mari est ravi. Merci pour le service !', NOW(), NOW()),
(10, 2, 5, 'Poterie absolument magnifique, vraiment unique. Parfait comme cadeau. Emballage soigné.', NOW(), NOW()),
(11, 1, 5, 'Tapis somptueux, travail artisanal exceptionnel. Un investissement mais qui en vaut la peine !', NOW(), NOW());

-- Note: Les user_id sont fictifs pour la démo. 
-- Dans un vrai système, ils correspondraient à la table users.

COMMIT;
