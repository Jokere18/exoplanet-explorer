const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('kepler_data.csv')
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log('Error reading file:', err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets loaded!`);
                resolve(habitablePlanets);
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

function filterPlanets(filters = {}) {
    let filtered = [...habitablePlanets];

    if (filters.disposition) {
        filtered = filtered.filter(planet => 
            planet['koi_disposition'] === filters.disposition.toUpperCase()
        );
    }

    if (filters.minSize) {
        filtered = filtered.filter(planet => 
            parseFloat(planet['koi_prad']) >= parseFloat(filters.minSize)
        );
    }

    if (filters.maxSize) {
        filtered = filtered.filter(planet => 
            parseFloat(planet['koi_prad']) <= parseFloat(filters.maxSize)
        );
    }

    if (filters.minTemperature) {
        filtered = filtered.filter(planet => 
            parseFloat(planet['koi_insol']) >= parseFloat(filters.minTemperature)
        );
    }

    if (filters.maxTemperature) {
        filtered = filtered.filter(planet => 
            parseFloat(planet['koi_insol']) <= parseFloat(filters.maxTemperature)
        );
    }

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(planet => 
            planet['kepler_name'] && planet['kepler_name'].toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

function sortPlanets(planets, sortBy = 'kepler_name', order = 'asc') {
    const sorted = [...planets].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'koi_prad' || sortBy === 'koi_insol') {
            aValue = parseFloat(aValue) || 0;
            bValue = parseFloat(bValue) || 0;
        }

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });

    return sorted;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
    filterPlanets,
    sortPlanets
};