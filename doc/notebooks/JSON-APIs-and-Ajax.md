---
title: "JSON, APIs, Ajax, jQuery"
author: "MT"
date: "10/23/2017"

output: 
  html_document: 
    css: R.css
    highlight: tango
    theme: cosmo
    toc: yes
    toc_depth: 5
---

__(2 hours)__

In this section, we'll learn how to get data from APIs. APIs - or Application Programming Interfaces - are tools that computers use to communicate with one another.

We'll also learn how to update HTML with the data we get from these APIs using a technology called Ajax.


### Trigger Click Events with jQuery
#### $(document).ready(function(){});



```javascript
 $(document).ready(function() {
    // Only change code below this line.
    $("#getMessage").on("click", function(){
        // add code ...
    });
  });
```


### Change Text with Click Events
#### .html("Here is the message")


```javascript
$(document).ready(function() {

    $("#getMessage").on("click", function(){
        $(".message").html("Here is the message");
    });
    
  });      
```

  
### AJAX call - jQuery
#### jQuery Promise callbacks
__Use datatype = JSONP to get around Origin conflicts__ 
**Callback success immediately form the ajax call.


```javascript
$.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: { action: 'query',
        format:'json',
        generator: 'prefixsearch',
        gpssearch:srchVal,
        gpslimit: qtyResults,
        prop: 'pageimages|pageterms',
        piprop:'thumbnail',
        pithumbsize: 800,
        pilimit: qtyResults,
        redirects:''
        //wbptterms: 'description' getting ALL pageterms above
        },
    dataType: 'jsonp',
    success: function (data) {
        console.log('Success');
        getResults(data, pnlsPerRow);
    }
    }).fail(function(data){
        console.log("Failed wb: " + JSON.stringify(data));
    });
};
```

  
### Get JSON - jQuery getJSON() Method
__Only works from the same domain,protocall, port.
Otherwise, need to deal with "Different Origin" problem __


```javascript
  $(document).ready(function() {

    $("#getMessage").on("click", function(){
      
        $.getJSON("/json/cats.json", function(json) {
            $(".message").html(JSON.stringify(json));
        });
    });
  });
```

  
### Convert JSON Data to HTML
  
#### Object.keys();
__Returns an Array of the Objects keys __
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys


```javascript
var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ],' +
'"bosses" :"me", "peons" : "you" }';

//JSON.parse() 
//Use the JavaScript built-in function to convert the string into a JavaScript object:
var JsonObj = JSON.parse(text);
var keys = Object.keys(JsonObj);
keys;
```




    '{ "employees" : [{ "firstName":"John" , "lastName":"Doe" },{ "firstName":"Anna" , "lastName":"Smith" },{ "firstName":"Peter" , "lastName":"Jones" } ],"bosses" :"me", "peons" : "you" }'



#### keys.forEach(function(key) { key,  val[ key ] });
__Use Array.prototype.forEach to get keys__
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach
Can put the function in the forEach or call it.


```javascript
function logArrayElements(element, index, array) {
    console.log('External Function call [' + index + '] = ' + element);
}
keys.forEach( logArrayElements);

keys.forEach(function (element, index, array) {
    console.log('Inside forEach[' + index + '] = ' + element);
});
```

    Inside forEach[0] = employees
    Inside forEach[1] = bosses
    Inside forEach[2] = peons
    External Function call [0] = employees
    External Function call [1] = bosses
    External Function call [2] = peons


#### Use dot(.) or bracket["val"] notation.
__Object.keyName or Object.[["keyName"]]__
__Array[index]__


```javascript
// Get the values - REMEBER 
var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ],' +
'"bosses" :"me", "peons" : "you" }';

//JSON.parse() 
//Use the JavaScript built-in function to convert the string into a JavaScript object:
var JsonObj = JSON.parse(text);
var keys = Object.keys(JsonObj);

keys.forEach( function (key, index, array) {
    console.log("key: " + key + ", index: [" + index +"]");
    console.log("  JsonObj[key] = " + JsonObj[key]);
    if( Array.isArray(JsonObj[key])){
        JsonObj[key].forEach( function (k, i, arr) {
               //console.log("arr[i] = " + arr[i]);
                    Object.keys(arr[i]).forEach( function (ky, indx, ar) {
                       console.log("    ky = " + ky + ", val = " + arr[i][ky]);
                       console.log("      arr = " + ar + ", val = " + ar[indx]);
                      });
    });
    }
});

```

    key: employees, index: [0]
      JsonObj[key] = [object Object],[object Object],[object Object]
        ky = firstName, val = John
          arr = firstName,lastName, val = firstName
        ky = lastName, val = Doe
          arr = firstName,lastName, val = lastName
        ky = firstName, val = Anna
          arr = firstName,lastName, val = firstName
        ky = lastName, val = Smith
          arr = firstName,lastName, val = lastName
        ky = firstName, val = Peter
          arr = firstName,lastName, val = firstName
        ky = lastName, val = Jones
          arr = firstName,lastName, val = lastName
    key: bosses, index: [1]
      JsonObj[key] = me
    key: peons, index: [2]
      JsonObj[key] = you


  
### Render Images from Data Sources
#### Just html img code...


```javascript
$("#getMessage").on("click", function() {
     $.getJSON("/json/cats.json", function(json) {

        var html = "";

        json.forEach(function(val) {

          html += "<div class = 'cat'>";
          html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";
          html += "</div>";

        });
       $(".message").html(html);
      });
    });
```


    ReferenceError: $ is not defined

        at evalmachine.<anonymous>:1:1

        at ContextifyScript.Script.runInThisContext (vm.js:25:33)

        at Object.exports.runInThisContext (vm.js:77:17)

        at run ([eval]:775:15)

        at onRunRequest ([eval]:620:18)

        at onMessage ([eval]:588:13)

        at emitTwo (events.js:106:13)

        at process.emit (events.js:191:7)

        at process.nextTick (internal/child_process.js:744:12)

        at _combinedTickCallback (internal/process/next_tick.js:67:7)


### Pre-Filter JSON
#### Just use .filter(function(val){});


```javascript
$(document).ready(function() {

    $("#getMessage").on("click", function() {
        $.getJSON("/json/cats.json", function(json) {

        var html = "";
        json = json.filter(function(val) {
          return (val.id !== 1);
        });
        json.forEach(function(val) {
            html = "do something...";
        });
        $(".message").html(html);
          
        });
    });
  });
```

### Get Geolocation Data
#### navigator.geolocation.getCurrentPosition()...


```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  });
}
```
