// Dummy data
const prizeList = [
    ["1", "Prize 1", "100/6", genColor(6)],
    ["2", "Prize 2", "100/6", genColor(6)],
    ["3", "Prize 3", "100/6", genColor(6)],
    ["4", "Prize 4", "100/6", genColor(6)],
    ["5", "Prize 5", "100/6", genColor(6)],
    ["6", "Prize 6", "100/6", genColor(6)]
]

// Color generator
// Input length of output with 'len'.
function genColor(len){
    return "#" + genHexString(len);
}
// Random Hexadecimal generator.
function genHexString(len) {
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += (Math.floor(Math.random() * 16)).toString(16);
    }
    return output;
}

// Setters for prizes
function setName(index, value){
    prizeList[index][1] = value;
}
function setChance(index, value){
    prizeList[index][2] = value;
}
function setColor(index, value){
    prizeList[index][3] = value;
}

// Get HTML format
function getHTMLFormat(){
    var stringConcat = "<div class=\"prizeRow\" data-value=\"\">"
    stringConcat += "<input class=\"prizeName\" type=\"text\" placeholder=\"Prize\" value=\"\"/>";
    stringConcat += "<input class=\"prizeChance\" type=\"text\" placeholder=\"Chance\" value=\"\"/>";
    stringConcat += "<input class=\"prizeColor\" type=\"text\" placeholder=\"Color\" value=\"\"/>";
    stringConcat += "<button class=\"prizeRemove\" type=\"button\" value=\"\" onclick=\"removePrizeInput(this.value)\">X</button>";
    stringConcat += "</div>";

    return stringConcat;
}

// Populate HTML
function populateHTML(numItems){
    for(i=0; i<numItems; i++){
        populateHTMLOnce(i);
    }
}
// Populate HTML once
function populateHTMLOnce(i){
    document.getElementsByClassName('prizeRow')[i].setAttribute("data-value", [prizeList[i][0], prizeList[i][1], prizeList[i][2], prizeList[i][3]]);
    document.getElementsByClassName('prizeRow')[i].id = "PrizeRow" + prizeList[i][0];

    document.getElementsByClassName('prizeName')[i].value = prizeList[i][1];
    document.getElementsByClassName('prizeChance')[i].value = prizeList[i][2];
    document.getElementsByClassName('prizeColor')[i].value = prizeList[i][3];
    document.getElementsByClassName('prizeRemove')[i].value = prizeList[i][0];
}

// Add 'data-value' to prizeRow
function addDataValue(i, value){
    document.getElementsByClassName('prizeRow')[i].setAttribute("data-value", value);
    document.getElementsByClassName('prizeRow')[i].id = "PrizeRow" + value[0];
    document.getElementsByClassName('prizeRemove')[i].value = prizeList[i][0];
}

// Repopulate array from HTML
function repopulatePrizeList(){
    var x = prizeList.length;
    var index = parseInt(prizeList[x-1][0])+1;
    // Remove Prize Array
    for (i=0;i<x;i++)
        prizeList.pop();

    var elements = document.getElementsByClassName("prizeRow");
    // Repopulate array from HTML
    for (i=0;i<elements.length;i++){
        // Only allow unregistered prizes to save as data value
        if (elements[i].children[0].value != "" && 
        elements[i].children[1].value != "" && 
        elements[i].children[2].value != "" && 
        elements[i].children[3].value == "")
            addDataValue(i, [index, elements[i].children[0].value, elements[i].children[1].value, elements[i].children[2].value]);
        
        // To void empty HTML rows 
        if (elements[i].getAttribute("data-value") !== ""){
            // To validate data value and text values are the same
            // INSERT CODE HERE
            // INSERT CODE HERE
            // INSERT CODE HERE
            // INSERT CODE HERE

            // To populate prizeList
            prizeList.push(elements[i].getAttribute("data-value").split(','));
        }
    }
}

// On bodyLoad
function loadAdminSettings(){
    var numItems = prizeList.length;

    // 1. Create HTML
    for(i=0; i<numItems; i++)
        document.getElementById("PrizeList").innerHTML += getHTMLFormat();
    // 2. Populate HTML
    populateHTML(numItems);
}

// Add Prize Input
function addPrizeInput(){
    // 1. Create HTML
    document.getElementById("PrizeList").innerHTML += getHTMLFormat();
    // 2. Populate HTML
    populateHTML(prizeList.length);
}

// Updates Prize Input
function updatePrizeInput(){
    // Repopulate array from HTML
    repopulatePrizeList();

    // If have empty HTML row, delete all empty HTML rows
    do {
        var index = document.getElementsByClassName("prizeRow").length;
        var element = document.getElementsByClassName("prizeRow")[index-1];
        if(!Boolean(element.id))
            element.remove();
    } while(!Boolean(element.id))
}


