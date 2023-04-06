# luis_beefweb_streaming_frontend
基于beefweb前端源码修改的直播用前端界面。

[beefweb](https://github.com/hyperblast/beefweb) 是一款用于实现 [foobar2000](https://foobar2000.org/) 和 [DeaDBeeF](https://deadbeef.sourceforge.io/) 播放器的远程交互的插件。

<!-- [![License](https://img.shields.io/github/license/hyperblast/beefweb.svg)](LICENSE) -->
---
### 使用方法
- 安装 [foobar2000](https://foobar2000.org/)
- 安装 [beefweb](https://github.com/hyperblast/beefweb) 插件
- 进入项目目录，运行以下命令行：
    ```
    cd webui
    npm install
    npm run build
    ```
- 进入webui/build/中获取打包文件，并放入 `%APPDATA%\foobar2000\user-components\foo_beefweb\beefweb.root\` 中
- 在开启 foobar2000 和启用 beefweb 插件的同时，进入 beefweb 的网页，默认为 `http://localhost:8880`
---
### 注意事项
1. 项目使用 [beefweb](https://github.com/hyperblast/beefweb) 和 [foobar2000](https://foobar2000.org/) 作为基本的音乐交互，**如果没有安装 foobar2000 和 beefweb 插件，将无法收到音乐信息。**
2. 项目中包含对 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 和 [blivechat](https://github.com/DoodleBears/blivechat) 的引用/请求。（使用 NeteaseCloudMusicApi 获取音乐封面 / 使用 blivechat 展示弹幕）如有需要请提前架设开启对应的服务器，并在本项目中的
    ```
    webui/src/configs/blivechat.js
    webui/src/configs/netease_cloud_music.js
    ```
    修改对应的链接。**如果不使用以上的项目，将无法完全复原和我相同的界面。**
3. 项目中使用与后端的Websocket连接进行转场通讯，后端项目尚未上传。
