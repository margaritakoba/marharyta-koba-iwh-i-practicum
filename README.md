# Integrating With HubSpot I: Foundations Practicum

## Project Overview

This project is a Node.js and Express application integrated with the HubSpot CRM API. It displays custom object records for music albums, including album names, artists, genres, release years, and cover images.

Users can also add new music album records through a web form.

## Features

* Retrieve Music Albums records from HubSpot.
* Display album details and cover images on the homepage.
* Create new album records using a form.
* Use Pug templates to render the application pages.

## Technologies

* Node.js
* Express
* Axios
* Pug
* HubSpot CRM API

## HubSpot Developer Test Account

[View Music Albums in HubSpot](https://app-eu1.hubspot.com/contacts/149531498/objects/2-255159240/views/all/list)

## Run Locally

1. Install dependencies:

   `npm install`

2. Create a `.env` file with your HubSpot credentials:

   `HUBSPOT_ACCESS_TOKEN=your_private_app_token`

   `CUSTOM_OBJECT_TYPE_ID=2-255159240`

3. Start the application:

   `node index.js`

4. Open `http://localhost:3000` in your browser.

**Security:** Never commit your `.env` file or expose your private app access token.
