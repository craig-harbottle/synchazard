function Chess(sel) {
    this.target = document.querySelector(sel);
    this.target.innerHTML = '';
    this.cells = [];
    if (!this.target) throw 'NO target found';
    // down wite or black?
    this.down = 'black';
}

Chess.prototype.init = function () {
    this.initBoard();
    this.renderFEN(config.pieces.posdown[config.start]);
};

Chess.prototype.renderFEN = function (fen) {
    this.validateFEN(fen);
    var self = this,
        tokens = fen.split(/\//),
        cursor = 0;

    tokens.forEach(function (token, i) {
        var i = 0, l = token.length, color, ch, tmp;
        for (null; i < l; i++) {
            ch = token[i].toLowerCase();
            if (token[i].match(/^[1-9]{1}$/)) {
                cursor += parseInt(token[i]);
            } else if (token[i].match(/^[R|N|B|Q|K|P]{1}$/i)) {
                color = token[i].charCodeAt(0) >= 97 ? 'white' : 'black';
                tmp = config.pieces[config.mode][config.pieces.names[ch]];
                self.cells[cursor].appendChild(
                    CL.dom.create({
                        tag : 'span',
                        html: tmp,
                        cls: `piece ${color}`
                    })
                );
                cursor += 1;
            }
        }
    });


};

Chess.prototype.validateFEN = function (fen) {
    // TODO
    if (false) throw new Error('Fen invalid');
};

Chess.prototype.initBoard = function () {
    var i = 0,
        j = 0,
        l = 8,
        row,
        cell,



        board = CL.dom.create({ tag: 'div', cls: 'board'}),
        brdColumns = CL.dom.create({tag:'div', cls:'brdColumns '+ config.start}),
        brdRows = CL.dom.create({ tag: 'div', cls: 'brdRows ' + config.start}),
        self = this;

    this.target.className = 'boardContainer';

    for (i = 0; i < l; i++) {
        row = CL.dom.create({cls: 'row'});
        for (j = 0; j < l; j++) {
            cell = CL.dom.create({cls:'cell'});
            self.cells.push(cell)
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    this.target.appendChild(brdRows);
    this.target.appendChild(brdColumns);


    for (i=0; i < l; i++){
        brdRows.appendChild(CL.dom.create({
            cls: 'brdRow',
            html: config.columns[i]
        }));
        brdColumns.appendChild(CL.dom.create({
            cls: 'brdColumn',
            html: config.rows[i]
        }));
    }



    this.target.appendChild(board);
};



Chess.prototype.handle = function (d) {
    console.log('handle')
    console.log(d)
    if (d.___TYPE !== 'action') return;
    switch (d.___ACTION) {
        case 'init':
            this.init();
            break;
    }
};