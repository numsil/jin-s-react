function Sprite( resorce, spriteInfo )
{
	this.resource = null;
	this.spriteInfos = [];
	this.type = "Sprite";
	
	this.init = function( resorce, spriteInfo )
	{
		this.resource = resorce;
		this.spriteInfos = spriteInfo;
	}

	this.getSlice = function( spriteNum )
	{
		return new SpriteSplice( this, spriteNum );
	}
	
	this.drawSprite = function( oCanvas, spriteNum, x, y, xscale, yscale )
	{
		if( xscale==null ) xscale = 100;
		if( yscale==null ) yscale = 100;
		
		var nW = this.spriteInfos[spriteNum].dw;
		var nH = this.spriteInfos[spriteNum].dh;
		var addW = nW*(100-xscale)/2/100;
		var addH = nH*(100-yscale)/2/100;

		oCanvas.drawImage( this.resource.getResource(), this.spriteInfos[spriteNum].dx , this.spriteInfos[spriteNum].dy, this.spriteInfos[spriteNum].dw, this.spriteInfos[spriteNum].dh, x+addW, y+addH, this.spriteInfos[spriteNum].dw * xscale/100, this.spriteInfos[spriteNum].dh* yscale/100 );
	}
	
	this.init(resorce, spriteInfo );
	return this;
}

function SpriteInfo( x, y, w, h )
{
	this.dx = x;
	this.dy = y;
	this.dw = w;
	this.dh = h;
	
	return this;
}

//스프라이트 하나를 객채로 사용하기 위한 개념
function SpriteSplice( sprite, number )
{
	this.sprite = null;
	this.number = null;
	this.type = "SpriteSplice";
	
	this.init = function( sprite, number )
	{
		this.sprite = sprite;
		this.number = number;
	}
	
	this.draw = function( oCanvas, nX, nY, nXscale, nYscale )
	{
		this.sprite.drawSprite( oCanvas, this.number, nX, nY, nXscale, nYscale );
	}
	
	this.init( sprite, number );
	return this;
}



function Resource( src ) 
{
	this.wdith=0;
	this.height=0;
	this.src = null;
	this.resource = null;
	this.type = "Resource";
	
	this.init = function( src )
	{
		this.resource = new Image();
		this.src = src;
		this.resource.src = src;
	}
	
	this.draw = function( oCanvas, nX, nY )
	{
		oCanvas.drawImage( this.getResource(), nX, nY );
	}
	
	this.getResource = function()
	{
		return this.resource;
	}
	
	this.init(src);
	return this;
}

//리소스에 좌표와 크기 등의 개념을 대입한 객체
function DrawObject( res, params )
{
	this.res = res;
	this.x = 0;
	this.y = 0;
	this.xscale = 100;
	this.yscale = 100;
	this.rotate = 0;
	this.alpha = 0;
	
	if( params.x ) this.x = params.x;
	if( params.y ) this.y = params.y;
	if( params.xscale ) this.xscale = params.xscale;
	if( params.yscale ) this.yscale = params.yscale;
	if( params.rotate ) this.rotate = params.rotate;
	if( params.alpha ) this.alpha = params.alpha;
	
	return this;
}

//여러 리소스를 묶어서 관리하기 위해
function DrawObjects( childs ) 
{
	this.x = 0;
	this.y = 0;
	this.oNodes = null;
	
	this.init = function( childs )
	{
		this.oNodes = childs;
	}
	
	this.draw = function( oCanvas, nX, nY )
	{
		//각 객체를 draw
		for( var i=0;i<this.oNodes.length;i++ )
		{
			this.oNodes[i].draw( oCanvas, nX, nY );
		}
	}
	
	this.append = function( oNode )
	{
		this.oNodes.push(oNode);
		if( oNode.init ) oNode.init();
	}

	this.remove = function( oNode )
	{
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i] == oNode ) this.oNodes.slice( i, 1 );
		}
	}	
	
	this.init( childs );
	return this;
}
