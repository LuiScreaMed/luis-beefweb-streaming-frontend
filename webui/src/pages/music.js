/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:40:49
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: page for displaying music info while streaming
 */

import PropTypes from "prop-types";
import PlayerModel from "../player_model.js";
import ProgressBackground from "../components/backgrounds/progress_background.js"
import React from "react";
import PlayerBig from "../components/player_main/player_big.js";
import PlayerBigModel from "../player_big_model.js";

export default function Music(props) {
    const { playerModel, playerBigModel } = props;

    return (
        <div className="page center-item">
            <ProgressBackground type="music" playerModel={playerModel} />
            <PlayerBig playerBigModel={playerBigModel} />
        </div>
    )
}

Music.propTypes = {
    playerModel: PropTypes.instanceOf(PlayerModel).isRequired,
    playerBigModel: PropTypes.instanceOf(PlayerBigModel).isRequired
}