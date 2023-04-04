/*
 * @Author: LuiScreaMed lui5@qq.com
 * @LastEditTime: 2023-04-05 02:04:32
 * Copyright (c) 2023 by LuiScreaMed
 * MIT Licensed
 * @Description: player list model 
 */

import EventEmitter from 'wolfy87-eventemitter';
import axios from 'axios';
import baseUrl from './configs/netease_cloud_music.js';

const playerInfo = Object.freeze({
    title: '-|==|无音乐',
    artwork: undefined,
    duration: -1,
    position: -1
});

//当前播放器的状态
const playerState = Object.freeze({
    idle: 'idle',   //无动作
    beforeFold: 'beforeFold', //播放器折叠前
    folding: 'folding', //播放器折叠中
    beforeSwitch: 'beforeSwitch', //切换前
    switching: 'switching', //切换中
})

/*
    换歌的顺序：
        idle状态播放器折叠，进入切换前状态，判断一段时间内下一首是否有变化，无变化则切换后回到idle
*/

export default class PlayerBigModel extends EventEmitter {
    constructor(playerModel) {
        super();

        ///默认idle状态
        this.state = playerState.idle;

        ///当前音乐
        this.currentSong = Object.assign({}, playerInfo);

        ///下一首音乐
        this.nextSong = Object.assign({}, playerInfo);

        this.playerModel = playerModel;

        ///是否可切换
        this.readyToSwitch = false;

        ///判断折叠后翻转的计时器
        this.switchTimer = null;

        this.defineEvent('change');
    }

    start() {
        this.playerModel.on('change', this.handleUpdate.bind(this))
    }

    ///重新初始化计时器
    reinitSwitchTimer() {
        this.readyToSwitch = false;
        this.clearSwitchTimer();
        this.switchTimer = setTimeout(() => {
            this.checkAndSwitch();
        }, 1500);
    }

    ///判断执行换歌
    checkAndSwitch() {
        if (this.readyToSwitch) {
            this.state = playerState.switching;
            this.switchToIdle();
            this.emit('change');
            this.readyToSwitch = false;
        } else {
            this.readyToSwitch = true;
        }
    }

    ///switching切换到idle
    switchToIdle() {
        this.clearSwitchTimer();
        this.switchTimer = setTimeout(() => {
            this.state = playerState.idle;
            this.currentSong = Object.assign({}, this.nextSong);
            this.nextSong = Object.assign({}, playerInfo);
            this.emit('change');
            this.clearSwitchTimer();
        }, 850);
    }


    ///清除计时器
    clearSwitchTimer() {
        if (this.switchTimer) {
            clearTimeout(this.switchTimer);
            this.switchTimer = null;
        }
    }

    ///每次播放信息变化（进度变化、切歌等）都执行
    handleUpdate() {
        let activeItem = this.playerModel.activeItem;

        if (activeItem.columns[0] == undefined) {
            return;
        }
        switch (this.state) {
            ///在正常状态下
            case playerState.idle: {
                ///当切歌时
                if (activeItem.columns[0] != this.currentSong.title) {
                    ///将状态切换至折叠中
                    this.state = playerState.folding;
                    ///设置计时器
                    this.reinitSwitchTimer();
                    ///将当前音乐的进度调整为100%
                    this.currentSong.position = this.currentSong.duration;
                    ///初始化下一首音乐
                    this.nextSong = Object.assign({}, {
                        title: activeItem.columns[0],
                        duration: activeItem.duration,
                        position: activeItem.position
                    });
                    this.getArtWork(activeItem.columns[0]);
                    ///发出修改事件
                    console.log("NOPE");
                    this.emit('change');
                } else {
                    ///不是切歌时，正常更新当前音乐信息
                    this.updateState('currentSong', { position: activeItem.position });
                    // console.log(this.currentSong.position);
                    ///发出修改事件
                }
                break;
            }
            ///折叠中时
            case playerState.folding: {
                if (activeItem.columns[0] != this.nextSong.title) {
                    this.reinitSwitchTimer();
                    this.nextSong = Object.assign({}, {
                        title: activeItem.columns[0],
                        duration: activeItem.duration,
                        position: activeItem.position
                    });
                    this.getArtWork(activeItem.columns[0]);
                }
            }
            ///切换音乐时
            case playerState.switching: {
                //什么都不干，在folding转switching的计时器里执行切换到idle
            }
        }
    }

    updateState(key, value) {
        this[key] = Object.assign({}, this[key], value);
        this.emit('change');
    }

    //获取专辑封面
    async getArtWork(title) {
        // title = title.replace('|==|', ' ');
        ///将歌名和作者分开成数组
        let songInfo = title.split('|==|');

        let searchStr = `${songInfo[0]} ${songInfo[1]}`;
        let musicId = 0;
        let searchRes = {};

        ///第一次搜索，搜索音乐列表，获取匹配的音乐id
        try {
            let res = await axios.get(`${baseUrl}/cloudsearch?keywords=${searchStr}`);
            searchRes = res;

            console.log(res);

            ///查询出来是否有结果，没有则返回空
            if (searchRes.data.result.songCount <= 0) {
                if (title == this.nextSong.title) {
                    this.nextSong.artwork = undefined;
                    this.checkAndSwitch();
                }
                return;
            }
        } catch (e) {
            console.error(e);
            if (title == this.nextSong.title) {
                this.nextSong.artwork = undefined;
                this.checkAndSwitch();
            }
            return;
        }
        console.log("step1pass");

        ///检查是否有与搜索的名称相同的音乐
        for (let i = 0; i < searchRes.data.result.songs.length; ++i) {
            let name = searchRes.data.result.songs[i].name;
            if (songInfo[1] === name) {
                musicId = searchRes.data.result.songs[i].id;
                break;
            }
        }
        if (musicId == 0) {
            if (title == this.nextSong.title) {
                this.nextSong.artwork = undefined;
                this.checkAndSwitch();
            }
            return;
        }
        console.log("step2pass");

        try {
            ///第二次搜索，根据刚才搜索到的结果查询详细信息，获取专辑封面链接
            let res = await axios.get(`${baseUrl}/song/detail?ids=${musicId}`);
            this.nextSong.artwork = res.data.songs[0].al.picUrl;

            console.log(res);
        } catch (e) {
            console.error(e);
            if (title == this.nextSong.title) {
                this.nextSong.artwork = undefined;
                this.checkAndSwitch();
            }
            return;
        }
        console.log("step3pass");

        this.loadImg(this.nextSong.artwork + '?param=480y480', title);
    }

    loadImg(url, title) {
        let img = new Image();
        img.onload = () => {
            let timer = setTimeout(() => {
                ///加载完先检查是否是当前的下一首音乐
                if (title == this.nextSong.title) {
                    this.checkAndSwitch();
                }
                ///清除内存
                img = null;
                clearTimeout(timer);
                timer = null;
            }, 100)
        }
        img.src = url;
    }
}