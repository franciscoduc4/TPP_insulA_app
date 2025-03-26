# InsulinA - Diabetes Management App

*Read this in other languages: [Español](README.md)*

InsulinA is a comprehensive diabetes management application designed to help users track, monitor, and manage their diabetes effectively. The app provides an intuitive interface for logging glucose levels, insulin doses, and other important health metrics while offering insights and trends analysis.

## Features

### Current Features

- 📊 Dashboard with key health metrics
- 📝 Glucose level logging and tracking
- 💉 Insulin dose recording
- 📈 Trend analysis and visualization
- 📅 Historical data view
- ⚙️ Customizable settings
- 📱 Mobile-first design with support for notches and dynamic islands
- 🌓 Light/Dark mode support

### Planned Features

- 🔔 Reminders and notifications
- 📊 Advanced analytics and reporting
- 🤝 Healthcare provider integration
- 📱 Export functionality
- 🔄 Data synchronization across devices
- 👥 Family member/caregiver access
- 🍎 Food and carbohydrate tracking
- 💪 Exercise logging and impact analysis

## Technology Stack

- **Frontend Framework**: Next.js 14
- **UI Components**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Icons**: Lucide Icons
- **Fonts**: Inter (Google Fonts)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17 or higher)
- npm (v9.0 or higher)
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TPP_insulA_app.git
   cd TPP_insulA_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add any necessary environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

To create and run a production build:

```bash
npm run build
npm start
```

## Project Structure

```sh
TPP_insulA_app/
├── app/                    # Next.js app directory
│   ├── components/        # Shared components
│   ├── lib/              # Utility functions and hooks
│   ├── pages/            # Application pages
│   └── styles/           # Global styles
├── public/               # Static files
└── components/           # Reusable UI components
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Thanks to all contributors who have helped shape InsulinA
- Special thanks to the diabetes community for their valuable feedback
- Built with [shadcn/ui](https://ui.shadcn.com/) components
