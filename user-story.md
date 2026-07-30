# User Story: User Registration and Authentication

## User Story
As a new user, I need to create an account and log in securely so that I can access personalized gift recommendations and manage my profile.

## Acceptance Criteria

### Scenario 1: Successful User Registration
* **Given** the user is on the registration page (`/register`),
* **When** the user enters valid username, email, and password details and clicks the submit button,
* **Then** the system should successfully save the user data, display a registration success message, and redirect the user to the login page.

### Scenario 2: Successful User Login
* **Given** the user is a registered user on the login page (`/login`),
* **When** the user enters correct email and password credentials and clicks the login button,
* **Then** the system should validate the credentials, return a success status along with authorization tokens, and redirect the user to their dashboard.

### Scenario 3: Failed Login with Invalid Credentials
* **Given** the user is on the login page (`/login`),
* **When** the user enters incorrect email or password credentials and attempts to log in,
* **Then** the system should reject the request and display an error message indicating invalid credentials.
