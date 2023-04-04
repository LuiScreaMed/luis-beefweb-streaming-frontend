/*
 * Copyright (c) 2023 by LuiScreaMed
 * Copyright (c) 2015-2023 by Hyperblast
 * MIT Licensed
 * @Description: app models
 */

import DataSource from './data_source.js'
import PlayerModel from './player_model.js'
import SettingsModel from './settings_model.js'
import NavigationModel from './navigation_model.js';
import PlayerBigModel from './player_big_model.js'
import WebsocketModel from './websocket_model.js'

export default class AppModel {
    constructor(client, settingsStore) {
        this.client = client;
        this.dataSource = new DataSource(client);
        this.settingsModel = new SettingsModel(settingsStore);
        this.playerModel = new PlayerModel(client, this.dataSource, this.settingsModel);
        this.navigationModel = new NavigationModel();
        this.playerBigModel = new PlayerBigModel(this.playerModel);
        this.websocketModel = new WebsocketModel();

        Object.freeze(this);
    }

    load() {
        this.settingsModel.load();
    }

    start() {
        this.playerModel.start();
        this.dataSource.start();
        this.playerBigModel.start();
        this.websocketModel.start();
    }
}
