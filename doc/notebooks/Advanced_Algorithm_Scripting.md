---
title: "Adnvanced Algorithm Scripting"
author: "MT"
date: "10/23/2017"
output: 
  html_document: 
    css: ~/GitDir/0000-FCC/doc/notebooks/R.css
    highlight: tango
    theme: cosmo
    toc: yes
    toc_depth: 5
---

### 1. Validate US Telephone Numbers
#### String.match(); String.search();  RegExp();

__Return true if the passed string is a valid US phone number.__

1. The user may fill out the form field any way they choose as long as it is a valid US number. 
2. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

    - 555-555-5555
    - (555)555-5555
    - (555) 555-5555
    - 555 555 5555
    - 5555555555
    - 555 555 5555

3. For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. 
4. Your job is to validate or reject the US phone number based on any combination of the formats provided above. \
    * The area code is required. 
    * If the country code is provided, you must confirm that the country code is 1. 
    * Return true if the string is a valid US phone number; otherwise return false.


```javascript
function telephoneCheck(str) {

    str = str.trim();
    
    // min char count
    if (str.length < 10){
        return false; // "false - missing numbers: ";
    }
    // check for allowed values only. anything else found: false -----------------------
    var badChars = str.match(/[^\d+\-\(\) ]/ig)
    if(badChars){
        return false; // "false - incorrect characters found: " + badChars;
    }
    
    //get all digits
    var digits = str.match(/\d/g);
    if(digits.length < 10 || digits.length > 11){
        return false; // "false - incorrect number of digits";
    }else{
        if(digits.length == 11 && str[0] != 1){
            return false; // "false - country code must be 1";
        }
    }        
    // correct paenthesis - if any
    if(str.match(/[(]/ig)){
        if(!str.match(/[)]/ig)){
            return false; // "false - Missing closing parentesis";
        }else{
            if( str.indexOf(")") != (4 + str.indexOf("("))  ){
                return false; //"false - incorrect parentesis";
            }
        }
    }
    if(str.match(/[)]/ig)){
        if(!str.match(/[(]/ig)){
            return false; //  "false - Missing opening parentesis";
        }else{
            if(str.indexOf(")") != (4 + str.indexOf("(")) ){
                 return false; // "false - incorrect parentesis" ;
            }
        }
    }
    return true;
}
// telephoneCheck("(55766788805");
// telephoneCheck("1(555)555-5555");            // should return true.
// telephoneCheck("555-5555");            //  should return false.
// telephoneCheck("5555555");            //  should return false.
// telephoneCheck("1 555)555-5555");            //  should return false.
// telephoneCheck("1 555 555 5555");            //  should return true.
// telephoneCheck("1 456 789 4444");            //  should return true.
//  telephoneCheck("123**&!!asdf#");            //  should return false.
// telephoneCheck("55555555");            //  should return false.
// telephoneCheck("(6505552368)");            //  should return false
// telephoneCheck("2 (757) 622-7382");            //  should return false.
// telephoneCheck("0 (757) 622-7382");            //  should return false.
// telephoneCheck("-1 (757) 622-7382");            //  should return false
// telephoneCheck("2 757 622-7382");            //  should return false.
// telephoneCheck("10 (757) 622-7382");            //  should return false.
// telephoneCheck("27576227382");            //  should return false.
// telephoneCheck("(275)76227382");            //  should return false.
// telephoneCheck("2(757)6227382");            //  should return false.
 // telephoneCheck("2(757)622-7382");            //  should return false.
 // telephoneCheck("555)-555-5555");            //  should return false.
 // telephoneCheck("(555-555-5555");            //  should return false.
 // telephoneCheck("(555)5(55?)-5555");            //  should return false.
```




    'false - incorrect characters found: ?'



### 2. Record Collection
#### Json Manipulation
  
* You are given a JSON object representing a part of your musical album collection. 
* Each album has several properties and a unique id number as its key. 
* Not all albums have complete information.

    1. Write a function which takes an album's __id__ (like 2548), a property __prop__ (like "artist" or "tracks"), and a __value__ (like "Addicted to Love") to __modify the data__ in this collection.

    2. If prop __isn't "tracks"__ and value __isn't empty__ (""), update or set the value for that record album's property.

    3. Your function must always __return the entire collection object__.

        * There are several rules for handling __incomplete data__:

            1. If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

            2. If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

            3. If value is empty (""), delete the given prop property from the album.
    
4. http://www.json.org/


