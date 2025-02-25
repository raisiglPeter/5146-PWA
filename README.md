# Recipe Organizer

This is my Recipe Organizer app created for the INFO-5146 Web Trends class. Built using HTML, CSS, and JavaScript. Firestore database is used for real-time, persistent data storage and Firebase Authentication is used for easy email sign-in of users. Other features are listed below.

## Features

- **Add recipes:** Users can add new recipes with titles, descriptions, ingredients, steps, and tags.
- **Edit recipes:** Existing recipes can be edited to update them.
- **Delete recipes:** Users can remove recipes they no longer need.
- **Mark as favorite:** Recipes can be marked as favorites.
- **Filter by favorites:** Recipes can be filtered by the favorite status.
- **AI Chatbot:** An AI chatbot powered by Google Gemini is integrated to answer questions and provide suggestions. It accepts commands such as "add recipe title; description" or "delete recipe title".
- **Responsive design:** The app adapts to different screen sizes for viewing on various devices.
- **User Authentication:** Secure sign-in functionality using Firebase Authentication.
- **Cloud Storage:** Recipes are stored in Firestore for persistence across devices.

## Demo

You can see a live demo of the Recipe Organizer here:  
(https://raisiglpeter.github.io/5146-PWA/index.html)

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Firebase (Firestore, Authentication)  
- **AI Integration:** Google Gemini (Chatbot)  

## Local Setup

### 1. Clone the Repository

```sh
git clone https://github.com/raisiglPeter/5146-PWA.git
cd repo-folder
```
- Install Firebase dependencies
``` npm install
```

#### Please Note: To run this project locally, you need to set up your own Firebase project and update the Firebase config in firebase.js with your project's credentials in order to use the Firestore Database. Some Firebase features may not work correctly when running the project in a local server.

## Project Structure

```
/5146-PWA
│-- assets/
│   ├── css/
│   │   ├── style-sign-in.css
│   │   ├── style.css
│   ├── html/
│   │   ├── index.html
│   │   ├── recipes.html
│   ├── icons/
│   ├── js/
│   │   ├── firebase.js
│   │   ├── recipes.js
│   │   ├── signIn.js
│-- docs/
│-- node_modules/
│-- .firebaserc
│-- .gitignore
│-- eslint.config.js
│-- firebase.json
│-- firestore.indexes.json
│-- firestore.rules
│-- manifest.json
│-- package-lock.json
│-- package.json
│-- README.md
```
