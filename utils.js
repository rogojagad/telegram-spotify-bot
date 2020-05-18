exports.constructTrackInfoMessage = (data) => {
    const {
        album,
        albumUrl,
        artistsNames,
        title,
        playlistName,
        playlistUrl,
    } = data;
    console.log(data);
    console.log(
        album,
        artistsNames,
        albumUrl,
        title,
        playlistName,
        playlistUrl
    );

    let message = "Now Playing:\n";
    message += title + " - " + artistsNames + "\n\n";

    if (playlistUrl) {
        message += "Playlist: ";
        message += playlistName + "\n" + playlistUrl;
        return message;
    } else {
        message += "Album: ";
        message += album + "\n" + albumUrl;

        return message;
    }
};

exports.constructNoTrackPlayedMessage = () => {
    return "Currently, you are not playing any song";
};
