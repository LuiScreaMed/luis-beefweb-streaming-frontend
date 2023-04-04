/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:36:31
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: music progress related background
 */
import React from 'react'
import PropTypes from 'prop-types'
import { clamp } from 'lodash'
import ModelBinding from '../../model_binding.js';
import PlayerModel from '../../player_model.js';
import nekos from '../../configs/nekos.js';

class ProgressBackground extends React.PureComponent {
    constructor(props) {
        super(props);

        //静态参数
        this.opacity = props.opacity || "1"; //背景的透明度
        this.nekoType = props.type; //背景猫猫的类型

        this.state = this.getStateFromModel();
    }

    getStateFromModel() {
        const { position, duration } = this.props.playerModel.activeItem;
        return { duration, position };
    }

    render() {
        let position = this.state.position;
        let duration = this.state.duration;

        let positionPercent = '0%';
        let neko = this.nekoType ? <div className='neko' style={{ backgroundImage: `url(${nekos[this.nekoType]})` }}></div> : null;

        if (position >= 0 && duration > 0) {
            positionPercent = '' + clamp(100 * position / duration, 0, 100) + '%';
        }

        return (
            <div className="background" style={{ opacity: this.opacity, backgroundPositionX: positionPercent }}>
                {neko}
            </div>
        )
    }
}

ProgressBackground.propTypes = {
    playerModel: PropTypes.instanceOf(PlayerModel).isRequired,
    opacity: PropTypes.string,
    type: PropTypes.string
}

export default ModelBinding(ProgressBackground, {
    playerModel: 'change'
})