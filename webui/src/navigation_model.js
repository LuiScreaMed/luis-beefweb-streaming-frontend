import EventEmitter from 'wolfy87-eventemitter'

export const View = Object.freeze({
    music: 'music',
    notFound: 'notFound',
    chat: 'chat',
    game: 'game',
    loading: 'loading',
});

export default class NavigationModel extends EventEmitter {
    constructor() {
        super();

        this.view = View.music;

        this.defineEvent('viewChange');
    }

    setView(view) {
        if (view === this.view)
            return;

        this.view = view;
        this.emit('viewChange');
    }
}