```javascript
// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
    if(!value){
        delete collection[id][prop];
        return collection;
    }
    if(prop == "tracks"){
        if(collection[id].hasOwnProperty(prop)){
            collection[id][prop].push(value);
        }else{
            var arr = [];
            arr.push(value);

            collection[id][prop]  = arr;
        }
    }else{
         collection[id][prop]  = value;
    }
  
  return collection;
}

// Alter values below to test your code
//  updateRecords(5439, "artist", "ABBA");                // artist should be "ABBA"
//  updateRecords(5439, "tracks", "Take a Chance on Me");       // tracks should have "Take a Chance on Me" 
                                                                // as the last element.
 // updateRecords(2548, "artist", "");                    // artist should not be set
//  updateRecords(1245, "tracks", "Addicted to Love");  // tracks should have "Addicted to Love" as the last element.
//  updateRecords(2468, "tracks", "Free");                 // tracks should have "1999" as the first element.
  updateRecords(2548, "tracks", "");          //tracks should not be set
```




    { '1245': { artist: 'Robert Palmer', tracks: [] },
      '2468': 
       { album: '1999',
         artist: 'Prince',
         tracks: [ '1999', 'Little Red Corvette' ] },
      '2548': { album: 'Slippery When Wet', artist: 'Bon Jovi' },
      '5439': { album: 'ABBA Gold' } }



### 3. Symmetric Difference
#### Array.reduce(); Functionality - Loop - Recude items in an array
__Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.__

1. Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). 
2. For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

* Array.prototype.reduce()
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
* Symmetric Difference
    * https://www.youtube.com/watch?v=PxffSUQRkG4


```javascript
function sym(args) {
    
    //collect all args
    var argsArr = [].slice.call(arguments);
    
    return  argsArr.reduce(function(arr1, arr2){
        
        var dupeArr = [];
        var newArr = arr1.filter(function(e){
            // find unique in arr1
            if( arr2.indexOf(e) == -1 && dupeArr.indexOf(e) == -1){
                dupeArr.push(e);
                return true;
            } 
        });
        // remove from arr2
        var newArr2 = arr2.filter(function(x){
            if( arr1.indexOf(x) == -1 && dupeArr.indexOf(x) == -1){
                dupeArr.push(x);
                return true;
            } 
        });
    return newArr.concat(newArr2);
});
}
// sym([1, 2, 3], [5, 2, 1, 4]);          //should return [3, 4, 5].
// sym([1, 2, 3], [5, 2, 1, 4]);          //should contain only three elements.
// sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);          //should return [1, 4, 5]
// sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);          //should contain only three elements.
// sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);          //should return [1, 4, 5].
// sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);          //should contain only three elements.
// sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);          //should return [2, 3, 4, 6, 7].
// sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);          //should contain only five elements.
// sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3],[5, 3, 9, 8], [1]);          //should return 
                                                                                    //   [1, 2, 4, 5, 6, 7, 8, 9].
// sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);          //should contain only eight 
                                                                                          //   elements.
```




    [ 7, 4, 6, 2, 5, 9, 8, 1 ]



### 4. Exact Change - Design a cash register drawer function
#### Global Object.  Manipulating Objects
* __checkCashRegister()__ that accepts purchase 
    * price as the first argument __(price)__, 
    * payment as the second argument __(cash)__, 
    * and cash-in-drawer __(cid)__ as the third argument.
        * cid is a 2D array listing available currency.
   
1. Return the string __"Insufficient Funds"__ if cash-in-drawer is less than the change due. 
2. Return the string __"Closed"__ if cash-in-drawer is equal to the change due.
3. Otherwise, __return change__ in coin and bills, sorted in highest to lowest order.

* __Global Object__
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object


```javascript
function checkCashRegister(price, cash, cid) {
    
    var chng = cash*100 - price*100;
    cid = cid.reverse();
    var cur = [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.10], ["QUARTER", 0.25], ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]].reverse();
    
    var cashDrawer = {
        cash:{},
        total:0.00
    };
    cid.forEach(function(name,i){
        cashDrawer.cash[name[0]] = {};
        cashDrawer.cash[name[0]].amt = name[1]*100;
        cashDrawer.total += name[1]*100;
        cashDrawer.cash[name[0]].cur = cur[i][1]*100;
    });
    
    if(cashDrawer.total == chng){
        return "Closed";
    }
    
    var curKeys = Object.keys(cashDrawer.cash);
    var ret = [];
    var changeReturned = 0;
    curKeys.forEach(function(x, i){
        var ch = getChange(cashDrawer.cash[x].cur, cashDrawer.cash[x].amt);
        if(ch > 0){
            ret.push([cid[i][0], ch]);
        }
    });
    if(changeReturned < chng){
      return "Insufficient Funds";
    }
                                      
    function getChange(cur, amtAvail){
        var qtyAvail = Math.floor(amtAvail/cur);
        var qtyNeeded =  Math.floor(chng/cur);
        if(qtyNeeded > qtyAvail){
            qtyNeeded = qtyAvail;
        } 
        chng -= qtyNeeded*cur;
        return qtyNeeded*cur/100;
    }
    return ret;
}
//checkCashRegister(17.46, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
                                 ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], 
                                 ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);   ///should return  //  "Insufficient Funds".
```




    'Insufficient Funds'



