# Example Healthcare Stats App

- Example app that shows a Donut chart and a Scatter graph using Angular 17 and the data taken from Laravel 11.

- What's not included in the app is it's still missing a lot of things like testing and error reporting for example; it is not intended as a finished product.

- **OAuth 2.0**: Has been used rather than Sanctum cookie for login for enhanced security.


![alt text](/healthapp-screengrab-1.png)

----------------------------------------------

![alt text](/healthapp-screengrab-2.png)

----------------------------------------------
## Installation

### Setting Up the Laravel Backend


- With Laravel running you also need to run Angular for the frontend.

- Navigate to the server directory: cd ./server
- Install Composer dependencies: composer install
- Install NPM packages: npm i
- Run database migrations: php artisan migrate
- Seed the database: php artisan db:seed
- Start the Laravel server: php artisan serve


### Setting Up the Angular Frontend
- Navigate to the frontend directory:  cd ./frontend
- Install NPM packages: npm install
- Serve the Angular application: ng serve




### Notes:

- Make sure each command is executed in the correct directory.
- Ensure you have all necessary environments set up, such as Node.js for npm commands and PHP for Composer and Artisan commands.
- Adjust paths and commands according to your project structure if it differs from the standard setup outlined here.
----------------------------------------------
## Notes

## Laravel (Backend)

### Data Management and APIs
- **HL7 and FHIR Integration**: Implement APIs compatible with HL7 and FHIR standards for healthcare data exchange.
- **Database**: Use relational databases like MySQL or PostgreSQL with Laravel's Eloquent ORM for secure and efficient data handling.

### Security and Compliance
- **OAuth 2.0**: Secure APIs using the OAuth 2.0 authentication protocol.
- **HIPAA and GDPR Compliance**: Ensure data handling complies with HIPAA and GDPR, including data encryption, regular security audits, and access control.

### Performance and Scalability
- **Caching**: Use Laravel's caching features to improve performance of data retrieval and processing.
- **Queueing**: Implement Laravel’s queue system for handling long-running or resource-intensive tasks asynchronously.

### Integration and Interoperability
- **RESTful Services**: Build RESTful services for data interchange with external systems and the frontend.
- **JSON and XML Formats**: Support both JSON and XML data formats for broad compatibility with various healthcare systems.


---------------------------

## Angular (Frontend)

### Data Display and User Interface
- **Dynamic Data Visualization**: Use libraries like D3.js or Chart.js with Angular for interactive charts and graphs.
- **Responsive Design**: Implement responsive web design with Angular Material or Bootstrap.

### Data Interaction and Real-time Updates
- **RxJS**: Utilize RxJS for managing real-time data streams and updates in the Angular application.
- **Websockets**: Implement Websockets for real-time data updates from the backend without refreshing the UI.

### Accessibility and Usability
- **Accessibility Standards**: Follow WCAG standards to ensure the application is accessible to users with disabilities.
- **Internationalization**: Use Angular’s internationalization (i18n) capabilities to localize the application for global use.

### Security and Data Protection
- **Client-Side Security**: Ensure secure data transmission and handle sensitive data carefully on the client side.
- **Authentication Integration**: Coordinate with backend OAuth 2.0 services for secure user authentication and session management.



=====================
## NOTES ONLY the Angular app provides a register and login form

## Register

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/register" -Method Post -ContentType "application/json" -Body '{
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}'

=====================

## Login

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/login" -Method Post -ContentType "application/json" -Body '{"email": "user10@example.com", "password": "password123"}'
