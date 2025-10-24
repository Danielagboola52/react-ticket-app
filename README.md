# React Ticket Management Application

A modern, responsive ticket management system built with React, featuring full CRUD operations, authentication, and an intuitive user interface.

## 🚀 Features

### Core Functionality
- **Landing Page** with hero section and wavy decorative background
- **Authentication System** (Login & Signup) with validation
- **Dashboard** displaying ticket statistics (Total, Open, Resolved)
- **Ticket Management** with full CRUD operations
- **Protected Routes** for authenticated users only
- **Session Management** using localStorage
- **Real-time Validation** with inline errors and toast notifications

### Design Specifications
- Maximum width: 1440px (centered layout)
- Fully responsive (mobile, tablet, desktop)
- Wavy hero background with decorative elements
- Card-style layout with shadows
- Color-coded status tags:
  - 🟢 Green: Open tickets
  - 🟠 Amber: In Progress tickets
  - ⚫ Gray: Closed tickets

## 🛠️ Technologies Used

- **React 18.3.1** - Frontend framework
- **React Router DOM 6.28.0** - Navigation and routing
- **Vite 7.1.7** - Build tool and dev server
- **ESLint** - Code linting
- **CSS3** - Styling with custom properties

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Danielagboola52/react-ticket-app.git
cd react-ticket-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
react-ticket-app/
├── public/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components
│   │   └── Toast.jsx    # Toast notification component
│   ├── pages/           # Page components
│   │   ├── Landing.jsx  # Landing/Home page
│   │   ├── Login.jsx    # Login page
│   │   ├── Signup.jsx   # Signup page
│   │   ├── Dashboard.jsx # Dashboard with stats
│   │   └── Tickets.jsx  # Ticket management page
│   ├── utils/           # Utility functions
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   ├── index.css        # Base styles
│   └── main.jsx         # App entry point
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage

### Authentication
1. **Sign Up**: Create a new account from the landing page
2. **Login**: Access your account with credentials
3. Session is stored in `localStorage` as `ticketapp_session`

### Ticket Management
- **Create**: Add new tickets with title, description, and status
- **Read**: View all tickets in card layout
- **Update**: Edit existing ticket details
- **Delete**: Remove tickets with confirmation

### Validation Rules
- **Title**: Required field
- **Status**: Must be one of: `open`, `in_progress`, or `closed`
- Real-time validation with clear error messages

## 🔒 Security Features

- Protected routes for authenticated users
- Session-based authentication
- Automatic redirect to login for unauthorized access
- Logout functionality that clears session data

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1023px)
- 💻 Desktop (1024px and above)
- Maximum content width: 1440px

## 🚀 Build for Production

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

## 🧪 Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
- Global styles: `src/index.css`
- Component styles: `src/App.css`
- Modify color schemes and themes in CSS files

### Status Colors
Update status colors in your CSS:
```css
.status-open { color: #10b981; }      /* Green */
.status-in_progress { color: #f59e0b; } /* Amber */
.status-closed { color: #6b7280; }    /* Gray */
```

## 🐛 Known Issues

- None at the moment

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Daniel Agboola**
- GitHub: [@Danielagboola52](https://github.com/Danielagboola52)
- **Live Application**: https://zesty-pudding-d65acf.netlify.app/

## 🙏 Acknowledgments

- Built with React and Vite
- Inspired by modern ticket management systems
- Part of HNG Task 2 - React Implementation

## 📞 Support

For support, please open an issue in the GitHub repository or contact the author.

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!