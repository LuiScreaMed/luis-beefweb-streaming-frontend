/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:38:54
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: small frame element
 */

import React from "react";
import PropTypes from "prop-types";

export default function SmallFrame(props) {
    const { width = 405, height = 87, children } = props;

    return (
        <div className="window-frame-small" style={{ width: this.width, height: this.height }}>
            <div className="frame-inner">
                {this.children}
            </div>
        </div>
    )
}

SmallFrame.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
}