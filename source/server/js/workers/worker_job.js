"use strict";

var worker = this;

worker.onmessage = function (e) {
    if (e.data.___TYPE === 'action') {
        switch (e.data.___ACTION) {
            case 'doComputation':
                worker.postMessage({
                    ___HANDLER: 'computer',
                    ___DATA: e.data.___JOB
                });
                break;
        }
    }
};