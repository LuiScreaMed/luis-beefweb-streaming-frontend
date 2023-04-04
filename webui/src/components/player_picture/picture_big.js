/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:38:09
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: player album big
 */

import React from 'react';
import PropTypes from "prop-types";
import albumDefault from "../../assets/images/album_default.jpg";

export default function PictureBig(props) {
    const src = props.src || albumDefault;

    return (
        <div className="picture-big">
            <div className="picture-big-holder" style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover' }}>
                {/* <img className="picture-big-img" src={src} /> */}
            </div>
        </div>
    )
}

PictureBig.propTypes = {
    src: PropTypes.string
}