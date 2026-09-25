# Medical Laboratory Management Software - Backend API (Phase 1)

This backend implements Phase 1 Authentication for the Medical Laboratory Management System, including laboratory signup, administrative user creation, secure password hashing, JWT authentication, and MongoDB Atlas integration.

---

## 1. Python Version

- **Recommended**: Python `3.10` or higher (tested on Python `3.14`)

---

## 2. Project Structure

```
backend/
├── app/
│   ├── core/
│   │   ├── config.py         # App configuration & environment settings
│   │   ├── database.py       # MongoDB Atlas connection & unique indexes
│   │   └── security.py       # Bcrypt password hashing & JWT handling
│   ├── dependencies/
│   │   └── auth.py           # Reusable Bearer token & user validation dependency
│   ├── models/
│   │   └── __init__.py       # Document definitions (LabDocument, UserDocument)
│   ├── routes/
│   │   └── auth.py           # API endpoints (/signup, /login, /me)
│   ├── schemas/
│   │   └── auth.py           # Pydantic request & response schemas
│   ├── services/
│   │   └── auth_service.py   # Signup & login business logic
│   └── main.py               # FastAPI application setup, CORS, and lifespan
├── .env.example              # Environment variables template
├── requirements.txt          # Python dependencies
└── README.md                 # Backend documentation
```

---

## 3. Virtual Environment Setup

From the `backend/` directory:

### Windows (PowerShell)
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Linux / macOS
```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 4. Install Dependencies

With the virtual environment activated, install the required packages:

```bash
pip install -r requirements.txt
```

---

## 5. MongoDB Atlas Setup

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write access.
3. Whitelist your IP address (Network Access -> `0.0.0.0/0` for development or your specific IP).
4. Retrieve your connection string (SRV URI):
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
5. Specify this URI in your `.env` file under `MONGODB_URI`.
6. (Optional) For local development, a local MongoDB instance running at `mongodb://localhost:27017` is also supported.

### Collections & Indexes
The backend automatically creates unique indexes upon startup for:
- `users.email` (unique)
- `users.userId` (unique)
- `labs.labId` (unique)

---

## 6. Environment Variables

Create a `.env` file in the `backend/` directory based on `.env.example`:

```bash
cp .env.example .env
```

### Configuration Options

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas or local connection string | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Name of the database | `lab_management` |
| `JWT_SECRET` | Secret key for signing JWT tokens (min 32 chars) | Random 32+ character string |
| `JWT_ALGORITHM` | JWT signing algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token lifespan in minutes | `60` |
| `FRONTEND_URL` | Allowed origin for frontend CORS | `http://localhost:5173` |

---

## 7. How to Start FastAPI

From the `backend/` directory:

```bash
uvicorn app.main:app --reload --port 8000
```

FastAPI will start at `http://localhost:8000`.

### Interactive API Documentation (Swagger & ReDoc)
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 8. API Endpoints

### 1. Sign Up
- **Method / Endpoint**: `POST /api/auth/signup`
- **Request Body**:
  ```json
  {
    "labName": "City Central Diagnostics",
    "adminName": "Dr. Sarah Mitchell",
    "email": "sarah.mitchell@centraldiag.com",
    "phone": "9876543210",
    "address": "742 Evergreen Terrace, Medical District",
    "password": "SecurePassword123!"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "message": "Laboratory account created successfully"
  }
  ```
- **Error Responses**:
  - `409 Conflict`: Email address is already registered.
  - `422 Unprocessable Entity`: Field validation error (e.g., short password, invalid email format).