// Remove Prize
function removePrizeInput(value){
    var element = document.getElementById('PrizeRow' + value);
    try {
        // Remove Prize Input
        element.remove();;
      } catch (element_is_null) {
        // Note - error messages will vary depending on browser
        // If HTML row is empty, remove last empty row
        index = document.getElementsByClassName("prizeRow").length;
        element = document.getElementsByClassName("prizeRow")[index-1];
        element.remove();
      }
      
    // Repopulate array from HTML
    repopulatePrizeList();
}



// Edit duration and spins to adjust wheel spin animation speed.
// Adjust the number of spins for the wheel.
let wheelDuration = 5;
let wheelSpins; // Randomly generated value below

// Wheel Object Starts Here.
let theWheel = new Winwheel({
    'numSegments'  : 6,     
    'outerRadius'  : 212,   
    'textFontSize' : 28,    
    'segments'     :        // Define segments including colour and text.
    [
        // Insert item names here
        {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
        {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
    ],
    'animation' :           // Specify the animation to use.
    {
        'type' : 'spinToStop',
        'duration' : wheelDuration,       // Speed is controlled here, less is faster.
        'callbackSound'    : playSound,   // Function Call tick sound.
        'soundTrigger'     : 'segment',   // Set to 'pins' or 'segment'. Read documentations.
        'callbackFinished' : 'alertPrize()'
    }
});

// // Get canvas context from the wheel object.
// c = theWheel.ctx;

// // Create pointer.
// if (c) {
//     c.save();
//     c.lineWidth = 2;
//     c.strokeStyle = 'black';
//     c.fillStyle = 'black';
//     c.beginPath();
//     c.moveTo(180, 10);
//     c.lineTo(220, 10);
//     c.lineTo(200, 42);
//     c.lineTo(180, 10);
//     c.stroke();
//     c.fill();
//     c.restore();
// }


// -----------------------------------------------------------------
// Function called when add segments.
// -----------------------------------------------------------------
function addSegment(name, color){
    // The Second parameter specifies the position,
    // in this case '1' adds a new segment at the start of the wheel.
    theWheel.addSegment({
        'text' : name,
        'fillStyle' : color
    }, prizeList.length);

    // Updates wheel
    theWheel.draw();
}

// -----------------------------------------------------------------
// Function called when deleting segments.
// -----------------------------------------------------------------
function deleteSegment(index){
    // Remove segment from wheel
    theWheel.deleteSegment(index);

    // Updates wheel
    theWheel.draw();
}

// -----------------------------------------------------------------
// Function called when segment under the prize pointer changes.
// Plays tick sound here.
// -----------------------------------------------------------------
let audio = new Audio('images/tick.mp3');  // Create audio object and load tick.mp3 file.

function playSound()
{
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

// -------------------------------------------------------
// When spin animation finishes, do something.
// Note: Save wheelPrize outside function for reusability.
// -------------------------------------------------------
function alertPrize()
{
    // Get elements.
    let context = document.getElementById('Context');
    let prize = document.getElementById('Prize-Text');
    let wheelPrize = theWheel.getIndicatedSegment();
    
    // Change context.
    context.innerHTML = "Congratulations!";
    context.classList.add('outcome');

    // Change prize text.
    prize.classList.add('outcome');
    prize.classList.remove('invisible');
    prize.innerHTML = "You Won: " + wheelPrize.text + "!";

    // Alert of segment text. (Optional)
    // alert("You have won " + wheelPrize.text);
}

// =======================================================================================================================
// Power controls. (Optional)
// Can spin by simply calling theWheel.startAnimation();
// =======================================================================================================================
let wheelSpinning = false;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Placeholders for number range
        upperNum = 20;
        lowerNum = 5;
        upperLimit = upperNum - lowerNum + 1; // For calculations
        
        // Generate a number between lowerNum-upperNum (inclusive)
        wheelSpins = (Math.floor(Math.random() * upperLimit) + lowerNum);

        // Sets spins to 5 multiplied by (lowerNum-upperNum) divide by 10
        wheelSpins = 5 * wheelSpins / 10;

        // Currently, spins between 2.5 - 10 times
        // Wheel spin times
        theWheel.animation.spins = wheelSpins;

        // Disable spin button while wheel is spinning.
        // document.getElementById('Spin_Button').src = "images/spin_off.png";
        var spinButtonClassList = document.getElementById('Spin_Button').classList;
        spinButtonClassList.add('button-disabled');
        spinButtonClassList.remove('clickable');

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true to disable spin button. 
        // User must reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stops animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    // Enable spin button while wheel is spinning.
    // document.getElementById('Spin_Button').src = "images/spin_on.png";
    document.getElementById('Spin_Button').classList.add('clickable');
    document.getElementById('Spin_Button').classList.remove('button-disabled');

    // Spin button can be clicked again.
    wheelSpinning = false;

    // Reset Prize text.
    let context = document.getElementById('Context');
    let prize = document.getElementById('Prize-Text');
    
    // Change context.
    context.innerHTML = "Spin the Wheel!";
    context.classList.remove('outcome');

    // Change prize text.
    prize.classList.add('invisible');
    prize.classList.remove('outcome');
    prize.innerHTML = "";
}