// track stockmarket, and other data into a copyable string for external usage
var Stockmarket = function(clicked){
	var xTesting=Game.Objects.Bank.minigame.goods;
	var ScaleFactor=1e+57;
	var factor2=(Game.cookiesPsRawHighest/Game.cookiesPsRaw)*Game.cookiesPsRaw/ScaleFactor;


	var xTestingString=[];var xTestingStockMarket = {};
	// console.log('ticker,stock,$price,cookies')
	for(var i in xTesting){
		if(!xTesting.hasOwnProperty(i)){continue;}

		// +xTesting[i].stock+','+
	//	xTestingString +=(xTesting[i].symbol+','+(xTesting[i].stock*xTesting[i].val*Game.cookiesPsRaw/1e+57).toFixed(2))+"\n";
		xTestingString.push((xTesting[i].stock*xTesting[i].val*factor2).toFixed(2));
	}
	xTestingString = xTestingString.join(',');
	// add in current cookies
	var tmpWrinklerAverage = WrinklerAverage(ScaleFactor);

	xTestingString = [Game.cookies/ScaleFactor,tmpWrinklerAverage[0],tmpWrinklerAverage[1],Game.cookiesPs*0.4/ScaleFactor,Game.cookiesEarned/ScaleFactor,xTestingString].join('|');
	// ad in average wrinkler

	if(!document.getElementById('xTestingStockMarket')){
		xTestingStockMarket = document.createElement('div');
		xTestingStockMarket.id='xTestingStockMarket';
		// positioning to avoid being near scrollbars if zoomed in/out
		// background colour of blue is simply because it stands out
		xTestingStockMarket.style="position:absolute;bottom:15px;left:15px;border:1px solid red;z-index:1000000000000;padding:4px;background-color:blue";
		document.body.appendChild(xTestingStockMarket);
	}

	xTestingStockMarket = document.getElementById('xTestingStockMarket');
	//console.log(xTestingStockMarket);
	var onclickString = ' <a href="#" onclick="Stockmarket(true);return false;">Copy updated values</a>&nbsp;|&nbsp;<a href="#" onclick="StockmarketSellAll();return false;">sell all stock</a>';

	xTestingStockMarket.innerHTML = onclickString;
	//console.log(xTestingString)
	if(clicked == true){navigator.clipboard.writeText(xTestingString);}
};

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
	if(WrinklerCount==0){return [0,0];}
	return ([WrinklerTotal/WrinklerCount/ScaleFactor,WrinklerCount]);
};

var StockmarketSellAll = function(){
	var getEl = function(el){return document.getElementById(el);};
	var currentEl;
	for(var i=0;i<21;i++){
		currentEl = getEl('bankGood-'+i+'_-All');
		if(!currentEl){continue;}
		currentEl.click();
	}
};

// run the insert for the first time
Stockmarket();
