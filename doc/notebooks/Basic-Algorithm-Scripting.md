---
title: "Basic Algorithm Scripting"
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


__Test (50 hours)__

* Get Set for our Algorithm Challenges

* Reverse a String

* Factorialize a Number

* Check for Palindromes

* Find the Longest Word in a String

* Title Case a Sentence

* Return Largest Numbers in Arrays

* Confirm the Ending

* Repeat a string repeat a string

* Truncate a string

* Chunky Monkey

* Slasher Flick

* Mutations Incomplete
* Falsy Bouncer Incomplete
* Seek and Destroy Incomplete
* Where do I belong Incomplete
* Caesars Cipher Incomplete

### Slasher Flick
    Return the remaining elements of an array after chopping off n elements from the head.
    The head means the beginning of the array, or the zeroth index.
    Here are some helpful links:


```javascript
function slasher(arr, howMany) {
  return arr.slice(howMany);
}

slasher([1, 2, 3], 2);
```




    [ 3 ]



### Mutations
Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.

For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.

The arguments ["hello", "hey"] should return false because the string "hello" does not contain a "y".

Lastly, ["Alien", "line"], should return true because all of the letters in "line" are present in "Alien".

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

String.prototype.indexOf()


```javascript
function mutation(arr) {
    var str1 = arr[0].toLowerCase();
    var str2 = arr[1].toLowerCase();
if(str1.length > 0 && str2.length){
    
  for(var i = 0; i < str2.length; i++){
      if(str1.indexOf(str2[i]) == -1 ) {
        return false;
     }
  }
          return true;
} else return false;
}

mutation(["voodoo", ""]);
```




    false



### Falsy Bouncer
Remove all falsy values from an array.
Falsy values in JavaScript are:
    1. false, 
    2. null, 
    3. 0, 
    4. "", 
    5. undefined 
    6. NaN

Here are some helpful links:

Boolean Objects
Array.prototype.filter()


```javascript
function bouncer(arr) {
     
    var newArr = arr.filter( function(val){
        
         if(typeof(val) === 'number' && isNaN(val)){
             return false;
         }        
        switch(val){
            case false:
            case null:
            case "":
            case 0:
            case undefined:
                return false;
           default:
               return true;
        } 
        
     });
    
     return newArr;
   }
bouncer(['a', false, null, 0, 99, 42 / "General Zod", undefined, "f"]);

```




    [ 'a', 99, 'f' ]



### Seek and Destroy
You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. 

Remove all elements from the initial array that are of the same value as these arguments.

Here are some helpful links:

Arguments object
Array.prototype.filter()


```javascript
function destroyer(arr) {
  // Remove all the values
    var args = arguments;
    
    var newArr = arr.filter( function(val){
        //return checkArgs(val,args);
        for(var i = 1; i <= args.length; i++){
             if(val == args[i]){
                 return false;
             }
        }
    return true;
    });
     return newArr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

```




    [ 1, 1 ]



### Where do I belong
Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.

For example, getIndexToIns([1,2,3,4], 1.5) should return 1 because it is greater than 1 (index 0), but less than 2 (index 1).

Likewise, getIndexToIns([20,3,5], 19) should return 2 because once the array has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2) and greater than 5 (index 1).

Here are some helpful links:
Array.prototype.sort()


```javascript
function getIndexToIns(arr, num) {
  // Find my place in this sorted array.
    arr.sort(function(a,b){
        return a-b;
    });
    
    for(var i = 0; i < arr.length; i++){
        if(arr[i] >= num){
            return i;
        }
    }
    return i;
}

getIndexToIns([40, 60,6,7,8,9], 70);
```




    undefined



### Caesars Cipher
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

Here are some helpful links:

String.prototype.charCodeAt()
String.fromCharCode()


```javascript
function rot13(str) { // LBH QVQ VG!
  
var shft = 0;
var newCodes = [] ;
var retStr;
    // "m".charCodeAt(0) = 109
    for(var i = 0; i < str.length; i++){
        var charcode = str.charCodeAt(i);
        if( charcode >= 65 && charcode <= 77){
            // A - M
            shft = 13;
        } else {
            if(charcode >= 78 && charcode <= 90)
            shft = -13; // N - Z
        }
     newCodes.push(String.fromCharCode(charcode + shft));
    shft = 0;
    }
  return newCodes.join("");
}

// Change the inputs below to test
rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.");
```




    'THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX.'




```javascript
"Z".charCodeAt(0)
```




    90


