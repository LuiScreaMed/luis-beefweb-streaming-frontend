/*
 * Copyright (c) 2023 by LuiScreaMed
 * Copyright (c) 2015-2023 by Hyperblast
 * MIT Licensed
 * @Description: app entry
 */

import React from 'react'
import { PanelHeader } from './elements.js'
import ModelBinding from './model_binding.js';
import { View } from './navigation_model.js';
import ServiceContext from './service_context.js';
import Music from './pages/music.js'
import Chat from './pages/chat.js'
import Game from './pages/game.js'

class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = this.getStateFromModel();

        this.renderView = {
            [View.music]: this.renderMusic,
            [View.chat]: this.renderChat,
            [View.game]: this.renderGame,
            [View.loading]: this.renderLoading,
        };
    }

    getStateFromModel() {
        const { navigationModel, settingsModel } = this.context;
        const { view } = navigationModel;
        const { showPlaybackInfo } = settingsModel;

        return { view, showPlaybackInfo };
    }

    renderChat() {
        const {
            playerBigModel,
            playerModel,
            websocketModel
        } = this.context;

        return (
            <Chat playerModel={playerModel} playerBigModel={playerBigModel} websocketModel={websocketModel}></Chat>
        )
    }

    renderMusic() {
        const {
            playerBigModel,
            playerModel
        } = this.context;

        return (
            <Music playerBigModel={playerBigModel} playerModel={playerModel}></Music>
        )
    }

    renderGame() {
        const {
            playerBigModel,
            playerModel,
            websocketModel
        } = this.context;

        return (
            <Game playerModel={playerModel} playerBigModel={playerBigModel} websocketModel={websocketModel}></Game>
        )
    }

    renderLoading() {
        const {
            playerModel
        } = this.context;

        return <div className='center'>

        </div>
    }

    renderNotFoundView() {
        return {
            header: <PanelHeader title='Invalid url' />,
            main: <div className='panel main-panel'>Invalid url</div>
        };
    }

    render() {

        const view = this.renderView[this.state.view].call(this);

        return (
            <div className='app'>
                {view}
            </div>
        );
    }
}

App.contextType = ServiceContext;

export default ModelBinding(App, {
    navigationModel: 'viewChange',
    settingsModel: 'change',
});
