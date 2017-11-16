//alert('hello!!')
<!--
var line0 = '<h1>';
var line11 = '<li class="l11">';
var line1 = '<li class="l1">';
var line2 = '<li class="l2">';
var line2_1 = '<li class="l2_1">';
var line3 = '<li class="l3">'; //rules font
var line4 = '<li class="l4">';//code font

var link0 = line0 + '<a href="';
var link11 = line11 + '<a class="a11" href="';
var link1 = line1 + '<a class="a1" href="';
var link2 = line2 + '<a class="a2" href="';
var link2_1 = line2_1 + '<a class="a2_1" href="';
var link3 = line3 + '<a class="a3" href="';
var link4 = line4 + '<a class="a4" href="';

var lineMiddle = '';
var linkMiddle = '" target="main1">';

var lineEnd = '</li>';
var linkEnd = '</a></li>';


function showhide(id) {

    var e = document.getElementById(id);
    //alert(e.style.display);
    if(e.style.display == 'block'){
        e.style.display = 'none';
    }
    else {
        e.style.display = 'block';
    }
}

function writeLinks(){

    var currentLevel = -1;
    var codeS = '';
    var codeM = '';
    var codeE = '';
    var firstUl = true;

	for(i=0; i < links.length; i++){
        var hasLink = true;

        if(links[i][2] == '#') {
            hasLink = false;
            codeM = lineMiddle;
            codeE = lineEnd;
        }
        else {
            codeM = linkMiddle;
            codeE = linkEnd;
        }

        currentLevel = links[i][0];
        switch(currentLevel) {
            case 0:
                if(hasLink){
                     codeS = link0;
                }
                else {
                     codeS = line0;
                }
                break;
            case 1:
                if(hasLink){
                     codeS = link1;
                }
                else {
                     codeS = line1;
                }
                break;
            case 11:
                    if(hasLink){
                         codeS = link11;
                    }
                    else {
                         codeS = line11;
                    }
                    break;
            case 2:
                if(hasLink){
                     codeS = link2_1;
                }
                else {
                     codeS = line2;
                }
                break;
            case 3:
                if(hasLink){
                     codeS = link3;
                }
                else {
                     codeS = line3;
                }
                break;
            case 4:
                    if(hasLink){
                         codeS = link4;
                    }
                    else {
                         codeS = line4;
                    }
                    break;
            default:
                document.write('Error: Incorrect link level - ' + currentLevel);
        }

        if(currentLevel === 0) {
            if(firstUl === false){
                document.write('</ul>');
            }
            firstUl = false;
        }

        if(hasLink){
            document.write(codeS + links[i][2] + codeM + links[i][1] + codeE );
        }
        else {
            document.write(codeS + links[i][1] + codeE );
        }
        if(currentLevel === 0) document.write('<ul>');

	}
	document.write('</ul>')
}
-->
