Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};



var Stage = 
{
	oNodes:[]
	,oCanvas:null
	,frameRate:30
	,timter:null
	,width:Tetris.width*Tetris.nRectSize + 200
	,height:Tetris.height*Tetris.nRectSize + 100
	
	,init:function()
	{
		this.onEnterFrame();
	}
	
	,clear:function()
	{
		this.oCanvas.fillStyle = "#CCC";
		this.oCanvas.fillRect( 0, 0, this.width, this.height );
	}
	
	,onEnterFrame:function()
	{
		this.clear();

		for( var i=0;i<this.oNodes.length;i++ )
		{
			this.oNodes[i].onEnterFrame( this.oCanvas );
		}
		
		clearTimeout(this.timter);
		this.timter = setTimeout( function(){ Stage.onEnterFrame(); }, this.frameRate );
	}

	,append:function( oNode )
	{
		this.oNodes.push(oNode);
		if( oNode.init ) oNode.init();
	}

	,remove:function( oNode )
	{
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i] == oNode ) this.oNodes.remove( i );
		}
	}

}