# 🌍 Exoplanet Explorer API

A full-stack Node.js application that analyzes NASA's Kepler telescope data to discover and explore potentially habitable exoplanets. Built with Express.js backend API and interactive frontend dashboard.

## 🚀 Live Demo
**[View Live Application](https://your-app-name.onrender.com)** *(Deploy link will be added after hosting)*

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Backend API
- **RESTful API** with Express.js
- **Data Processing** of 9,000+ exoplanet records from NASA Kepler mission
- **Advanced Filtering** by size, stellar flux, and habitability criteria
- **Sorting Capabilities** by multiple parameters
- **Real-time Statistics** generation
- **Error Handling** and input validation
- **CORS Support** for cross-origin requests

### Frontend Dashboard
- **Interactive UI** with modern space-themed design
- **Real-time Search** and filtering
- **Responsive Design** for mobile and desktop
- **Data Visualization** with planet statistics
- **Dynamic Content** loading via JavaScript
- **User-friendly Controls** for data exploration

### Data Analysis
- Identifies **habitable planets** based on scientific criteria:
  - Confirmed exoplanet status
  - Earth-like stellar flux (0.36 - 1.11 times Earth's)
  - Reasonable size (< 1.6 Earth radii)
- Processes **real NASA Kepler telescope data**
- Calculates **planetary statistics** and averages

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express.js
- CSV-Parse for data processing
- CORS middleware

**Frontend:**
- Vanilla JavaScript (ES6+)
- HTML5 & CSS3
- CSS Grid & Flexbox
- Responsive Design

**Data:**
- NASA Kepler Exoplanet Archive
- CSV data processing
- Real astronomical datasets

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/exoplanet-explorer.git
   cd exoplanet-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   # Development mode (auto-restart on changes)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🔗 API Endpoints

### Get All Planets
```http
GET /api/planets
```

**Query Parameters:**
- `search` - Search by planet name
- `minSize` - Minimum planet size (Earth radii)
- `maxSize` - Maximum planet size (Earth radii)
- `minTemperature` - Minimum stellar flux
- `maxTemperature` - Maximum stellar flux
- `sortBy` - Sort field (`kepler_name`, `koi_prad`, `koi_insol`)
- `order` - Sort order (`asc`, `desc`)

**Example Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "kepler_name": "Kepler-442 b",
      "koi_disposition": "CONFIRMED",
      "koi_prad": "1.34",
      "koi_insol": "0.70",
      "koi_period": "112.30"
    }
  ]
}
```

### Get Planet Statistics
```http
GET /api/planets/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 8,
    "avgSize": 1.26,
    "avgTemperature": 0.78,
    "earthLikePlanets": 3,
    "smallPlanets": 2
  }
}
```

## 💡 Usage Examples

### API Queries
```bash
# Find Earth-sized planets
curl "http://localhost:3000/api/planets?minSize=0.8&maxSize=1.2"

# Search for specific planets
curl "http://localhost:3000/api/planets?search=kepler"

# Get largest planets first
curl "http://localhost:3000/api/planets?sortBy=koi_prad&order=desc"
```

### Dashboard Features
- **Search:** Type planet names in the search box
- **Filter:** Adjust size sliders to find planets in specific ranges
- **Sort:** Choose sorting criteria from dropdown menus
- **Reset:** Clear all filters to view all planets

## 📁 Project Structure

```
exoplanet-explorer/
├── server.js              # Express server & API routes
├── planets.js             # Data processing & filtering logic
├── kepler_data.csv        # NASA Kepler telescope data
├── package.json           # Dependencies & scripts
├── public/
│   └── index.html         # Frontend dashboard
└── README.md              # Project documentation
```

## 🖼 Screenshots

### Dashboard Overview
*Interactive dashboard showing planet statistics and search controls*

### Planet Cards
*Individual planet information with scientific data*

### API Response
*JSON API response with filtered exoplanet data*

## 🚀 Deployment

### Deploy to Render (Recommended)
1. Fork this repository
2. Connect to [Render](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js

### Deploy to Heroku
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```

### Environment Variables
No environment variables required - the app runs out of the box!

## 🔮 Future Enhancements

### Technical Improvements
- [ ] Add TypeScript for better type safety
- [ ] Implement unit and integration tests
- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Create Docker containerization
- [ ] Add rate limiting and caching

### Feature Additions
- [ ] User authentication and favorites
- [ ] Advanced data visualizations (charts, graphs)
- [ ] Export functionality (PDF, CSV)
- [ ] Comparison tools between planets
- [ ] Real-time updates from NASA APIs
- [ ] Mobile app version

### UI/UX Enhancements
- [ ] Add planet images and visual representations
- [ ] Implement dark/light theme toggle
- [ ] Add animation and loading states
- [ ] Create planet detail pages
- [ ] Add keyboard shortcuts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 About

This project demonstrates full-stack development skills including:
- **Backend Development:** RESTful API design, data processing, server architecture
- **Frontend Development:** Modern JavaScript, responsive design, user experience
- **Data Science:** Scientific data analysis, statistical calculations
- **Software Engineering:** Code organization, documentation, version control

Built as a portfolio project to showcase Node.js expertise and full-stack development capabilities.

## 📧 Contact

**Joseph Okere**
- LinkedIn: (https://www.linkedin.com/in/joseph-okere/)
- GitHub: [@Jokere18](https://github.com/Jokere18)
- Email: your.josephokere18@gmail.com

---

⭐ **Star this repository if you found it helpful!**