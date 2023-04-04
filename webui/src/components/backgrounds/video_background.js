/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:36:56
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: video backround
 */
import PropTypes from 'prop-types';
import React from 'react';

export default function VideoBackground(props) {
    const { src } = props;

    return (
        <div className="video-background">
            <video src={src} autoPlay muted={true} loop={true} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}></video>
        </div>
    )
}

VideoBackground.propTypes = {
    src: PropTypes.any
}

