/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:38:41
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: frame element
 */

import React from "react";
import PropTypes from "prop-types";

export default function Frame(props) {
    const { title = '', width = 360, height = 320, shadow = false, children } = props;

    return (
        <div className="window-frame" style={{ width: width, height: height, filter: shadow ? "drop-shadow(14px 14px 29px rgba(0, 0, 0, 0.35))" : "none" }}>
            <div className="title">{title}</div>
            <div className="frame-inner">
                {children}
            </div>
        </div>
    )
}

Frame.propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    shadow: PropTypes.bool,
}