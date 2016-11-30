/// <reference path="./Point.ts" />
var Segment = (function () {
    function Segment(pt) {
        var starting_point = new Point(pt.x, pt.y);
        this.point_list = new Array();
        this.point_list[0] = starting_point;
    }
    Segment.prototype.add = function (pt) {
        var point = new Point(pt.x, pt.y);
        this.point_list.push(point);
    };
    Segment.prototype.draw = function (canvas_context) {
        var ix;
        var len;
        canvas_context.lineWidth = 2;
        canvas_context.strokeStyle = '#000000';
        canvas_context.lineCap = 'round';
        canvas_context.beginPath();
        canvas_context.moveTo(this.point_list[0].x, this.point_list[0].y);
        len = this.point_list.length;
        for (ix = 1; ix < len; ++ix) {
            canvas_context.lineTo(this.point_list[ix].x, this.point_list[ix].y);
        }
        canvas_context.stroke();
    };
    Segment.prototype.connect_last_point = function (canvas_context) {
        var last_pt;
        last_pt = this.point_list.length - 1;
        if (last_pt > 0) {
            canvas_context.lineWidth = 2;
            canvas_context.strokeStyle = '#000000';
            canvas_context.lineCap = 'round';
            canvas_context.beginPath();
            canvas_context.moveTo(this.point_list[last_pt - 1].x, this.point_list[last_pt - 1].y);
            canvas_context.lineTo(this.point_list[last_pt].x, this.point_list[last_pt].y);
            canvas_context.stroke();
        }
    };
    return Segment;
}());
