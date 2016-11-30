/// <reference path="./Segment.ts" />

class Signature {
	
	private segment_list: Segment[];
    private last_segment: Segment;

	constructor() {
		this.clear();
	}

	clear() {
		this.segment_list = new Array();
		this.last_segment = null;
	}

	dragging() {
	    return(( this.last_segment != null ) ? true : false );
    }

	draw( canvas_context: any) {
		var ix: number;
		var len: number;

		len = this.segment_list.length;
		for ( ix=0 ; ix < len ; ++ix ) {
			this.segment_list[ix].draw( canvas_context );
		}
	}

	on_down( mouse_down: MouseEvent ) {
		this.last_segment = new Segment( mouse_down );
		(this.segment_list).push( this.last_segment ); 
	}

	on_move( mouse_move: MouseEvent, canvas_context: any ) {
	    if ( this.last_segment != null ) {
			this.last_segment.add(mouse_move);
            this.last_segment.connect_last_point( canvas_context );
		}
	}

	on_up( mouse_up: MouseEvent ) {
		this.last_segment.add(mouse_up);
		this.last_segment = null;
	}


}