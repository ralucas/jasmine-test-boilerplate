/**
Write some code that will accept an amount and convert it to the appropriate
string representation.
Example: Convert 2523.04
to "Two thousand five hundred twenty-three and 04/100 dollars"
**/

var amount = 63125432.11;

var ones = {
    0 : "zero",
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five",
    6 : "six",
    7 : "seven",
    8 : "eight",
    9 : "nine",
    10 : "ten",
    11 : "eleven",
    12 : "twelve",
    13 : "thirteen",
    14 : "fourteen",
    15 : "fifteen",
    16 : "sixteen",
    17 : "seventeen",
    18 : "eighteen",
    19 : "nineteen"
};

var tens = {
    20 : "twenty",
    30 : "thirty",
    40 : "forty",
    50 : "fifty",
    60 : "sixty",
    70 : "seventy",
    80 : "eighty",
    90 : "ninety"
};

var endings = {
    0 : " ",
    1 : " ",
    2 : " ",
    3 : " hundred ",
    4 : " thousand ",
    5 : " thousand ",
    6 : " hundred ",
    7 : " million ",
    8 : " million ",
    9 : " hundred ",
    10 : " billion "
}

var converter = (function(){

    var change = function(input){
        var numArr = input.toString().split('.');
        var cents = '';
        if(numArr[1] === undefined){
            cents = 'and 00/100 dollars'
        }
        else{
            cents = 'and '+numArr[1]+'/100 dollars';
        }
        return cents;
    };

    var tenConv = function(num){
        if(num < 20){
            return ones[num];
        }
        else if(num.substring(1,2) === '0'){
            return tens[num];
        }
        else{
            var numStr = tens[num.substring(0,1)+'0']+'-'+ones[num.substring(1,2)];
            return numStr;
        }
    };

    var cash = function(input){
        var numArr = input.toString().split('.');
        var dollars = numArr[0];

        var tenths = dollars.substring((dollars.length-2), dollars.length);
        var hundreds = dollars.substring((dollars.length-3), (dollars.length-2));
        var thousands = dollars.substring((dollars.length-4), (dollars.length-3));
        var tenThousands = dollars.substring((dollars.length-5), (dollars.length-3));
        var hunThousands = dollars.substring((dollars.length-6), (dollars.length-5));
        var millions = dollars.substring((dollars.length-7), (dollars.length-6));
        var tenMills = dollars.substring((dollars.length-8), (dollars.length-6));
        var billions = dollars.substring((dollars.length-9), (dollars.length-8));

        var cashArr = [];
        var newCashArr = [];
        var aArr = [];
        var cashString = "";

        if(dollars.length > 4){
            cashArr.push(ones[billions], tenConv(tenMills), ones[millions], ones[hunThousands], tenConv(tenThousands), 
                ones[hundreds], tenConv(tenths));
        }
        else{
            cashArr.push(ones[thousands], ones[hundreds], tenConv(tenths));
        }

        for(var i = 0; i < cashArr.length; i++){
            if(cashArr[i] !== undefined){
                newCashArr.push(cashArr[i]);
            }
        }
        if(dollars.length <= 4){
            for(var j = 0; j < newCashArr.length; j++){
                aArr.push(newCashArr[j]+endings[dollars.length-j]);
            }
        }
        else{
            for(var j = 0; j < newCashArr.length; j++){
                if((dollars.length-j <= 5 && dollars.length-j >= 3)){
                    aArr.push(newCashArr[j]+endings[dollars.length-(j+1)]);
                }
                else{
                    aArr.push(newCashArr[j]+endings[dollars.length-j]);
                }
            }
        }

        cashString = aArr.join('');
        return cashString;
    };

    var total = function(f, f2){
        return f + f2;
    };

    return {
        change : change,
        tenConv : tenConv,
        cash : cash,
        total : total
    };

})();

console.log(converter.total(converter.cash(amount), converter.change(amount)));