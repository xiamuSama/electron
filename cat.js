//狗var name = 'wanko';
//水手服var name = 'hibiki';
//小黑猫var name = 'hijiki';
//小白猫var name = 'tororo';
const name ='hijiki'
L2Dwidget.init({
    "model": {
        jsonPath: `https://unpkg.com/live2d-widget-model-${name}/assets/${name}.model.json`,
        "scale": 1
    },
    "display": {
        "position": "right",
        "width": 150,
        "height": 300,
        "hOffset": 0,
        "vOffset": -17
    },
    "mobile": {
        "show": true,
        "scale": 0.5
    },
    "react": {
        "opacityDefault": 0.7,
        "opacityOnHover": 0.3
    }
});