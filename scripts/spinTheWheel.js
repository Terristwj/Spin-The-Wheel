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