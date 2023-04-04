const urls = Object.freeze({
    viewCurrentPlaylist: '#/playlists',

    viewPlaylist(id)
    {
        return `#/playlists/${encodeURIComponent(id)}`;
    },

    browseCurrentPath: '#/files',

    browsePath(path)
    {
        return `#/files/!${encodeURIComponent(path)}`;
    },

    viewCurrentSettings: '#/settings',

    viewSettings(view)
    {
        return `#/settings/${view}`;
    },

    nowPlaying: '#/now-playing',

    music: '#/music',

    chat: '#/chat',

    game: '#/game',

    loading: '#/loading'
});

export default urls;

export function getPathFromUrl(url)
{
    const index = url.indexOf('!');

    if (index < 0)
        return null;

    return decodeURIComponent(url.substring(index + 1));
}
