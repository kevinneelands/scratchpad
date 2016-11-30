// see
// http://simonsarris.com/blog/510-making-html5-canvas-useful

function CanvasState(canvas) {

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;
    var myState = this;

    this.signature = new Signature();


    canvas.addEventListener('mousedown', function (e) {
        var mouse = myState.getMouse(e);
        myState.signature.on_down(mouse);
    });

    canvas.addEventListener('mousemove', function (e) {
        if ( myState.signature.dragging() ) {
            var mouse = myState.getMouse(e);
            myState.signature.on_move(mouse, myState.ctx);
        }
    });

    canvas.addEventListener('mouseup', function (e) {
        var mouse = myState.getMouse(e);
        myState.signature.on_up(mouse);
        myState.draw();
    });

    canvas.addEventListener('mouseleave', function (e) {
        var mouse = myState.getMouse(e);
        myState.signature.on_up(mouse);
        myState.draw();
    });




// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
    CanvasState.prototype.getMouse = function (e) {
        var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

        // Compute the total offset
        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        // Also add the <html> offsets in case there's a position:fixed bar
        offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
        offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;

        // We return a simple javascript object (a hash) with x and y defined
        return {x: mx, y: my};
        // return { new Point(mx,my); };
    };

    CanvasState.prototype.draw = function () {
        myState.signature.draw(myState.ctx);
    };

    CanvasState.prototype.clear = function () {
        myState.signature.clear();
        myState.ctx.clearRect(0,0,myState.width, myState.height);
    };
}