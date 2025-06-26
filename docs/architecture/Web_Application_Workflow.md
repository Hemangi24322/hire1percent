This document outlines the key workflows within the hiring consultancy web application, detailing the steps and interactions for each user role from registration to core functionalities. Understanding these workflows is crucial for both frontend and backend development, ensuring a cohesive and intuitive user experience.
1. Introduction
The web application facilitates the hiring process by connecting candidates with employers. This workflow document breaks down the primary user journeys, illustrating how different actions are performed and how the system responds.
2. General Workflow: User Registration & Login
This workflow applies to all user roles (Candidate, Employer, Admin).
User Initiates Registration/Login:
New User: Navigates to the "Sign Up" page.
Existing User: Navigates to the "Login" page.
User Enters Credentials:
Sign Up: Provides email, password, and selects their role (Candidate/Employer). Admin accounts are typically created by other admins or internally.
Login: Provides email and password.
System Validation:
Sign Up:
Checks if email already exists.
Validates password strength.
Creates a new entry in the users collection with role and status: "Active".
Redirects to a profile completion page based on role (Candidate/Employer) or dashboard.
Login:
Authenticates credentials against the users collection.
Checks user.status. If status: "Suspended", access is denied.
Updates lastLogin timestamp in users collection.
Redirects to the respective dashboard (Candidate, Employer, or Admin).
Error Handling: Displays appropriate error messages for invalid credentials, existing accounts, or suspended accounts.
3. Candidate Workflow
3.1. Profile Creation/Update
Candidate Accesses Profile: After registration or by navigating to "My Profile" on their dashboard.
Candidate Enters Profile Details: Fills in firstName, lastName, contactNumber, address, bio, skills, experience, education, preferredTimings.
Candidate Uploads Resume: Selects a file (PDF, DOCX) from their device.
System Processes Resume:
Uploads the file to cloud storage (e.g., Firebase Storage).
Stores the resumeUrl in the candidates collection for the corresponding userId.
System Saves Profile: Updates the candidates collection document for the userId.
Confirmation: Displays a success message and updates profileUpdated timestamp.
3.2. Job Search & Application
Candidate Browses Jobs: Navigates to the "Browse Jobs" or "Job Listings" page on their dashboard.
Candidate Filters/Searches (Optional): Enters keywords, location, industry, or preferred timings.
System Displays Jobs: Fetches relevant jobs from the jobs collection based on search/filter criteria.
Candidate Views Job Details: Clicks on a job listing to see jobTitle, description, requirements, location, salaryRange, jobType, requiredTimings, and employerName.
Candidate Applies for Job: Clicks "Apply Now".
System Creates Application:
Creates a new document in the applications collection.
Populates with jobId, candidateId, applicationDate, and status: "Pending".
Confirmation: Displays a "Application Submitted Successfully" message.
Track Application Status: Candidate can view the status of their applications on their dashboard (e.g., "Pending", "Reviewed", "Shortlisted", "Rejected", "Offered", "Hired").
3.3. Offer Management (Candidate)
Candidate Receives Offer Notification: System sends an in-app notification when an employer makes an offer (or candidate regularly checks dashboard).
Candidate Views Offer Details: Navigates to the "My Offers" section on their dashboard, clicks on a specific offer.
Candidate Responds to Offer: Clicks "Accept" or "Reject" button.
System Updates Offer Status:
If "Accept": Updates the status of the corresponding offerId in the offers collection to "Accepted" and sets acceptanceDate.
If "Reject": Updates the status of the corresponding offerId in the offers collection to "Rejected".
System Notifies Employer: (Optional, if communication system is implemented) Sends a notification to the employer about the candidate's decision.
4. Employer Workflow
4.1. Profile Creation/Update
Employer Accesses Profile: After registration or by navigating to "Company Profile" on their dashboard.
Employer Enters Company Details: Fills in companyName, contactPerson, contactEmail, contactNumber, address, industry, companyDescription, website.
System Saves Profile: Updates the employers collection document for the corresponding userId.
Confirmation: Displays a success message and updates profileUpdated timestamp.
4.2. Job Posting
Employer Initiates Job Posting: Navigates to "Post New Job" on their dashboard.
Employer Enters Job Details: Fills in jobTitle, description, requirements, location, salaryRange, jobType, requiredTimings, expiryDate (optional).
System Creates Job Post:
Generates a new jobId.
Creates a new document in the jobs collection.
Populates with all provided details, employerId, postedDate, and status: "Active".
Confirmation: Displays a "Job Posted Successfully" message.
Job Management: Employer can view, edit, or delete their posted jobs from their dashboard.
4.3. Candidate Management & Offer
Employer Views Applications: Navigates to a specific job posting on their dashboard, then to its "Applications" section.
System Displays Applications: Fetches applications documents related to that jobId. For each application, it retrieves candidate profile details and resumeUrl.
Employer Reviews Candidate: Views candidate profile, downloads resume.
Employer Updates Application Status: Changes the status of an application (e.g., "Reviewed", "Shortlisted", "Rejected").
System Creates Offer: If employer decides to make an offer:
Employer clicks "Make Offer" button for a shortlisted candidate.
Enters salaryOffered and terms.
Creates a new document in the offers collection.
Populates with applicationId, employerId, candidateId, jobId, offerDate, salaryOffered, terms, and status: "Pending".
System Updates Application Status: Changes the status of the corresponding application to "Offered".
Confirmation: Displays a "Offer Sent Successfully" message.
5. Admin Workflow
5.1. User Management
Admin Logs In: Uses their admin credentials.
Admin Navigates to User Management: Accesses the "User Management" section on the Admin Dashboard.
System Displays Users: Fetches all users (candidates and employers) from the users collection, along with relevant profile data from candidates and employers collections.
Admin Filters/Searches: Searches by email, name, role, or status.
Admin Views User Details: Clicks on a user to see full profile details.
Admin Edits User Status/Role:
Changes user.status (e.g., "Active" to "Suspended", or vice-versa).
Changes user.role (with extreme caution, if applicable).
Admin Deactivates/Deletes User: (Requires confirmation dialog)
Deactivate: Sets user.status to "Inactive" or "Suspended". User cannot log in.
Delete: (High impact, requires strong justification and confirmation) Removes user record from users, candidates, and employers collections, and potentially related applications and offers.
Confirmation: Displays a success message.
System Records History: A history entry is created for admin actions (e.g., eventType: "userDeactivated", relatedEntityId: "managedUserId", description: "Admin deactivated user X").
5.2. Job Posting Management
Admin Navigates to Job Management: Accesses the "Job Posting Management" section.
System Displays All Jobs: Fetches all job postings from the jobs collection.
Admin Filters/Searches: Searches by job title, employer, status.
Admin Views/Edits Job: Clicks on a job to view details or modify jobTitle, description, status (e.g., "Active" to "Closed" or "Archived").
Admin Removes Job: (Requires confirmation) Deletes the job from the jobs collection and potentially related applications.
Confirmation: Displays a success message.
System Records History: A history entry is created for admin actions (e.g., eventType: "jobArchived", relatedEntityId: "jobId", description: "Admin archived job Y").
5.3. Application & Offer Oversight
Admin Navigates to Oversight Section: Accesses the "Applications & Offers" section.
System Displays Data: Fetches and presents aggregated data from applications and offers collections, potentially with filtering by job, candidate, employer, or status.
Admin Reviews Specific Data: Clicks on an application or offer to view full details for auditing or troubleshooting.
No Direct Editing (Typically): Admins usually don't directly edit application or offer statuses here, but might guide users or perform data corrections if an issue arises.
6. Next Steps
This workflow document provides a clearer picture of how users will interact with the application. The next logical steps would be to:
Create Wireframes/Mockups: Design the user interfaces for each step in these workflows.
Define API Endpoints: Translate these workflows into specific API requests and responses.
Implement Authentication & Authorization: Securely control access to different parts of the application based on user roles.
Let me know if you would like a detailed breakdown of the frontend design for any of these dashboards!
