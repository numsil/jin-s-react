function Handle( szName, handle, param )
{
	this.szName = szName;
	this.handle = handle;
	this.param = param;
	
	return this;
}

/*
	handler 등록 예제
	
	eventHandler.setEventListener( "keydown", function( param, userParam ){alert("keyDown " + userParam.bob )}, {"bob":1} );
*/

function EventHandler()
{
	this.oNodes = null
	
	this.init = function()
	{
		this.oNodes = [];
	}
	this.append = function( oNode, param )
	{
		this.oNodes.push(oNode);
	}

	this.remove = function( oNode )
	{
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i] == oNode )
			{
				this.oNodes.slice( i, 1 );
			}
		}
	}
	
	this.setEventListener = function( szEventName, handle, param )
	{
		this.oNodes.push( new Handle(szEventName, handle, param) );
	}
	
	this.doHandle = function( szEventName, param )
	{
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i].szName == szEventName )
			{
				this.oNodes[i].handle( param, this.oNodes[i].param );
			}
		}
	}
	
	this.init();
	return this;
}