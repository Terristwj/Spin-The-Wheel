// Dummy data
const prizeList = [
    ["1", "Common", "70.000", genColor(6)],
    ["2", "Uncommon", "17.300", genColor(6)],
    ["3", "Rare", "10.000", genColor(6)],
    ["4", "Epic", "2.600", genColor(6)],
    ["5", "Legendary", "0.099", genColor(6)],
    ["6", "Meeples", "0.001", genColor(6)]
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
    // Increment index
    document.getElementsByClassName('prizeRemove')[i].value = prizeList[prizeList.length-1][0];
}

// Validate updates in HTML admin entry
function validatedEntries(){
    var totalChance = 0;    // Total Current
    var errorMsg;           // Error message
    var chance;             // Current row

    var x, x1, x2;          // Array split containers
    
    var userInput               // User input for hexadecimal
    var re = /[0-9A-Fa-f]{6}/g; // Hexadecimal condition

    var hexCondition = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var isHexValidated;

    var elements = document.getElementsByClassName("prizeRow");
    
    // Validates array from HTML
    for (i=0;i<elements.length;i++){
        // Current row
        element = elements[i];

        // Only allowed filled HTML rows. Filter out empty HTML rows.
        if (element.getAttribute("data-value") !== "" ||
            element.children[0].value !== "" ||
            element.children[1].value !== "" ||
            element.children[2].value !== ""
        ){
            // Error if half complete
            if (element.children[0].value === "" ||
                element.children[1].value === "" ||
                element.children[2].value === "" )
                return [false, errorMsg="Half completed row: \n\'   " + 
                    element.children[0].value + "   ;   " + 
                    element.children[1].value + "   ;   " +
                    element.children[2].value + "   \'" 
                ]

            // Validates chance category
            // Removes chances = 0
            chance = element.children[1].value;
            if (chance === "0")
                return [false, errorMsg="Chance must not be 0."]
            x = chance.split('.');
            // console.log(x);
            x1 = x[0].split('');
            // Catches error where user never input decimal point
            try {
                x2 = x[1].split('');
            } catch {
                return [false, errorMsg="Chance must be 3 decimal points"]
            }

            // Decimal point must be length of 3
            if (x2.length === 3){
                // Checks if every char is a number before decimal point
                for(n = 0; n < x1.length; n++)
                    // Must be a number
                    if (isNaN(x1[n]))
                        return [false, errorMsg="Invalid number: " + chance]

                // Checks if every char is a number after decimal point
                for(n = 0; n < x2.length; n++)
                    // Must be a number
                    if (isNaN(x2[n]))
                    return [false, errorMsg="Invalid number: " + chance]
            } else
                return [false, errorMsg="Must be 3 decimal points: " + chance]

            // Adds up chances
            chance = parseFloat(chance);
            // Total chance must be equal to 100
            totalChance += chance;

            // User input for hexadecimal textfield
            userInput = element.children[2].value;
            // Validates hexadecimal is correct
            if (userInput.length === 7){
                if (userInput.charAt(0) !== "#")
                    return [false, errorMsg="No # symbol found: " + userInput]
                // if(!re.test(userInput.substring(1))){
                //     console.log(userInput.substring(1));
                //     return [false, errorMsg="Invalid color range: " + userInput]
                // }
                x = userInput.substring(1).split('');
                for (n1 = 0; n1 < x.length; n1++){
                    for (n2 = 0; n2 < hexCondition.length; n2++){
                        isHexValidated = false;
                        // console.log(x[n1]);
                        // console.log(hexCondition[n2]);
                        if (x[n1] === hexCondition[n2]){
                            isHexValidated = true;
                            break;
                        }
                    }

                    if (!isHexValidated)
                        return [false, errorMsg="Invalid color range: " + userInput]
                }
            } else
                return [false, errorMsg="Must be 6 digits: " + userInput]
        }
    }

    // console.log(totalChance);
    // Validates total chance = 100
    if (totalChance != 100)
        return [false, errorMsg="Not 100% total chance: " + totalChance]
    return [true, errorMsg="Successfully Updated!"]
}