### 2. Sign In
- **Method / Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "sarah.mitchell@centraldiag.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "tokenType": "bearer",
    "user": {
      "userId": "USR-8F4A19BC",
      "labId": "LAB-3D1E072A",
      "labName": "City Central Diagnostics",
      "name": "Dr. Sarah Mitchell",
      "email": "sarah.mitchell@centraldiag.com",
      "role": "admin"
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid email or password.
  - `403 Forbidden`: Account is inactive.

### 3. Get Authenticated User Profile
- **Method / Endpoint**: `GET /api/auth/me`
- **Headers**:
  ```
  Authorization: Bearer <accessToken>
  ```
- **Response** (`200 OK`):
  ```json
  {
    "userId": "USR-8F4A19BC",
    "labId": "LAB-3D1E072A",
    "labName": "City Central Diagnostics",
    "name": "Dr. Sarah Mitchell",
    "email": "sarah.mitchell@centraldiag.com",
    "role": "admin"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Token is missing, expired, or invalid.

### 4. Health Check
- **Method / Endpoint**: `GET /api/health`
- **Response** (`200 OK`):
  ```json
  {
    "status": "healthy"
  }
  ```

---

## 9. How to Run Frontend and Backend Together

### Step 1: Start the Backend
Open a terminal, navigate to the `backend/` folder and run:
```bash
uvicorn app.main:app --reload --port 8000
```
Backend will run at `http://localhost:8000`.

### Step 2: Start the React Frontend
Open a second terminal, navigate to the frontend folder (`Lab-software-main`):
```bash
npm install
npm run dev
```
Frontend will run at `http://localhost:5173`.

### Step 3: Access the Application
1. Open your browser and navigate to `http://localhost:5173/signup`.
2. Fill out the laboratory and administrator registration form to create a new laboratory account.
3. You will be redirected to `http://localhost:5173/login` with a success notification.
4. Log in using the registered administrator credentials.
5. The application will authenticate against the backend, store the JWT securely, and navigate to `/dashboard`.

---

## 10. Role-Based Access Control (RBAC)

### Overview & Architecture
The Medical Laboratory Management System employs strict backend Role-Based Access Control (RBAC). The backend is the authoritative source of truth for authorization—access to endpoints and data is derived directly from the validated JWT and MongoDB database identity, rather than trusting client-supplied role parameters.

### Separation of Concerns
- **Authentication ("Who is the user?")**: Handled by `get_current_user` in `app/dependencies/auth.py`. Validates the Bearer token, decodes claims, verifies user status in MongoDB, and returns the authenticated user identity.
- **Authorization ("What is this user allowed to do?")**: Handled by `require_role(...)` and `require_roles(...)` in `app/dependencies/rbac.py`. Checks user role against route permission requirements and raises `403 Forbidden` if unauthorized.
- **Tenant Data Isolation ("Which laboratory does this resource belong to?")**: Handled by `ensure_lab_access(...)` and `get_current_lab_id(...)`. Ensures users can only access records belonging strictly to their authenticated `labId`.

### Supported User Roles
1. **`admin`**: Full laboratory administrative access.
2. **`receptionist`**: Reception desk operations (patient intake, billing view, doctors).
3. **`lab_technician`**: Laboratory clinical operations (sample accession, test processing, results entry).

---

## 11. Testing RBAC with Postman

### Step 1: Seed Test Users
To generate development test users for all 3 roles without modifying production signup, run:

```bash
cd backend
python scripts/seed_test_users.py
```

This creates the following test accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **`admin`** | `admin@testlab.com` | `AdminPassword123!` |
| **`receptionist`** | `receptionist@testlab.com` | `ReceptionistPass123!` |
| **`lab_technician`** | `technician@testlab.com` | `TechnicianPass123!` |

---

### Step 2: Postman Test Execution

#### 1. Login as Admin
- **POST** `http://localhost:8000/api/auth/login`
- **Body** (raw JSON):
  ```json
  {
    "email": "admin@testlab.com",
    "password": "AdminPassword123!"
  }
  ```
- **Response**: Copy the `accessToken`.

#### 2. Test Admin Access on RBAC Test Endpoints
Set header: `Authorization: Bearer <ADMIN_ACCESS_TOKEN>`

- **GET** `http://localhost:8000/api/rbac/admin-test` $\rightarrow$ `200 OK`
- **GET** `http://localhost:8000/api/rbac/receptionist-test` $\rightarrow$ `200 OK`
- **GET** `http://localhost:8000/api/rbac/lab-technician-test` $\rightarrow$ `200 OK`

---

#### 3. Login as Receptionist
- **POST** `http://localhost:8000/api/auth/login`
- **Body** (raw JSON):
  ```json
  {
    "email": "receptionist@testlab.com",
    "password": "ReceptionistPass123!"
  }
  ```
- **Response**: Copy the `accessToken`.

#### 4. Test Receptionist Access
Set header: `Authorization: Bearer <RECEPTIONIST_ACCESS_TOKEN>`

- **GET** `http://localhost:8000/api/rbac/receptionist-test` $\rightarrow$ `200 OK`
- **GET** `http://localhost:8000/api/rbac/admin-test` $\rightarrow$ `403 Forbidden`
  ```json
  {
    "detail": "Insufficient permissions to access this resource."
  }
  ```
- **GET** `http://localhost:8000/api/rbac/lab-technician-test` $\rightarrow$ `403 Forbidden`

---

#### 5. Login as Lab Technician
- **POST** `http://localhost:8000/api/auth/login`
- **Body** (raw JSON):
  ```json
  {
    "email": "technician@testlab.com",
    "password": "TechnicianPass123!"
  }
  ```
- **Response**: Copy the `accessToken`.

#### 6. Test Lab Technician Access
Set header: `Authorization: Bearer <TECHNICIAN_ACCESS_TOKEN>`

- **GET** `http://localhost:8000/api/rbac/lab-technician-test` $\rightarrow$ `200 OK`
- **GET** `http://localhost:8000/api/rbac/admin-test` $\rightarrow$ `403 Forbidden`
- **GET** `http://localhost:8000/api/rbac/receptionist-test` $\rightarrow$ `403 Forbidden`

---

#### 7. Test Unauthenticated Requests
Make a request without the `Authorization` header:

- **GET** `http://localhost:8000/api/rbac/admin-test` $\rightarrow$ `401 Unauthorized`
  ```json
  {
    "detail": "Not authenticated"
  }
  ```

---

#### 8. Test Invalid or Expired Token
Set header: `Authorization: Bearer invalid_or_expired_jwt_token`

- **GET** `http://localhost:8000/api/rbac/admin-test` $\rightarrow$ `401 Unauthorized`
  ```json
  {
    "detail": "Authentication token is invalid or has expired."
  }
  ```

