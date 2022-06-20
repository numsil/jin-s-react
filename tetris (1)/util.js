var UTIL = 
{
	random:function( nLen )
	{
		return parseInt( Math.random()*nLen );
	}
	,debug:function( szMsg )
	{
		if(document.getElementById('debug'))
		document.getElementById('debug').innerHTML = szMsg + "<br>" + document.getElementById('debug').innerHTML;
	}
	,clearMsg:function()
	{
		if(document.getElementById('debug'))
		document.getElementById('debug').innerHTML = '';
	}

}