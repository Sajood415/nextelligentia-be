# NextElligentia Backend

A robust Node.js backend API for NextElligentia, built with Express.js and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with admin middleware
- **Lead Management**: Comprehensive lead tracking and management system
- **Job Management**: Job posting and application handling
- **Portfolio Management**: Portfolio items management
- **Contact Management**: Contact form submissions handling
- **Admin Panel**: Administrative functions and user management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Winston logger
- **Development**: Nodemon for auto-restart

## Project Structure

```
nextelligentia-be/
├── config/
│   ├── db.js              # Database configuration
│   └── logger.js          # Winston logger setup
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── contact.controller.js
│   ├── job.controller.js
│   ├── jobApplication.controller.js
│   ├── lead.controller.js
│   └── portfolio.controller.js
├── middleware/
│   └── auth.middleware.js # Authentication middleware
├── models/
│   ├── Contact.model.js
│   ├── Job.model.js
│   ├── JobApplication.model.js
│   ├── Lead.model.js
│   ├── Portfolio.model.js
│   └── User.model.js
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── contact.routes.js
│   ├── job.routes.js
│   ├── lead.routes.js
│   └── portfolio.routes.js
├── scripts/
│   └── seedAdmin.js       # Admin user seeding script
├── utils/
│   ├── adminSeeder.js
│   ├── error.js           # Error handling utilities
│   └── token.js           # JWT token utilities
└── index.js               # Main application file
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Sajood415/nextelligentia-be.git
cd nextelligentia-be
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nextelligentia
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=30d
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Leads

- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads (admin only)
- `PUT /api/leads/:id/status` - Update lead status (admin only)

### Jobs

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Portfolio

- `GET /api/portfolio` - Get portfolio items
- `POST /api/portfolio` - Create portfolio item (admin only)
- `PUT /api/portfolio/:id` - Update portfolio item (admin only)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin only)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)

## Lead Data Structure

The lead model accepts the following data structure:

```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, email format)",
  "countryCode": "string (required, default: '+92')",
  "phone": "string (required)",
  "budget": "string (required)",
  "company": "string (optional)",
  "region": "string (required)",
  "services": "array of strings (required, at least one)",
  "projectDetails": "string (required)"
}
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed:admin` - Seed admin user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact us at [contact@nextelligentia.com](mailto:contact@nextelligentia.com)
