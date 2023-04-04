/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:37:59
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: music player small
 */

import PropTypes from "prop-types";
import React from "react";
import ModelBinding from "../../model_binding.js";
import { formatTime } from '../../utils.js'
import { clamp } from 'lodash'
import PlayerBigModel from "../../player_big_model.js";
import albumDefault from "../../assets/images/album_default.jpg";

class PlayerSmall extends React.PureComponent {
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

    ///进度条
    progressBar(positionPercent) {
        return (
            <div className="progress-bar-small">
                <div className="progress-bar-small-inner" style={{ width: positionPercent }}></div>
            </div>
        )
    }

    ///播放器本体
    player(info) {
        const { title, artwork, timeInfo, state } = info;
        const [artist, name] = title.split("|==|");

        return (
            <div className="player-small">
                <div className="artwork-holder">
                    <div className={`artwork-image ${state}`} style={{ backgroundImage: `url(${artwork ? artwork : albumDefault})` }}></div>
                </div>
                <div className={`song-info ${state}`}>
                    <div className="song-info-inner">
                        <div className="song-title text">{name}</div>
                        <div className="song-artist text">{artist}</div>
                        <div className="time-info text">{timeInfo}</div>
                    </div>
                </div>
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

        let position = state == 'idle' ? current.position : next.position;
        let duration = state == 'idle' ? current.duration : next.duration;
        let positionPercent = '0%';
        let timeInfo = '-- / --';

        if (position >= 0 && duration > 0) {
            positionPercent = '' + clamp(100 * position / duration, 0, 100) + '%';
            timeInfo = formatTime(position) + ' / ' + formatTime(duration);
        }

        let info = {
            ...state != 'switching' ? current : next,
            state,
            timeInfo
        };
        let player = this.player(info);
        let progressBar = this.progressBar(positionPercent);

        return (
            <div className="player-small-main">
                {player}
                {progressBar}
            </div>
        )
    }
}

PlayerSmall.propTypes = {
    playerBigModel: PropTypes.instanceOf(PlayerBigModel).isRequired
}

export default ModelBinding(PlayerSmall, { playerBigModel: 'change' })