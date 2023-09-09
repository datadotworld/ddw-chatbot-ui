# ddw-chatbot-ui

## Running the Frontend Locally:

**Clone the Repo:**
   - Clone the repository from GitHub using `git clone`.

**Set Up Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Open the `.env` file and set the necessary environment variables for both local and Heroku backend URLs:
     ```shell
     REACT_APP_LOCAL_URL=<local-backend-url>
     REACT_APP_HEROKU_URL=https://ddw-chatbot-backend-fe4ba696a1a5.herokuapp.com
     ```
     Replace the `<local-backend-url` with the appropriate URL pointing to where you have spun up a local backend environment.

**Install Dependencies:**
   - Open a terminal and navigate to the project's root directory using `cd path/to/project`.
   - Run `npm install` to install the project's dependencies.

**Run the Development Server:**
   - After setting up the environment variables and installing dependencies, run `npm start` in the terminal.
   - This will start the development server and open the application in your default web browser.
   - The application should now be accessible at http://localhost:3000.
