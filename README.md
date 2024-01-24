# SnapGram

## About

SnapGram is a simple social media platform. User can perform the following operation:

- Login and register to an account
- Post, modify, delete theirs posts
- Follow and unfollow other users
- Save and unsave posts
- Change profile picture

The primary purpose of this project is to:

- **Learn Appwrite:** Gain hands-on experience with Appwrite and understand its features for database, authentication, storage.

- **Improve React Skills:** Enhance proficiency in React and learn best practices for building scalable and maintainable web applications.

- **Explore React Query:** Gain familiarity with React Query and understand its role in managing state and asynchronous data in React applications.

- **Responsive Design:** Being all kinds of device able to show contents.

## Technologies Used

- React.js
- Appwrite
- TypeScript
- Tailwind CSS
- Vite (for development)
- GitHub (version control)

## Dependencies

- **React and ReactDOM:**

  - `react: ^18.2.0`
  - `react-dom: ^18.2.0`

- **Vite:**

  - `vite: ^4.4.5`
  - `@vitejs/plugin-react: ^4.0.3`

- **React Router:**

  - `react-router-dom: ^6.19.0`

- **React Query:**

  - `@tanstack/react-query: ^5.8.4`

- **Appwrite SDK:**

  - `appwrite: ^13.0.1`

- **Styling:**

  - `styled-components: ^6.1.1`
  - `tailwind-merge: ^2.0.0`
  - `tailwindcss-animate: ^1.0.7`

- **Utility Libraries:**

  - `clsx: ^2.0.0`
  - `match-sorter: ^6.3.1`
  - `sort-by: ^1.2.0`

- **UI Components:**

  - `@radix-ui/react-alert-dialog: ^1.0.5`
  - `@radix-ui/react-dialog: ^1.0.5`
  - `@radix-ui/react-label: ^2.0.2`
  - `@radix-ui/react-slot: ^1.0.2`
  - `@radix-ui/react-toast: ^1.1.5`
  - `react-dropzone: ^14.2.3`
  - `react-icons: ^4.12.0`
  - `react-loader-spinner: ^6.1.0`
  - `lucide-react: ^0.292.0`

- **Form Handling:**

  - `react-hook-form: ^7.48.2`

- **Data Management:**

  - `localforage: ^1.10.0`

- **Linting and TypeScript:**
  - `eslint: ^8.45.0`
  - `@typescript-eslint/eslint-plugin: ^6.0.0`
  - `@typescript-eslint/parser: ^6.0.0`
  - `@types/node: ^20.9.2`
  - `@types/react: ^18.2.15`
  - `@types/react-dom: ^18.2.7`

## Limitations

1. **Scalability:**

- The platform may face challenges in scaling to handle a large number of users, posts, and interactions.

2. **Data Privacy:**

- Consideration must be given to user data privacy and compliance with data protection regulations. Clear privacy policies and mechanisms for users to control their data are essential.

3. **Messaging:**

- Implementing features like instant messaging may pose additional challenges.

4. **Content Moderation:**

- A system for content moderation is necessary to prevent inappropriate content, spam, or abusive behavior.

5. **Notification System:**

- Implementing a notification system for users to receive updates on interactions may require careful design and development.

6. **Limited Features:**

- Certain advanced features found in larger social media platforms might be beyond the scope of the current project.

7. **Testing and Quality Assurance:**

- Comprehensive testing and quality assurance processes are crucial to identify and address issues before they reach production.

8. **Hosting and Infrastructure Costs:**

- Depending on the user base and usage patterns, hosting and infrastructure costs may become a consideration, especially as the platform grows.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`VITE_APPWRITE_URL`

`VITE_APPWRITE_USER_ID`

`VITE_APPWRITE_STORAGE_ID`

`VITE_APPWRITE_DATABASE_ID`

`VITE_APPWRITE_SAVES_COLLECTION_ID`

`VITE_APPWRITE_POSTS_COLLECTION_ID`

`VITE_APPWRITE_USERS_COLLECTION_ID`

`VITE_APPWRITE_FOLLOW_COLLECTION_ID`

## Setup

1. Create a web project in appwrite.

2. Set the `VITE_APPWRITE_URL` using the api endpoint given by appwrite.

3. Set the `VITE_APPWRITE_USER_ID` using the project id given by appwrite.

4. Create a appwrite storage, database and use the id as `VITE_APPWRITE_STORAGE_ID`, `VITE_APPWRITE_DATABASE_ID`.

5. Create four collection named users, posts, saves, follow having the following properties:

<div style="display: grid; grid-template-columns:repeat(2, 1fr); gap-20px">
  <div>
   <p>Users table:</p>
   <img src="./public/ss/users.png" alt="Sign In Screenshot" width="400" height="auto"/>
  </div>
  <div>
   <p>Posts table:</p>
   <img src="./public/ss/posts.png" alt="Sign In Screenshot" width="400" height="auto"/>
  </div>
  <div>
   <p>Saves table:</p>
   <img src="./public/ss/saves.png" alt="Sign In Screenshot" width="400" height="auto"/>
  </div>
  <div>
   <p>Follow table:</p>
   <img src="./public/ss/follows.png" alt="Sign In Screenshot" width="400" height="auto"/>
  </div>
</div>

6. use their ids as `VITE_APPWRITE_SAVES_COLLECTION_ID, VITE_APPWRITE_POSTS_COLLECTION_ID, VITE_APPWRITE_USERS_COLLECTION_ID, VITE_APPWRITE_FOLLOW_COLLECTION_ID`.

## Installation

Open cmd and run the following commands one by one

```bash
  git clone https://github.com/Irfat7/SnapGramUI.git
```

```bash
  cd snapgramui
```

```bash
  npm i
```

```bash
  npm run dev
```

## Screenshots

<div style="display: grid; grid-template-columns:repeat(2, 1fr); gap-20px">
  <img src="./public/ss/signin.png" alt="Sign In Screenshot" width="400" height="auto"/>
  <img src="./public/ss/signup.png" alt="Sign Up Screenshot" width="400" height="auto"/>
  <img src="./public/ss/home.png" alt="Sign In Screenshot" width="400" height="auto"/>
  <img src="./public/ss/explore.png" alt="Sign Up Screenshot" width="400" height="auto"/>
  <img src="./public/ss/people.png" alt="Sign In Screenshot" width="400" height="auto"/>
  <img src="./public/ss/picmodal.png" alt="Sign Up Screenshot" width="400" height="auto"/>
  <img src="./public/ss/editmodal.png" alt="Sign In Screenshot" width="400" height="auto"/>
</div>


## Credits
[JavaScript Mastery](https://www.youtube.com/@javascriptmastery)

**Acknowledgements:** Based on JavaScript Mastery's Project [Link](https://www.youtube.com/watch?v=_W3R2VwRyF4).
