import React from 'react'
import ReactPlayer from 'react-player'

// ref: https://www.npmjs.com/package/react-player

function Player(props) {
    return (
        <ReactPlayer
            url="https://firebasestorage.googleapis.com/v0/b/omuseudossentimentos.appspot.com/o/m%C3%BAsica%2F79ce0734-d7ca-435e-a323-bdcaca7c3fa6.mp3?alt=media&token=6fe48dbc-8456-438c-aa01-fbc141041603"
            controls={true}
        />
    );
}

export default Player;