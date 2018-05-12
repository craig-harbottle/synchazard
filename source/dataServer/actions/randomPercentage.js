module.exports.launch = (action, socketSrv, params) => {

    "use strict";

    action.setup({ num: 0 });

    action.onconnection((data, ws) => {
        
        if (data.___TYPE === 'action') {
            switch (data.___ACTION) {
                case 'init':
                    console.log(`init ${__filename}`)
                    ws.send(action.encodeMessage({
                        ___TYPE: 'graph',
                        ___PAYLOAD: action.data
                    }));
                    break;
            }
        }
    });

    // RUN
    setInterval(() => {
        action.data.num = Math.random() * 100;
        socketSrv.broadcast(action.encodeMessage({
            ___TYPE: 'graph',
            ___PAYLOAD: action.data
        }));
    }, 50);
    
};