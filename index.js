
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.HUBSPOT_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE_ID = process.env.CUSTOM_OBJECT_TYPE_ID;

const HUBSPOT_URL = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE_ID}`;

const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
};

const properties = 'name,artist,genre,release_year';

// Route 1: Display all Music Albums
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(HUBSPOT_URL, {
            headers,
            params: {
                limit: 100,
                properties
            }
        });

        res.render('homepage', {
            title: 'Music Albums | HubSpot',
            data: response.data.results
        });
    } catch (error) {
        console.error(
            'Error fetching albums:',
            error.response?.data || error.message
        );
        res.status(500).send('Unable to load music albums from HubSpot.');
    }
});

// Route 2: Display the form
app.get('/update-cobj', (req, res) => {
    res.render('updates', {
        title: 'Add a Music Album'
    });
});

// Route 3: Create a Music Album
app.post('/update-cobj', async (req, res) => {
    const newAlbum = {
        properties: {
            name: req.body.name,
            artist: req.body.artist,
            genre: req.body.genre,
            release_year: req.body.release_year
                ? Number(req.body.release_year)
                : undefined
        }
    };

    try {
        await axios.post(HUBSPOT_URL, newAlbum, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(
            'Error creating album:',
            error.response?.data || error.message
        );
        res.status(500).send('Unable to create the album in HubSpot.');
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});