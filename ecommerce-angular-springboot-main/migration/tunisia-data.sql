-- =====================================================
-- Données de test adaptées au marché tunisien
-- Produits de maison: salon, meubles, cuisine
-- Prix en TND (Dinar Tunisien)
-- =====================================================

-- ========================================
-- BASE: ecommerce_users_tn
-- ========================================
\c ecommerce_users_tn;

-- Utilisateurs de test (password: test123)
INSERT INTO users (username, email, password, first_name, last_name, phone, role, active, email_verified, created_at)
VALUES 
('admin', 'admin@maisontn.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Admin', 'System', '+216 20 123 456', 'ADMIN', true, true, NOW()),
('mohamed', 'mohamed.ben@gmail.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Mohamed', 'Ben Ali', '+216 22 345 678', 'USER', true, true, NOW()),
('fatma', 'fatma.trabelsi@gmail.com', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Fatma', 'Trabelsi', '+216 25 678 901', 'USER', true, true, NOW()),
('vendor', 'contact@meubles-tunisie.tn', '$2a$10$EJvNHdD8rZZXZOw9s9wA7.6RvKBJE5wXXdXF8cqXBqGzXQJYqYqYq', 'Meubles', 'Tunisie', '+216 71 123 456', 'VENDOR', true, true, NOW());

-- Adresses tunisiennes
INSERT INTO address (user_id, address_type, full_name, phone, street_address, building, floor_number, apartment, city, delegation, postal_code, governorate, landmark, is_default)
VALUES 
(2, 'SHIPPING', 'Mohamed Ben Ali', '+216 22 345 678', 'Avenue Habib Bourguiba', 'Résidence Carthage', '3', 'A12', 'Tunis', 'La Marsa', '2078', 'Tunis', 'En face de la pharmacie centrale', true),
(2, 'BILLING', 'Mohamed Ben Ali', '+216 22 345 678', 'Rue de la Liberté', 'Immeuble Zitouna', '2', '5', 'Tunis', 'Centre Ville', '1001', 'Tunis', 'À côté de la poste', false),
(3, 'SHIPPING', 'Fatma Trabelsi', '+216 25 678 901', 'Route de Sousse', 'Villa Jasmin', NULL, NULL, 'Sousse', 'Sousse Ville', '4000', 'Sousse', 'Près du lycée Bourguiba', true);

-- ========================================
-- BASE: ecommerce_products_tn
-- ========================================
\c ecommerce_products_tn;

-- Catégories adaptées au marché tunisien
INSERT INTO category (name, name_ar, description, description_ar, image_url, display_order, active)
VALUES 
('Salon', 'صالون', 'Meubles et accessoires pour le salon', 'أثاث وإكسسوارات للصالون', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', 1, true),
('Chambre à Coucher', 'غرفة النوم', 'Meubles et literie pour chambres', 'أثاث وأسرّة لغرف النوم', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85', 2, true),
('Salle à Manger', 'غرفة الطعام', 'Tables, chaises et buffets', 'طاولات وكراسي وخزانات', 'https://images.unsplash.com/photo-1617806118233-18e1de247200', 3, true),
('Cuisine', 'مطبخ', 'Meubles et équipements de cuisine', 'أثاث ومعدات المطبخ', 'https://images.unsplash.com/photo-1556911220-bff31c812dba', 4, true),
('Bureau', 'مكتب', 'Meubles de bureau et rangement', 'أثاث مكتبي وخزانات', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd', 5, true),
('Décoration', 'ديكور', 'Articles de décoration et accessoires', 'ديكورات وإكسسوارات', 'https://images.unsplash.com/photo-1513694203232-719a280e022f', 6, true);

-- Sous-catégories
INSERT INTO category (name, name_ar, description, parent_id, display_order, active)
VALUES 
('Canapés', 'أرائك', 'Canapés et fauteuils', 1, 1, true),
('Tables Basses', 'طاولات القهوة', 'Tables basses et tables d''appoint', 1, 2, true),
('Lits', 'أسرّة', 'Lits et sommiers', 2, 1, true),
('Armoires', 'خزانات', 'Armoires et penderies', 2, 2, true),
('Tables à Manger', 'طاولات الطعام', 'Tables à manger', 3, 1, true),
('Éléments de Cuisine', 'عناصر المطبخ', 'Meubles de cuisine modulaires', 4, 1, true),
('Bureaux', 'مكاتب', 'Bureaux et tables de travail', 5, 1, true),
('Tapis', 'سجاد', 'Tapis et moquettes', 6, 1, true),
('Éclairage', 'إضاءة', 'Luminaires et lampes', 6, 2, true);

-- Produits de salon (prix en TND)
INSERT INTO product (name, name_ar, description, description_ar, price_tnd, discount_price_tnd, stock_quantity, category_id, brand, sku, image_url, dimensions, weight_kg, material, material_ar, color, color_ar, featured, new_arrival, best_seller, made_in_tunisia, active)
VALUES 
('Canapé d''Angle Moderne 5 Places', 'كنبة زاوية حديثة 5 أماكن', 'Canapé d''angle spacieux avec revêtement en tissu de qualité supérieure', 'كنبة زاوية واسعة مع كسوة قماش عالية الجودة', 2499.000, 2199.000, 15, 7, 'Meublatex', 'CANAPE-ANGLE-001', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', '{"longueur": "300cm", "largeur": "250cm", "hauteur": "85cm"}', 85.5, 'Tissu et bois massif', 'قماش وخشب صلب', 'Gris anthracite', 'رمادي غامق', true, true, true, true, true),

('Salon Complet 3+2+1', 'صالون كامل 3+2+1', 'Ensemble de salon élégant avec canapé 3 places, 2 places et fauteuil', 'طقم صالون أنيق مع كنبة 3 أماكن، 2 أماكن وكرسي', 3299.000, 2899.000, 8, 7, 'Mobilia', 'SALON-321-TUN', 'https://images.unsplash.com/photo-1540574163026-643ea20ade25', '{"canapé_3": "200cm", "canapé_2": "160cm", "fauteuil": "90cm"}', 120.0, 'Cuir véritable', 'جلد طبيعي', 'Marron cognac', 'بني كونياك', true, false, true, false, true),

('Table Basse en Bois Massif', 'طاولة قهوة خشب صلب', 'Table basse artisanale en bois d''olivier tunisien', 'طاولة قهوة حرفية من خشب الزيتون التونسي', 899.000, 799.000, 25, 8, 'Artisan Tunisien', 'TABLE-BASSE-OLIVIER', 'https://images.unsplash.com/photo-1565191999001-551c187427bb', '{"longueur": "120cm", "largeur": "60cm", "hauteur": "45cm"}', 28.0, 'Bois d''olivier massif', 'خشب زيتون صلب', 'Naturel', 'طبيعي', true, true, false, true, true),

('Fauteuil Relax Moderne', 'كرسي استرخاء حديث', 'Fauteuil inclinable confortable avec repose-pieds intégré', 'كرسي قابل للإمالة مريح مع مسند قدمين مدمج', 1499.000, 1299.000, 12, 7, 'Comfort+', 'FAUTEUIL-RELAX-01', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c', '{"largeur": "85cm", "profondeur": "95cm", "hauteur": "102cm"}', 32.0, 'Simili-cuir premium', 'جلد صناعي فاخر', 'Noir', 'أسود', false, true, false, false, true),

-- Produits chambre à coucher
('Chambre Complète Adulte', 'غرفة نوم كاملة للكبار', 'Ensemble chambre: lit 160x200, 2 chevets, armoire 4 portes, coiffeuse', 'طقم غرفة: سرير 160×200، 2 طاولة ليلية، خزانة 4 أبواب، مرآة', 4599.000, 3999.000, 6, 9, 'Meublatex', 'CHAMBRE-ADULTE-01', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85', '{"lit": "160x200cm", "armoire": "200cm"}', 180.0, 'MDF plaqué chêne', 'MDF مكسو بالبلوط', 'Chêne clair', 'بلوط فاتح', true, false, true, true, true),

('Lit 2 Personnes avec Rangement', 'سرير شخصين مع تخزين', 'Lit 160x200 avec tiroirs de rangement intégrés', 'سرير 160×200 مع أدراج تخزين مدمجة', 1899.000, 1699.000, 18, 9, 'Mobilia', 'LIT-RANGEMENT-160', 'https://images.unsplash.com/photo-1505693314120-0d443867891c', '{"longueur": "200cm", "largeur": "160cm", "hauteur": "40cm"}', 75.0, 'Bois composite', 'خشب مركب', 'Blanc mat', 'أبيض مطفي', false, true, true, false, true),

('Armoire 6 Portes Miroir', 'خزانة 6 أبواب مرآة', 'Grande armoire avec portes miroir et compartiments', 'خزانة كبيرة مع أبواب مرآة ورفوف', 2299.000, 1999.000, 10, 10, 'Meublatex', 'ARMOIRE-6P-MIROIR', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2', '{"largeur": "280cm", "profondeur": "60cm", "hauteur": "220cm"}', 145.0, 'Panneaux particules', 'ألواح مضغوطة', 'Blanc brillant', 'أبيض لامع', true, false, false, true, true),

('Matelas Orthopédique 160x200', 'فراش طبي 160×200', 'Matelas orthopédique haute densité avec mousse à mémoire', 'فراش طبي عالي الكثافة مع إسفنج ذاكرة', 1299.000, 1099.000, 22, 9, 'SleepWell TN', 'MATELAS-ORTHO-160', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304', '{"longueur": "200cm", "largeur": "160cm", "épaisseur": "25cm"}', 35.0, 'Mousse HR + ressorts', 'إسفنج HR + زنبركات', 'Blanc', 'أبيض', false, true, true, true, true),

-- Produits salle à manger
('Table à Manger Extensible 6-8 Places', 'طاولة طعام قابلة للتمديد 6-8 أماكن', 'Table extensible moderne avec rallonges intégrées', 'طاولة قابلة للتمديد حديثة مع تمديدات مدمجة', 1799.000, 1599.000, 14, 11, 'Mobilia', 'TABLE-MANGER-EXT-01', 'https://images.unsplash.com/photo-1617806118233-18e1de247200', '{"min": "160cm", "max": "220cm", "largeur": "90cm"}', 58.0, 'MDF laqué', 'MDF مطلي', 'Blanc/Chêne', 'أبيض/بلوط', true, true, true, false, true),

('Ensemble Salle à Manger Complet', 'طقم غرفة طعام كامل', 'Table + 6 chaises + buffet', 'طاولة + 6 كراسي + خزانة', 3499.000, 2999.000, 5, 11, 'Meublatex', 'SAM-COMPLET-001', 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a', '{"table": "180x90cm", "buffet": "160cm"}', 135.0, 'Bois massif', 'خشب صلب', 'Noyer foncé', 'جوز غامق', true, false, true, true, true),

('Lot de 6 Chaises Design', 'مجموعة 6 كراسي تصميم عصري', 'Chaises modernes avec pieds en métal et assise rembourrée', 'كراسي حديثة مع أرجل معدنية ومقعد مبطن', 899.000, 749.000, 35, 11, 'Design Home', 'CHAISES-6-METAL', 'https://images.unsplash.com/photo-1503602642458-232111445657', '{"hauteur": "85cm", "largeur": "45cm"}', 24.0, 'Métal et tissu', 'معدن وقماش', 'Gris clair', 'رمادي فاتح', false, true, false, false, true),

-- Produits cuisine
('Cuisine Complète 260cm', 'مطبخ كامل 260 سم', 'Cuisine modulaire complète avec évier et plan de travail', 'مطبخ معياري كامل مع حوض وسطح عمل', 4999.000, 4499.000, 4, 12, 'Kitchenex', 'CUISINE-260-COMP', 'https://images.unsplash.com/photo-1556911220-bff31c812dba', '{"longueur": "260cm", "hauteur": "215cm"}', 220.0, 'MDF hydrofuge', 'MDF مقاوم للماء', 'Blanc/Gris', 'أبيض/رمادي', true, true, true, true, true),

('Îlot Central avec Rangements', 'جزيرة مركزية مع تخزين', 'Îlot de cuisine avec tiroirs et espace repas', 'جزيرة مطبخ مع أدراج ومساحة لتناول الطعام', 2299.000, 1999.000, 7, 12, 'Kitchenex', 'ILOT-CENTRAL-01', 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a', '{"longueur": "140cm", "largeur": "80cm", "hauteur": "90cm"}', 95.0, 'Panneau stratifié', 'لوحة طبقات', 'Blanc brillant', 'أبيض لامع', false, true, false, true, true),

-- Produits bureau
('Bureau d''Angle Moderne', 'مكتب زاوي حديث', 'Bureau d''angle spacieux avec étagères murales', 'مكتب زاوية واسع مع رفوف حائطية', 1399.000, 1199.000, 16, 13, 'Office Pro', 'BUREAU-ANGLE-01', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd', '{"longueur": "150cm", "largeur": "150cm"}', 52.0, 'MDF', 'MDF', 'Chêne sonoma', 'بلوط سونوما', false, true, true, false, true),

('Chaise de Bureau Ergonomique', 'كرسي مكتب مريح', 'Chaise ergonomique avec soutien lombaire réglable', 'كرسي مريح مع دعم قطني قابل للتعديل', 599.000, 499.000, 28, 13, 'ErgoChair', 'CHAISE-BUREAU-ERGO', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8', '{"hauteur_réglable": "45-55cm"}', 18.0, 'Mesh respirant', 'شبكة للتهوية', 'Noir', 'أسود', false, false, true, false, true),

-- Produits décoration
('Tapis Berbère Fait Main', 'سجادة بربرية يدوية', 'Tapis artisanal berbère en pure laine', 'سجادة حرفية بربرية من صوف نقي', 799.000, 699.000, 20, 14, 'Artisan Tunisien', 'TAPIS-BERBERE-200', 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d', '{"longueur": "200cm", "largeur": "140cm"}', 8.5, 'Laine pure', 'صوف نقي', 'Multicolore', 'متعدد الألوان', true, true, true, true, true),

('Lustre Marocain Moderne', 'ثريا مغربية حديثة', 'Lustre en métal doré avec verre coloré', 'ثريا من معدن ذهبي مع زجاج ملون', 449.000, 389.000, 30, 15, 'Lux Deco', 'LUSTRE-MAROC-01', 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f', '{"diamètre": "45cm", "hauteur": "60cm"}', 4.2, 'Métal et verre', 'معدن وزجاج', 'Doré', 'ذهبي', true, true, false, false, true),

('Miroir Mural Décoratif', 'مرآة حائط زخرفية', 'Grand miroir avec cadre moderne', 'مرآة كبيرة مع إطار عصري', 349.000, 299.000, 40, 6, 'Decor Plus', 'MIROIR-DECO-80', 'https://images.unsplash.com/photo-1618220179428-22790b461013', '{"hauteur": "80cm", "largeur": "60cm"}', 12.0, 'Miroir + cadre bois', 'مرآة + إطار خشبي', 'Doré', 'ذهبي', false, true, false, false, true);

-- Avis clients
INSERT INTO review (product_id, user_id, rating, title, comment, verified_purchase, helpful_count, created_at)
VALUES 
(1, 2, 5, 'Excellent canapé!', 'Très confortable et bien fait. Livraison rapide à Tunis.', true, 12, NOW()),
(1, 3, 4, 'Bon rapport qualité/prix', 'Content de mon achat. Bonne qualité pour le prix.', true, 8, NOW()),
(5, 2, 5, 'Chambre magnifique', 'Très belle chambre, bien finie. Made in Tunisia, je suis fier!', true, 15, NOW()),
(9, 3, 5, 'Table parfaite', 'Exactement ce que je cherchais. Extensible et pratique.', true, 10, NOW()),
(13, 2, 4, 'Cuisine de qualité', 'Installation professionnelle. Bon rapport qualité/prix.', true, 7, NOW());

-- ========================================
-- BASE: ecommerce_orders_tn
-- ========================================
\c ecommerce_orders_tn;

-- Commandes de test
INSERT INTO "order" (order_number, user_id, status, total_amount_tnd, shipping_fee_tnd, discount_amount_tnd, final_amount_tnd, 
                     shipping_full_name, shipping_phone, shipping_street, shipping_building, shipping_floor, shipping_apartment,
                     shipping_city, shipping_delegation, shipping_postal_code, shipping_governorate, shipping_landmark,
                     payment_method, payment_status, delivery_method, estimated_delivery_date, created_at)
VALUES 
('TN-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001', 2, 'DELIVERED', 2199.000, 20.000, 300.000, 1919.000,
 'Mohamed Ben Ali', '+216 22 345 678', 'Avenue Habib Bourguiba', 'Résidence Carthage', '3', 'A12',
 'Tunis', 'La Marsa', '2078', 'Tunis', 'En face de la pharmacie centrale',
 'CASH_ON_DELIVERY', 'COMPLETED', 'STANDARD', NOW() + INTERVAL '3 days', NOW() - INTERVAL '7 days'),

('TN-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002', 3, 'PROCESSING', 1599.000, 30.000, 0.000, 1629.000,
 'Fatma Trabelsi', '+216 25 678 901', 'Route de Sousse', 'Villa Jasmin', NULL, NULL,
 'Sousse', 'Sousse Ville', '4000', 'Sousse', 'Près du lycée Bourguiba',
 'D17', 'PENDING', 'EXPRESS', NOW() + INTERVAL '2 days', NOW() - INTERVAL '2 days'),

('TN-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-003', 2, 'PENDING', 699.000, 15.000, 100.000, 614.000,
 'Mohamed Ben Ali', '+216 22 345 678', 'Avenue Habib Bourguiba', 'Résidence Carthage', '3', 'A12',
 'Tunis', 'La Marsa', '2078', 'Tunis', 'En face de la pharmacie centrale',
 'FLOUCI', 'PENDING', 'STANDARD', NOW() + INTERVAL '5 days', NOW() - INTERVAL '1 day');

-- Items de commandes
INSERT INTO order_item (order_id, product_id, product_name, product_sku, quantity, price_tnd, discount_tnd, subtotal_tnd)
VALUES 
(1, 1, 'Canapé d''Angle Moderne 5 Places', 'CANAPE-ANGLE-001', 1, 2199.000, 300.000, 1899.000),
(2, 9, 'Table à Manger Extensible 6-8 Places', 'TABLE-MANGER-EXT-01', 1, 1599.000, 0.000, 1599.000),
(3, 17, 'Tapis Berbère Fait Main', 'TAPIS-BERBERE-200', 1, 699.000, 100.000, 599.000);

-- Suivi des commandes
INSERT INTO order_tracking (order_id, status, description, location, created_at)
VALUES 
(1, 'ORDER_CONFIRMED', 'Commande confirmée et en préparation', 'Entrepôt Tunis', NOW() - INTERVAL '7 days'),
(1, 'SHIPPED', 'Commande expédiée', 'Centre de distribution', NOW() - INTERVAL '5 days'),
(1, 'OUT_FOR_DELIVERY', 'En cours de livraison', 'La Marsa', NOW() - INTERVAL '4 days'),
(1, 'DELIVERED', 'Commande livrée avec succès', 'Domicile client', NOW() - INTERVAL '3 days'),
(2, 'ORDER_CONFIRMED', 'Commande confirmée - En attente paiement D17', 'Entrepôt Sousse', NOW() - INTERVAL '2 days'),
(3, 'PENDING', 'En attente de confirmation de paiement Flouci', 'Système', NOW() - INTERVAL '1 day');

-- ========================================
-- BASE: ecommerce_payments_tn
-- ========================================
\c ecommerce_payments_tn;

-- Paiements de test
INSERT INTO payment (order_id, payment_method, amount_tnd, status, transaction_id, gateway_response, created_at)
VALUES 
(1, 'CASH_ON_DELIVERY', 1919.000, 'COMPLETED', NULL, '{"cash_received": true, "delivery_confirmed": true}', NOW() - INTERVAL '3 days'),
(2, 'D17', 1629.000, 'PENDING', 'D17-TN-202411-12345', '{"status": "awaiting_payment"}', NOW() - INTERVAL '2 days'),
(3, 'FLOUCI', 614.000, 'PENDING', 'FLC-TN-789456', '{"status": "payment_initiated"}', NOW() - INTERVAL '1 day');

-- ========================================
-- Statistiques finales
-- ========================================
\c ecommerce_users_tn;
SELECT 'Tunisia Market - Data Created Successfully!' as status;
SELECT 'Total Users: ' || COUNT(*) as info FROM users;
SELECT 'Total Addresses: ' || COUNT(*) as info FROM address;

\c ecommerce_products_tn;
SELECT 'Total Categories: ' || COUNT(*) as info FROM category;
SELECT 'Total Products: ' || COUNT(*) as info FROM product;
SELECT 'Total Reviews: ' || COUNT(*) as info FROM review;
SELECT 'Tunisian Products: ' || COUNT(*) as info FROM product WHERE made_in_tunisia = true;

\c ecommerce_orders_tn;
SELECT 'Total Orders: ' || COUNT(*) as info FROM "order";
SELECT 'Total Order Items: ' || COUNT(*) as info FROM order_item;

\c ecommerce_payments_tn;
SELECT 'Total Payments: ' || COUNT(*) as info FROM payment;
