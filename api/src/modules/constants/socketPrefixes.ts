export const spotifyPrefixes = {
    spotifyQueueAdd:        "spotify:queue:add:", // Add to the queue
    spotifyQueueRemove:     "spotify:queue:remove:", // Remove from the queue
    spotifyQueueAdjust:     "spotify:queue:adjust:", // Change a queue item's position in the queue

    spotifyPlaybackResume:  "spotify:playback:resume:", // Resume playback
    spotifyPlaybackPause:   "spotify:playback:pause:", // Pause playback
    spotifyPlaybackToggle:  "spotify:playback:toggle:", // Toggle playback between pause&play
    spotifyPlaybackNext:    "spotify:playback:next:", // (>>) Next song
    spotifyPlaybackPrev:    "spotify:playback:prev:", // (<<) Prev song
    spotifyPlaybackTime:    "spotify:playback:time:", // Change playback head (current time) of song.
}

export const roomPrefixes = {
    userRoomCreate:         "user:room:create:", // When a user creates a room.  This might be better done as a GraphQL request.
    userRoomJoin:           "user:room:join:", // When a user joins a room.
    userRoomLeave:          "user:room:leave:", // When a user leaves a room
    userRoomChat:           "user:room:chat:", // When a user sends a chat message.
}


export const authenticateUser = "client:authenticate:"; // Should be sent initially on connection and used to verify the integrity of the client.