#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour générer 85 produits tunisiens avec images et descriptions
"""

import random

# Données de base
categories = {1: 'Mobilier', 2: 'Électronique', 3: 'Mode', 4: 'Artisanat'}

brands = {
    1: ['MaisonTN', 'BoisNoble', 'MeublePlus', 'DesignTunis', 'ArtMeuble'],
    2: ['Samsung', 'LG', 'Midea', 'Condor', 'Iris', 'Telefunken'],
    3: ['TradiMode', 'ModeTN', 'ArtisanTN', 'ChicTunis', 'EleganceTN'],
    4: ['ArtDjerba', 'TapisKairouan', 'NabeulArt', 'PoterieTN', 'ArtisanSfax']
}

images_base = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800',
    'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
    'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
]

# Produits par catégorie
mobilier_products = [
    ('Canapé d''angle moderne', 1999.99, 1699.99, 10),
    ('Fauteuil relax cuir', 899.99, 749.99, 15),
    ('Table à manger 6 places', 699.99, 599.99, 12),
    ('Buffet bois massif', 1299.99, 1099.99, 8),
    ('Bibliothèque 5 étagères', 549.99, 479.99, 20),
    ('Lit double 160x200', 1499.99, 1249.99, 6),
    ('Armoire 3 portes coulissantes', 1899.99, 1599.99, 5),
    ('Commode 6 tiroirs', 499.99, 429.99, 18),
    ('Table basse ronde', 349.99, 299.99, 25),
    ('Étagère murale design', 189.99, 159.99, 30),
    ('Bureau ordinateur L-shape', 799.99, 679.99, 12),
    ('Chaise de bureau ergonomique', 349.99, 299.99, 22),
    ('Banc d''entrée avec rangement', 229.99, 199.99, 15),
    ('Console moderne avec miroir', 599.99, 529.99, 10),
    ('Miroir décoratif doré', 199.99, 169.99, 28),
    ('Porte-manteau sur pied', 129.99, 109.99, 35),
    ('Meuble TV 180cm', 899.99, 799.99, 9),
    ('Table de chevet 2 tiroirs', 249.99, 219.99, 20),
    ('Paravent 3 panneaux', 349.99, 299.99, 12),
    ('Tabouret de bar x2', 199.99, 169.99, 25),
]

electronic_products = [
    ('Smart TV Samsung 55" 4K', 2799.99, 2399.99, 12),
    ('Smart TV LG 65" OLED', 4999.99, 4299.99, 5),
    ('Climatiseur Midea 18000 BTU', 2199.99, 1899.99, 15),
    ('Réfrigérateur LG No Frost 520L', 2899.99, 2499.99, 8),
    ('Machine à laver Samsung 9kg', 1899.99, 1599.99, 10),
    ('Micro-ondes Condor 25L', 349.99, 299.99, 25),
    ('Aspirateur robot iRobot', 1499.99, 1299.99, 7),
    ('Cafetière Nespresso', 899.99, 799.99, 18),
    ('Fer à repasser vapeur', 149.99, 129.99, 30),
    ('Mixeur plongeant Moulinex', 179.99, 149.99, 22),
    ('Grille-pain 4 tranches', 129.99, 109.99, 28),
    ('Bouilloire électrique 2L', 89.99, 74.99, 40),
    ('Radiateur électrique 2000W', 299.99, 259.99, 15),
    ('Ventilateur sur pied', 149.99, 129.99, 35),
    ('Purificateur d''air Xiaomi', 599.99, 519.99, 12),
    ('Enceinte Bluetooth JBL', 399.99, 349.99, 20),
    ('Casque audio Sony sans fil', 499.99, 429.99, 18),
    ('Tablette Samsung Galaxy 10"', 1299.99, 1099.99, 10),
    ('Montre connectée Samsung', 899.99, 749.99, 15),
    ('Chargeur sans fil Qi', 79.99, 69.99, 45),
]

mode_products = [
    ('Jebba homme traditionnelle', 189.99, 159.99, 25),
    ('Robe Sefsari brodé', 299.99, 249.99, 18),
    ('Chéchia rouge artisanale', 89.99, 79.99, 50),
    ('Burnous laine pure', 449.99, 399.99, 12),
    ('Kaftan femme luxe', 599.99, 499.99, 10),
    ('Chemise homme lin', 129.99, 109.99, 30),
    ('Pantalon traditionnel Seroual', 149.99, 129.99, 22),
    ('Veste homme brodée', 349.99, 299.99, 15),
    ('Ceinture cuir Tunisie', 79.99, 69.99, 40),
    ('Foulard soie naturelle', 99.99, 84.99, 35),
    ('Babouches cuir femme', 69.99, 59.99, 45),
    ('Babouches cuir homme', 79.99, 69.99, 42),
    ('Sac à main cuir tressé', 199.99, 169.99, 20),
    ('Portefeuille cuir artisanal', 59.99, 49.99, 38),
    ('Cravate soie Tunisie', 49.99, 42.99, 50),
    ('Écharpe laine Kairouan', 89.99, 79.99, 28),
    ('Robe d''été brodée', 179.99, 149.99, 25),
    ('Chemisier femme traditionnel', 149.99, 129.99, 30),
    ('Tunique lin brodée', 169.99, 149.99, 22),
    ('Gilet traditionnel', 129.99, 109.99, 25),
]

artisanat_products = [
    ('Poterie Guellala vase décoratif', 149.99, 129.99, 15),
    ('Tapis Berbère Kairouan 200x300', 3999.99, 3499.99, 4),
    ('Miroir mosaïque Nabeul', 199.99, 169.99, 12),
    ('Plat service céramique peint', 119.99, 99.99, 20),
    ('Lampe orientale cuivre', 249.99, 219.99, 10),
    ('Tableau calligraphie arabe', 299.99, 259.99, 8),
    ('Coussin brodé main', 69.99, 59.99, 30),
    ('Panier osier tressé', 49.99, 42.99, 40),
    ('Service à thé tunisien', 179.99, 149.99, 15),
    ('Horloge murale mosaïque', 159.99, 139.99, 18),
    ('Fontaine décorative céramique', 399.99, 349.99, 6),
    ('Cadre photo bois sculpté', 89.99, 79.99, 25),
    ('Bougeoir fer forgé', 79.99, 69.99, 28),
    ('Jardinière céramique', 129.99, 109.99, 22),
    ('Vase amphore décoratif', 189.99, 169.99, 12),
    ('Set dessous de plat mosaïque', 59.99, 49.99, 35),
    ('Bol artisanal céramique', 39.99, 34.99, 45),
    ('Plateau service cuivre', 149.99, 129.99, 18),
    ('Lanterne orientale métal', 119.99, 99.99, 20),
    ('Boîte à bijoux nacre', 99.99, 84.99, 22),
]

all_products = [
    (mobilier_products, 1),
    (electronic_products, 2),
    (mode_products, 3),
    (artisanat_products, 4)
]

print("-- SUPPRESSION DES ANCIENNES DONNÉES")
print("DELETE FROM product_sizes;")
print("DELETE FROM product_colors;")
print("DELETE FROM product_images;")
print("DELETE FROM reviews;")
print("DELETE FROM products;")
print()

print("-- INSERTION DE 80+ PRODUITS TUNISIA")
product_id = 1

for products_list, cat_id in all_products:
    for name, price, disc_price, stock in products_list:
        brand = random.choice(brands[cat_id])
        discount_percent = int(((price - disc_price) / price) * 100)
        rating = round(random.uniform(4.0, 5.0), 1)
        review_count = random.randint(5, 50)
        view_count = random.randint(50, 800)
        is_featured = 'true' if product_id % 4 == 0 else 'false'
        
        # Description détaillée
        desc = f"Produit de qualité supérieure fabriqué en Tunisie. {name} avec finition soignée et matériaux durables. Design moderne adapté au style tunisien. Garantie constructeur 2 ans. Livraison disponible dans toute la Tunisie."
        
        sku = f"{categories[cat_id][:3].upper()}-{product_id:03d}"
        
        print(f"INSERT INTO products (name, description, price, discount_price, discount_percent, stock_quantity, category_id, brand, sku, is_featured, average_rating, review_count, view_count, created_at, updated_at) VALUES")
        print(f"('{name}', '{desc}', {price}, {disc_price}, {discount_percent}, {stock}, {cat_id}, '{brand}', '{sku}', {is_featured}, {rating}, {review_count}, {view_count}, NOW(), NOW());")
        print()
        
        product_id += 1

print()
print("-- INSERTION DES IMAGES")
product_id = 1
for products_list, cat_id in all_products:
    for _ in products_list:
        # 2-3 images par produit
        num_images = random.randint(2, 3)
        for i in range(num_images):
            img_url = random.choice(images_base)
            print(f"INSERT INTO product_images (product_id, image_url) VALUES ({product_id}, '{img_url}');")
        product_id += 1

print()
print("-- COMMIT")
print("COMMIT;")
