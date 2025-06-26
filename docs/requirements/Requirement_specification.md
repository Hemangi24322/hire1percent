This document outlines the functional and non-functional requirements for the hiring consultancy web application. It serves as a definitive reference for what the system must do and how well it must perform, ensuring that all stakeholders have a shared understanding of the project's scope and objectives.
1. Introduction
The purpose of this document is to clearly define the requirements for the web application, which aims to streamline the hiring process for candidates, employers, and the consultancy's administrative staff. These requirements will guide the design, development, and testing phases of the project.
2. Functional Requirements
Functional requirements describe the specific actions and behaviors the system must perform. They are broken down by user role.
2.1. Candidate-Specific Requirements
FR1.0: User Account Management
FR1.1: The system SHALL allow candidates to register a new account using their email and a password.
FR1.2: The system SHALL allow candidates to log in using their registered credentials.
FR1.3: The system SHALL allow candidates to update their personal profile information (e.g., name, contact details, address, bio).
FR1.4: The system SHALL allow candidates to upload, update, and remove their resume/CV (e.g., PDF, DOCX format).
FR1.5: The system SHALL allow candidates to specify and update their skills, experience, education, and preferred job timings.
FR2.0: Job Discovery & Application
FR2.1: The system SHALL allow candidates to browse available job postings.
FR2.2: The system SHALL provide search and filtering capabilities for job postings (by keyword, location, job type, industry, timings).
FR2.3: The system SHALL display detailed information for each job posting.
FR2.4: The system SHALL allow candidates to apply for a job posting.
FR2.5: The system SHALL allow candidates to view the status of their submitted applications (e.g., Pending, Reviewed, Shortlisted, Rejected, Offered, Hired).
FR3.0: Offer Management
FR3.1: The system SHALL notify candidates when a job offer is made.
FR3.2: The system SHALL allow candidates to view details of received job offers.
FR3.3: The system SHALL allow candidates to accept or reject a job offer.
FR4.0: Dashboard
FR4.1: The system SHALL display a personalized dashboard for candidates, summarizing applied jobs and their statuses.
FR4.2: The system SHALL display a history of all applications and offers made to the candidate.
2.2. Employer-Specific Requirements
FR5.0: User Account & Company Profile Management
FR5.1: The system SHALL allow employers to register a new company account using their email and a password.
FR5.2: The system SHALL allow employers to log in using their registered credentials.
FR5.3: The system SHALL allow employers to create and update their company profile (e.g., company name, contact person, description, industry).
FR6.0: Job Posting Management
FR6.1: The system SHALL allow employers to create new job postings with all required details (title, description, requirements, location, salary range, job type, timings).
FR6.2: The system SHALL allow employers to view, edit, and delete their own job postings.
FR6.3: The system SHALL allow employers to mark a job posting as "closed" or "filled."
FR7.0: Candidate & Application Management
FR7.1: The system SHALL allow employers to view all applications for their posted jobs.
FR7.2: The system SHALL allow employers to access and download candidate resumes/profiles.
FR7.3: The system SHALL allow employers to update the status of individual applications (e.g., Reviewed, Shortlisted, Rejected).
FR7.4: The system SHALL allow employers to make a job offer to a shortlisted candidate, including salary and terms.
FR7.5: The system SHALL notify employers of a candidate's response to an offer (accepted/rejected).
FR8.0: Dashboard
FR8.1: The system SHALL display a personalized dashboard for employers, summarizing active job postings and application statistics.
FR8.2: The system SHALL display a history of all jobs posted, candidates selected, and offers made by the employer.
2.3. Admin-Specific Requirements
FR9.0: Platform Administration
FR9.1: The system SHALL allow administrators to log in via a dedicated admin portal.
FR9.2: The system SHALL allow administrators to view and manage all candidate accounts (e.g., view profiles, update status, deactivate/delete).
FR9.3: The system SHALL allow administrators to view and manage all employer accounts (e.g., view profiles, update status, deactivate/delete).
FR9.4: The system SHALL allow administrators to view, edit, and archive/delete any job posting on the platform.
FR9.5: The system SHALL allow administrators to view all applications and offers across the platform for oversight.
FR9.6: The system SHALL provide basic analytics and reporting on platform usage (e.g., number of active users, job postings, applications).
FR9.7: The system SHALL allow administrators to manage platform content (e.g., moderate inappropriate content if a free-text field is abused).
3. Non-Functional Requirements
Non-functional requirements describe how well the system must perform or the qualities it must possess.
3.1. Performance
NFR1.1: The application SHALL load within 3 seconds on a typical broadband connection.
NFR1.2: API response times SHALL be under 500ms for 95% of requests under normal load.
NFR1.3: The application SHALL support at least 1,000 concurrent users without significant degradation in performance.
3.2. Security
NFR2.1: The application SHALL protect all sensitive user data using industry-standard encryption (TLS 1.2+ for data in transit, encryption at rest for database).
NFR2.2: The application SHALL implement robust authentication and authorization mechanisms (e.g., JWT, RBAC).
NFR2.3: The application SHALL prevent common web vulnerabilities (e.g., XSS, SQL/NoSQL Injection, CSRF) as per OWASP Top 10 guidelines.
NFR2.4: All password storage SHALL use strong, salted hashing algorithms (e.g., bcrypt).
NFR2.5: File uploads (resumes) SHALL be scanned for viruses and stored securely, with restricted access.
3.3. Usability
NFR3.1: The user interface SHALL be intuitive and easy to navigate for all user roles, minimizing the need for external documentation.
NFR3.2: The application SHALL provide clear and concise error messages and user feedback.
NFR3.3: The application SHALL be accessible to users with disabilities, adhering to WCAG 2.1 AA guidelines.
3.4. Reliability & Availability
NFR4.1: The application SHALL be available 99.9% of the time, excluding scheduled maintenance.
NFR4.2: The system SHALL gracefully handle network errors and unexpected server responses, providing informative feedback to the user.
NFR4.3: Data SHALL be backed up regularly to prevent loss.
3.5. Scalability
NFR5.1: The architecture SHALL be designed to allow for horizontal scaling to accommodate a growing number of users and data.
NFR5.2: The database solution SHALL be able to handle increasing data volumes and query loads efficiently.
3.6. Maintainability
NFR6.1: The codebase SHALL be well-documented and follow established coding standards.
NFR6.2: The system SHALL be modular, allowing for independent development and deployment of components.
3.7. Compatibility
NFR7.1: The application SHALL be compatible with the latest two major versions of popular web browsers (Chrome, Firefox, Safari, Edge).
NFR7.2: The application SHALL be fully responsive and optimized for desktop, tablet, and mobile devices.
4. Future Considerations (Out of Scope for Initial Release)
In-app messaging between candidates and employers.
Integration with external HRIS or ATS systems.
Advanced analytics and reporting for employers.
Video interviewing capabilities.
Automated resume parsing.
