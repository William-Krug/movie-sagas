![MIT LICENSE](https://img.shields.io/github/license/William-Krug/weekend-movie-sagas.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/William-Krug/weekend-movie-sagas.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/William-Krug/weekend-movie-sagas.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/William-Krug/weekend-movie-sagas.svg?style=social)

# Weekend Movie Sagas

## Description

_Duration: 1 Weekend Sprint_

This app was designed to generate a movie list similar to IMDB. Users are presented with a movie list view where they can drill into specifics about a movie by clicking on the movie poster of their choice. The details page will display a movies:

- movie poster
- title
- description
- genre(s)

Users have the option of adding a movie to the database through the **Add Movie** form. This form captures all of the pertinent information about a movie to be later displayed on the movie's details page.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [PostgreSQL](https://www.postgresql.org)
- [Postico](https://eggerapps.at/postico/)

## Installation

1. Create a database named `saga_movies_weekend`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. The home page of the app will display a list of all movies stored in the database. Each movie's title and poster will be rendered to the DOM
2. A user can click on a movie's poster to be taken to a new page with details about the selected movie
3. A user can add a new movie by clicking on **Add Movie** where they can input a new movie's title, description, url to the movie poster, and associated genres with the movie
4. xxx

## Built With

- HTML
- CSS
- JavaScript
- Node
- Express
- React
- Redux
- PostgreSQL
- Postico

## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) [2021] [William Krug]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support

If you have suggestions or issues, please email me at [william.p.krug@gmail.com](william.p.krug@gmail.com)
