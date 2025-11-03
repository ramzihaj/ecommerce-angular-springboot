-- =====================================================
-- Initialisation des bases de données - Tunisia Market
-- PostgreSQL 18
-- Encoding: UTF-8
-- Locale: fr_TN.UTF-8
-- Timezone: Africa/Tunis
-- =====================================================

-- Création des bases de données pour chaque microservice
CREATE DATABASE ecommerce_users_tn
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_TN.UTF-8'
    LC_CTYPE = 'fr_TN.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE = template0;

CREATE DATABASE ecommerce_products_tn
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_TN.UTF-8'
    LC_CTYPE = 'fr_TN.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE = template0;

CREATE DATABASE ecommerce_orders_tn
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_TN.UTF-8'
    LC_CTYPE = 'fr_TN.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE = template0;

CREATE DATABASE ecommerce_payments_tn
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_TN.UTF-8'
    LC_CTYPE = 'fr_TN.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE = template0;

-- Message de confirmation
SELECT 'Databases created successfully for Tunisia market!' as status;
