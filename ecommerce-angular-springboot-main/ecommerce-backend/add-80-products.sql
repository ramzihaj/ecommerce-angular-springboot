-- SCRIPT POUR AJOUTER 80+ PRODUITS TUNISIENS
-- Suppression des anciens produits pour repartir à zéro
DELETE FROM product_sizes;
DELETE FROM product_colors;
DELETE FROM product_images;
DELETE FROM reviews;
DELETE FROM products;

-- Insertion de 85 produits tunisiens avec images et descriptions
