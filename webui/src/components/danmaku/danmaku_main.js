/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-04 23:37:24
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: danmaku display
 */
import React from "react";
import Frame from "../window_frame/frame.js";
import bliveLink from "../../configs/blivechat.js";
// import ModelBinding from "../../model_binding.js";

export default function DanmakuMain(props) {
    return (
        <div className="danmaku-main">
            <div className="top-neko"></div>
            <Frame className="danmaku-frame" title="COMMENTS" width={472} height={686}>
                <iframe src={bliveLink} frameBorder="0" width="100%" height="100%"></iframe>
            </Frame>
        </div>
    )
}