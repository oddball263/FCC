// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

function getPressedKey (event) {
    var ex = event.keyCode || event.which;

    if (ex >= 65 && ex <= 90) return String.fromCharCode(ex + 32);
    if (ex >= 48 && ex <= 57) return String.fromCharCode(ex);
    if (ex >= 96 && ex <= 105) return 'num' + String.fromCharCode(ex - 48);
    if (ex >= 112 && ex <= 132) return 'f' + (ex - 111);

    var translate = {
        32:"space",
        17:"ctrl",
        8:"bs",
        13:"enter",
        16:"shift",
        18:"alt",
        19:"pause",
        20:"caps",
        27:"esc",
        33:"pageup",
        34:"pagedown",
        35:"end",
        36:"home",
        37:"leftarrow",
        38:"uparrow",
        40:"downarrow",
        45:"insert",
        46:"del",
        91:"winleft",
        92:"winright",
        93:"select",
        106:"times",
        107:"add",
        109:"minus",
        110:"decimal",
        111:"divide",
        114:"numlock",
        145:"scrolllock",
        186:"semicolon",
        187:"equals",
        188:"comma",
        189:"dash",
        190:"period",
        191:"slash",
        192:"grave",
        219:"openbracket",
        220:"backslash",
        221:"closebracket",
        222:"singlequote"
    }

    if (translate[ex]) return translate[ex];

    return "key"+ex;
}


/*
$(document).keydown(function(e) {
  $("#key").text(getPressedKey(e));
  console.log(getPressedKey(e));
  if (getPressedKey(e)=="enter") {
    e.preventDefault();
  }
  if (getPressedKey(e)=="backspace") {
    e.preventDefault();
  }
});
*/
