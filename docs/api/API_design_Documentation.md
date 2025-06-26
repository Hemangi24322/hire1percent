This document outlines the design principles and structure for the RESTful APIs that will power the hiring consultancy web application. A well-designed API is crucial for seamless communication between the frontend and backend, enabling efficient data exchange and robust functionality.
1. Introduction
The API serves as the backbone of the application, allowing different components (web, mobile, third-party integrations) to interact with the system's data and business logic. This document defines the conventions, endpoints, and data structures for all public-facing and internal APIs.
2. Design Principles
The API design will adhere to the following principles:
RESTful: Utilize standard HTTP methods (GET, POST, PUT, DELETE) and resources for clear, stateless interactions.
Resource-Oriented: Design endpoints around logical resources (e.g., /users, /jobs, /applications).
Stateless: Each request from the client to the server must contain all the information necessary to understand the request.
Predictable URLs: Use clear, hierarchical, and noun-based URLs for resources.
Consistent Naming: Use consistent casing (e.g., camelCase for JSON keys, kebab-case for URLs).
Versioned: Support API versioning (e.g., /api/v1/) to allow for future changes without breaking existing clients.
Secure: Implement robust authentication and authorization mechanisms.
Error Handling: Provide clear and consistent error responses with appropriate HTTP status codes.
Scalable: Design for performance and future growth.
3. API Endpoints (Examples)
This section provides example endpoints for key functionalities, illustrating the resource-oriented approach. Each endpoint will have detailed specifications including HTTP method, URL, request body, response body, and status codes.
3.1. User Management (Authentication & Profiles)
POST /api/v1/auth/register: Register a new user (Candidate/Employer)
Request: { email, password, role }
Response: { userId, email, role, token }
POST /api/v1/auth/login: User login
Request: { email, password }
Response: { userId, email, role, token }
GET /api/v1/users/{userId}: Get a user's profile (admin only or own profile)
PUT /api/v1/candidates/{candidateId}: Update candidate profile
Request: { firstName, lastName, contactNumber, address, bio, skills[], experience[], education[], preferredTimings }
PUT /api/v1/employers/{employerId}: Update employer profile
Request: { companyName, contactPerson, contactEmail, contactNumber, address, industry, companyDescription, website }
PUT /api/v1/users/{userId}/status: Update user status (Admin only)
Request: { status: "Active" | "Inactive" | "Suspended" }
3.2. Job Management
POST /api/v1/jobs: Create a new job posting (Employer only)
Request: { jobTitle, description, requirements[], location, salaryRange, jobType, requiredTimings, expiryDate (optional) }
GET /api/v1/jobs: Get all active job postings (Candidate/Admin: filterable)
Query Params: ?search=keyword&location=city&type=fulltime&timings=flexible
GET /api/v1/jobs/{jobId}: Get details of a single job posting
PUT /api/v1/jobs/{jobId}: Update a job posting (Employer/Admin only)
DELETE /api/v1/jobs/{jobId}: Delete a job posting (Employer/Admin only)
3.3. Application Management
POST /api/v1/jobs/{jobId}/apply: Candidate applies for a job
Request: { /* Implicit: candidateId from token */ }
Response: { applicationId, status: "Pending" }
GET /api/v1/candidates/{candidateId}/applications: Get all applications by a specific candidate
GET /api/v1/jobs/{jobId}/applications: Get all applications for a specific job (Employer/Admin only)
PUT /api/v1/applications/{applicationId}/status: Update application status (Employer/Admin only)
Request: { status: "Reviewed" | "Shortlisted" | "Rejected" | "Offered" | "Hired" }
3.4. Offer Management
POST /api/v1/applications/{applicationId}/offer: Create a job offer (Employer only)
Request: { salaryOffered, terms }
GET /api/v1/candidates/{candidateId}/offers: Get all offers received by a candidate
PUT /api/v1/offers/{offerId}/response: Candidate responds to an offer
Request: { status: "Accepted" | "Rejected" }
3.5. Admin Specific Endpoints
GET /api/v1/admin/users: Get all users (filterable by role, status)
DELETE /api/v1/admin/users/{userId}: Delete a user (Admin only)
GET /api/v1/admin/analytics/summary: Get system-wide analytics (e.g., user counts, job counts)
4. Authentication & Authorization
Authentication: Use JSON Web Tokens (JWT).
Upon successful login, the server issues a JWT.
Clients include this JWT in the Authorization header (Bearer <token>) for subsequent requests.
Authorization: Implement Role-Based Access Control (RBAC).
The JWT will contain the user's role.
Backend middleware will verify the user's role against the required permissions for each API endpoint.
5. Error Handling
Consistent JSON error responses.
Use standard HTTP status codes:
200 OK: Successful request.
201 Created: Resource successfully created.
204 No Content: Successful request, no content to return (e.g., successful delete).
400 Bad Request: Invalid input or missing parameters.
401 Unauthorized: No authentication credentials, or invalid credentials.
403 Forbidden: Authenticated, but user does not have necessary permissions.
404 Not Found: Resource not found.
409 Conflict: Resource already exists or conflict with current state.
500 Internal Server Error: Generic server-side error.
Error Response Structure Example:
{
  "code": "BAD_REQUEST",
  "message": "Invalid email format.",
  "details": {
    "field": "email",
    "value": "invalid-email"
  }
}


6. Tools
Tools for documenting APIs include Swagger/OpenAPI, Postman, Stoplight, etc.
