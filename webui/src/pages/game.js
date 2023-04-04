/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:40:36
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: page for displaying monitor while streaming
 */

import React from "react";
import ProgressBackground from "../components/backgrounds/progress_background.js";
import PropTypes from "prop-types";
import PlayerModel from "../player_model.js";
import PlayerBigModel from "../player_big_model.js";
import PlayerSmall from "../components/player_main/player_small.js";
import DanmakuMain from "../components/danmaku/danmaku_main.js";
import ModelBinding from "../model_binding.js";
import WebsocketModel from "../websocket_model.js";

class Game extends React.PureComponent {

    constructor(props) {
        super(props);
        this.playerModel = props.playerModel;
        this.playerBigModel = props.playerBigModel;
        this.state = this.getStateFromModel();
    }

    getStateFromModel() {
        const transitionState = this.props.websocketModel.state;

        return { transitionState };
    }

    render() {
        return (
            <div className="page">
                <ProgressBackground type="game" playerModel={this.playerModel}></ProgressBackground>
                <PlayerSmall playerBigModel={this.playerBigModel}></PlayerSmall>
                <div className={`game-danmaku ${this.state.transitionState}`}>
                    <DanmakuMain ></DanmakuMain>
                </div>
            </div>
        )
    }
}

Game.propTypes = {
    playerModel: PropTypes.instanceOf(PlayerModel).isRequired,
    playerBigModel: PropTypes.instanceOf(PlayerBigModel).isRequired,
    websocketModel: PropTypes.instanceOf(WebsocketModel).isRequired,
}

export default ModelBinding(Game, {
    websocketModel: 'change'
})