// track stockmarket, and other data into a copyable string for external usage
var Stockmarket = function(clicked){
	var xTesting=Game.Objects.Bank.minigame.goods;
	// 1e+57 is Octodecillion
	var ScaleFactor=1e+57;
	// this corrects a multiplication issue I see to align with the UI
	var factor2=(Game.cookiesPsRawHighest/Game.cookiesPsRaw)*Game.cookiesPsRaw/ScaleFactor;
	// variables ready for use
	var xTestingString=[], xTestingStockMarket = {},StockTotal=0;
	// add in current cookies
	var tmpWrinklerAverage = WrinklerAverage(ScaleFactor);
	// original purchase amount
	var origPurchaseAmount = 0;

	
	// search for stock market information
	for(var i in xTesting){
		if(!xTesting.hasOwnProperty(i)){continue;}

		// SUM up the total for UI ticker
		tmpTotal = (xTesting[i].stock*xTesting[i].val*factor2); 
		StockTotal += tmpTotal;

		// to determine and profit
		origPurchaseAmount += tmpTotal/xTesting[i].val*xTesting[i].prev;

		// add the stock info for exporting
		xTestingString.push((xTesting[i].stock*xTesting[i].val*factor2).toFixed(2));
	}
	
	// make the Stock values ready for export
	xTestingString = xTestingString.join(',');
	// make the string ready for exporting
	xTestingString = [Game.cookies/ScaleFactor,tmpWrinklerAverage[0],tmpWrinklerAverage[1],Game.cookiesPs*0.4/ScaleFactor,Game.cookiesEarned/ScaleFactor,xTestingString].join('|');

	// build (if needed) the box for the stats
	if(!document.getElementById('xTestingStockMarket')){
		xTestingStockMarket = document.createElement('div');
		xTestingStockMarket.id='xTestingStockMarket';
		// positioning to avoid being near scrollbars if zoomed in/out
		// background colour of blue is simply because it stands out
		xTestingStockMarket.style="position:absolute;bottom:15px;left:15px;border:1px solid red;z-index:1000000000000;padding:4px;background-color:blue";
		document.body.appendChild(xTestingStockMarket);
	}

	// get a reference to the built object
	xTestingStockMarket = document.getElementById('xTestingStockMarket');

	// build the stats HTML
	stats = '<div style="margin-top:0.5em">Stocks: '+(StockTotal).toFixed(1)+' ('+((StockTotal)-(origPurchaseAmount)).toFixed(1)+'), Wrinklers:'+(tmpWrinklerAverage[0]*tmpWrinklerAverage[1]).toFixed(1)+', Cookies '+((Game.cookies)/ScaleFactor).toFixed(1)+' =&gt; Total: '+((Game.cookies)/ScaleFactor+tmpWrinklerAverage[0]*tmpWrinklerAverage[1]+StockTotal).toFixed(1)+'</div>';	
	
	var onclickString = '<div><a href="#" onclick="Stockmarket(true);return false;">Copy updated values</a>  | Sell <a href="#" onclick="StockmarketSellAbove(0);return false;">all stock</a>, <a href="#" onclick="StockmarketSellAbove(9.99);return false;"> ABOVE 10</a> | <a href="StockmarketSellAbove(10,true);return false;" style="color:red;">Red above 10</a>| <a href="#" onclick="StockmarketBuyBelow(10);return false;">BUY all below 10</a> <br/></div>'+stats;

	xTestingStockMarket.innerHTML = onclickString;

	// permit copying data to the clipboard if the browser has noticed the click
	if(clicked == true){navigator.clipboard.writeText(xTestingString);}
};

// get Wrinkler Average information and total numbers
var WrinklerAverage = function(ScaleFactor){
	var WrinklerCount = 0;
	var WrinklerTotal = 0;
	for (var i in Game.wrinklers){
		if(!Game.wrinklers.hasOwnProperty(i)){continue;}
		if(Game.wrinklers[i].sucked>0){
			WrinklerCount++;
			WrinklerTotal += Game.wrinklers[i].sucked;
		}
	}
	// don't return NaN
	if(WrinklerCount==0){return [0,0];}
	return ([WrinklerTotal/WrinklerCount/ScaleFactor,WrinklerCount]);
};

// condensed function to allow selling based on an arbitrary number
var StockmarketSellAbove = function(above,sellFallingStock){
	if(!sellFallingStock){sellFallingStock=false;}
	if(sellFallingStock==true){
		console.log('selling falling stock above $'+above);
	}
	var getEl = function(el){return document.getElementById(el);};
	var currentEl;
	for(var i=0;i<21;i++){
		valEl = getEl('bankGood-'+i+'-val').innerText.replace(/\$/,'');
		clickEl = getEl('bankGood-'+i+'_-All');
		// nothing to click on.  nothing to determine
		if(!clickEl){continue;}
		// click if the value is below 10
		if(sellFallingStock==false && valEl+0>above){clickEl.click();}
//			if(sellFallingStock==true){} && valEl+0>above){clickEl.click();}
	}
};

// buy below a value.  Useful for automatic buying below a value
var StockmarketBuyBelow = function(below){
	Stockmarket();
	var getEl = function(el){
		if(document && document.getElementById && document.getElementById(el)){return document.getElementById(el);}
		else{return false;}
	};
	var currentEl;
	for(var i=0;i<21;i++){
		clickEl = getEl('bankGood-'+i+'_Max');
		// nothing to click on.  nothing to determine
		if(!clickEl){continue;}
		valEl = getEl('bankGood-'+i+'-val').innerText.replace(/\$/,'');
		// click if the value is below 10
		if(Math.floor(valEl)+0<below){clickEl.click();}
	}
	// update totals
	Stockmarket();
};
// buy stock below $5 automatically and check every 30 seconds
var StockmarketAutobuy = setInterval(StockmarketBuyBelow,2000,5);

// run for the first time to allow UI and buttons
Stockmarket();
