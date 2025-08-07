const express = require('express');
const cors = require('cors');
const path = require('path');
const { loadPlanetsData, getAllPlanets, filterPlanets, sortPlanets } = require('./planets');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/planets', (req, res) => {
    try {
        const { disposition, minSize, maxSize, minTemperature, maxTemperature, search, sortBy, order } = req.query;
        
        let planets = filterPlanets({
            disposition,
            minSize,
            maxSize,
            minTemperature,
            maxTemperature,
            search
        });

        if (sortBy) {
            planets = sortPlanets(planets, sortBy, order);
        }

        res.json({
            success: true,
            count: planets.length,
            data: planets
        });
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.get('/api/planets/stats', (req, res) => {
    try {
        const planets = getAllPlanets();
        const stats = {
            total: planets.length,
            avgSize: planets.reduce((sum, p) => sum + parseFloat(p['koi_prad'] || 0), 0) / planets.length,
            avgTemperature: planets.reduce((sum, p) => sum + parseFloat(p['koi_insol'] || 0), 0) / planets.length,
            smallPlanets: planets.filter(p => parseFloat(p['koi_prad']) < 1.0).length,
            earthLikePlanets: planets.filter(p => {
                const size = parseFloat(p['koi_prad']);
                const temp = parseFloat(p['koi_insol']);
                return size >= 0.8 && size <= 1.2 && temp >= 0.8 && temp <= 1.2;
            }).length
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error calculating stats:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

async function startServer() {
    try {
        console.log('Loading planet data...');
        await loadPlanetsData();
        
        app.listen(PORT, () => {
            console.log(`🌍 Exoplanet API server running on http://localhost:${PORT}`);
            console.log(`📊 Dashboard available at http://localhost:${PORT}`);
            console.log(`🛸 API endpoints:`);
            console.log(`   GET /api/planets - Get all planets with filtering & sorting`);
            console.log(`   GET /api/planets/stats - Get planet statistics`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();