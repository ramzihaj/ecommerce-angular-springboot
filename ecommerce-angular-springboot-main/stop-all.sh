#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🛑 Stopping E-Commerce Platform${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Stop frontend
echo -e "\n${YELLOW}🎨 Stopping frontend...${NC}"
if [ -f "ecommerce-backend/logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat ecommerce-backend/logs/frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null; then
        kill $FRONTEND_PID
        echo -e "${GREEN}✅ Frontend stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  Frontend was not running${NC}"
    fi
    rm ecommerce-backend/logs/frontend.pid
else
    echo -e "${YELLOW}⚠️  Frontend PID file not found${NC}"
fi

# Stop backend services
echo -e "\n${YELLOW}🚀 Stopping backend services...${NC}"

cd ecommerce-backend

# Stop Gateway
if [ -f "logs/gateway.pid" ]; then
    GATEWAY_PID=$(cat logs/gateway.pid)
    if ps -p $GATEWAY_PID > /dev/null; then
        kill $GATEWAY_PID
        echo -e "${GREEN}✅ Gateway stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  Gateway was not running${NC}"
    fi
    rm logs/gateway.pid
fi

# Stop User Service
if [ -f "logs/user-service.pid" ]; then
    USER_PID=$(cat logs/user-service.pid)
    if ps -p $USER_PID > /dev/null; then
        kill $USER_PID
        echo -e "${GREEN}✅ User Service stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  User Service was not running${NC}"
    fi
    rm logs/user-service.pid
fi

# Stop Product Service
if [ -f "logs/product-service.pid" ]; then
    PRODUCT_PID=$(cat logs/product-service.pid)
    if ps -p $PRODUCT_PID > /dev/null; then
        kill $PRODUCT_PID
        echo -e "${GREEN}✅ Product Service stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  Product Service was not running${NC}"
    fi
    rm logs/product-service.pid
fi

# Stop Order Service
if [ -f "logs/order-service.pid" ]; then
    ORDER_PID=$(cat logs/order-service.pid)
    if ps -p $ORDER_PID > /dev/null; then
        kill $ORDER_PID
        echo -e "${GREEN}✅ Order Service stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  Order Service was not running${NC}"
    fi
    rm logs/order-service.pid
fi

# Stop Notification Service
if [ -f "logs/notification-service.pid" ]; then
    NOTIFICATION_PID=$(cat logs/notification-service.pid)
    if ps -p $NOTIFICATION_PID > /dev/null; then
        kill $NOTIFICATION_PID
        echo -e "${GREEN}✅ Notification Service stopped${NC}"
    else
        echo -e "${YELLOW}⚠️  Notification Service was not running${NC}"
    fi
    rm logs/notification-service.pid
fi

# Stop Docker containers
echo -e "\n${YELLOW}🐳 Stopping Docker containers...${NC}"
docker-compose down

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker containers stopped${NC}"
else
    echo -e "${RED}❌ Failed to stop Docker containers${NC}"
fi

cd ..

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ E-Commerce Platform Stopped Successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
