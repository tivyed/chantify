const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const profile = require('../config/data_user')
app.use('/profile', profile)

const artist = require('../config/artist')
app.use('/artist', artist)

const album = require('../config/album')
app.use('/album', album)

const info_song = require('../config/info_song')
app.use('/song', info_song)

const playlist = require('../config/playlist')
app.use('/playlist', playlist)

const detail = require('../config/detail_playlist')
app.use('/detail', detail)


const login = require('../config/login')
app.use('/login', login)


const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});