### 5. Inventory Update
#### Array.map(); Multiple Array Updating.
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). 
1. If an item cannot be found, add the new item and quantity into the inventory array. 
2. The returned inventory array should be in alphabetical order by item.


```javascript
function updateInventory(arr1, arr2) {

    var arrRet = [];
    arr1.forEach(function(itm1){
        arr2.forEach(function(itm2,i){
            if(itm1[1] == itm2[1]){
                itm1[0] += itm2[0];
                arr2.splice(i,1);
            }
        });
        arrRet.push(itm1);
    });
    
    arrRet = arrRet.concat(arr2);
    return arrRet.sort(function(a,b){
        return b[1] < a[1];
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

//updateInventory(curInv, newInv);
//updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]);   
    // length should return an array with a length of 6.
// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]);
    // should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].
// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []); 
    // should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]].
// updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]); //
    //should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]].
 updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]); 
    //should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]].
```




    [ [ 1, 'Bowling Ball' ],
      [ 0, 'Dirty Sock' ],
      [ 1, 'Hair Pin' ],
      [ 1, 'Half-Eaten Apple' ],
      [ 0, 'Microphone' ],
      [ 1, 'Toothpaste' ] ]



### 6. No repeats please
#### Permutations and Recursive Functions
__Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.__

1. For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.
    * Permutations 
        * https://www.mathsisfun.com/combinatorics/combinations-permutations.html
    * RegExp 
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp


```javascript
function permAlone(str) {
   // console.log("In perm ");

    var arrRet = [];
    //
    arrRet = getPerms(str);
    
    function getPerms(str){ 
        
        var resArr = [];

        //escape recursive ......
        if (str.length === 1) {
            resArr.push(str);
            //console.log("-----resArr.push(str): " + str);
            return resArr;
        }

        for (var i=0; i<str.length; i++) {
           // console.log("In for() 1 ");
            var firstChar = str[i];
            //console.log("firstChar: " + firstChar);
            // get remainder of string and ...
            var remainder = str.substr(0, i) + str.substr(i + 1);
            //console.log("remainder: " + remainder);
            // recurse until string length === 1
            var recursArr = getPerms(remainder);
               // console.log( recursArr);
            // put together and push,
            for (var j=0; j<recursArr.length; j++) {
              //  console.log("In for() 2 ");
                var finalStr = firstChar + recursArr[j];
                //remove if has multiple consecutive chars
                //if(finalStr.search(/(\w)\1+/) < 0){
                    resArr.push(finalStr);
                //}
             //console.log("zfoor loop...");
            }
        }
       // console.log("Returning " + resArr);
        return resArr;
    }
    return arrRet;
}
    
// with repeats.. sort of
function getPermRepeats(arr){
    for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length; j++){
            var arr2 = arr.slice(0,arr.length);
                arr2[j] = arr[i];
            permutations.push(arr2);
        }
    }
}
    
function factorial(x) { 
    console.log(x);
    return ( x === 0) ? 1 :x * factorial(x-1);
}
  permAlone("abcd");       //  should return 2.
 // permAlone("aaa");       //  should return 0.
 // permAlone("aabb");       //  should return 8.
//permAlone("abcdefa");       //  should return 3600.
 // permAlone("abfdefa");       //  should return 2640.
 //permAlone("zzzzzzzz");       //  should return 0.
 // permAlone("a");       //  should return 1.
 // permAlone("aaab");       //  should return 0.
 // permAlone("aaabb");       //  should return 12.
```




    [ 'abcd',
      'abdc',
      'acbd',
      'acdb',
      'adbc',
      'adcb',
      'bacd',
      'badc',
      'bcad',
      'bcda',
      'bdac',
      'bdca',
      'cabd',
      'cadb',
      'cbad',
      'cbda',
      'cdab',
      'cdba',
      'dabc',
      'dacb',
      'dbac',
      'dbca',
      'dcab',
      'dcba' ]



### 7. Make a Person
#### Working with objects and Inheritance.
Fill in the object constructor with the following methods below:

    -   getFirstName()
    -   getLastName()
    -   getFullName()
    -   setFirstName(first)
    -   setLastName(last)
    -   setFullName(firstAndLast)

1. Run the tests to see the expected output for each method.
2. The methods that take an argument must accept only one argument and it has to be a string.
3. These methods must be the only available means of interacting with the object.

* Closures
    *https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
* __Details of the Object Model __
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model



