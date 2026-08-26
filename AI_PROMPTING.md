# AI Prompting Log

## Prompt 1: Express API Structure

### Tool Used

ChatGPT

### Context / Task

Setting up Express with SQLite.

### Exact Prompt Used

> How should I structure a small Express API using SQLite with routes, controllers, and services without overengineering it?

### Outcome & Adjustments

Used a simple route-controller-service structure with a shared SQLite connection. Skipped unnecessary repository and ORM layers.

## Prompt 2: SQLite Database Schema Design

### Context / Task

Designing the SQLite database schema while comparing relational database concepts with MongoDB, which I am more familiar with from MERN development.

### Exact Prompt Used

> I have mainly worked with MongoDB in MERN projects and am learning SQL for this assignment. Help me understand how to model Products, Videos, and EngagementEvents in SQLite and compare the relationships, references, and constraints with how I would approach this in MongoDB. I want to understand the design before implementing it myself.

### Outcome & Adjustments

Used the comparison with MongoDB documents and references to understand how SQL tables and foreign keys represent the same relationships. Based on that understanding, I implemented three normalized tables with primary keys, foreign keys, constraints for valid event types and prices, and indexes for the expected analytics queries. I kept the design simple for the scope of the assignment.

## Prompt 3: Repeatable Database Seed Data

### Context / Task

Creating repeatable sample data for the SQLite database and understanding how it compares with seeding related collections in MongoDB.

### Exact Prompt Used

> I am familiar with creating sample data for MongoDB collections. How should I seed related Products, Videos, and EngagementEvents in SQLite? Explain the insert order, foreign key relationships, and how to make the seed script repeatable.

### Outcome & Adjustments

Used the MongoDB comparison to understand the required insert and delete order for related SQL tables. Added a repeatable seed script that clears existing data and inserts related records inside a transaction. I also used generated database IDs instead of assuming fixed IDs when linking videos to products.

## Prompt 4: Video Engagement Analytics Query

### Context / Task

Building the SQL query for aggregated video engagement analytics.

### Exact Prompt Used

> Explain how I can use JOIN, GROUP BY, and conditional aggregation in SQLite to return videos with view, click, and add_to_cart counts from MongoDb's View. Also explain why a LEFT JOIN is useful here.

### Outcome & Adjustments

Used the MongoDB aggregation comparison to understand how SQL joins and conditional aggregation work. Implemented a LEFT JOIN so videos without events are still included and used CASE expressions to calculate each engagement metric.

## Prompt 5: Engagement Event Ingestion API

### Context / Task

Implementing the engagement event ingestion API.

### Exact Prompt Used

> Help me structure a POST /api/events endpoint using routes, controllers, and services. It should validate the request, verify the video exists, and store the engagement event with appropriate HTTP responses.

### Outcome & Adjustments

Implemented the endpoint using a controller-service structure. Added validation for the video ID and event type, checked that the related video exists, and returned appropriate 201, 400, and 404 responses.

## Prompt 6: Paginated Video Analytics Query

### Context / Task

Building the SQL query for aggregated video engagement analytics.

### Exact Prompt Used

> Help me design a SQLite query that returns each video with its total views, clicks, and add-to-cart events. It should include videos with no events and support pagination.

### Outcome & Adjustments

Implemented the analytics query using joins, conditional aggregation, and GROUP BY. Used a LEFT JOIN so videos without engagement events are still included and added pagination using LIMIT and OFFSET.

## Prompt 7: README Documentation Structure

### Context / Task

Organizing the project README to clearly document the application, architecture, setup process, API endpoints, and submission requirements.

### Exact Prompt Used

> Help me create a clear README structure for my full-stack shoppable video analytics assignment. Include project overview, features, architecture, database design, API documentation, setup instructions, design decisions, and placeholders for the required repository and video links.

### Outcome & Adjustments

Created a structured README covering the application features, backend architecture, database relationships, API endpoints, local setup, and design decisions. The README was kept focused on the implemented features and includes placeholders for the required submission links.
