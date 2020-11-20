const { app, BrowserWindow, Menu, Tray } = require("electron");
//const electron = require("electron");
const path = require("path");
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;

function createWindow() {
  //隐藏工具栏
  Menu.setApplicationMenu(null);

  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "icon.ico"),

    //全屏显示
    fullscreen: true,
    fullscreenable: true,
    simpleFullscreen: true,
    resizable: false,
    //最小化
    minimizable: false,
    //底部任务栏隐藏
    focusable: false,
    alwaysOnTop: true,
    //背景透明
    transparent: true,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      // 打开开发者工具
      devTools: true
    }
  });

  //忽略鼠标事件
  win.setIgnoreMouseEvents(true);
  // 加载index.html文件
  win.loadFile("main.html");

  // 打开开发者工具
  //win.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });

  // win.on("close", event => {
  //   win.hide();
  //   win.setSkipTaskbar(true);
  //   event.preventDefault(); //禁止关闭行为,因为我们并不是想要关闭窗口
  // });

  //创建系统通知区菜单
  tray = new Tray(path.join(__dirname, "icon.ico"));

  win.on("show", () => {
    tray.setHighlightMode("always");
  });
  win.on("hide", () => {
    tray.setHighlightMode("never");
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      click: () => {
        win.destroy();
      }
    }
    //我们需要在这里有一个真正的退出（这里直接强制退出）
  ]);
  tray.setToolTip("tooltip");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
    win.isVisible() ? win.hide() : win.show();
    win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
  });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
