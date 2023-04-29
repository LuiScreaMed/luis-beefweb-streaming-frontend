/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-18 22:48:01
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: websocket client model
 */

import EventEmitter from "wolfy87-eventemitter"

const transitionState = Object.freeze({
    in: 'in',
    out: 'out',
})

export default class WebsocketModel extends EventEmitter {
    constructor() {
        super();
        this.defineEvent('onObsTransition');

        this.path = 'ws://localhost:3001';
        this.ws = null;
        this.interval = null;
        this.state = transitionState.in;
    }

    start() {
        this.ws = new WebSocket(this.path);
        this.ws.onmessage = (event) => {
            try {
                let data = JSON.parse(event.data);
                // console.log(data);
                this.handleMessage(data);
            } catch (e) { console.error(e) }
        }
        this.ws.onopen = () => this.onOpen();
        this.ws.onclose = () => this.onClose();
    }

    onOpen() {
        // console.log("ws连接成功");
        this.interval = setInterval(() => {
            this.ws.send('{"type": "ping"}');
        }, 10000);
    }

    onClose() {
        // console.log("ws连接断开");
        clearInterval(this.interval);
        this.interval = null;
        this.ws = null;
        this.setTimer(() => this.start(), 5000);
    }

    handleMessage(data) {
        if (data.type === undefined) return;
        switch (data.type) {
            case "action": {
                this.handleAction(data);
                break;
            }
        }
    }

    handleAction(data) {
        if (data.data === undefined) return;
        switch (data.data) {
            case "transition": {
                this.state = transitionState.out
                this.emit('change');
                this.setTimer(() => { this.state = transitionState.in; this.emit('change') }, 3000);
                break;
            }
        }
    }

    setTimer(callback, time) {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            callback();
        }, time)
    }
}