// Repopulate array from HTML
function repopulatePrizeList(){
    var x = prizeList.length;
    var newindex = parseInt(prizeList[x-1][0])+1;

    
    // Remove Current Prize Array
    for (i=0;i<x;i++)
        prizeList.pop();

    var elements = document.getElementsByClassName("prizeRow");
    // Repopulate array from HTML
    for (i=0;i<elements.length;i++){
        // Current row
        var element = elements[i];

        // Only allow unregistered prizes to save as data-value
        if (element.children[0].value != "" && 
        element.children[1].value != "" && 
        element.children[2].value != "" && 
        element.children[3].value == ""){
            // New data not registered
            var newDataValue = [newindex, element.children[0].value, element.children[1].value, element.children[2].value];
            // Saves the unregistered data-value
            addDataValue(i, newDataValue);
        }
        
        // Only allowed filled HTML rows. Filter out empty HTML rows.
        if (element.getAttribute("data-value") !== ""){
            // To validate data-value and text values are the same
            if (element.getAttribute("data-value") !== dataValue){
                // Current data in the row
                var dataValue = [element.children[3].value, element.children[0].value, element.children[1].value, element.children[2].value];
                // Saves the changes to data-value
                element.setAttribute("data-value", dataValue);
            }

            // To populate prizeList
            prizeList.push(element.getAttribute("data-value").split(','));
        }
    }
}

// On bodyLoad & refresh button click
function loadAdminSettings(isRefresh){
    // For refesh button
    if (isRefresh) {
        document.getElementById("PrizeList").innerHTML = "";
        alert("Refreshing Data!");
    }
    var numItems = prizeList.length;
    // 1. Create HTML
    for(i=0; i<numItems; i++)
        document.getElementById("PrizeList").innerHTML += getHTMLFormat();
    // 2. Populate HTML
    populateHTML(numItems);
}

// On add update click - Updates Prize Input
function updatePrizeInput(){
    //  Validate entries in HTML
    var validatedResults = validatedEntries();
    if (validatedResults[0]) {
        // Repopulate array from HTML
        repopulatePrizeList();

        // If have empty HTML row, delete all empty HTML rows
        do {
            var index = document.getElementsByClassName("prizeRow").length;
            var element = document.getElementsByClassName("prizeRow")[index-1];
            if(!Boolean(element.id))
                element.remove();
        } while(!Boolean(element.id))

        alert(validatedResults[1]);
        // console.log(prizeList);
    } else{
        alert(validatedResults[1]);
    }
}

// On add button click - Add Prize Row (Never Update)
function addPrizeInput(){
    // 1. Create HTML
    document.getElementById("PrizeList").innerHTML += getHTMLFormat();
    // 2. Populate HTML
    populateHTML(prizeList.length);
}

// On remove button click - Remove Prize Row (Never Update)
function removePrizeInput(value){
    var element = document.getElementById('PrizeRow' + value);
    try {
        // Remove Prize Input
        element.remove();
      } catch {
        // If HTML row is empty, remove last empty row
        index = document.getElementsByClassName("prizeRow").length;
        element = document.getElementsByClassName("prizeRow")[index-1];
        element.remove();
      }
      
    // Repopulate array from HTML
    // repopulatePrizeList();
}



// Edit duration and spins to adjust wheel spin animation speed.
// Adjust the number of spins for the wheel.
let wheelDuration = 5;
let wheelSpins; // Randomly generated value below

