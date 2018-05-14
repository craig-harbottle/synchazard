module.exports.launch = (action, socketSrv, params) => {
    
    "use strict";

    // setup messages storage
    //
    action.setup({matches: []});

    // just listen
    //
    action.onconnection((data, ws) => {

        let newMessage;

        if (data.___TYPE === 'action') {
            action.notify(__filename, data);
            switch (data.___ACTION) {
                case 'init':
                    ws.send(action.encodeMessage({
                        ___ACTION: 'init',
                        ___PAYLOAD: action.data.matches
                    }));
                    break;


            }
        }
    });
};