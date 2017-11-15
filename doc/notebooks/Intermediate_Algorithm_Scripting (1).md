---
title: "Intermediate Algorithm Scripting"
author: "MT"
date: "11/04/2017"
output: 
  html_document: 
    css: ~/GitDir/0000-FCC/doc/notebooks/R.css
    highlight: tango
    theme: cosmo
    toc: yes
    toc_depth: 5
---

### 1. Sum all numbers in a Range
#### Math.max(), Math.min(), Array.reduce()
    
__Get 2 numbers,  summ all between them, including the original end numbers__
* Math.max(), Math.min()
    1. Get the max or min of a group of numbers.
* Array.prototype.reduce()
    1. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
    2. arr.reduce(callback[, initialValue]) 
    3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce


```javascript
function sumAll(arr) {
   var allNos = [];
    var max = Math.max(arr[0],arr[1]);
    var min = Math.min(arr[0],arr[1]);
    
    while(min <= max){
        allNos.push(min);
        min++;
    }
    return allNos.reduce(function(a,b){
        return a+b;
    });
    
}
sumAll([5, 8]);

```




    26



### 2. Diff Two Arrays - Check for duplicate values.
#### Array.filter(), Array.indexOf()
    
__Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. 
In other words, return the symmetric difference of the two arrays.__

* Array.prototype.filter() - returns new array for "true"
* Array.prototype.splice() - splice(1,2) - removes at index 1, 2 items
* Array.prototype.indexOf() - first index
    * Array.prototype.join(), .concat()



```javascript
function diffArray(arr1, arr2) {

    var newArr = [];

    for(i=0; i<arr1.length; i++){
        var x = arr2.indexOf(arr1[i]);
        if( x != -1) {
            arr2.splice(x, 1);
        }else{
            newArr.push(arr1[i]);
        }
    }
    for(i=0; i<arr2.length; i++){
        var y = arr1.indexOf(arr2[i]);
        if( y == -1) {
            newArr.push(arr2[i]);
        }
    }
    return newArr;
}

diffArray(["diorite", "andesite", "grass", "dirt", "andesite","pink wool", 
           "dead shrub"], ["diorite", "andesite", "grass", "dirt", "andesite", 
                           "dead shrub", "diorite"]);
```




    [ 'pink wool' ]




```javascript
function diffArray2(arr1, arr2) {
    
    var newArr = arr1.filter(function(x){
        var y = arr2.indexOf(x);
        //console.log(y);
        if( y != -1){
            arr2.splice(y,1);
            return false;
        } else{
            return true;
        }
    });

    var newArr2 = arr2.filter(function(x){
        return arr1.indexOf(x) == -1;
    });

    return newArr.concat(newArr2);
}

diffArray2([1, "calf", 3, "piglet"], [1, "calf", 3, 4]);

```




    [ 'piglet', 4 ]



### 3. Roman Numeral Converter - Lookup



```javascript
///Think "MeDiCaL XaVIer". 
function convertToRoman(num) {
    var rem = 0;
    var thos = Math.floor(num/1000);
    rem = num%1000;
    var nHnds = Math.floor(rem/900);
    rem = rem%900;
    var fvHnds = Math.floor(rem/500);
    rem = rem%500;
    var frHnds = Math.floor(rem/400);
    rem = rem%400;
    var hnds = Math.floor(rem/100);
    rem = rem%100;
    var nty = Math.floor(rem/90);
    rem = rem%90;
    var ffty = Math.floor(rem/50);
    rem = rem%50;
    var fty = Math.floor(rem/40);
    rem = rem%40;
    var tens = Math.floor(rem/10);
    rem = rem%10;
    var nines = Math.floor(rem/9);
    rem = rem%9;
    var fives = Math.floor(rem/5);
    rem = rem%5;
    var fours = Math.floor(rem/4);
    var ones = rem%4;

    var qtys = [thos,nHnds,fvHnds,frHnds,hnds,nty,ffty,fty,tens,
                nines,fives,fours,ones];
    var romans = ["M","CM","D","CD","C","XC","L","XL","X",
                "IX","V","IV","I"];
    var res = [];
    
    for(var i = 0; i<qtys.length;i++){
        for(var q = 0; q < qtys[i]; q++){
            res.push(romans[i]);
        }
    }
    return res.join("");   
}
    
convertToRoman(3999) //MCDXI

```




    'MMMCMXCIX'



