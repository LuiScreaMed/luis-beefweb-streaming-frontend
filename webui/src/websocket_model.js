import EventEmitter from "wolfy87-eventemitter"

const transitionState = Object.freeze({
    in: 'in',
    out: 'out',
})

export default class WebsocketModel extends EventEmitter {
    constructor() {
        super();
        this.defineEvent('onObsTransition');

        this.path = 'ws://192.168.1.100:3004';
        this.socket = null;
        this.timer = null;
        this.state = transitionState.in;
    }

    start() {
        this.timer = setInterval(() => {
            this.state = this.state == transitionState.in ? this.state = transitionState.out : this.state = transitionState.in;
            this.emit('change');
        }, 5000)
        // if (typeof (Websocket) === 'undefined') {
        //     return;
        // }
        // this.socket = new Websocket(this.path);
        // this.socket.onopen = this.open;
        // this.socket.onerror = this.error;
        // this.socket.onmessage = this.message;
    }

    open() {
        console.log('ws连接成功');
    }

    error() {
        console.log("ws连接出错");
    }

    setTimer(callback) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.timer = null;
            callback();
        }, 1000)
    }

    message(msg) {
        console.log(msg.data);
        let arr = msg.data.split("=");
        let param = arr[1];
        if (param == "obsTransition") {
            this.state = transitionState.out
            this.emit('change');
            this.setTimer(() => { this.state = transitionState.in; this.emit('change') });
        }
    }
}