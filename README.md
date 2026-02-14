# 📚 The Books

A RESTful API for managing book reviews, built with **NestJS**, **TypeORM**, and **PostgreSQL**.

This project provides:

- Admin registration and authentication (JWT-based)
- Secure review creation and management
- HTML sanitization for user-generated content
- Modular and scalable architecture
- Clean separation of concerns

---

# 🚀 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Authentication:** JWT + Passport
- **Validation:** class-validator
- **Hashing:** bcryptjs
- **Sanitization:** sanitize-html
- **Configuration:** @nestjs/config

---

# 🏗️ Architecture

The application follows a modular architecture:

```
src/
│
├── main.ts
├── app.module.ts
│
├── admin/
├── auth/
├── review/
└── common/
```

Each module encapsulates:

- Controller
- Service
- DTOs
- Entity (when applicable)

This structure ensures scalability, testability, and separation of concerns.

---

# 🧩 Modules

---

## 👤 Admin Module

Responsible for administrator management.

### Entity: `Admin`

| Field      | Type   | Description |
|------------|--------|------------|
| id         | uuid   | Primary key |
| firstName  | string | Admin first name |
| lastName   | string | Admin last name |
| email      | string | Unique email |
| password   | string | Hashed password |
| reviews    | relation | OneToMany → Review |
| createdAt  | date   | Creation timestamp |
| updatedAt  | date   | Update timestamp |

---

### Routes

#### `POST /admin`

Creates a new admin.

**Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "password": "123456"
}
```

**Response**
```json
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com"
}
```

---

#### `GET /admin`

Returns the authenticated admin profile.

🔐 Requires JWT

Header:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Module

Handles login and registration.

### JWT Configuration

- Signed with `JWT_SECRET`
- Expiration: 1 day
- Extracted from `Authorization: Bearer <token>`

---

### Routes

#### `POST /auth/register`

Registers a new admin and returns a token.

**Body**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@email.com",
  "password": "password123"
}
```

**Response**
```json
{
  "accessToken": "jwt_token_here"
}
```

---

#### `POST /auth/login`

Authenticates an admin.

**Body**
```json
{
  "email": "jane@email.com",
  "password": "password123"
}
```

**Response**
```json
{
  "accessToken": "jwt_token_here"
}
```

---

## 📚 Review Module

Responsible for managing book reviews.

---

### Entity: `Review`

| Field     | Type   | Description |
|-----------|--------|------------|
| id        | uuid   | Primary key |
| title     | string | Review title |
| category  | string | Book category |
| content   | string | HTML content (sanitized) |
| summary   | string | Short description |
| rating    | number | 1–5 |
| cover     | string | Image URL |
| author    | relation | ManyToOne → Admin |
| createdAt | date   | Creation timestamp |
| updatedAt | date   | Update timestamp |

---

## Review Routes

---

### `POST /review`

Creates a review.

🔐 Requires JWT

**Body**
```json
{
  "title": "Clean Code",
  "category": "Software",
  "content": "<p>Great book</p>",
  "description": "Short summary",
  "rating": 5,
  "cover": "https://example.com/image.jpg"
}
```

Behavior:
- HTML content is sanitized
- Authenticated admin becomes the author

---

### `GET /review`

Returns all reviews (with author relation).

Public endpoint.

---

### `GET /review/:id`

Returns a single review by ID.

Public endpoint.

---

### `PATCH /review/:id`

Updates a review.

🔐 Requires JWT  
Only the review owner can update.

Returns `403 Forbidden` if not owner.

---

### `DELETE /review/:id`

Deletes a review.

🔐 Requires JWT

⚠️ Improvement recommended: enforce owner validation before deletion.

---

# 🧰 Common Module

Contains reusable abstractions.

---

## 🔑 Hashing Service

Abstract class: `HashingService`  
Implementation: `BcryptHashingService`

Uses:
- bcryptjs

Purpose:
- Hash passwords
- Compare passwords securely

---

## 🧼 Sanitizer Service

Abstract class: `SanitizerService`  
Implementation: `SanitizeHtmlService`

Uses:
- sanitize-html

Purpose:
- Clean user-submitted HTML before saving to the database

---

# 🛡 Validation

DTOs use `class-validator` decorators such as:

- `@IsEmail()`
- `@IsString()`
- `@IsUrl()`
- `@IsIn([1,2,3,4,5])`
- `@Min(3)`

This guarantees input validation before business logic execution.

---

# 🔐 Security

- Passwords hashed with bcrypt
- JWT authentication
- Passport strategy
- Owner validation on update
- HTML sanitization

---

# 🌎 Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgres://user:password@localhost:5432/the_books
JWT_SECRET=super_secret_key
PORT=3000
```

---

# ⚙️ Running the Project

### Install dependencies
```
npm install
```

### Development mode
```
npm run start:dev
```

### Production
```
npm run build
npm run start:prod
```

---

# 📦 Core Dependencies

- @nestjs/common
- @nestjs/core
- @nestjs/typeorm
- @nestjs/jwt
- passport
- passport-jwt
- bcryptjs
- sanitize-html
- class-validator
- typeorm
- pg

---

# 📌 Final Notes

The Books API demonstrates:

- Clean modular architecture
- Proper authentication flow
- Security best practices
- Abstraction of infrastructure services
- Scalable backend structure

Built with ❤️ using NestJS