### 4. Wherefore art thou - Check for Duplicate Objects
#### Global Object, Object.hasOwnProperty(), Object.keys()
* Make a function that looks through an array of objects (first argument) and returns an array of all objects that __have matching property and value pairs__ in the (second argument). 
* Each property and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.
__Some Testing__


```javascript
function whatIsInAName(collection, source) {

    var newArr = [];
    var sKeys = Object.keys(source);

    for(i=0; i<collection.length; i++){
    //res("i= " + i + ", Object.keys(collection[i]: " + Object.keys(collection[i]) ,5);
    var matched = 0;
    sKeys.forEach(function(key,index){
        //res("key: " + key + ", collection[i].hasOwnProperty(key): " + collection[i].hasOwnProperty(key) + ", Object.keys(collection[i]" + Object.keys(collection[i]), 5)
        if(collection[i].hasOwnProperty(key) && collection[i][key] == source[key]){
            matched++;
        }
    })
    if(matched == sKeys.length ){
        newArr.push(collection[i]);
    }
    }
    return newArr;
}

whatIsInAName([{ "a": 1, "b": 2 }, { "b": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "c": 2 });
```




    [ { a: 1, b: 2, c: 2 } ]



#### Object name-value pair handling samples


```javascript
function res(x){
    console.log(x);
}

var x = { name:"tato", first:"michael"};
var y = {name:"tato"}
y.first = "ross"

if(x.first){
    res("x.first: " + y.first , 5);
}
if(y.first){
    res("y.first: " + y.first , 5);
}

res(">x.hasOwnProperty('first'): " + x.hasOwnProperty("first") + "," + x.first , 5)
res("y.hasOwnProperty('first'): " + y.hasOwnProperty("first") + "," + y.first , 5)


res("Object.keys(x).length: " + Object.keys(x).length , 5);
res("Object.keys(y).length: " + Object.keys(y).length , 5);

Object.keys(x).forEach(function(key,index){
    res("Object.keys(x).forEach(function(i,name): key = " + key + ", index = " + index, 5);
});
Object.keys(y).forEach(function(key,index){
    res("Object.keys(y).forEach(function(i,name): key = " + key + ", index = " + index, 5);
});
```

    x.first: ross
    y.first: ross
    >x.hasOwnProperty('first'): true,michael
    y.hasOwnProperty('first'): true,ross
    Object.keys(x).length: 2
    Object.keys(y).length: 2
    Object.keys(x).forEach(function(i,name): key = name, index = 0
    Object.keys(x).forEach(function(i,name): key = first, index = 1
    Object.keys(y).forEach(function(i,name): key = name, index = 0
    Object.keys(y).forEach(function(i,name): key = first, index = 1





    undefined



### 5. Search and Replace - RegEx...
#### Array.splice() - remove/replace,  String.replace(),  Array.join()
* Replace:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
* RegExp:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
* You can specify a function as the second parameter. In this case, the __function will be invoked after__ the match has been performed.
* Array.splice() can remove and replace.


```javascript
function myReplace(str, before, after) {
  
var reg = new RegExp(before, 'i');
return str.replace(reg, function(match){
    if (match[0] === match[0].toUpperCase()){
        var arrAfter = after.split("");
        arrAfter[0] = arrAfter[0].toUpperCase();
        return arrAfter.join('');
    }
     return after;
});
}
myReplace("Let us get back to more Coding", "Coding", "algorithms")
//myReplace("A quick brown fox Jumped over the lazy dog", "jumped", "leaped");

```




    'Let us get back to more Algorithms'



#### RegExp samples...


```javascript
// string.replace();
    // 1. match - The matched substring. (Corresponds to $& above.)
    // 2. p1, p2, ... - The nth parenthesized submatch string, provided the first argument to replace() was a RegExp object. (Corresponds to $1, $2, etc. above.) For example, if /(\a+)(\b+)/, was given, p1 is the match for \a+, and p2 for \b+.
    // 3. offset - The offset of the matched substring within the whole string being examined. 
        //(For example, if the whole string was 'abcd', and the matched substring was 'bc', 
        //then this argument will be 1.)
    // 4. string - The whole string being examined.
var x = "testMe";
var reg = new RegExp('ab+c', 'i');
reg;
new RegExp(x, 'i');

var str = "TestMe please!";
var re2 = new RegExp('^' + x, 'i');
str.search(re2);


function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      console.log({p1:p1, p2:p2, p3:p3, st:string});
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
//var newString = "AAATC".replace(/(T+)/, replacer);

console.log(newString);  // abc - 12345 - #$*%

var re = /apples/i;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');
//console.log(newstr);  // oranges are round, and oranges are juicy.
```

    { p1: 'abc', p2: '12345', p3: '#$*%', st: 'abc12345#$*%' }
    abc - 12345 - #$*%





    undefined



### 6. Pig Latin - RegExp instead of loop
#### RegExp(), String.substr(), String.search()


```javascript
function translatePigLatin(str) {
    var i = str.search(/[aeiou]/i);
    if(i > 0){
        return str.substr(i, str.length-i) + str.substr(0, i) + "ay";
    }else{
        return str + "way";
    }
}

translatePigLatin("glove");
```




    'oveglay'



### 7. DNA Pairing - 2 ways, RegEx... for looping
#### Array.forEach(), Array.push() ,  
* Split - combine and lookup


```javascript

function pairElement2(str) {
    var pairs = {A:"T", C:"G", T:"A",G:"C"};
    var bases = str.split("");
    var res = [];
    bases.forEach(function(b){
        res.push([b, pairs[b]]);
    });
return res;
}
pairElement2("ATCGA");
/// --------------------------------------------

function pairElement(str) {
    var res = [];
    str.replace(/(T)|(A)|([G])|([C])/g, repBase);

    function repBase(match, p1, p2, p3, p4) {
      //console.log({p1:p1, p2:p2, p3:p3, p4:p4});
        if (p1) { res.push([p1,"A"]); }
        if (p2) { res.push([p2,"T"]); }
        if (p3) { res.push([p3,"C"]); }
        if (p4) { res.push([p4,"G"]); }
    }
    return res;
}
// pairElement("ATCGA");    // should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].
//pairElement("TTGAG");    //  should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].
// pairElement("CTCTA");    //  should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]].
```




    [ [ 'A', 'T' ],
      [ 'T', 'A' ],
      [ 'C', 'G' ],
      [ 'G', 'C' ],
      [ 'A', 'T' ] ]



### 8. Missing Letters - charCodeAt()
#### str.charCodeAt(), String.fromCharCode();
Find the missing letter in the passed letter range and return it.
If all letters are present in the range, return undefined.


```javascript
function fearNotLetter(str) {
    for(var i = 0; i<str.length-1; i++){
        if(str.charCodeAt(i+1) != str.charCodeAt(i) + 1){
            return String.fromCharCode(str.charCodeAt(i)+1);
        }
    }
}

fearNotLetter("abcde");
// fearNotLetter("abce") should return "d".
// fearNotLetter("abcdefghjklmno") should return "i".
// fearNotLetter("bcd") should return undefined.
// fearNotLetter("yz") should return undefined.
```




    undefined



### 9. Boo who - Boolean Object - Boolean primitive
#### typeof x == 'boolean',  var x = Boolean(expression);
* Javascript primitives are not objects, they have no properties.
    * var x = false; or x = true; is a __primitive__
* You can  make a Boolean object, var x = Boolean(expression), but it's not a primitive.
* Boolean objects will evaluate to true unless they are __0, -0, null, false, NaN, undefined, or the empty string ("")__.
* var x = new Boolean(false) eveluates to __true__ because it is an object containing a value.


```javascript
function booWho(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  return (typeof bool == 'boolean')  ? true : false;
}

booWho([1, 2, 3]);
//var x = false;
//typeof x == 'boolean'
```




    false



### 10. Sorted Union - unique values 
#### arguments Object
* Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

* In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

* The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

    * Arguments object
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
    * Array.prototype.reduce()
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce



```javascript
function uniteUnique(arr) {
    var arr1 = Array.from(arguments[0]);
    for(var i=1; i<arguments.length; i++){
        for(var j=0; j<arguments[i].length; j++){
            if(arr1.indexOf(arguments[i][j]) == -1){
                arr1.push(arguments[i][j]);
            }
        }
    }
return arr;
}
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]);
```




    [ 1, 3, 2, [ 5 ], [ 4 ] ]



### 11. Convert HTML Entities - regex


```javascript
function convertHTML(str) {
    str = str.replace(/&/g,"&amp;");
    str = str.replace(/"/g,"&quot;").replace(/'/g,"&apos;");
    str = str.replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
    
    return str;
}
convertHTML('What & "What" & > & < & "What" & > & < ')
```




    'What &amp; &quot;What&quot; &amp; &gt; &amp; &lt; &amp; &quot;What&quot; &amp; &gt; &amp; &lt; '



### 12. Spinal Tap Case - regex
#### RegExp(), String.Replace()
* The p1,p2... parenthesized query is tricky. Easier with three separate lines.


```javascript
function spinalCase(str) {
str = str.replace(/_/g,"");
str = str.replace(/\B[A-Z]/g,function(match){ return " " + match;})
str = str.replace(/ /g,"-"); 

return str.toLowerCase();
}

function spinalCase2(str) {
 var newStr  = str.replace(/(_)|(\B[A-Z])|( )/g, function(match,  p1, p2, p3, index){
     console.log("index: " + index + ", p1: " + p1 + ", p2: " + p2 + ", p3: " + p3);
     // console.log(p2);
     if(p1){
         return "";
     }else{ 
         if(p2){
         return " " + p2;
         } else {
             if(p3){
             return "-";
             } else {
         return "";
         }
        }
     }
 });
    return newStr;
}
/*
spinalCase("This Is Spinal Tap")        replace " " with - then lower
spinalCase("thisIsSpinalTap")           replace Upper with " " then lower
spinalCase("The_Andy_Griffith_Show")    , then lower
spinalCase("Teletubbies say Eh-oh")     should return "teletubbies-say-eh-oh".
    replace _ with space
    replace uppers with space(only AllThe )
    replace " " with - then lower
    */
// spinalCase("This Is Spinal Tap");
 spinalCase("thisIsSpinalTap");
// spinalCase("The_Andy_Griffith_Show")
//spinalCase("Teletubbies say Eh-oh")
// spinalCase("AllThe-small Things_");      
```




    'this-is-spinal-tap'



### 13. Sum All Odd Fibonacci Numbers
#### while(), modulus %
__Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.__

1. The first two numbers in the Fibonacci sequence are 1 and 1. 
2. Every additional number in the sequence is the sum of the two previous numbers. 
3. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.



```javascript
function sumFibs(num) {
    var f = 0;
    var p = 0;
    var c = 1;
    var total = 0;
    while(c <= num){
        if(c%2 !=0){total += c;}
        f = p+c;
        p = c;
        c = f;
    }
  return total;
}

sumFibs(4000000);
```




    4613732



### 14. Sum All Primes
#### Prime Algorithm -  check if number can be divided..  - Use Math.sqrt() to shorten
__Sum all the prime numbers up to and including the provided number.__

A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.
 
 1. Get all numbers
 2. Go thru all numbers checking for a prime.
     3. Use the While j < Math.sqrt(), x%j ==0 test


```javascript
function sumPrimes(num) {

    var tot = 0;
    var arr = [];

   for(var i=2; i<= num; i++){
        arr.push(i);
    }
    
    arr = arr.filter(function(x){
        if(x ==2 || x==3){
            tot += x; 
            return true;
        } else{
        var j = 2;
        //test all j to  x
        while (j < Math.sqrt(x) + 1) {
            if (x%j == 0) {
                return false;
               }
            j++; 
        }
        tot += x; // x got thru
        }
    return true;
    })
        
    return tot ;
}
sumPrimes(977);
```




    73156



### 15.  Smallest Common - can do it 2 ways
* Way I did it: 
    * Increment largets until all the others go in evenly.
* Other way: 
    * Get the prime factors (base factors) for all numbers and use technique above. 
    * Prime factors are usually smaller, so that part will run quicker.


```javascript
function smallestCommons(arr) {
 
  var max = arr.sort()[1];
  var min = arr.sort()[0];
  var sCom = 0;
  var x = 1;

   while( x ){
        sCom += max;
        var rem = 0;
        for(var i = min; i< max; i++){
            rem += sCom%i;
        }
        if(rem == 0){
            return sCom;
        }
    }
    return sCom;
}
smallestCommons([1,13]);

```




    360360



### 16. Finders Keepers
#### Array.filter()
Create a function that looks through an array (first argument) and returns the first element in the array that passes a truth test (second argument).


```javascript
function findElement(arr, func) {
  var num = 0;
    num = arr.filter(func)[0];
  return num;
}

//findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });
findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; })
```




    undefined



### 17. Drop it - Passing a function parameter
#### Arguments object, Array..shift(), Array..slice()
* Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.

* The second argument, func, is a function you'll use to test the first elements of the array to decide if you should drop it or not.


```javascript
function dropElements(arr, func) {
  // Drop them elements.
    var res = arr.slice(0,arr.length);

    for(var i=0; i<arr.length; i++){
        if(func(arr[i])){
           return res;
        }else {
            res.shift();
        }
    }
  return res;
}
dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;})
//dropElements([1, 2, 3, 4], function(n) {return n >= 3;})
//dropElements([1, 2, 3], function(n) {return n < 3; });
//dropElements([1, 2, 3], function(n) {console.log("n: " + n); return n < 3; });
```




    [ 3, 9, 2 ]



### 18. Steamroller - Flatten a nested array
#### Array.isArray()

* Flatten a nested array. 
    * You must account for varying levels of nesting.
* isArray(); 
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray


```javascript
function steamrollArray(arr) {
    // I'm a steamroller, baby
    var res = [];
    checkArray(arr);

    function checkArray(a){
        for(var i=0; i<a.length; i++){
            if(Array.isArray(a[i])){
                checkArray(a[i]);
            }else{
                res.push(a[i]);
            }
        }
    }
    return res;
}
steamrollArray([1, {}, [3, [[4]]]]);    // should return [1, {}, 3, 4]
//steamrollArray([1, [2], [3, [[4]]]]);
```




    [ 1, {}, 3, 4 ]



### 19. Binary Agents - Translating strings, binary numbers
#### parseInt();  String..charCodeAt(), String.fromCharCode()
  
Return an English translated sentence of the passed binary string.
  
* link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
* link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
* link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode


```javascript
function binaryAgent(str) {
    var strArr = str.split(" ");
  var res = strArr.map(function(x){
              return String.fromCharCode(parseInt(x,2));
              });
     return res.join("")
}
binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
```




    'Aren\'t bonfires fun!?'



### 20. Everything Be True - Object traverse
1. Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

2. Remember, you can access object properties through either dot notation or [] notation.


```javascript
function truthCheck(collection, pre) {

    var tot = 0;
    for(var i=0; i<collection.length; i++){
    
        if(collection[i][pre]){
         tot += 1; 
        }
    }
   // return "collection.length: " + collection.length + ", tot: " + tot;
   return collection.length == tot;

}
// truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex")
// truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex")
// truthCheck([{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age")
// truthCheck([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true}, {"name": "FastFoward", "onBoat": null}], "onBoat")
// truthCheck([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true, "alias": "Repete"}, {"name": "FastFoward", "onBoat": true}], "onBoat")
truthCheck([{"single": "yes"}], "single")


```

    true





    'collection.length: 1, tot: 1'



### 21. Arguments Optional - checking aruments
#### arguments Object
__Create a function that sums two arguments together.__ 

1. If only one argument is provided, then return a function that expects one argument and returns the sum.
2. For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
3. Calling this returned function with a single argument will then return the sum:
    
    - var sumTwoAnd = addTogether(2);
    - sumTwoAnd(3) returns 5.

4. If either argument isn't a valid number, return undefined.


```javascript
function addTogether() {
    for(var i=0; i<arguments.length; i++){
        if(typeof arguments[i] != 'number'){
            return;
        }
    }
    switch(arguments.length){
      case 0:
            return;
      case 1:
            var x = arguments[0];
            return next;
      default:
          return arguments[0] + arguments[1];
  }
    // return Funct
    function next(y){
        if(typeof y != 'number'){
            return; 
        } else{
            return x + y;
        } 
    }
}
 addTogether(2, 3);   // should return 5.
 // addTogether(2)(3);   // should return 5.
// addTogether("http://bit.ly/IqT6zt");   // should return undefined.
// addTogether(2, "3");   // should return undefined.
// addTogether(2)([3]);   //should return undefined.
// addTogether(2)([3]);   // should return 5.
```




    5