```javascript
var Person = function(firstAndLast) {

    var firstName = "";
    var lastName =  "";
    setNames(firstAndLast);
    function setNames(firstAndLast){
        if(firstAndLast){
            var def = firstAndLast.split(" ");
            firstName =  def[0];
            lastName =  def[1];
        }
    }
    this.getFirstName = function() {
      return firstName;
    };
    this.getLastName = function() {
      return lastName;
    };
    this.getFullName = function() {
      return firstName + " " + lastName;
    };
    this.setFirstName = function(first) {
      firstName = first;
    };
    this.setLastName = function(last) {
      lastName = last;
    };
    this.setFullName = function(firstAndLast) {
      setNames(firstAndLast);
    };
};

var bob = new Person('Bob Ross');
bob.getFullName();

 // Object.keys(bob).length;          // should return 6.
 //  bob instanceof Person;          //  should return true.
 //  bob.firstName;          //  should return undefined.
 //  bob.lastName;          //  should return undefined.
 //  bob.getFirstName();          //  should return "Bob".
//   bob.getLastName();          //  should return "Ross".
//   bob.getFullName();          //  should return "Bob Ross".

//  bob.setFirstName("Haskell");
//bob.getFullName();          //  should return "Haskell Ross" after .
//bob.setLastName("Curry")
//   bob.getFullName();          //  should return "Haskell Curry" after bob.setLastName("Curry").
//bob.setFullName("Haskell Curry");
//bob.getFullName();          //  should return "Haskell Curry" after bob.setFullName("Haskell Curry").
//bob.getFirstName();          //  should return "Haskell" after bob.setFullName("Haskell Curry").
//bob.getLastName();          //  should return "Curry" after bob.setFullName("Haskell Curry").
```




    'Curry'



### 8. Map the Debris - Orbital periods
#### Math.pow(); - Math operations on Object Arrays
1. Return a new array that __transforms__ the element's __average altitude__ into their __orbital periods__.
2. The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.
3. You can read about orbital periods on wikipedia.
    a. https://en.wikipedia.org/wiki/Orbital_period
4. The values should be __rounded to the nearest whole number__. 
    a. The body being orbited is Earth.
5. The radius of the earth is __6367.4447 kilometers__, and the GM value of earth is __398600.4418 km3s-2__.
6. Math.pow(); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow


```javascript
function orbitalPeriod(arr) {
    
    var spaceObjs = arr;
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    
    var arrOrbitalPeriods = spaceObjs.map(function (obj, i){
        var a = earthRadius + obj.avgAlt;
        var op = Math.round(2 * Math.PI * Math.sqrt(Math.pow(a,3)/GM));
        return {name: obj.name, orbitalPeriod: op};
    });
  return arrOrbitalPeriods;
}

// orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]) ;
                        // should return [{name: "sputnik", orbitalPeriod: 86400}].
orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);
                    // should return [{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, 
                                        // {name: "moon", orbitalPeriod: 2377399}].
```




    [ { name: 'iss', orbitalPeriod: 5557 },
      { name: 'hubble', orbitalPeriod: 5734 },
      { name: 'moon', orbitalPeriod: 2377399 } ]



### 9. Pairwise
#### Array.reduce() functionality - looping - reducing an array.
__Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.__

1. If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. 
2. Once an element has been used, it cannot be reused to pair with another.

    1. For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.
    
    
    -   Index	0	1	2	3	4  
    -   Value	7	9	11	13	15  
  
    -   7 + 13 = 20 → Indices 0 + 3 = 3  
    -   9 + 11 = 20 → Indices 1 + 2 = 3  
    -   3 + 3 = 6 → Return 6
  

```javascript
function pairwise(arr, arg) {
  
    var used = [];
    var found =[];
    var tot = 0;
      for(var i=0; i<arr.length; i++ ){
              console.log({i: i, used:used.indexOf(i)});
            for(var j=i+1; j<arr.length; j++ ){
              if( arr[i] + arr[j] == arg && used.indexOf(i) < 0 && used.indexOf(j) < 0 ){
                  console.log({i: i, j:j, arrI: arr[i], arrJ: arr[j]});
                  used.push(i);
                  used.push(j);
                  found.push({i: i, j:j, f1:arr[i], f2:arr[j], iSum:i+j});
                  tot += i+j;
            }
          }
      }
        console.log(used);
    console.log(found);
    return tot;
}
 pairwise([1, 4, 2, 3, 0, 5], 7);      // should return 11.
// pairwise([1, 3, 2, 4], 4);      //  should return 1.
// pairwise([1, 1, 1], 2);      //  should return 1.
// pairwise([0, 0, 0, 0, 1, 1], 1);      //  should return 10.
 //pairwise([], 100);      //  should return 0.
```

    []
    []





    0


