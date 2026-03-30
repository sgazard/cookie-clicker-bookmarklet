# What this does
1. tracks your total amount of cookies in wrinklers, stocks and the bank (see blue bar below)
2. Automatically clicks the grimoire to "Conjure baked goods"
3. Automatically buys stocks when the price is below $5 - though  it gets annoying when ascending as you often have little spare cash
4. sets the stock purchase to be 10 so you can get sugar lumps faster by buying the correct multiples.
5. allows you to sell all stock immediately above preset price points of 5,10,15,100,150 in case the stock market tanks
6. Allows you to copy the data out in a format explained below (or just use the spreadsheet)
7. Automatically clicks *all golden cookies*
8. Automatically clicks on the fortunes in the header (useful in ascensions) - it doesn't buy them

## screenshot of bar
<img width="633" height="48" alt="Screenshot 2026-03-18 at 09 30 48" src="https://github.com/user-attachments/assets/4a4ba56e-30bb-40e4-93a0-b73a9debe811" />


It will create a blue bar that can be clicked on to copy the data in Pipe delimited format, and also has a button to seel everything on the stock market when it all changes for the worse


# Format Explanation
note, all values in Octodecillions, because, well it made sense when building it, and it's for the endgame
```
Current Cookes |AverageWrinkler |Cookies per second |Total  in ascension |Stock market [comma delimited]
```
## Example values
```
73993.51001514336|2513.3716511757834|0.019082887856570932|333364.04613863654|0.00,2668.92,1069.95,1531.38,249.01,73.47,0.00,2067.38,0.00,0.00,3836.39,2772.37,0.00,4965.52,3325.96,0.00,0.00,0.00
```

# how to use

1. Copy the data from [bookmarklet-minified.js](https://github.com/sgazard/cookie-clicker-bookmarklet/blob/main/bookmarklet-minified.js)
2. make a bookmark of *any webpage* - ideally in the bookmarks bar for convenience
3. Edit the bookmark from step 2 and change the url to the data from step 1
4. Load up cookie clicker and then click your bookmark
5. click on the "copy updated values" link at the bottom-left, and you have the data to parse out into [the spreadsheet](https://github.com/sgazard/cookie-clicker-bookmarklet/blob/main/Cookie%20clicker%20-%20blank.xlsx) (or one of your Choice) of your choice
