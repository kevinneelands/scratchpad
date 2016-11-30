/// <reference path="./Segment.ts" />
var Signature = (function () {
    function Signature() {
        this.clear();
    }
    Signature.prototype.clear = function () {
        this.segment_list = new Array();
        this.last_segment = null;
    };
    Signature.prototype.dragging = function () {
        return ((this.last_segment != null) ? true : false);
    };
    Signature.prototype.draw = function (canvas_context) {
        var ix;
        var len;
        len = this.segment_list.length;
        for (ix = 0; ix < len; ++ix) {
            this.segment_list[ix].draw(canvas_context);
        }
    };
    Signature.prototype.on_down = function (mouse_down) {
        this.last_segment = new Segment(mouse_down);
        (this.segment_list).push(this.last_segment);
    };
    Signature.prototype.on_move = function (mouse_move, canvas_context) {
        if (this.last_segment != null) {
            this.last_segment.add(mouse_move);
            this.last_segment.connect_last_point(canvas_context);
        }
    };
    Signature.prototype.on_up = function (mouse_up) {
        this.last_segment.add(mouse_up);
        this.last_segment = null;
    };
    return Signature;
}());
