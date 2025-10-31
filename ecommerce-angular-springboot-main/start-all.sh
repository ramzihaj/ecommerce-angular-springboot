#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Starting E-Commerce Platform${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check prerequisites
echo -e "\n${YELLOW}📋 Checking prerequisites...${NC}"

if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed${NC}"
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo -e "${RED}❌ Maven is not installed${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"

# Start Docker infrastructure
echo -e "\n${YELLOW}🐳 Starting Docker infrastructure...${NC}"
cd ecommerce-backend
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker containers started${NC}"
else
    echo -e "${RED}❌ Failed to start Docker containers${NC}"
    exit 1
fi

# Wait for PostgreSQL to be ready
echo -e "\n${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
sleep 10

# Build backend
echo -e "\n${YELLOW}🔨 Building backend services...${NC}"
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend built successfully${NC}"
else
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi

# Start backend services
echo -e "\n${YELLOW}🚀 Starting backend services...${NC}"

# Start Gateway
echo -e "${BLUE}Starting API Gateway (port 8080)...${NC}"
cd gateway
mvn spring-boot:run > ../logs/gateway.log 2>&1 &
GATEWAY_PID=$!
echo $GATEWAY_PID > ../logs/gateway.pid
cd ..

sleep 5

# Start User Service
echo -e "${BLUE}Starting User Service (port 8081)...${NC}"
cd user-service
mvn spring-boot:run > ../logs/user-service.log 2>&1 &
USER_PID=$!
echo $USER_PID > ../logs/user-service.pid
cd ..

sleep 5

# Start Product Service
echo -e "${BLUE}Starting Product Service (port 8082)...${NC}"
cd product-service
mvn spring-boot:run > ../logs/product-service.log 2>&1 &
PRODUCT_PID=$!
echo $PRODUCT_PID > ../logs/product-service.pid
cd ..

sleep 5

# Start Order Service
echo -e "${BLUE}Starting Order Service (port 8083)...${NC}"
cd order-service
mvn spring-boot:run > ../logs/order-service.log 2>&1 &
ORDER_PID=$!
echo $ORDER_PID > ../logs/order-service.pid
cd ..

sleep 5

# Start Notification Service
echo -e "${BLUE}Starting Notification Service (port 8085)...${NC}"
cd notification-service
mvn spring-boot:run > ../logs/notification-service.log 2>&1 &
NOTIFICATION_PID=$!
echo $NOTIFICATION_PID > ../logs/notification-service.pid
cd ..

cd ..

echo -e "${GREEN}✅ Backend services started${NC}"

# Start frontend
echo -e "\n${YELLOW}🎨 Starting frontend...${NC}"
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing npm packages...${NC}"
    npm install
fi

echo -e "${BLUE}Starting Angular development server (port 4200)...${NC}"
npm start > ../ecommerce-backend/logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../ecommerce-backend/logs/frontend.pid

cd ..

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ E-Commerce Platform Started Successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\n${BLUE}📊 Service URLs:${NC}"
echo -e "  ${YELLOW}Frontend:${NC}              http://localhost:4200"
echo -e "  ${YELLOW}API Gateway:${NC}           http://localhost:8080"
echo -e "  ${YELLOW}User Service (Swagger):${NC}    http://localhost:8081/swagger-ui.html"
echo -e "  ${YELLOW}Product Service (Swagger):${NC} http://localhost:8082/swagger-ui.html"
echo -e "  ${YELLOW}Order Service (Swagger):${NC}   http://localhost:8083/swagger-ui.html"
echo -e "  ${YELLOW}pgAdmin:${NC}              http://localhost:5050"

echo -e "\n${BLUE}📝 Logs location:${NC} ecommerce-backend/logs/"
echo -e "\n${YELLOW}⚠️  To stop all services, run:${NC} ./stop-all.sh"
echo -e "\n${GREEN}Happy coding! 🎉${NC}\n"
