
/// <reference path="./Point.ts" />

class Segment {
	
	private point_list: Point[];

	constructor( pt: any  ) {
        var starting_point: Point = new Point( pt.x, pt.y );
		this.point_list = new Array();
		this.point_list[0] = starting_point;
	}

	add( pt: any  ) {
		var point: Point = new Point( pt.x, pt.y );

		this.point_list.push( point );
	}

	draw( canvas_context: any ) {
	    var ix: number;
	    var len: number;

        canvas_context.lineWidth = 2;
        canvas_context.strokeStyle = '#000000';
        canvas_context.lineCap = 'round';

		canvas_context.beginPath();
		canvas_context.moveTo( this.point_list[0].x, this.point_list[0].y );
		len = this.point_list.length;
		for ( ix = 1 ; ix < len ; ++ ix ) {
			canvas_context.lineTo( this.point_list[ix].x, this.point_list[ix].y )
		}
		canvas_context.stroke();
	}

	connect_last_point( canvas_context: any ) {
	    var last_pt: number;

        last_pt = this.point_list.length - 1

        if ( last_pt > 0 ) {
            canvas_context.lineWidth = 2;
            canvas_context.strokeStyle = '#000000';
            canvas_context.lineCap = 'round';

            canvas_context.beginPath();
            canvas_context.moveTo(this.point_list[last_pt - 1].x, this.point_list[last_pt - 1].y);
            canvas_context.lineTo(this.point_list[last_pt].x, this.point_list[last_pt].y);
            canvas_context.stroke();
        }

    }
}