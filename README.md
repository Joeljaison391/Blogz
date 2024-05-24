# Frontend

Welcome to the frontend of our blogging platform! This README.md file provides an overview of the frontend project structure, tasks to do, and details about routes and other important aspects.

## Project Structure

- **src**: Contains the source code of the frontend application.
  - **assets**: Static assets such as images, fonts, and CSS files.
  - **components**: Reusable UI components used throughout the application.
  - **UI**: Reusable UI elements of acerntity ui.
  - **pages**: Vue.js components representing different pages/routes of the application.
  - **router**: Vue Router configuration and route definitions.
  - **services**: Services for interacting with the backend API.
  - **store**: Vuex store modules for managing application state.
  - **utils**: Utility functions and helper modules.
- **public**: Static files that will be served by the web server.

## Tasks To Do

- [ ] Implement authentication functionality (login, registration, forgot/reset password).
- [ ] Create UI components for dashboard, posts management, comments, analytics, profile, and settings.
- [ ] Develop frontend views for displaying posts, tags, users, and search results.
- [ ] Implement routing using Vue Router and ensure proper navigation between pages.
- [ ] Integrate Vuex for state management and ensure data consistency across components.
- [ ] Style the application using CSS frameworks or custom stylesheets to ensure a consistent and appealing UI/UX.
- [ ] Implement responsive design to ensure compatibility with various screen sizes and devices.
- [ ] Add form validation and error handling to improve user experience.
- [ ] Enhance accessibility by ensuring proper semantic HTML and providing alternative text for images.

## Routes

Here are the routes defined in our application along with their details:

- **/**: Home page displaying an overview of the platform.
- **/about**: About page providing information about the platform or organization.
- **/contact**: Contact page for users to reach out.
- **/auth/login**: Login page for authentication.
- **/auth/register**: Registration page for new users.
- **/auth/forgot-password**: Forgot password page for resetting passwords.
- **/auth/reset-password**: Reset password page after receiving a reset password email.
- **/dashboard**: User dashboard displaying various sections like overview, posts, comments, analytics, profile, and settings.
- **/posts/all**: Page displaying all posts.
- **/posts/:postId**: Page displaying a single post with dynamic postId parameter.
- **/tags/all**: Page displaying all tags.
- **/tags/:tagId**: Page displaying posts associated with a single tag using dynamic tagId parameter.
- **/users/all**: Page displaying all users.
- **/users/:userId**: Page displaying a single user's profile with dynamic userId parameter.
- **/search**: Page displaying search results based on user queries.

Feel free to add or modify routes as per the requirements of the project.


