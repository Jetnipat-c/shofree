# Shofree Project

## How to Run

Follow these steps to set up and run the project.:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd shofree
    ```
3. Start the Docker containers:
    ```bash
    docker compose up -d
    ```
4. Set up and start the CMS service:
    ```bash
    cd cms-service
    cp .env.example .env
    npm install
    npm run start:dev
    ```
5. Set up and start the Shofree backend service:
    ```bash
    cd shofree-backend
    cp .env.example .env
    npm install
    npm run start:dev
    ```
6. Set up and start the Shofree frontend:
    ```bash
    cd shofree-frontend
    npm install
    npm run dev
    ```
- You can open [http://localhost:5173](http://localhost:5173) to test.
- You can open [http://localhost:8080](http://localhost:8080) to access the database.

## Database Credentials

### CMS Service
- **Server:** `cms_service`
- **Username:** `cms_user`
- **Password:** `cms_password`

### Shofree Service
- **Server:** `shofree_service`
- **Username:** `shofree_user`
- **Password:** `shofree_password`

## ER-Diagram
![alt text](https://github.com/Jetnipat-c/shofree/blob/main/Shofree-ERD.drawio.png)
