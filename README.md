# Shoppable Video Analytics Dashboard

A full-stack analytics dashboard for e-commerce merchants to track the performance of shoppable videos.

The application allows merchants to view engagement metrics for their videos, including views, clicks, add-to-cart conversions, and conversion rates. It also includes a traffic simulation feature that creates random engagement events and refreshes the analytics data.

## Features

- View shoppable video analytics
- Track views, clicks, and add-to-cart conversions
- Calculate conversion rate on the frontend
- Simulate random user engagement
- Automatically refresh analytics after a simulated event
- Paginated analytics results
- Responsive dashboard layout
- SQLite relational database
- Controller-service architecture for backend APIs

## Tech Stack

### Frontend

- React
- Vite
- CSS Modules
- Fetch API

### Backend

- Node.js
- Express
- SQLite
- better-sqlite3

## Project Structure

```text
shoppable-video-analytics/
|
+-- client/
|   +-- src/
|   |   +-- components/
|   |   |   +-- DashboardHeader/
|   |   |   +-- Pagination/
|   |   |   +-- VideoTable/
|   |   +-- services/
|   |   |   +-- analyticsApi.js
|   |   +-- App.jsx
|   |   +-- App.module.css
|   +-- package.json
|
+-- server/
|   +-- src/
|   |   +-- config/
|   |   +-- controllers/
|   |   +-- database/
|   |   +-- routes/
|   |   +-- services/
|   |   +-- server.js
|   +-- package.json
|
+-- README.md
```

## Architecture

The backend follows a simple controller-service structure.

```text
Request
  |
  v
Route
  |
  v
Controller
  |
  v
Service
  |
  v
SQLite Database
```

### Routes

Routes are responsible for mapping HTTP endpoints to the appropriate controller.

### Controllers

Controllers handle HTTP-specific concerns such as:

- Reading request parameters and body data
- Returning HTTP status codes
- Sending API responses

### Services

Services contain the application and database logic, keeping it separate from HTTP concerns.

This structure keeps the application organized without adding unnecessary complexity for the scope of the project.

## Database Design

The database contains three related tables:

```text
Products
  |
  | 1
  |
  +-------- *
           Videos
             |
             | 1
             |
             +-------- *
                      EngagementEvents
```

### Products

Stores product information.

| Column | Description |
| --- | --- |
| `id` | Primary key |
| `name` | Product name |
| `price` | Product price |
| `created_at` | Creation timestamp |

### Videos

Stores shoppable videos associated with products.

| Column | Description |
| --- | --- |
| `id` | Primary key |
| `product_id` | Related product |
| `video_url` | Video URL |
| `title` | Video title |

### EngagementEvents

Stores individual user engagement events.

| Column | Description |
| --- | --- |
| `id` | Primary key |
| `video_id` | Related video |
| `event_type` | `view`, `click`, or `add_to_cart` |
| `created_at` | Event timestamp |

Foreign keys are used to maintain relationships between products, videos, and engagement events.

## API Endpoints

### Create Engagement Event

```http
POST /api/events
```

Example request:

```json
{
  "videoId": 1,
  "eventType": "view"
}
```

Supported event types:

- `view`
- `click`
- `add_to_cart`

The API validates the request and checks that the referenced video exists before creating the event.

### Get Video Analytics

```http
GET /api/analytics/videos
```

Supports pagination:

```http
GET /api/analytics/videos?page=1&limit=10
```

Example response:

```json
{
  "videos": [
    {
      "id": 1,
      "title": "Wireless Headphones Product Demo",
      "videoUrl": "https://example.com/videos/headphones-demo.mp4",
      "productName": "Wireless Headphones",
      "price": 2999,
      "views": 120,
      "clicks": 45,
      "conversions": 18
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalVideos": 5,
    "totalPages": 1
  }
}
```

The analytics query uses SQL joins and conditional aggregation to calculate the engagement metrics for each video.

Videos without engagement events are still included using a `LEFT JOIN`.

## Conversion Rate

The conversion rate is intentionally calculated on the frontend as required by the assignment.

```text
Conversion Rate = Add to Carts / Views * 100
```

For example:

```text
18 conversions / 120 views * 100 = 15%
```

The application also handles videos with zero views to avoid division-by-zero issues.

## Simulate Traffic

The dashboard includes a **Simulate Traffic** button.

When clicked, the application:

- Selects a random video from the currently loaded data
- Selects a random event type
- Sends the event to `POST /api/events`
- Refreshes the analytics data

This simulates incoming engagement activity and demonstrates the complete flow between the frontend, API, and database.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd shoppable-video-analytics
```

### Backend Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Seed the SQLite database:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal and move into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide the local URL, typically:

```text
http://localhost:5173
```

## Running the Application

Make sure both applications are running:

Terminal 1:

```bash
cd server
npm run dev
```

Terminal 2:

```bash
cd client
npm run dev
```

Then open the frontend in your browser.

## Testing the API

Example event request:

```http
POST http://localhost:5000/api/events
```

Request body:

```json
{
  "videoId": 1,
  "eventType": "view"
}
```

Example analytics request:

```http
GET http://localhost:5000/api/analytics/videos?page=1&limit=2
```

## Design Decisions

### Why SQLite?

SQLite was chosen because the project requires a SQL database and the application does not require a separate database server. This keeps the setup simple while still demonstrating relational database design, foreign keys, joins, aggregation, and indexing.

### Why Controller-Service Architecture?

The backend separates HTTP handling from database and application logic.

This makes the API easier to maintain and keeps controllers focused on request and response handling.

### Why CSS Modules?

The assignment specifically avoids Tailwind CSS. CSS Modules provide locally scoped styles while keeping the styling approach simple and easy to maintain.

### Why a Separate API Service on the Frontend?

API calls are kept outside React components so UI components can focus on rendering and interaction rather than request implementation details.

### Why LEFT JOIN for Analytics?

A video can exist without having any engagement events.

Using a `LEFT JOIN` ensures those videos are still returned with zero engagement metrics instead of being excluded from the dashboard.


## Project Links

### GitHub Repository

[Add your GitHub repository link here]

### Other Public Repositories

- https://github.com/your-username/project-one
- https://github.com

### 30-Second Candidate Pitch

[Add your private or unlisted YouTube link here]

### Technical Walkthrough

[Add your Loom or screen recording link here]
