/// <reference path="./Signature.ts" />

class CanvasState {
	
    private the_canvas: any;
    private signature: Signature;

	constructor( canvas: any) {

		this.the_canvas = canvas;
		this.signature = new Signature();
		this.the_canvas.addEventListener('mousedown', this.on_down );
		this.the_canvas.addEventListener('mousemove', function(e) {this.on_move(e);} );
		this.the_canvas.addEventListener('mouseup',   this.on_up );
	}

	on_down( mouse_down: MouseEvent ) {
		this.signature.on_down( mouse_down ); 
	}

	on_move( mouse_move: MouseEvent ) {
		this.signature.on_move( mouse_move );
	}

	on_up( mouse_up: MouseEvent ) {
		this.signature.on_up( mouse_up );
	}

	draw() {
		var ctx = this.the_canvas.getContext("2d");
		this.signature.draw(ctx);
	  }
	}
