# Full Stack Authentication

## Setup
### Backend
1. Clone repo & install dependencies:
   ```sh
   git clone https://github.com/ZiadHosny/fullstack-auth && cd backend
   npm install
   ```
2. Create `.env`:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/test
   JWT_SECRET=your_jwt_secret
   ```
3. Start backend:
   ```sh
   npm run start:dev
   ```
4. API Documentation available at: `http://localhost:8000/doc`

### Frontend
1. Navigate & install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Create `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```
3. Start frontend:
   ```sh
   npm run dev
   ```

## API
| Method | Endpoint       | Description       |
|--------|---------------|-------------------|
| POST   | `/auth/signup` | Register user    |
| POST   | `/auth/login`  | Login user       |
| GET    | `/protected`   | Protected route  |

## Notes
- MongoDB must be running.
- Use `.gitignore` for `.env` files.
- Deploy backend (Render, Heroku) & frontend (Vercel, Netlify).

## Contact
For any issues, reach out!

