# 📚 AuralBooks — AI-Powered Audiobook & Reading Platform

<div align="center">

![AuralBooks Banner](https://img.shields.io/badge/AuralBooks-AI%20Reading%20Platform-gold?style=for-the-badge&logo=bookstack)

[![Angular](https://img.shields.io/badge/Angular-18.0-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.2-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-007396?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.2-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Azure](https://img.shields.io/badge/Azure-AKS-0078D4?style=flat-square&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Scale](https://img.shields.io/badge/Scale-2M%2B%20Users-brightgreen?style=flat-square)]()

**A full-stack, AI-native reading platform — Angular 18 frontend + Spring Boot 3.3 microservices backend — engineered to scale to 2 million users on Azure AKS.**

[Features](#-features) · [Architecture](#-architecture) · [Quick Start](#-quick-start) · [Backend](#-backend-spring-boot) · [Frontend](#-frontend-angular-18) · [API Docs](#-api-documentation) · [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

1. [Features](#-features)
2. [High-Level Design (HLD)](#-high-level-design-hld)
3. [Low-Level Design (LLD)](#-low-level-design-lld)
4. [Cache Configuration](#-cache-configuration)
5. [Networking](#-networking)
6. [Project Structure](#-project-structure)
7. [Prerequisites](#-prerequisites)
8. [Quick Start](#-quick-start)
9. [Backend — Spring Boot](#-backend-spring-boot)
   - [Tech Stack](#backend-tech-stack)
   - [Module Breakdown](#backend-module-breakdown)
   - [Running the Backend](#running-the-backend)
   - [Environment Variables](#backend-environment-variables)
   - [Database Migrations](#database-migrations)
   - [API Endpoints Reference](#api-endpoints-reference)
   - [WebSocket / Real-time Chat](#websocket--real-time-chat)
   - [Security & JWT](#security--jwt)
   - [Caching Strategy](#caching-strategy)
10. [Frontend — Angular 18](#-frontend-angular-18)
    - [Tech Stack](#frontend-tech-stack)
    - [Module Breakdown](#frontend-module-breakdown)
    - [Running the Frontend](#running-the-frontend)
    - [Environment Configuration](#frontend-environment-configuration)
    - [NgRx State Management](#ngrx-state-management)
    - [Angular Services](#angular-services)
11. [Docker & Docker Compose](#-docker--docker-compose)
12. [Azure Infrastructure](#-azure-infrastructure)
13. [Deployment](#-deployment)
14. [Monitoring & Observability](#-monitoring--observability)
15. [IAM & Roles](#-iam--roles)
16. [Application Security](#-application-security)
17. [Testing](#-testing)
18. [Contributing](#-contributing)

---



## 🌟 Features

### 📖 Reading & Listening
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| ePub / PDF Reader | In-browser book reader with themes (Light, Sepia, Dark), font control, chapter nav, and offline PWA support | `BookService`, `ReadingStateRepository` | `ReaderComponent` |
| AI Audiobook Narration | Azure Neural TTS narration (25+ voices) streamed chapter by chapter; speed 0.5×–3.0×; syncs position across devices | `AudioService`, Azure Function | `AudioPlayerComponent` |
| Smart Highlights | 5-color highlights saved server-side, synced across devices; tap any highlight for AI explanation or to add a note | `HighlightRepository`, `BookController` | `ReaderComponent`, `BookService` |
| Notes | Freeform notes per page/chapter with tags; optional one-tap AI summary; exportable to Markdown | `NoteRepository`, `AiService` | `NotesComponent`, `BookService` |
| Progress Sync | Reading position and audio timestamp synced in real time across all devices via WebSocket STOMP | `ReadingStateRepository`, WebSocket | `ChatService`, `BookService` |

### 🤖 AI Intelligence
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| AI Reading Assistant | GPT-4o Q&A panel in the reader — context-aware (knows the book and chapter); supports 10-turn conversation history | `AiService`, Azure OpenAI | `AiAssistantComponent`, `AiService` |
| Personalized Recommendations | ML-based picks refreshed every 6 hours; "Because you read X" labels; dismiss feedback loop | `AiService`, Azure ML, `@Scheduled` | `HomeComponent`, `AiService` |
| AI Group Chat Bot | Mention `@auralai` in any group chat to get book insights, author facts, or literary analysis inline | `ChatWebSocketController`, `AiService` | `ChatService` |

### 👥 Social & Community
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| Reading Groups | Public or private genre-based groups (up to 10,000 members); roles: Owner, Moderator, Member | `GroupService`, `ReadingGroupRepository` | `GroupsComponent`, `GroupDetailComponent` |
| Real-time Chat | WebSocket group chat via Spring STOMP + Azure SignalR; typing indicators, reactions, message replies | `ChatWebSocketController` | `ChatService` (`@stomp/rx-stomp`) |
| User Connections | Follow readers; activity feed; public reading stats and streaks on every profile | `UserService`, `user_follows` table | `ProfileComponent`, `FeedComponent` |

### 📅 Events
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| Event Calendar & RSVP | Monthly events (Author AMAs, reading challenges, book clubs); RSVP with capacity cap; email reminders via Service Bus | `EventService`, `event_rsvps` table | `EventsComponent`, `EventService` |
| Live Author AMAs | Upvote-based question queue; live Q&A over WebSocket; AI-generated post-event transcript | WebSocket STOMP, `AiService` | `EventLiveComponent`, `ChatService` |

### 🛒 Marketplace & Commerce
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| Buy Books | Permanent ownership via Stripe PaymentIntent; webhook-confirmed; email receipt | `MarketplaceService`, `StripeService` | `MarketplaceComponent`, `MarketplaceService` |
| Rent Books | Time-limited access (default 14 days); expiry enforced at SAS URL level; 48h reminder emails | `MarketplaceService`, `@Scheduled` | `MarketplaceComponent`, `LibraryComponent` |
| Publisher Dashboard | Upload books, set pricing, trigger AI audio generation, view sales analytics, download royalty statements | `BookController` (PUBLISHER role), Azure Functions | `PublisherDashboardComponent` |

### 🔐 Auth & Security
| Feature | Description | Backend | Frontend |
|---|---|---|---|
| JWT Authentication | Stateless auth; 15-min access token + 30-day refresh token; Redis blacklist on logout | `AuthService`, `JwtService`, `JwtAuthFilter` | `AuthService` (Signals), `AuthInterceptor` |
| Silent Token Refresh | `401` responses auto-retry after refreshing the access token — transparent to the user | `AuthService` | `RefreshInterceptor` |
| Role-based Access | `ROLE_USER`, `ROLE_PUBLISHER`, `ROLE_ADMIN` enforced via `@PreAuthorize`; CORS locked to allowed origins | `SecurityConfig` | `AuthGuard` |

---

## 🏗 High-Level Design (HLD)

### System Context

AuralBooks is structured as seven logical tiers. Every request from a browser or mobile device travels through all of them before touching a data store.

```
  ┌──────────────────────────────────────────────────────────────────────────┐
  │                      CLIENTS                                              │
  │   Angular 18 SPA (Web)  ·  Mobile PWA  ·  Publisher Admin Portal         │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │  HTTPS / WSS
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   EDGE LAYER                                              │
  │   Azure Front Door Premium — WAF (OWASP 3.2), DDoS, anycast routing,     │
  │   TLS 1.3 termination, geo-failover East US ↔ West Europe                │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   GATEWAY LAYER                                           │
  │   Azure API Management — JWT validation, rate limiting (1K req/min),      │
  │   request routing by path prefix, usage analytics                         │
  │   NGINX Ingress Controller — in-cluster L7 routing to service namespaces  │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   MICROSERVICES LAYER  (AKS — auralbooks-*)               │
  │                                                                           │
  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
  │  │ Book Svc    │  │ User/Auth   │  │ Chat Svc    │  │ AI Svc      │    │
  │  │ :8080       │  │ Svc :8081   │  │ (WebSocket) │  │ :8082 (GPU) │    │
  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
  │  ┌─────────────┐  ┌─────────────┐                                        │
  │  │ Marketplace │  │ Event Svc   │                                        │
  │  │ Svc :8083   │  │ :8084       │                                        │
  │  └─────────────┘  └─────────────┘                                        │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   ASYNC PROCESSING LAYER                                  │
  │   Azure Service Bus queues — orders, notifications, royalties             │
  │   Azure Event Hubs — reading analytics, audit stream                      │
  │   Azure Functions — TTS audio generation, royalty processor, email sender │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   DATA LAYER                                              │
  │   PostgreSQL 16      — transactional data (orders, users, books)          │
  │   Azure Redis P3     — multi-tier cache (sessions, book lists, AI output) │
  │   Azure Cosmos DB    — chat messages, reading events (high-write NoSQL)   │
  │   Azure Blob Storage — ePub, mp3 audio, book cover images (CDN-fronted)   │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │
  ┌────────────────────────────────▼─────────────────────────────────────────┐
  │                   AI / ML LAYER                                           │
  │   Azure OpenAI GPT-4o    — reading assistant, group bot, summaries        │
  │   Azure Neural TTS        — audiobook narration (25+ voices)              │
  │   Azure ML endpoint       — personalized recommendation model             │
  │   Azure Cognitive Search  — full-text book search with semantic ranking   │
  └──────────────────────────────────────────────────────────────────────────┘
```

### Request Flow — Typical Read (Book Catalog)

```
Browser                Front Door       APIM            Book Service       Redis / PostgreSQL
  │                        │              │                  │                     │
  │── GET /api/v1/books ──▶│              │                  │                     │
  │                        │── route ───▶│                  │                     │
  │                        │              │── validate JWT ─▶│                     │
  │                        │              │                  │── check Redis ─────▶│
  │                        │              │                  │◀── HIT (< 1ms) ─────│
  │◀────────── 200 JSON ───────────────────────────────────── │                     │
  │                        │              │                  │                     │
  │                        │              │            (on cache MISS)             │
  │                        │              │                  │── SELECT * books ──▶│
  │                        │              │                  │◀── rows ────────────│
  │                        │              │                  │── SET Redis TTL ───▶│
  │◀────────── 200 JSON ───────────────────────────────────── │                     │
```

### Request Flow — Real-time Chat

```
Angular (ChatService)      SignalR Service       Spring Boot (ChatWebSocketController)
        │                       │                              │
        │── STOMP CONNECT ─────▶│                              │
        │                       │── forward connection ───────▶│
        │── SEND /app/chat/g1 ─▶│── STOMP frame ─────────────▶│
        │                       │                              │── persist Message to DB
        │                       │                              │── check for @auralai
        │                       │                              │── broadcast to /topic/chat/g1
        │◀── MESSAGE frame ─────│◀── convertAndSend ───────────│
  (all group members receive it simultaneously)
```

### Communication Patterns

| Path | Protocol | Auth | Notes |
|---|---|---|---|
| Angular → APIM → Spring Boot | HTTPS REST | JWT Bearer | All API calls |
| Angular → SignalR → Spring Boot | WSS / STOMP | JWT in CONNECT headers | Chat, progress sync |
| Spring Boot → PostgreSQL | JDBC over TLS | HikariCP pool, IAM auth (prod) | All transactional data |
| Spring Boot → Redis | Redis TLS 6380 | AUTH password + ACL | Cache, pub/sub, sessions |
| Spring Boot → Azure OpenAI | HTTPS | Managed Identity | AI calls |
| Spring Boot → Blob Storage | HTTPS | Managed Identity | File reads; SAS URLs for clients |
| Azure Functions → Service Bus | AMQP | Managed Identity | Queue consumption |

---

## 🔬 Low-Level Design (LLD)

### Service Decomposition

Each Spring Boot service is an independent deployable unit with its own HPA, its own database schema (shared PostgreSQL instance, separate schema prefixes), and its own Redis keyspace prefix.

| Service | Port | Namespace | Schema | Redis Prefix | HPA Range |
|---|---|---|---|---|---|
| `book-service` | 8080 | `auralbooks-core` | `public` | `bk::` | 5 – 50 pods |
| `user-service` | 8081 | `auralbooks-core` | `public` | `usr::` | 5 – 20 pods |
| `chat-service` | 8082 | `auralbooks-social` | `public` | `chat::` | 5 – 20 pods |
| `ai-service` | 8083 | `auralbooks-ai` | `public` | `ai::` | 5 – 20 pods |
| `marketplace-service` | 8084 | `auralbooks-commerce` | `public` | `mkt::` | 5 – 15 pods |
| `event-service` | 8085 | `auralbooks-social` | `public` | `evt::` | 2 – 8 pods |

### Core Class Diagram

```
┌─────────────────────┐         ┌───────────────────────────────┐
│       User          │         │            Book                │
├─────────────────────┤         ├───────────────────────────────┤
│ id: UUID (PK)       │         │ id: UUID (PK)                  │
│ email: String       │         │ title: String                  │
│ password: String    │◀────────│ publisher_id: UUID (FK→User)   │
│ displayName: String │  1    * │ purchasePrice: BigDecimal       │
│ role: Enum          │         │ rentalPrice: BigDecimal         │
│ subscriptionPlan    │         │ audioBaseUrl: String            │
│ fontSize, theme     │         │ epubUrl: String                 │
└──────────┬──────────┘         └──────────────┬────────────────┘
           │                                    │
           │ 1                                  │ 1
           │ *                                  │ *
┌──────────▼──────────┐         ┌──────────────▼────────────────┐
│    ReadingState      │         │           Highlight            │
├─────────────────────┤         ├───────────────────────────────┤
│ id: UUID (PK)        │         │ id: UUID (PK)                  │
│ userId: UUID (FK)    │         │ userId: UUID (FK)              │
│ bookId: UUID (FK)    │         │ bookId: UUID (FK)              │
│ currentPage: Int     │         │ selectedText: String           │
│ audioPosition: Long  │         │ color: Enum (5 values)         │
│ percentComplete      │         │ pageNumber, chapterIndex       │
│ status: Enum         │         │ note: String                   │
└─────────────────────┘         └───────────────────────────────┘

┌─────────────────────┐         ┌───────────────────────────────┐
│   ReadingGroup       │         │            Order              │
├─────────────────────┤         ├───────────────────────────────┤
│ id: UUID (PK)        │         │ id: UUID (PK)                  │
│ name: String         │         │ userId: UUID (FK)              │
│ genre: String        │         │ bookId: UUID (FK)              │
│ ownerId: UUID (FK)   │         │ orderType: Enum (BUY/RENT)     │
│ memberCount: Int     │         │ amount: BigDecimal             │
│ currentBookId: UUID  │         │ stripePaymentId: String        │
└──────────┬──────────┘         │ status: Enum                   │
           │ 1                   │ expiresAt: Instant (rental)    │
           │ *                   └───────────────────────────────┘
┌──────────▼──────────┐
│      Message         │
├─────────────────────┤
│ id: UUID (PK)        │
│ groupId: UUID (FK)   │
│ senderId: UUID (FK)  │
│ content: String      │
│ isAiGenerated: Bool  │
│ sentAt: Instant      │
└─────────────────────┘
```

### Full PostgreSQL Schema

```sql
-- ── Users ─────────────────────────────────────────────────────────────────
CREATE TABLE users (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email                VARCHAR(255) UNIQUE NOT NULL,
    password             VARCHAR(255) NOT NULL,              -- BCrypt strength 12
    display_name         VARCHAR(100) NOT NULL,
    avatar_url           VARCHAR(500),
    bio                  TEXT,
    subscription_plan    VARCHAR(20)  DEFAULT 'FREE',        -- FREE | BASIC | PREMIUM
    subscription_expires TIMESTAMPTZ,
    font_size            INT          DEFAULT 16,
    theme                VARCHAR(20)  DEFAULT 'light',       -- light | sepia | dark
    narration_speed      DECIMAL(3,1) DEFAULT 1.0,
    narration_voice      VARCHAR(50)  DEFAULT 'jenny',
    books_read           INT          DEFAULT 0,
    minutes_listened     INT          DEFAULT 0,
    current_streak       INT          DEFAULT 0,
    last_active_at       TIMESTAMPTZ,
    followers_count      INT          DEFAULT 0,
    following_count      INT          DEFAULT 0,
    is_public_profile    BOOLEAN      DEFAULT TRUE,
    role                 VARCHAR(20)  DEFAULT 'USER',        -- USER | PUBLISHER | ADMIN
    enabled              BOOLEAN      DEFAULT TRUE,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- ── Books ──────────────────────────────────────────────────────────────────
CREATE TABLE books (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title             VARCHAR(300)    NOT NULL,
    author            VARCHAR(200)    NOT NULL,
    isbn              VARCHAR(20)     UNIQUE,
    description       TEXT,
    language          VARCHAR(10)     DEFAULT 'en',
    published_year    INT,
    page_count        INT,
    duration_minutes  INT,
    purchase_price    DECIMAL(10,2),
    rental_price      DECIMAL(10,2),
    rental_days       INT             DEFAULT 14,
    audio_base_url    VARCHAR(500),
    epub_url          VARCHAR(500),
    cover_url         VARCHAR(500),
    publisher_id      UUID            REFERENCES users(id),
    rating            DECIMAL(3,2)    DEFAULT 0.00,
    review_count      INT             DEFAULT 0,
    is_available      BOOLEAN         DEFAULT TRUE,
    created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_books_title_trgm  ON books USING gin(title gin_trgm_ops);   -- full-text
CREATE INDEX idx_books_author_trgm ON books USING gin(author gin_trgm_ops);
CREATE INDEX idx_books_rating      ON books(rating DESC);
CREATE INDEX idx_books_available   ON books(is_available);

CREATE TABLE book_genres (
    book_id UUID        REFERENCES books(id) ON DELETE CASCADE,
    genre   VARCHAR(100) NOT NULL,
    PRIMARY KEY (book_id, genre)
);
CREATE INDEX idx_book_genres_genre ON book_genres(genre);

-- ── Reading State ──────────────────────────────────────────────────────────
CREATE TABLE reading_states (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id                     UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    current_page                INT          DEFAULT 0,
    total_pages                 INT,
    current_audio_position_sec  BIGINT       DEFAULT 0,
    total_audio_duration_sec    BIGINT,
    percent_complete            DECIMAL(5,2) DEFAULT 0.00,
    status                      VARCHAR(20)  DEFAULT 'IN_PROGRESS',
    total_reading_minutes       INT          DEFAULT 0,
    last_opened_at              TIMESTAMPTZ,
    started_at                  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, book_id)
);
CREATE INDEX idx_reading_state_user ON reading_states(user_id);

-- ── Highlights ─────────────────────────────────────────────────────────────
CREATE TABLE highlights (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id         UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    selected_text   TEXT NOT NULL,
    color           VARCHAR(20)  DEFAULT 'YELLOW',
    page_number     INT,
    chapter_index   INT,
    start_offset    INT,
    end_offset      INT,
    note            TEXT,
    ai_explanation  TEXT,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_highlights_user_book ON highlights(user_id, book_id);

-- ── Notes ──────────────────────────────────────────────────────────────────
CREATE TABLE notes (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id       UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    content       TEXT NOT NULL,
    ai_summary    TEXT,
    page_number   INT,
    chapter_index INT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE note_tags (
    note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag     VARCHAR(100) NOT NULL,
    PRIMARY KEY (note_id, tag)
);

-- ── Reading Groups ─────────────────────────────────────────────────────────
CREATE TABLE reading_groups (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             VARCHAR(200)  NOT NULL,
    description      TEXT,
    genre            VARCHAR(100),
    avatar_emoji     VARCHAR(10),
    owner_id         UUID REFERENCES users(id),
    member_count     INT     DEFAULT 1,
    max_members      INT     DEFAULT 10000,
    is_private       BOOLEAN DEFAULT FALSE,
    current_book_id  UUID    REFERENCES books(id),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_groups_genre ON reading_groups(genre);

CREATE TABLE group_memberships (
    group_id  UUID NOT NULL REFERENCES reading_groups(id) ON DELETE CASCADE,
    user_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role      VARCHAR(20) DEFAULT 'MEMBER',           -- OWNER | MODERATOR | MEMBER
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);
CREATE INDEX idx_memberships_user ON group_memberships(user_id);

-- ── Messages ───────────────────────────────────────────────────────────────
CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id        UUID NOT NULL REFERENCES reading_groups(id) ON DELETE CASCADE,
    sender_id       UUID NOT NULL REFERENCES users(id),
    content         TEXT    NOT NULL,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    is_deleted      BOOLEAN DEFAULT FALSE,
    sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_group ON messages(group_id, sent_at DESC);

-- ── Orders ─────────────────────────────────────────────────────────────────
CREATE TABLE orders (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID NOT NULL REFERENCES users(id),
    book_id               UUID NOT NULL REFERENCES books(id),
    order_type            VARCHAR(20)    NOT NULL,            -- PURCHASE | RENTAL
    amount                DECIMAL(10,2)  NOT NULL,
    currency              VARCHAR(3)     DEFAULT 'USD',
    status                VARCHAR(20)    DEFAULT 'PENDING',   -- PENDING|COMPLETED|REFUNDED
    stripe_payment_id     VARCHAR(100),
    stripe_client_secret  VARCHAR(200),
    expires_at            TIMESTAMPTZ,                        -- rentals only
    created_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_orders_user   ON orders(user_id);
CREATE INDEX idx_orders_book   ON orders(book_id);
CREATE INDEX idx_orders_status ON orders(status);

-- ── Events ─────────────────────────────────────────────────────────────────
CREATE TABLE events (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title         VARCHAR(300)  NOT NULL,
    description   TEXT,
    event_type    VARCHAR(50),                               -- AUTHOR_AMA | READING_CHALLENGE | etc.
    start_time    TIMESTAMPTZ,
    end_time      TIMESTAMPTZ,
    max_attendees INT,
    rsvp_count    INT DEFAULT 0,
    is_virtual    BOOLEAN DEFAULT TRUE,
    meeting_url   VARCHAR(500),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_events_start ON events(start_time);

CREATE TABLE event_rsvps (
    event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- ── User Follows ───────────────────────────────────────────────────────────
CREATE TABLE user_follows (
    follower_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);
```

### PostgreSQL Configuration

HikariCP connection pool settings (in `application.yml`):

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/auralbooks}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20       # 20 connections per pod × 5 min pods = 100 max connections
      minimum-idle: 5
      connection-timeout: 30000   # 30s — fail fast rather than queue
      idle-timeout: 600000        # 10 min idle before connection released
      max-lifetime: 1800000       # 30 min max connection lifetime
      pool-name: AuralBooksHikari
      data-source-properties:
        cachePrepStmts: true
        prepStmtCacheSize: 250
        prepStmtCacheSqlLimit: 2048
  jpa:
    hibernate:
      ddl-auto: validate           # Flyway owns DDL; Hibernate validates only
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        jdbc.batch_size: 50        # batch inserts for bulk operations
        order_inserts: true
        order_updates: true
        generate_statistics: false # disabled in production
```

**Production — Azure Database for PostgreSQL Flexible Server:**

```yaml
# Prod override values injected by Azure App Configuration
DB_URL: jdbc:postgresql://psql-auralbooks-prod.postgres.database.azure.com:5432/auralbooks
        ?sslmode=require
        &sslrootcert=/etc/ssl/certs/DigiCertGlobalRootCA.crt.pem
```

- **Tier:** Business Critical, Gen5, 16 vCores, 80 GB RAM
- **Storage:** 1 TB SSD, IOPS 18,000, auto-grow enabled
- **High Availability:** zone-redundant standby in same region
- **Read replica:** West Europe (used by Event Service for reporting queries only)
- **Backup:** 7-day automated backup + weekly full backup retained 35 days
- **Connection pooling:** PgBouncer in transaction mode (separate sidecar) — 1,000 client connections → 100 server connections

---

## ⚡ Cache Configuration

### Redis Architecture

AuralBooks uses a **three-tier cache** strategy. All three tiers are served from a single Azure Cache for Redis Premium P3 cluster (3 shards, 78 GB total).

```
Request
  │
  ▼
Tier 1 — Angular HTTP Cache (in-browser)
  │  Short-lived; book list pages cached 30 seconds in Angular service
  │  Prevents double-fetching on navigation back
  │
  ▼
Tier 2 — Redis Application Cache (Spring @Cacheable)
  │  Primary server-side cache; all hot data lives here
  │  TTL 5 min – 6 hr depending on data type
  │
  ▼
Tier 3 — PostgreSQL / Cosmos DB / Blob Storage
     Source of truth; only hit on a genuine cache miss
```

### Redis Configuration (Spring Boot)

```yaml
spring:
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      password: ${REDIS_PASSWORD}
      ssl:
        enabled: true             # TLS 6380 in production (Azure Redis)
      timeout: 2000ms
      lettuce:
        pool:
          max-active: 50          # 50 connections per pod
          max-idle: 10
          min-idle: 5
          max-wait: 1000ms
  cache:
    type: redis
    redis:
      time-to-live: 300000        # 5-min default; overridden per cache name below
      key-prefix: "auralbooks:"
      use-key-prefix: true
      cache-null-values: false    # never cache null — avoid null-poisoning
```

**Per-cache TTL configuration (Java `@Bean`):**

```java
@Bean
public RedisCacheManagerBuilderCustomizer redisCacheCustomizer() {
    return builder -> builder
        .withCacheConfiguration("book",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(60)))      // book detail: 1 hour
        .withCacheConfiguration("bookList",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(5)))       // paginated lists: 5 min
        .withCacheConfiguration("recommendations",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(6)))         // ML recs: 6 hours
        .withCacheConfiguration("audioUrl",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(55)))      // SAS URL TTL - 5 min buffer
        .withCacheConfiguration("groupList",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15)))      // group browse: 15 min
        .withCacheConfiguration("eventList",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15)))      // events: 15 min
        .withCacheConfiguration("aiSummary",
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(24)));       // chapter summaries: 24 hr
}
```

### Cache Key Reference

| Cache Name | Key Pattern | TTL | Invalidation Trigger |
|---|---|---|---|
| `book` | `auralbooks:book::{bookId}` | 60 min | `@CacheEvict` on `updateBook()` |
| `bookList` | `auralbooks:bookList::{genre}_{search}_{page}` | 5 min | `@CacheEvict(allEntries=true)` on new book |
| `recommendations` | `auralbooks:recommendations::{userId}` | 6 hr | Reading state update; daily scheduler |
| `audioUrl` | `auralbooks:audioUrl::{bookId}_{chapter}` | 55 min | On book audio regeneration |
| `groupList` | `auralbooks:groupList::{genre}_{page}` | 15 min | On group create/delete |
| `eventList` | `auralbooks:eventList::upcoming` | 15 min | On event create/update |
| `aiSummary` | `auralbooks:aiSummary::{bookId}_{chapter}` | 24 hr | Manual admin evict only |
| `session` | `auralbooks:session::{userId}` | 30 min | Explicit logout |
| `jwtBlacklist` | `auralbooks:jwt:blacklist::{jti}` | Token TTL | Auto-expires with token |

### Cache-Aside Pattern (all read-through caches)

```java
// Spring @Cacheable handles the cache-aside pattern automatically:
@Cacheable(value = "book", key = "#id")
public BookDetailDto getBookById(UUID id) {
    // Only called on cache miss — Redis is checked first by the AOP proxy
    return bookMapper.toDetail(
        bookRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found: " + id))
    );
}

// Explicit invalidation on write:
@CacheEvict(value = {"book", "bookList"}, allEntries = true)
@Transactional
public BookDetailDto updateBook(UUID id, UpdateBookRequest request) { ... }
```

### Redis Pub/Sub — Reading Progress Sync

Redis pub/sub is used to synchronise reading progress across multiple Chat Service pods (since WebSocket connections may land on different pods):

```java
// Publisher — called when a user syncs progress
redisTemplate.convertAndSend("reading:progress:" + userId, progressJson);

// Subscriber — all chat-service pods subscribe and forward to their local STOMP sessions
@RedisListener(topics = "reading:progress:*")
public void onProgressUpdate(String message) {
    ReadingProgressUpdate update = objectMapper.readValue(message, ReadingProgressUpdate.class);
    messagingTemplate.convertAndSendToUser(
        update.getUserId(), "/queue/reading-sync", update);
}
```

---

## 🌐 Networking

### Virtual Network Layout

```
VNet: vnet-auralbooks-prod  (10.0.0.0/8)   East US 2
│
├── subnet-aks-system       10.1.0.0/22    /22 = 1,022 host IPs
│   └── AKS system node pool (3 nodes D4s_v5)
│   └── NSG: allow cluster-internal only; deny all internet inbound
│
├── subnet-aks-app          10.2.0.0/20    /20 = 4,094 host IPs
│   └── AKS app node pool (5–50 nodes D8s_v5)
│   └── NSG: allow from subnet-appgw on 443; deny internet
│
├── subnet-aks-gpu          10.3.0.0/22    /22 = 1,022 host IPs
│   └── AKS GPU node pool (2–10 nodes NC6s_v3)
│   └── NSG: allow from subnet-aks-app only; deny internet
│
├── subnet-appgw            10.4.0.0/24    /24 = 254 host IPs
│   └── Application Gateway / WAF
│   └── NSG: allow Front Door service tag on 443 + 80
│
├── subnet-functions        10.4.1.0/24    /24 = 254 host IPs
│   └── Azure Functions VNet integration (outbound only)
│   └── NSG: deny all inbound; allow Service Bus + Storage outbound
│
└── subnet-privatelinks     10.4.2.0/22    /22 = 1,022 host IPs
    └── Private Endpoints for all PaaS services:
        ├── pe-postgresql     10.4.2.10   → Azure Database for PostgreSQL
        ├── pe-redis          10.4.2.11   → Azure Cache for Redis
        ├── pe-servicebus     10.4.2.12   → Azure Service Bus
        ├── pe-storage        10.4.2.13   → Azure Blob Storage
        ├── pe-keyvault       10.4.2.14   → Azure Key Vault
        ├── pe-appconfig      10.4.2.15   → Azure App Configuration
        └── pe-cosmos         10.4.2.16   → Azure Cosmos DB
    └── NSG: allow from subnet-aks-* and subnet-functions only
```

> **No PaaS service has a public endpoint enabled.** All connections from AKS pods to databases, caches, and message queues flow through Private Endpoints within the VNet — never over the public internet.

### DNS

Private DNS zones are linked to the VNet so AKS pods resolve PaaS FQDNs to private IPs:

| Private DNS Zone | Resolves To |
|---|---|
| `privatelink.postgres.database.azure.com` | `10.4.2.10` |
| `privatelink.redis.cache.windows.net` | `10.4.2.11` |
| `privatelink.servicebus.windows.net` | `10.4.2.12` |
| `privatelink.blob.core.windows.net` | `10.4.2.13` |
| `privatelink.vaultcore.azure.net` | `10.4.2.14` |
| `auralbooks.com` (public) | Azure Front Door anycast IPs |
| `api.auralbooks.com` (public) | Azure Front Door → APIM → AKS |

### Network Security Groups (NSG Rules)

**`nsg-aks-app` (application node pool):**

| Priority | Direction | Source | Destination | Port | Action |
|---|---|---|---|---|---|
| 100 | Inbound | `subnet-appgw` | `subnet-aks-app` | 443 | Allow |
| 110 | Inbound | `subnet-aks-system` | `subnet-aks-app` | Any | Allow |
| 200 | Inbound | Any | `subnet-aks-app` | Any | **Deny** |
| 100 | Outbound | `subnet-aks-app` | `subnet-privatelinks` | 5432, 6380, 5671 | Allow |
| 110 | Outbound | `subnet-aks-app` | `AzureMonitor` service tag | 443 | Allow |
| 200 | Outbound | `subnet-aks-app` | Any | Any | **Deny** |

**`nsg-privatelinks` (all PaaS private endpoints):**

| Priority | Direction | Source | Destination | Action |
|---|---|---|---|---|
| 100 | Inbound | `subnet-aks-app` | `subnet-privatelinks` | Allow |
| 110 | Inbound | `subnet-aks-gpu` | `subnet-privatelinks` | Allow |
| 120 | Inbound | `subnet-functions` | `subnet-privatelinks` | Allow |
| 200 | Inbound | Any | Any | **Deny** |

### Calico Network Policies (Pod-to-Pod)

Default deny-all within the cluster; explicit allow paths only:

```yaml
# deny-all-default.yaml — applied to every namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
---
# allow-book-to-postgres.yaml — book-service may reach PostgreSQL
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-book-service-egress
  namespace: auralbooks-core
spec:
  podSelector:
    matchLabels:
      app: book-service
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 10.4.2.10/32   # pe-postgresql private IP
    ports:
    - port: 5432
  - to:
    - ipBlock:
        cidr: 10.4.2.11/32   # pe-redis private IP
    ports:
    - port: 6380
```

### Ingress / TLS

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: auralbooks-ingress
  namespace: auralbooks-core
  annotations:
    nginx.ingress.kubernetes.io/rate-limit: "1000"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.auralbooks.com
    secretName: api-tls-secret
  rules:
  - host: api.auralbooks.com
    http:
      paths:
      - path: /api/v1/books
        pathType: Prefix
        backend:
          service: { name: book-service, port: { number: 80 } }
      - path: /api/v1/users
        pathType: Prefix
        backend:
          service: { name: user-service, port: { number: 80 } }
      - path: /api/v1/ai
        pathType: Prefix
        backend:
          service: { name: ai-service, port: { number: 80 } }
      - path: /ws
        pathType: Prefix
        backend:
          service: { name: chat-service, port: { number: 80 } }
```

### Load Balancing & Traffic Routing

```
External traffic (Internet)
       │
       ▼
Azure Front Door Premium
  ├── Origin Group A: East US 2 (primary, weight 90)
  └── Origin Group B: West Europe (failover, weight 10 / active on health fail)
       │
       ▼
Application Gateway WAF (per region)
  └── Backend pool: NGINX Ingress Controller internal IP
       │
       ▼
NGINX Ingress Controller (AKS)
  └── Routes by path prefix to Kubernetes Services
       │
       ▼
Kubernetes Service (ClusterIP)
  └── kube-proxy round-robin to healthy pods (readinessProbe gated)
```

**Azure Front Door health probe** — `GET /actuator/health` every 30 seconds; fails over if 3 consecutive probes return non-2xx or time out after 10 seconds.

---

## 📁 Project Structure

```
auralbooks/
│
├── 📁 backend/                          # Spring Boot Application
│   ├── pom.xml                          # Maven build — Spring Boot 3.3.2, Java 21
│   └── src/
│       └── main/
│           ├── java/com/auralbooks/
│           │   ├── AuralBooksApplication.java    # @SpringBootApplication entry point
│           │   ├── controller/
│           │   │   ├── BookController.java        # GET/POST /api/v1/books/**
│           │   │   ├── Controllers.java           # Auth, User, Group, Event, Marketplace, AI
│           │   │   └── ChatWebSocketController.java  # @MessageMapping STOMP handlers
│           │   ├── service/
│           │   │   └── Services.java              # AuthService, BookService, AiService,
│           │   │                                  #   GroupService, MarketplaceService
│           │   ├── model/
│           │   │   ├── Book.java                  # @Entity — books table
│           │   │   ├── User.java                  # @Entity + UserDetails — users table
│           │   │   └── Models.java                # ReadingState, Highlight, Note, Group,
│           │   │                                  #   Message, Order, BookEvent
│           │   ├── config/
│           │   │   └── Config.java                # SecurityConfig, JwtService, JwtAuthFilter,
│           │   │                                  #   WebSocketConfig
│           │   ├── repository/                    # Spring Data JPA repositories
│           │   ├── dto/                           # Request/Response DTOs
│           │   ├── security/                      # UserPrincipal, custom expressions
│           │   └── exception/                     # GlobalExceptionHandler, custom exceptions
│           └── resources/
│               ├── application.yml               # All app config (DB, Redis, AI, JWT, Stripe)
│               └── db/migration/
│                   └── V1__initial_schema.sql     # Flyway — full schema + seed data
│
├── 📁 frontend/                         # Angular 18 Application
│   ├── package.json                     # Angular 18, NgRx 18, @stomp/rx-stomp, Stripe.js
│   └── src/
│       └── app/
│           ├── app.routes.ts            # Lazy-loaded route definitions
│           ├── models/
│           │   └── index.ts             # TypeScript interfaces (Book, User, Group, etc.)
│           ├── services/
│           │   └── services.ts          # BookService, AuthService, ChatService,
│           │                            #   AiService, GroupService, MarketplaceService
│           ├── components/
│           │   ├── home/                # HomeComponent — hero, recommendations
│           │   ├── reader/              # ReaderComponent — ePub reader + highlights
│           │   ├── audio-player/        # AudioPlayerComponent — audiobook player
│           │   ├── marketplace/         # MarketplaceComponent — browse & buy
│           │   ├── groups/              # GroupsComponent — genre communities
│           │   ├── group-detail/        # GroupDetailComponent — chat + members
│           │   ├── events/              # EventsComponent — monthly events
│           │   ├── ai-assistant/        # AiAssistantComponent — GPT-4o Q&A panel
│           │   ├── profile/             # ProfileComponent — user stats + settings
│           │   ├── library/             # LibraryComponent — purchased books
│           │   └── auth/                # LoginComponent, RegisterComponent
│           ├── guards/
│           │   └── auth.guard.ts        # canActivate — checks JWT validity
│           ├── interceptors/
│           │   ├── auth.interceptor.ts  # Attaches Bearer token to every request
│           │   └── refresh.interceptor.ts  # Auto-refreshes expired access tokens
│           └── store/                   # NgRx: actions, reducers, effects, selectors
│
├── docker-compose.yml                   # Local dev: PostgreSQL + Redis + Backend + Frontend
├── docker-compose.prod.yml              # Production compose (pre-AKS)
├── Dockerfile.backend                   # Spring Boot multi-stage Docker build
├── Dockerfile.frontend                  # Angular nginx Docker build
├── .env.example                         # Template for all environment variables
└── README.md                            # You are here
```

---

## ✅ Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Purpose |
|---|---|---|
| Java (OpenJDK) | 21+ | Spring Boot runtime |
| Maven | 3.9+ | Backend build tool |
| Node.js | 20+ LTS | Angular CLI + build |
| npm | 10+ | Frontend package manager |
| Angular CLI | 18+ | `ng serve`, `ng build` |
| Docker | 24+ | Containerization |
| Docker Compose | 2.20+ | Local dev environment |
| PostgreSQL | 16+ | Primary database (or use Docker) |
| Redis | 7.2+ | Cache layer (or use Docker) |

**Install Angular CLI globally:**
```bash
npm install -g @angular/cli@18
```

**Check all versions:**
```bash
java -version        # openjdk 21.x.x
mvn -version         # Apache Maven 3.9.x
node -version        # v20.x.x
ng version           # Angular CLI: 18.x.x
docker -version      # Docker version 24.x.x
```

---

## ⚡ Quick Start

### Option A — Docker Compose (Recommended)

The fastest way to run the entire stack locally:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/auralbooks.git
cd auralbooks

# 2. Copy environment template and fill in your values
cp .env.example .env
# Edit .env — at minimum set JWT_SECRET and AZURE_OPENAI_* values

# 3. Start everything (PostgreSQL + Redis + Spring Boot + Angular)
docker compose up --build

# 4. Access the app
#    Frontend:  http://localhost:4200
#    Backend:   http://localhost:8080
#    Swagger:   http://localhost:8080/swagger-ui.html
```

### Option B — Run Services Separately

```bash
# Terminal 1 — Start infrastructure
docker compose up postgres redis -d

# Terminal 2 — Start Spring Boot backend
cd backend
mvn spring-boot:run

# Terminal 3 — Start Angular frontend
cd frontend
npm install
ng serve
```

Frontend will be live at **http://localhost:4200**
Backend API at **http://localhost:8080/api/v1**

---

## 🍃 Backend — Spring Boot

### Backend Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Spring Boot** | 3.3.2 | Application framework |
| **Java** | 21 | Language (records, virtual threads) |
| **Spring Security** | 6.3 | Auth, JWT filter chain |
| **Spring Data JPA** | 3.3 | ORM, repositories |
| **Spring Data Redis** | 3.3 | Cache abstraction |
| **Spring WebSocket** | 6.1 | STOMP real-time messaging |
| **Spring AI (Azure)** | 1.0.0-M2 | Azure OpenAI integration |
| **Flyway** | 10.x | Database schema migrations |
| **PostgreSQL Driver** | 42.7 | JDBC driver |
| **JJWT** | 0.12.6 | JWT generation & validation |
| **MapStruct** | 1.5.5 | DTO ↔ Entity mapping |
| **Lombok** | 1.18 | Boilerplate reduction |
| **Stripe Java** | 26.2 | Payment processing |
| **Azure Storage Blob** | 12.26 | Book/audio file storage |
| **SpringDoc OpenAPI** | 2.6 | Swagger UI auto-generation |
| **Micrometer + Prometheus** | 1.13 | Metrics & observability |
| **Testcontainers** | 1.19 | Integration tests with real DB |

### Backend Module Breakdown

#### `AuralBooksApplication.java`
Entry point. Enables:
- `@EnableCaching` → Redis cache via `@Cacheable` annotations
- `@EnableJpaAuditing` → auto-populates `createdAt` / `updatedAt`
- `@EnableAsync` → non-blocking AI calls and email dispatch
- `@EnableScheduling` → cron jobs (daily recommendation refresh, rental expiry check)

#### Controllers

| Controller | File | Endpoints |
|---|---|---|
| `BookController` | `BookController.java` | `GET /books`, `GET /books/{id}`, `POST /books`, highlights CRUD, notes CRUD, audio URL |
| `AuthController` | `Controllers.java` | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` |
| `UserController` | `Controllers.java` | `GET /users/me`, `PUT /users/me`, `GET /users/me/library`, follow/unfollow |
| `GroupController` | `Controllers.java` | `GET /groups`, `POST /groups`, join/leave, message history |
| `EventController` | `Controllers.java` | `GET /events`, `GET /events/{id}`, RSVP |
| `MarketplaceController` | `Controllers.java` | `POST /marketplace/purchase`, `/marketplace/rent`, Stripe webhook |
| `AiController` | `Controllers.java` | `POST /ai/ask`, `/ai/summarize`, `GET /ai/recommendations`, `/ai/explain-highlight` |
| `ChatWebSocketController` | `ChatWebSocketController.java` | `@MessageMapping /chat/{groupId}`, typing indicator, reading sync |

#### Services

| Service | Responsibility |
|---|---|
| `AuthService` | Register, login, JWT issuance, token refresh, logout + blacklist |
| `BookService` | Book catalog queries, reading state sync, highlights CRUD, notes CRUD, signed audio URLs |
| `AiService` | Azure OpenAI Q&A, chapter summarization, recommendation generation, highlight explanation |
| `GroupService` | Group CRUD, membership management, message pagination |
| `MarketplaceService` | Stripe PaymentIntent creation, order persistence, webhook handling |
| `JwtService` | Token generation, validation, Redis-based blacklist |

#### Models / Entities

| Entity | Table | Key Fields |
|---|---|---|
| `User` | `users` | `id`, `email`, `password` (BCrypt), `role`, `subscriptionPlan`, preferences |
| `Book` | `books` | `id`, `title`, `author`, `isbn`, `purchasePrice`, `rentalPrice`, `audioBaseUrl` |
| `ReadingState` | `reading_states` | `userId`, `bookId`, `currentPage`, `audioPosition`, `percentComplete` |
| `Highlight` | `highlights` | `userId`, `bookId`, `selectedText`, `color`, `pageNumber`, `note` |
| `Note` | `notes` | `userId`, `bookId`, `content`, `aiSummary`, `tags` |
| `ReadingGroup` | `reading_groups` | `name`, `genre`, `memberCount`, `ownerId`, `currentBookId` |
| `Message` | `messages` | `groupId`, `senderId`, `content`, `isAiGenerated`, `sentAt` |
| `Order` | `orders` | `userId`, `bookId`, `orderType`, `amount`, `stripePaymentId`, `status` |
| `BookEvent` | `events` | `title`, `eventType`, `startTime`, `maxAttendees`, `rsvpCount` |

### Running the Backend

#### Step 1 — Start PostgreSQL & Redis

```bash
# Using Docker (recommended for local dev)
docker compose up postgres redis -d

# Or use your local PostgreSQL
createdb auralbooks
```

#### Step 2 — Configure Environment

Create `backend/src/main/resources/application-local.yml` or set environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/auralbooks
export DB_USERNAME=auralbooks
export DB_PASSWORD=auralbooks
export JWT_SECRET=your-super-secret-key-at-least-32-characters-long
export REDIS_HOST=localhost
export REDIS_PORT=6379

# Required for AI features
export AZURE_OPENAI_API_KEY=your-azure-openai-key
export AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/

# Required for book storage
export AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;...

# Required for payments
export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_WEBHOOK_SECRET=whsec_...
export STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Step 3 — Run

```bash
cd backend

# Development (with devtools hot-reload)
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Or build and run the JAR
mvn clean package -DskipTests
java -jar target/auralbooks-api-1.0.0.jar

# Production build
mvn clean package
```

The API will start on **http://localhost:8080**.
Swagger UI: **http://localhost:8080/swagger-ui.html**

#### Step 4 — Verify

```bash
# Health check
curl http://localhost:8080/actuator/health

# List books (public endpoint, no auth required)
curl http://localhost:8080/api/v1/books

# Register a user
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!","displayName":"Test User"}'
```

### Backend Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DB_URL` | Yes | `jdbc:postgresql://localhost:5432/auralbooks` | PostgreSQL JDBC URL |
| `DB_USERNAME` | Yes | `auralbooks` | Database username |
| `DB_PASSWORD` | Yes | `auralbooks` | Database password |
| `JWT_SECRET` | Yes | *(none — must set)* | HMAC-SHA256 signing key (min 32 chars) |
| `JWT_ACCESS_EXPIRY_MS` | No | `900000` | Access token TTL (15 minutes) |
| `JWT_REFRESH_EXPIRY_MS` | No | `2592000000` | Refresh token TTL (30 days) |
| `REDIS_HOST` | Yes | `localhost` | Redis server host |
| `REDIS_PORT` | No | `6379` | Redis server port |
| `REDIS_PASSWORD` | No | *(empty)* | Redis password (if AUTH enabled) |
| `AZURE_OPENAI_API_KEY` | Yes* | *(none)* | Azure OpenAI API key |
| `AZURE_OPENAI_ENDPOINT` | Yes* | *(none)* | Azure OpenAI endpoint URL |
| `AZURE_STORAGE_CONNECTION_STRING` | Yes* | *(none)* | Azure Blob Storage connection |
| `AZURE_SPEECH_KEY` | No | *(none)* | Azure Cognitive Services TTS key |
| `AZURE_SPEECH_REGION` | No | `eastus` | Azure region for Speech Services |
| `STRIPE_SECRET_KEY` | Yes* | *(none)* | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Yes* | *(none)* | Stripe webhook signing secret |
| `STRIPE_PUBLISHABLE_KEY` | Yes* | *(none)* | Stripe publishable key (sent to frontend) |
| `PORT` | No | `8080` | HTTP server port |

> `Yes*` = Required only if that feature (AI, storage, payments) is used. The app starts without them but those endpoints will return errors.

### Database Migrations

Flyway runs automatically on startup. Migration files live in:
```
backend/src/main/resources/db/migration/
├── V1__initial_schema.sql    # Full schema: all tables, indexes, seed data
```

**Manual migration commands:**
```bash
# Check migration status
mvn flyway:info

# Run pending migrations manually
mvn flyway:migrate

# Clean and re-migrate (DEV ONLY — destroys all data)
mvn flyway:clean flyway:migrate
```

**Seed data included in V1:**
- 4 sample books (The Midnight Library, Project Hail Mary, Lessons in Chemistry, Tomorrow and Tomorrow and Tomorrow)
- 3 upcoming events (Author AMA, Reading Challenge, Indie Spotlight)

### API Endpoints Reference

All endpoints are prefixed with `/api/v1`. Authenticated endpoints require:
```
Authorization: Bearer <access_token>
```

#### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register new user, returns JWT pair |
| `POST` | `/auth/login` | ❌ | Login, returns JWT pair |
| `POST` | `/auth/refresh` | ❌ | Exchange refresh token for new access token |
| `POST` | `/auth/logout` | ✅ | Invalidate tokens (Redis blacklist) |

#### Books

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/books` | ❌ | List books (`?genre=sci-fi&search=...&page=0&size=20`) |
| `GET` | `/books/{id}` | ❌ | Get full book details |
| `POST` | `/books` | ✅ PUBLISHER | Create book |
| `PUT` | `/books/{id}` | ✅ PUBLISHER | Update book |
| `GET` | `/books/{id}/reading-state` | ✅ | Get my reading progress for a book |
| `PUT` | `/books/{id}/reading-state` | ✅ | Sync reading progress |
| `GET` | `/books/{id}/highlights` | ✅ | List my highlights |
| `POST` | `/books/{id}/highlights` | ✅ | Create highlight |
| `PATCH` | `/books/{id}/highlights/{hid}` | ✅ | Update highlight (add note, change color) |
| `DELETE` | `/books/{id}/highlights/{hid}` | ✅ | Delete highlight |
| `GET` | `/books/{id}/notes` | ✅ | List my notes |
| `POST` | `/books/{id}/notes` | ✅ | Create note |
| `DELETE` | `/books/{id}/notes/{nid}` | ✅ | Delete note |
| `GET` | `/books/{id}/audio/{chapter}` | ✅ | Get signed audio URL for chapter |

#### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/users/me` | ✅ | Get my full profile |
| `PUT` | `/users/me` | ✅ | Update profile and preferences |
| `GET` | `/users/{id}` | ❌ | Get a user's public profile |
| `GET` | `/users/me/library` | ✅ | Get my purchased + rented books |
| `POST` | `/users/{id}/follow` | ✅ | Follow a user |
| `DELETE` | `/users/{id}/follow` | ✅ | Unfollow a user |

#### Groups

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/groups` | ❌ | List groups (`?genre=sci-fi`) |
| `POST` | `/groups` | ✅ | Create a reading group |
| `GET` | `/groups/{id}` | ❌ | Get group details |
| `POST` | `/groups/{id}/join` | ✅ | Join group |
| `DELETE` | `/groups/{id}/leave` | ✅ | Leave group |
| `GET` | `/groups/{id}/messages` | ✅ | Get message history |

#### Events

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/events` | ❌ | List upcoming events |
| `GET` | `/events/{id}` | ❌ | Get event details |
| `POST` | `/events/{id}/rsvp` | ✅ | RSVP to event |
| `DELETE` | `/events/{id}/rsvp` | ✅ | Cancel RSVP |

#### Marketplace

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/marketplace/purchase` | ✅ | Purchase a book (creates Stripe PaymentIntent) |
| `POST` | `/marketplace/rent` | ✅ | Rent a book (time-limited access) |
| `POST` | `/marketplace/webhook/stripe` | ❌ | Stripe webhook (called by Stripe only) |

#### AI

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/ai/ask` | ✅ | Ask a question about a book/chapter |
| `POST` | `/ai/summarize` | ✅ | Generate chapter or book summary |
| `GET` | `/ai/recommendations` | ✅ | Get personalized recommendations |
| `POST` | `/ai/explain-highlight` | ✅ | Get AI explanation of highlighted text |

### WebSocket / Real-time Chat

The backend uses Spring WebSocket with STOMP protocol over SockJS.

**Connection endpoint:** `ws://localhost:8080/ws` (with SockJS fallback)

**Authentication:** Send JWT in the STOMP `CONNECT` frame headers:
```
CONNECT
Authorization: Bearer <access_token>
```

**Destinations:**

| Direction | Destination | Description |
|---|---|---|
| Client → Server | `/app/chat/{groupId}` | Send a chat message |
| Client → Server | `/app/chat/{groupId}/typing` | Send typing indicator |
| Client → Server | `/app/reading/{bookId}/progress` | Sync reading progress |
| Server → Client | `/topic/chat/{groupId}` | Receive group messages |
| Server → Client | `/topic/chat/{groupId}/typing` | Receive typing events |
| Server → Client | `/user/queue/reading-sync` | Receive cross-device progress updates |

**Angular usage (from `ChatService`):**
```typescript
// Subscribe to group messages
this.chatService.subscribeToGroup(groupId).subscribe(msg => {
  this.messages.push(msg);
});

// Send a message
this.chatService.sendMessage(groupId, 'Hello everyone!');
```

**AI bot trigger:** If a message contains `@auralai`, the backend automatically generates and broadcasts an AI reply via `AiService.generateGroupInsight()`.

### Security & JWT

The security chain in `SecurityConfig.java`:

```
Request → JwtAuthFilter → SecurityContext → Controller

JwtAuthFilter:
  1. Extract Bearer token from Authorization header
  2. Parse JWT using HMAC-SHA256 (JJWT)
  3. Check Redis blacklist (invalidated tokens)
  4. Load UserDetails from DB
  5. Set Authentication in SecurityContext
```

**Token lifecycle:**

| Token Type | TTL | Storage | Refresh |
|---|---|---|---|
| Access Token | 15 minutes | `localStorage` (Angular) | Via `/auth/refresh` |
| Refresh Token | 30 days | `localStorage` (Angular) | Re-login |

**Angular `AuthInterceptor`** automatically attaches the Bearer token and handles 401 responses by calling `/auth/refresh` and retrying.

### Caching Strategy

Spring `@Cacheable` is backed by Redis. Cache keys and TTLs:

| Cache Name | Key Pattern | TTL | Invalidation |
|---|---|---|---|
| `book` | `book::{bookId}` | 5 min (default) | `@CacheEvict` on update |
| `bookList` | `bookList::{genre}_{search}_{pageable}` | 5 min | On any book change |
| `recommendations` | `recommendations::{userId}` | 6 hours | On reading state update |

---

## 🅰 Frontend — Angular 18

### Frontend Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Angular** | 18.0 | SPA framework (standalone components) |
| **TypeScript** | 5.4 | Typed language |
| **Angular Material** | 18.0 | UI component library |
| **Angular CDK** | 18.0 | Accessibility, drag & drop |
| **NgRx Store** | 18.0 | Redux-style state management |
| **NgRx Effects** | 18.0 | Side effects (HTTP calls) |
| **NgRx Entity** | 18.0 | Normalized entity collections |
| **@stomp/rx-stomp** | 2.0 | RxJS WebSocket STOMP client |
| **@stripe/stripe-js** | 4.0 | Stripe payment integration |
| **epubjs** | 0.3.93 | ePub rendering in browser |
| **RxJS** | 7.8 | Reactive streams |
| **Angular Service Worker** | 18.0 | PWA + offline reading |

### Frontend Module Breakdown

#### Routing (`app.routes.ts`)
All routes use **lazy loading** with `loadComponent()` for optimal bundle splitting:
```typescript
{ path: 'read/:id',  canActivate: [authGuard],
  loadComponent: () => import('./components/reader/reader.component')
                         .then(m => m.ReaderComponent) }
```

#### Services (`services/services.ts`)

| Service | Methods | Notes |
|---|---|---|
| `AuthService` | `login()`, `register()`, `logout()`, `refreshAccessToken()` | Uses Angular `signal()` for reactive auth state |
| `BookService` | `getBooks()`, `getBook()`, `updateReadingState()`, `getHighlights()`, `createHighlight()` | Injects `HttpClient` directly (standalone) |
| `ChatService` | `connect()`, `subscribeToGroup()`, `sendMessage()`, `sendTypingIndicator()` | Wraps `RxStomp` for WebSocket |
| `AiService` | `askQuestion()`, `summarizeChapter()`, `getRecommendations()`, `explainHighlight()` | Calls Spring AI endpoints |
| `GroupService` | `getGroups()`, `createGroup()`, `joinGroup()`, `leaveGroup()` | Genre filtering support |
| `MarketplaceService` | `purchaseBook()`, `rentBook()`, `confirmPayment()` | Integrates Stripe.js |

#### Guards (`guards/auth.guard.ts`)
```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated() || inject(Router).createUrlTree(['/login']);
};
```

#### Interceptors

- **`AuthInterceptor`** — Clones every outgoing request and adds `Authorization: Bearer <token>`
- **`RefreshInterceptor`** — Catches 401 responses, silently refreshes the access token, and retries the original request

### Running the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (proxies /api/* to localhost:8080)
ng serve

# Build for production
ng build --configuration production

# Run unit tests
ng test

# Check for linting issues
ng lint
```

App runs on **http://localhost:4200**. The Angular dev server proxies all `/api/**` requests to the Spring Boot backend at `http://localhost:8080`.

**Proxy config (`proxy.conf.json`):**
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  },
  "/ws": {
    "target": "ws://localhost:8080",
    "ws": true
  }
}
```

### Frontend Environment Configuration

`src/environments/environment.ts` (development):
```typescript
export const environment = {
  production: false,
  apiUrl: '/api/v1',
  wsUrl: 'http://localhost:8080/ws',
  stripePublishableKey: 'pk_test_YOUR_KEY_HERE',
};
```

`src/environments/environment.production.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.auralbooks.com/api/v1',
  wsUrl: 'wss://api.auralbooks.com/ws',
  stripePublishableKey: 'pk_live_YOUR_KEY_HERE',
};
```

### NgRx State Management

State is divided into feature slices:

```
store/
├── auth/
│   ├── auth.actions.ts       # login, loginSuccess, loginFailure, logout
│   ├── auth.reducer.ts       # AuthState: { user, token, loading, error }
│   ├── auth.effects.ts       # Calls AuthService, dispatches success/failure
│   └── auth.selectors.ts     # selectCurrentUser, selectIsAuthenticated
│
├── books/
│   ├── books.actions.ts      # loadBooks, loadBooksSuccess, setReadingState
│   ├── books.reducer.ts      # BooksState (EntityAdapter)
│   ├── books.effects.ts      # Calls BookService
│   └── books.selectors.ts    # selectAllBooks, selectBookById
│
├── groups/
│   └── ...                   # Same pattern for reading groups
│
└── app.state.ts              # Root AppState combining all slices
```

### Angular Services

#### `AuthService` — Signals-based authentication
```typescript
// In any component
auth = inject(AuthService);

// Reactive auth state via Angular Signals
isLoggedIn = this.auth.isAuthenticated;  // Signal<boolean>
user = this.auth.currentUser;            // Signal<UserProfile | null>

// Template usage
@if (auth.isAuthenticated()) {
  <app-user-menu [user]="auth.currentUser()" />
}
```

#### `ChatService` — Real-time WebSocket
```typescript
// Connect on app init
this.chatService.connect();

// Subscribe to group messages (RxJS Observable)
this.chatService.subscribeToGroup(this.groupId)
  .pipe(takeUntilDestroyed())
  .subscribe(msg => this.messages.push(msg));

// Send message
this.chatService.sendMessage(this.groupId, this.messageText);
```

---

## 🐳 Docker & Docker Compose

**`docker-compose.yml`** — Full local stack:

```yaml
version: '3.9'
services:

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: auralbooks
      POSTGRES_USER: auralbooks
      POSTGRES_PASSWORD: auralbooks
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7.2-alpine
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.backend
    ports:
      - "8080:8080"
    environment:
      DB_URL: jdbc:postgresql://postgres:5432/auralbooks
      DB_USERNAME: auralbooks
      DB_PASSWORD: auralbooks
      REDIS_HOST: redis
      JWT_SECRET: ${JWT_SECRET}
      AZURE_OPENAI_API_KEY: ${AZURE_OPENAI_API_KEY}
      AZURE_OPENAI_ENDPOINT: ${AZURE_OPENAI_ENDPOINT}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
    depends_on:
      - postgres
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.frontend
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

**`Dockerfile.backend`** — Multi-stage Spring Boot build:
```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/auralbooks-api-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**`Dockerfile.frontend`** — Angular + Nginx:
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/auralbooks-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## ☁️ Azure Infrastructure

### Resource Groups

All Azure resources are organised into purpose-scoped resource groups for clean cost attribution, RBAC boundaries, and independent lifecycle management.

| Resource Group | Region | Contents |
|---|---|---|
| `rg-auralbooks-global` | Global | Azure Front Door, DNS Zone (`auralbooks.com`), Azure AD B2C tenant |
| `rg-auralbooks-prod-eastus` | East US 2 | Primary AKS cluster, PostgreSQL, Redis, Blob Storage, Service Bus, App Insights |
| `rg-auralbooks-prod-westeu` | West Europe | DR AKS (standby), PostgreSQL geo-replica, Redis replica, Blob GRS secondary |
| `rg-auralbooks-shared` | East US 2 | Azure Container Registry, Key Vault, App Configuration, Log Analytics Workspace |
| `rg-auralbooks-dev` | East US 2 | Dev/test copies of all services at smaller SKUs |

### Provisioning (Terraform)

All infrastructure is declared as code under `infra/terraform/`. To provision from scratch:

```bash
cd infra/terraform

# Initialise — state stored in Azure Blob Storage
terraform init \
  -backend-config="storage_account_name=stauralbooks" \
  -backend-config="container_name=tfstate" \
  -backend-config="key=prod.terraform.tfstate"

# Review the plan
terraform plan -var-file="environments/prod.tfvars" -out=tfplan

# Apply
terraform apply tfplan
```

### Azure Services

| Service | SKU / Config | Purpose |
|---|---|---|
| **AKS** | System: 3×D4s_v5 · App: 5–50×D8s_v5 · GPU: 2–10×NC6s_v3 | Spring Boot microservices, autoscaled |
| **Azure Static Web Apps** | Standard | Angular SPA — global CDN, zero-config TLS |
| **Azure Front Door Premium** | WAF ruleset OWASP 3.2 | Anycast routing, DDoS, WAF, geo-failover |
| **Azure API Management** | Standard | Rate limiting, JWT validation, request routing |
| **Azure Container Registry** | Premium | Docker images with geo-replication |
| **Azure Cosmos DB** | 100K–1M RU/s autoscale, 2 regions | Reading state, chat, groups (Session consistency) |
| **Azure SQL** | Business Critical, Gen5 16 vCores | Orders, payments, royalties, audit logs |
| **Azure Cache for Redis** | Premium P3, 3 shards (78 GB) | Spring Boot `@Cacheable`, session, pub/sub |
| **Azure Blob Storage** | Hot tier, GRS, 200 TB | ePub, audio, cover images (CDN-fronted) |
| **Azure OpenAI** | GPT-4o deployment | AI assistant, summaries, group bot |
| **Azure Cognitive Services** | Neural TTS, S0 | Audiobook narration generation |
| **Azure SignalR Service** | Standard, 100 units | WebSocket scale-out for group chat |
| **Azure Service Bus** | Premium, 1 MU | Orders queue, notifications queue, royalties queue |
| **Azure Event Hubs** | Standard, 32 partitions | Reading analytics, audit event stream |
| **Azure Functions** | Consumption + Premium EP2 | Royalties, notifications, TTS processor, webhooks |
| **Azure AD B2C** | 2 M MAU | Enterprise/social identity (optional overlay) |
| **Azure Key Vault** | Standard | All secrets, TLS certificates, encryption keys |
| **Azure App Configuration** | Standard | Feature flags, shared config, environment values |
| **Azure Monitor + App Insights** | Pay-per-use | Metrics, distributed tracing, alerts |

### AKS Cluster Setup

```bash
# Create AKS cluster with three node pools
az aks create \
  --resource-group rg-auralbooks-prod-eastus \
  --name aks-auralbooks-prod \
  --kubernetes-version 1.29 \
  --network-plugin azure \
  --network-policy calico \
  --enable-managed-identity \
  --enable-addons monitoring,azure-keyvault-secrets-provider \
  --zones 1 2 3

# System node pool (already created above, update it)
az aks nodepool update \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name systempool \
  --node-count 3 \
  --node-vm-size Standard_D4s_v5 \
  --node-taints CriticalAddonsOnly=true:NoSchedule

# Application node pool — auto-scaling 5 to 50
az aks nodepool add \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name apppool \
  --node-vm-size Standard_D8s_v5 \
  --enable-cluster-autoscaler \
  --min-count 5 \
  --max-count 50 \
  --zones 1 2 3

# GPU node pool for AI workloads — auto-scaling 2 to 10
az aks nodepool add \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name gpupool \
  --node-vm-size Standard_NC6s_v3 \
  --enable-cluster-autoscaler \
  --min-count 2 \
  --max-count 10 \
  --node-taints sku=gpu:NoSchedule

# Install cluster essentials
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

helm repo add cert-manager https://charts.jetstack.io
helm install cert-manager cert-manager/cert-manager \
  --namespace cert-manager --create-namespace \
  --set installCRDs=true

helm repo add kedacore https://kedacore.github.io/charts
helm install keda kedacore/keda --namespace keda --create-namespace
```

**Kubernetes namespaces:**

| Namespace | Workloads |
|---|---|
| `auralbooks-core` | book-service, user-service, auth-service |
| `auralbooks-social` | chat-service, group-service, event-service |
| `auralbooks-ai` | ai-service (GPU nodeSelector) |
| `auralbooks-commerce` | marketplace-service |
| `ingress-nginx` | NGINX ingress controller |
| `cert-manager` | TLS certificate automation |
| `keda` | Event-driven autoscaler |

**Horizontal Pod Autoscaler (HPA) — all services:**

```yaml
# hpa-backend.yaml — applied to every Spring Boot deployment
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: book-service-hpa
  namespace: auralbooks-core
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: book-service
  minReplicas: 5
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 65
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 75
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Pods
        value: 4
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
```

### Networking

```
VNet: vnet-auralbooks-prod  (10.0.0.0/8)
│
├── subnet-aks-system     10.1.0.0/22   AKS system node pool
├── subnet-aks-app        10.2.0.0/20   AKS application node pool
├── subnet-aks-gpu        10.3.0.0/22   AKS GPU node pool
├── subnet-appgw          10.4.0.0/24   Application Gateway / WAF
├── subnet-functions      10.4.1.0/24   Azure Functions VNet integration
└── subnet-privatelinks   10.4.2.0/22   Private Endpoints for all PaaS services
                                         (PostgreSQL, Redis, Cosmos, Service Bus,
                                          Key Vault, Storage, App Config)
```

All PaaS services use **Private Endpoints** — no public internet access to data services. Traffic between AKS pods and data services flows entirely within the VNet.

---

## 🚀 Deployment

### Environment Promotion Strategy

```
feature branch  →  develop  →  staging  →  production
                   (auto)       (auto)      (manual gate)
```

Every merge to `develop` auto-deploys to the dev cluster. Every merge to `main` deploys to staging automatically, then waits for a required approval before promoting to production.

### Step-by-Step: First Production Deploy

```bash
# 1. Set up Azure Container Registry
az acr create \
  --resource-group rg-auralbooks-shared \
  --name acrauralbooks \
  --sku Premium \
  --geo-replication-locations westeurope

# 2. Get AKS credentials
az aks get-credentials \
  --resource-group rg-auralbooks-prod-eastus \
  --name aks-auralbooks-prod

# 3. Create Kubernetes secrets from Key Vault (using CSI driver)
kubectl apply -f k8s/base/secret-provider-class.yaml

# 4. Build and push Docker images
az acr build --registry acrauralbooks \
  --image backend:$(git rev-parse --short HEAD) ./backend

az acr build --registry acrauralbooks \
  --image frontend:$(git rev-parse --short HEAD) ./frontend

# 5. Deploy all services via Kustomize
kubectl apply -k k8s/overlays/prod/

# 6. Wait for all pods to be ready
kubectl wait --for=condition=ready pod \
  --all -n auralbooks-core --timeout=5m
kubectl wait --for=condition=ready pod \
  --all -n auralbooks-social --timeout=5m

# 7. Verify endpoints
kubectl get ingress -A
curl -f https://api.auralbooks.com/actuator/health
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Build · Test · Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: acrauralbooks.azurecr.io

jobs:
  # ── 1. Build & Test ──────────────────────────────────────────────────────
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Java 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: maven

      - name: Set up Node 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Backend — unit + integration tests
        run: |
          cd backend
          mvn verify -Dspring.profiles.active=test

      - name: Frontend — unit tests
        run: |
          cd frontend
          npm ci
          ng test --watch=false --browsers=ChromeHeadless

      - name: SAST — CodeQL scan
        uses: github/codeql-action/analyze@v3
        with:
          languages: java, javascript

  # ── 2. Build & Push Docker Images ────────────────────────────────────────
  build-push:
    needs: build-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    outputs:
      image-tag: ${{ steps.tag.outputs.tag }}
    steps:
      - uses: actions/checkout@v4

      - uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - id: tag
        run: echo "tag=${{ github.sha }}" >> $GITHUB_OUTPUT

      - name: Build & push backend
        run: |
          az acr build \
            --registry acrauralbooks \
            --image backend:${{ steps.tag.outputs.tag }} \
            --image backend:latest \
            ./backend

      - name: Build & push frontend
        run: |
          az acr build \
            --registry acrauralbooks \
            --image frontend:${{ steps.tag.outputs.tag }} \
            --image frontend:latest \
            ./frontend

      - name: Container vulnerability scan
        run: |
          az acr task run \
            --registry acrauralbooks \
            --name security-scan \
            --arg IMAGE_TAG=${{ steps.tag.outputs.tag }}

  # ── 3. Deploy to Staging ─────────────────────────────────────────────────
  deploy-staging:
    needs: build-push
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4

      - uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - uses: azure/aks-set-context@v3
        with:
          resource-group: rg-auralbooks-staging
          cluster-name: aks-auralbooks-staging

      - name: Deploy to staging
        run: |
          kubectl set image deployment/backend \
            backend=${{ env.REGISTRY }}/backend:${{ needs.build-push.outputs.image-tag }} \
            -n auralbooks-core
          kubectl set image deployment/frontend \
            frontend=${{ env.REGISTRY }}/frontend:${{ needs.build-push.outputs.image-tag }} \
            -n auralbooks-core
          kubectl rollout status deployment/backend -n auralbooks-core --timeout=5m
          kubectl rollout status deployment/frontend -n auralbooks-core --timeout=5m

      - name: Run smoke tests
        run: |
          curl -f https://staging-api.auralbooks.com/actuator/health
          curl -f https://staging.auralbooks.com

  # ── 4. Deploy to Production (requires manual approval) ───────────────────
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://auralbooks.com
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - uses: azure/aks-set-context@v3
        with:
          resource-group: rg-auralbooks-prod-eastus
          cluster-name: aks-auralbooks-prod

      - name: Blue-green deploy — backend (10% canary first)
        run: |
          kubectl set image deployment/backend-canary \
            backend=${{ env.REGISTRY }}/backend:${{ needs.build-push.outputs.image-tag }} \
            -n auralbooks-core
          kubectl rollout status deployment/backend-canary --timeout=3m
          sleep 120  # Monitor canary for 2 min
          # Promote to full fleet
          kubectl set image deployment/backend \
            backend=${{ env.REGISTRY }}/backend:${{ needs.build-push.outputs.image-tag }} \
            -n auralbooks-core
          kubectl rollout status deployment/backend --timeout=5m

      - name: Deploy frontend
        run: |
          kubectl set image deployment/frontend \
            frontend=${{ env.REGISTRY }}/frontend:${{ needs.build-push.outputs.image-tag }} \
            -n auralbooks-core
          kubectl rollout status deployment/frontend --timeout=5m

      - name: Post-deploy health check
        run: |
          curl -f https://api.auralbooks.com/actuator/health
          curl -f https://auralbooks.com

      - name: Auto-rollback on failure
        if: failure()
        run: |
          kubectl rollout undo deployment/backend -n auralbooks-core
          kubectl rollout undo deployment/frontend -n auralbooks-core
```

### Rollback

```bash
# Immediate rollback to previous version
kubectl rollout undo deployment/backend -n auralbooks-core
kubectl rollout undo deployment/frontend -n auralbooks-core

# Rollback to a specific revision
kubectl rollout history deployment/backend -n auralbooks-core
kubectl rollout undo deployment/backend --to-revision=3 -n auralbooks-core

# Verify rollback completed
kubectl rollout status deployment/backend -n auralbooks-core
```

---

## 📊 Monitoring & Observability

### Monitoring Stack

| Tool | Purpose | Data Source |
|---|---|---|
| **Azure Monitor** | Metrics aggregation, alert engine, dashboards | All Azure resources |
| **Application Insights** | APM — distributed traces, exceptions, dependencies | Spring Boot SDK (`azure-spring-cloud-starter-monitor`) |
| **Container Insights** | AKS pod/node resource utilisation, OOM events | AKS cluster (auto-configured via addon) |
| **Log Analytics Workspace** | Centralised log aggregation, Kusto queries | All services, AKS control plane, Azure audit logs |
| **Prometheus** | In-cluster metrics scraping | Spring Boot `/actuator/prometheus`, kube-state-metrics |
| **Grafana** | Visual dashboards (deployed in `monitoring` namespace) | Prometheus + Log Analytics data source |
| **Azure Cost Management** | Spend tracking, budget alerts, forecast | Azure Billing API |

### Spring Boot → Application Insights

Add to `pom.xml`:
```xml
<dependency>
  <groupId>com.azure.spring</groupId>
  <artifactId>azure-spring-boot-starter-monitor</artifactId>
  <version>5.x</version>
</dependency>
```

Set in `application.yml`:
```yaml
azure:
  application-insights:
    connection-string: ${APPLICATIONINSIGHTS_CONNECTION_STRING}
    sampling-percentage: 10   # 10% trace sampling in production
```

This automatically instruments all HTTP requests, JDBC queries, Redis calls, and Spring WebSocket messages — no manual span creation needed.

### Key Dashboards

| Dashboard | Key Panels |
|---|---|
| **API Performance** | Request rate, p50/p95/p99 latency, error rate (5xx %), top slow endpoints |
| **AKS Cluster Health** | Node CPU/memory, pod count per namespace, HPA current/max replicas, OOM kills |
| **Business Metrics** | Daily active users, books opened, listening minutes, purchases, new signups |
| **Cache Efficiency** | Redis hit rate per cache tier, memory utilisation, evictions/sec |
| **AI Usage & Cost** | OpenAI token consumption, TTS character count, cost per 1K requests |
| **WebSocket / Chat** | Active STOMP connections, messages/sec, SignalR unit utilisation |

### Service Level Objectives (SLOs)

| Metric | Target | Warning | Critical |
|---|---|---|---|
| API availability | 99.95 % | < 99.9 % | < 99.5 % |
| API p99 latency | < 200 ms | > 500 ms | > 1,000 ms |
| Audio stream start time | < 3 s | > 5 s | > 8 s |
| Chat message delivery | < 100 ms | > 300 ms | > 800 ms |
| Payment success rate | > 99.5 % | < 99 % | < 97 % |
| AKS pod restart rate | < 1/hr | > 5/hr | > 20/hr |

### Alert Rules

```yaml
# alerts.yaml — deployed to Azure Monitor via Terraform
alerts:
  - name: HighApiErrorRate
    condition: "requests/failed > 1% for 5 minutes"
    severity: 1  # Critical
    action: PagerDuty + Teams

  - name: PodCrashLooping
    condition: "kube_pod_container_status_restarts_total > 3 in 10 minutes"
    severity: 1
    action: PagerDuty + Teams

  - name: RedisMemoryHigh
    condition: "redis_memory_used_bytes / redis_memory_max_bytes > 0.85"
    severity: 2  # Warning
    action: Teams channel

  - name: APILatencyDegraded
    condition: "requests/duration p95 > 500ms for 10 minutes"
    severity: 2
    action: Teams channel

  - name: AKSNodeNotReady
    condition: "kube_node_status_condition{condition=Ready,status=true} == 0"
    severity: 1
    action: PagerDuty + Teams

  - name: PaymentFailureSpike
    condition: "stripe_payment_failures > 5 in 1 minute"
    severity: 1
    action: PagerDuty + Teams + email to finance
```

### Log Queries (Kusto / Log Analytics)

```kusto
-- Top 10 slowest API endpoints (last 1 hour)
requests
| where timestamp > ago(1h)
| summarize avg(duration), percentile(duration, 95), count()
  by name, url
| order by percentile_duration_95 desc
| take 10

-- Error rate per service
exceptions
| where timestamp > ago(1h)
| summarize errorCount = count() by cloud_RoleName
| order by errorCount desc

-- Active WebSocket connections over time
customMetrics
| where name == "stomp.connections.active"
| summarize avg(value) by bin(timestamp, 5m)
| render timechart
```

---

## 🔑 IAM & Roles

### Azure RBAC — Resource Group Level

| Principal | Role | Scope | Purpose |
|---|---|---|---|
| AKS Managed Identity | `AcrPull` | `rg-auralbooks-shared / ACR` | Pull images from Container Registry |
| AKS Managed Identity | `Key Vault Secrets User` | `rg-auralbooks-shared / Key Vault` | Read secrets via CSI driver |
| AKS Managed Identity | `Storage Blob Data Reader` | `rg-auralbooks-prod-eastus / Storage` | Read book/audio files |
| AKS Managed Identity | `Azure Service Bus Data Sender` | `rg-auralbooks-prod-eastus / Service Bus` | Publish to queues |
| Azure Functions (System MI) | `Azure Service Bus Data Receiver` | Service Bus | Consume queues |
| Azure Functions (System MI) | `Storage Blob Data Contributor` | Storage | Write TTS-generated audio |
| GitHub Actions Service Principal | `Contributor` | `rg-auralbooks-prod-eastus` | Deploy to AKS, push to ACR |
| GitHub Actions Service Principal | `AcrPush` | ACR | Push Docker images |
| DevOps Engineers (AAD Group) | `Azure Kubernetes Service Cluster User` | AKS | `kubectl` access (namespace-scoped) |
| On-call SRE (AAD Group) | `Reader` + `Monitoring Reader` | All prod RGs | Read-only access for incident investigation |
| Data team (AAD Group) | `Log Analytics Reader` | Log Analytics Workspace | Query logs and metrics |

### Kubernetes RBAC

All service accounts use **Workload Identity** (Azure AD Workload Identity, formerly pod identity) — no static credentials inside pods.

```yaml
# workload-identity.yaml — one per service
apiVersion: v1
kind: ServiceAccount
metadata:
  name: book-service-sa
  namespace: auralbooks-core
  annotations:
    azure.workload.identity/client-id: "<MANAGED_IDENTITY_CLIENT_ID>"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: book-service-role
  namespace: auralbooks-core
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: book-service-rolebinding
  namespace: auralbooks-core
subjects:
- kind: ServiceAccount
  name: book-service-sa
roleRef:
  kind: Role
  name: book-service-role
  apiGroup: rbac.authorization.k8s.io
```

### Application-Level Roles

Roles are stored in the `users.role` column and enforced at every controller method via Spring Security `@PreAuthorize`:

| Role | Assigned To | Permissions |
|---|---|---|
| `ROLE_USER` | All registered users (default) | Read books, manage own reading data, join groups, RSVP events, purchase/rent |
| `ROLE_PUBLISHER` | Authors and publishing companies | All USER permissions + create/update/delete own books, view own sales analytics, manage royalty settings |
| `ROLE_ADMIN` | Platform operators | All PUBLISHER permissions + manage all users, all books, all groups, event creation, system configuration |

```java
// Enforced per-endpoint in Spring Boot controllers
@PostMapping
@PreAuthorize("hasAnyRole('PUBLISHER', 'ADMIN')")
public ResponseEntity<BookDetailDto> createBook(...) { }

@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN') or @bookSecurity.isOwner(authentication, #id)")
public ResponseEntity<Void> deleteBook(@PathVariable UUID id) { }
```

Role elevation (e.g. USER → PUBLISHER) requires Admin approval and is updated via `PUT /api/v1/admin/users/{id}/role`.

---

## 🔒 Application Security

### Layers of Defence

```
Internet
   │
   ▼
[Azure DDoS Protection Standard]       — volumetric attack mitigation at VNet level
   │
   ▼
[Azure Front Door WAF]                 — OWASP CRS 3.2, custom rules, bot protection
   │
   ▼
[TLS 1.3 termination at Front Door]   — TLS 1.0 / 1.1 disabled; HSTS enforced
   │
   ▼
[Azure API Management]                 — JWT validation, rate limiting, IP filtering
   │
   ▼
[NGINX Ingress + Network Policy]       — Calico deny-all default; allow-listed pod-to-pod paths
   │
   ▼
[Spring Security filter chain]         — JwtAuthFilter, @PreAuthorize, CORS policy
   │
   ▼
[Application layer]                    — input validation, parameterised queries, no raw SQL
   │
   ▼
[Data layer — Private Endpoints]       — no public internet access to any data service
```

### Spring Boot Security Configuration

**CORS** — only the Angular origin is whitelisted:
```java
config.setAllowedOriginPatterns(List.of(
  "http://localhost:4200",      // dev
  "https://*.auralbooks.com"    // prod
));
config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
config.setAllowCredentials(true);
```

**Security headers** — set on every response via a `OncePerRequestFilter`:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com
Referrer-Policy: strict-origin-when-cross-origin
```

**Input validation** — every request body is a Java record annotated with Bean Validation:
```java
public record CreateHighlightRequest(
  @NotBlank @Size(max = 5000) String selectedText,
  @NotNull HighlightColor color,
  @Min(0) Integer pageNumber,
  @Min(0) Integer chapterIndex
) {}
```

**SQL injection** — Spring Data JPA uses parameterised queries exclusively; no native query string concatenation anywhere in the codebase.

**Secrets management** — no secrets in environment variables or code. All secrets are fetched from **Azure Key Vault** at startup using Managed Identity:

```java
// No credentials in code — Managed Identity handles auth
DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();
SecretClient client = new SecretClientBuilder()
  .vaultUrl("https://kv-auralbooks-prod.vault.azure.net")
  .credential(credential)
  .buildClient();
```

### JWT Security Details

| Property | Value | Rationale |
|---|---|---|
| Algorithm | HMAC-SHA256 | Symmetric — suitable for a single-issuer backend |
| Access token TTL | 15 minutes | Short window limits damage from token leakage |
| Refresh token TTL | 30 days | Long-lived; stored client-side, rotated on use |
| Token blacklist | Redis `SET jwt:blacklist:{jti} 1 EX {ttl}` | Enables immediate logout and revocation |
| Claims | `userId`, `email`, `role`, `iat`, `exp`, `jti` | Minimal; no sensitive data in payload |
| Storage (Angular) | `localStorage` | Accessible to JS; HttpOnly cookie is an opt-in config for higher-security deployments |

### Network Security Groups (NSG Rules)

| Subnet | Inbound Allowed | Inbound Denied |
|---|---|---|
| `subnet-aks-app` | From APIM (443), from AKS system (cluster traffic) | All other internet |
| `subnet-appgw` | From Front Door service tag (443), health probe IPs | All other internet |
| `subnet-privatelinks` | From AKS subnets only | Everything else — no public endpoint |
| `subnet-functions` | From Service Bus, Storage (outbound only) | Inbound from internet |

### Dependency & Container Scanning

```yaml
# Runs in CI pipeline on every PR and main merge
- name: SAST — CodeQL (Java + TypeScript)
  uses: github/codeql-action/analyze@v3

- name: SCA — OWASP Dependency Check (backend)
  run: mvn org.owasp:dependency-check-maven:check -DfailBuildOnCVSS=7

- name: SCA — npm audit (frontend)
  run: npm audit --audit-level=high

- name: Container scan — Microsoft Defender for ACR
  # Auto-triggered on every ACR push; blocks deploy if critical CVE found
  run: az acr task run --registry acrauralbooks --name security-scan
```

### Compliance & Data Privacy

- All data at rest encrypted with **Azure-managed keys** (AES-256); customer-managed keys available for enterprise tier
- All data in transit encrypted with **TLS 1.3**
- PII (email, display name) stored only in PostgreSQL and Cosmos DB — never in logs or analytics events
- GDPR: `DELETE /api/v1/users/me` triggers a full account deletion job that removes all user data from PostgreSQL, Cosmos DB, and purges Redis keys within 30 days
- Stripe handles all payment card data — AuralBooks is fully **out of PCI DSS scope** for card data

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run unit tests only
mvn test -Dgroups=unit

# Run integration tests (requires Docker for Testcontainers)
mvn test -Dgroups=integration

# Generate coverage report
mvn jacoco:report
open target/site/jacoco/index.html
```

**Key test classes:**
- `BookServiceTest.java` — Unit tests with Mockito
- `AuthControllerTest.java` — `@WebMvcTest` with Spring Security test support
- `BookRepositoryIT.java` — Testcontainers PostgreSQL integration test
- `ChatWebSocketIT.java` — WebSocket STOMP integration test

### Frontend Tests

```bash
cd frontend

# Unit tests (Karma + Jasmine)
ng test

# Single run (CI mode)
ng test --watch=false --browsers=ChromeHeadless

# E2E tests (Playwright)
ng e2e
```

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Follow the code style:
   - **Backend:** Google Java Style Guide, Lombok for boilerplate
   - **Frontend:** Angular Style Guide, ESLint + Prettier
4. Write tests for new features
5. Commit with conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
6. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation:** [docs.auralbooks.com](https://docs.auralbooks.com)
- **Swagger / API Docs:** `http://localhost:8080/swagger-ui.html` (when running locally)
- **Issues:** [GitHub Issues](https://github.com/yourusername/auralbooks/issues)
- **Email:** platform@auralbooks.com

---

<div align="center">

Built with ❤️ using **Angular 18** + **Spring Boot 3.3** + **Azure AKS**

</div>
