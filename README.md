# Order Management System

## Overview
This project can be run in two ways: using Docker or setting up manually. Follow the instructions below to get started.

---

## Running the Project with Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KaziSifatAlMaksud/OrderManagementSystem.git
   cd OrderManagementSystem
   ```

2. **Start the containers:**
   Use the following command to build and run the containers in detached mode:
   ```bash
   docker-compose up -d --build
   ```

3. **Access the services:**
   - **Frontend:** Visit [http://localhost:3000](http://localhost:3000) to access the frontend.
   - **Backend:** API endpoints are accessible at [http://localhost:5000](http://localhost:5000).
   - **phpMyAdmin:** Visit [http://localhost:8080](http://localhost:8080) to manage the database.

4. **Set up the database:**
   - Open phpMyAdmin at [http://localhost:8080](http://localhost:8080).
   - Use the credentials provided in the `docker-compose.yml` file to log in.
   - Import or create your database as needed.

---

## Manual Setup

If you prefer not to use Docker, follow these steps to run the project manually:

1. **Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies and start the development server:
     ```bash
     npm install
     npm start
     ```
   - The frontend will be accessible at [http://localhost:3000](http://localhost:3000).

2. **Backend:**
   - Navigate to the backend directory:
     ```bash
     cd Backend
     ```
   - Install dependencies and start the server:
     ```bash
     npm install
     npm run start
     ```
   - The backend will be accessible at [http://localhost:5000](http://localhost:5000).

3. **Database:**
   - Set up a local database using your preferred method.
   - Ensure the database credentials in the backend configuration match your local setup.
     ```bash
     Database Name:  test
     ```
---

## Project Structure
```
.
├── frontend          # Frontend code (React)
├── backend           # Backend code (Node.js)
├── docker-compose.yml
├── README.md
└── ...
```

---

## Troubleshooting
- If you encounter any issues with Docker, try rebuilding the containers:
  ```bash
  docker-compose down
  docker-compose up -d --build
  ```
- Ensure no other services are using ports 3000, 5000, or 8080.

## Contributing
Contributions are welcome! Please fork this repository and create a pull request for any changes.

