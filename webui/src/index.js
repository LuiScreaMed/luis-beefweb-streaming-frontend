import React from 'react'
import ReactDom from 'react-dom'
import Navigo from 'navigo'
import { PlayerClient } from 'beefweb-client'
import ServiceContext from './service_context.js'
import App from './app.js'
import RequestHandler from './request_handler.js'
import SettingsStore from './settings_store.js'
import AppModel from './app_model.js'
import WindowController from './window_controller.js'
import urls from './urls.js'
import { View } from './navigation_model.js';

const client = new PlayerClient(new RequestHandler());
const settingsStore = new SettingsStore();
const appModel = new AppModel(client, settingsStore);

const {
    playerModel,
    navigationModel,
} = appModel;

const windowController = new WindowController(playerModel);
const router = new Navigo(null, true);

router.on({
    '/': () => {
        router.navigate(urls.music);
    },

    '/music': () => {
        navigationModel.setView(View.music);
    },

    '/chat': () => {
        navigationModel.setView(View.chat);
    },

    '/game': () => {
        navigationModel.setView(View.game);
    },

    '/loading': () => {
        navigationModel.setView(View.loading);
    }
});

router.notFound(() => {
    navigationModel.setView(View.notFound);
});

appModel.load();
appModel.start();
windowController.start();
router.resolve();

const appComponent = (
    <ServiceContext.Provider value={appModel}>
        <App />
    </ServiceContext.Provider>
);

ReactDom.render(appComponent, document.getElementById('app-container'));
