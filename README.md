# Polling App

This project is a polling application that includes a frontend built with React and a backend developed using Django Rest Framework. The frontend and backend are connected via API and are hosted on separate domains.

## Features

- Create polls with multiple choices in a single API call.
- Vote for choices in the latest poll.
- Ensures each device can only vote once per poll by combining IP address and user-agent as a unique identifier.

## Installation and Setup

### Backend (Django Rest Framework)

1. **Clone the Repository:**

    ```bash
    git clone linkOfrepo
    cd polling-app-backend
    ```

2. **Create and Activate a Virtual Environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run Database Migrations:**

    ```bash
    python manage.py migrate
    ```

5. **Create a Superuser:**

    ```bash
    python manage.py createsuperuser
    ```

6. **Start the Development Server:**

    ```bash
    python manage.py runserver
    ```

7. **Access the Admin Panel at** `http://127.0.0.1:8000/admin`.

### Frontend (React)

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/polling-app-frontend.git
    cd polling-app-frontend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start the Development Server:**

    ```bash
    npm start
    ```

4. **Access the Frontend at** `http://localhost:3000`.

## API Endpoints

### Create Poll with Choices

- **URL:** `/polls/`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "question": "What's your favorite color?",
        "choices": [
            {"choice_text": "Red"},
            {"choice_text": "Blue"},
            {"choice_text": "Green"}
        ]
    }
    ```

### Vote

- **URL:** `/polls/{poll_id}/vote/`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "choice_id": 1
    }
    ```

## Frontend and Backend Integration

- **Frontend (React):** Communicates with the Django backend using AJAX requests to the API endpoints.
- **Backend (Django Rest Framework):** Provides the API endpoints for creating polls, managing choices, and recording votes.

## Deployment

- **Frontend:** Hosted on [livepoll.vercel.app](http://livepoll.vercel.app)
- **Backend:** Hosted on [livepoll.pythonanywhere.com](http://livepoll.pythonanywhere.com)

Ensure that the frontend is configured to point to the backend API endpoint for proper functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
