import socket from 'socket.io';

import { spotifyPrefixes } from '../constants/socketPrefixes';


interface SpotifySocketData {
    userId: string;
    roomId: string;
    timestamp: string;

    data?: object | Array<any> | string | number;
}


const io = new socket.Server()

io.on('connection', (sock) => {
    sock.on(spotifyPrefixes.spotifyPlaybackResume, resumePlayback);
    sock.on(spotifyPrefixes.spotifyPlaybackPause, pausePlayback);
    sock.on(spotifyPrefixes.spotifyPlaybackNext, skipToNext);
    sock.on(spotifyPrefixes.spotifyPlaybackPrev, skipToPrev);
    sock.on(spotifyPrefixes.spotifyPlaybackTime, jumpToTime);
    sock.on(spotifyPrefixes.spotifyQueueAdd, addToQueue);
    sock.on(spotifyPrefixes.spotifyQueueAdjust, adjustQueue);
    sock.on(spotifyPrefixes.spotifyQueueRemove, removeFromQueue);
});


const resumePlayback = (data: SpotifySocketData) => {
    
}

const pausePlayback = (data: SpotifySocketData) => {
    
}

const skipToNext = (data: SpotifySocketData) => {
    
}

const skipToPrev = (data: SpotifySocketData) => {
    
}

const jumpToTime = (data: SpotifySocketData) => {
    
}

const addToQueue = (data: SpotifySocketData) => {
    
}

const adjustQueue = (data: SpotifySocketData) => {
    
}

const removeFromQueue = (data: SpotifySocketData) => {
    
}