// Wheel Object Starts Here.
let theWheel = new Winwheel({
    'numSegments'  : prizeList.length*2,     
    'outerRadius'  : 212,   
    'textFontSize' : 28,    
    'responsive'   : true,
    'segments'     : reloadWheelPrizes(),
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
// Function to load the wheel with prizes (Used on page load)
// -----------------------------------------------------------------
function reloadWheelPrizes(){
    var colorAndPrize;
    var wheelSegments = [];

    // As each prize is listed 2x, repeat the loop 2x.
    for (i = 0; i < 2; i++)
        // Add color and prize into the wheel segment.
        for (n = 0; n < (prizeList.length); n++) {
            colorAndPrize = {
                'fillStyle' : prizeList[n][3], 'text' : prizeList[n][1]
            };
            wheelSegments.push(colorAndPrize);
        }

    return wheelSegments;
}

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
// Function called when updating wheel
// -----------------------------------------------------------------
function updateSegments(){
    theWheel = new Winwheel({
        'numSegments'  : prizeList.length*2,     
        'outerRadius'  : 212,   
        'textFontSize' : 28,    
        'segments'     : reloadWheelPrizes(),
        'animation' :           // Specify the animation to use.
        {
            'type' : 'spinToStop',
            'duration' : wheelDuration,       // Speed is controlled here, less is faster.
            'callbackSound'    : playSound,   // Function Call tick sound.
            'soundTrigger'     : 'segment',   // Set to 'pins' or 'segment'. Read documentations.
            'callbackFinished' : 'alertPrize()'
        }
    });
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

        // This formula always makes the wheel stop at an angle.
        theWheel.animation.stopAngle = calculateWheelPrizeAngle();

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

// -------------------------------------------------------
// Function to calculate wheel angle to stop spinning
// -------------------------------------------------------
function calculateWheelPrizeAngle(){
    // ----------------------------------------------------------
    // 1. Generate list of angle sets.
    // 2. Generate list of prize-chances sets.
    // 3. Random number generator to pick a prize-chance set.
    // 4. Random angle genrator to spin wheel to allocated prize.
    // 5. Return random angle between corresponding angle set.
    // ----------------------------------------------------------
    var numOfPrizes = prizeList.length;
    var fullSpin = 180;
    // IMPORTANT NOTE: Full spin must be 180deg,
    // Because there is a bug where if it is 360deg,
    // It may(50/50) add 180deg to my final calculations
    // Which will output the prize OR the prize +180deg from it.
    
    // [1]
    var prevAngle = 0;
    var angleIncrement = fullSpin / numOfPrizes;
    var angleList = [];
    for (i = 0; i < prizeList.length; i++)
        angleList.push([prevAngle, prevAngle += angleIncrement]);
    // console.log("1. List of Angles: " + angleList);

    // [2]
    var prevChance = 0.000;
    var chanceList = [];
    for (i = 0; i < numOfPrizes; i++)
        chanceList.push(
        [   prevChance, 
            prevChance += parseFloat(prizeList[i][2])
        ]);
    // console.log("2. List of Chances: " + chanceList);

    // [3]
    var randNum = Math.floor(Math.random() * 100000);
    var storedIndex;
    for (i = 0; i < chanceList.length; i++)
        if (randNum >= chanceList[i][0]*1000 && randNum <= chanceList[i][1]*1000)
            storedIndex = i;
    // console.log("3.1 Array Index: " + storedIndex);
    // console.log("3.2 Random Chance * 1000: " + randNum);
    // console.log("3.3 Array Chance * 1000: " + [
    //     (chanceList[storedIndex][0]*1000), 
    //     (chanceList[storedIndex][1]*1000) ]);

    // [4]
    var ceiling = angleList[storedIndex][1];
    var floor = angleList[storedIndex][0];
    randNum = Math.floor(Math.random() * (ceiling - floor + 1) + floor)
    // console.log("4.1 Random Angle: " + randNum);
    // console.log("4.2 Array Angle: " + [floor, ceiling]);
    
    // [5]
    // console.log("Wheel will stop at Angle: " + [randNum] + 
    //             "\nBetween angles: " + floor + " - " + ceiling);
    // console.log("Picking prize number: " + [storedIndex + 1]);

    return randNum;
    
    // Important thing is to set the stopAngle of the animation before stating the spin.
}