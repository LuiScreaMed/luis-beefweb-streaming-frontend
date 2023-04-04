/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:37:52
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: music player big
 */

import PropTypes from "prop-types";
import React from "react";
import PlayerBigModel from "../../player_big_model.js";
import { formatTime } from '../../utils.js'
import { clamp } from 'lodash'
import PictureBig from '../player_picture/picture_big.js';
import ModelBinding from "../../model_binding.js";

class PlayerBig extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = this.getStateFromModel();

    }

    getStateFromModel() {
        const {
            state,
            currentSong,
            nextSong
        } = this.props.playerBigModel;

        return { state, currentSong, nextSong };
    }

    ///播放器
    player(info) {
        const { front, title, artwork, timeInfo = '-- / --', positionPercent = '0%', state = 'idle' } = info;

        const [artist, name] = title.split("|==|");

        return (
            <div className={`player-big ${state} ${front ? 'front' : 'rear'}`}>
                <div className="player-big-inner">
                    <div className="background-title background-text">{name}</div>
                    <div className="background-artist background-text">{artist}</div>
                    <div className="song-info">
                        <div className="song-label">当前播放：</div>
                        <div className="song-title">{name}</div>
                        <div className="song-artist">{artist}</div>
                    </div>
                    <div className="time-info">
                        {timeInfo}
                    </div>
                    <div className="progress-bar">
                        <div className="left-placeholder"></div>
                        <div className="right-real-progress">
                            <div className="progress-inner" style={{ width: positionPercent }}></div>
                        </div>
                    </div>
                </div>
                <PictureBig className="picture-big" src={artwork}></PictureBig>
            </div>
        )
    }

    render() {
        ///当前音乐
        let current = this.state.currentSong;
        ///下一音乐
        let next = this.state.nextSong;
        ///当前状态
        let state = this.state.state;

        let position = current.position;
        let duration = current.duration;
        let positionPercent = '0%';
        let timeInfo = '-- / --';

        if (position >= 0 && duration > 0) {
            positionPercent = '' + clamp(100 * position / duration, 0, 100) + '%';
            timeInfo = formatTime(position) + ' / ' + formatTime(duration);
        }

        // console.log(state);

        let currentPlayer = this.player({ title: current.title, artwork: current.artwork, timeInfo, positionPercent, state, front: true });
        let nextPlayer = state != 'idle' ? this.player({
            title: next.title, artwork: next.artwork, state, front: false
        }) : null;

        return (
            <div className={`player-big-main ${state}`}>
                {nextPlayer}
                {currentPlayer}
            </div>
        )
    }
}

PlayerBig.propTypes = {
    // playerModel: PropTypes.instanceOf(PlayerModel).isRequired,
    playerBigModel: PropTypes.instanceOf(PlayerBigModel).isRequired,
}

export default ModelBinding(PlayerBig, { playerBigModel: 'change' })