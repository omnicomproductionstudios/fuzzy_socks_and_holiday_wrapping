var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl;


//@FT VARIABLE DECLARATIONS
var deploy = true
    showDefault=false,
    thisFeedLoaded=false,
    ctURL = "",
    defaultPrice = "",
    lowestfare_faredollaramount="";

var price = myFT.$("#price"),
    startingAt = myFT.$("#starting_at"),
    priceHolder = myFT.$("#priceHolder"),
    priceText = myFT.$("#priceText"),
    dollarSign = myFT.$("#dollar"),
    oneWay = myFT.$(".one_way"),
    default_exit = myFT.$("#default_exit"),
    h4 = myFT.$("#h4");
    cta = myFT.$("#cta")

//@FT Setting local variable values using FT dynamic variables (instantAds)
ctURL           = myFT.instantAds.Retail_default_clickTag_URL
oneWay_txt      = myFT.instantAds.one_way_text;


//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) { 
    return true
  } else {
    return false
  }
}

//@FT Feed data callback function
function feedLoaded(feed){
  console.log(feed)
  if(!thisFeedLoaded){
    thisFeedLoaded=true;
    try{

        lowestfare_faredollaramount = feed[0].lowestfare_faredollaramount;
        // origin_formatted = feed[0].origin_formatted;
        // destination_formatted = feed[0].destination_formatted;
        ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feedItems[0]['url'];

        if(lowestfare_faredollaramount == "0"){
            //console.log('load default');
            showDefault = true;
        }
    }catch(error){
        //Feed error handling done within base file
        //If no feed available, show default content
        showDefault = true;
    }
    setupContent();
  }
}

function setupContent() {

  if (deploy === false) {
    priceText[0].innerHTML = "XXX";
  } 
  else {

    // TESTING

    //  Longest possible places names
    // origin_formatted = 'Boston'
    // destination_formatted = 'Florida'

    if (showDefault) {
      // h4[0].innerHTML = 'Go with <span>JetBlue</span>'; // - Populates main headline
      h4[0].classList.add('defaultEndframe')
      // cta[0].style.marginLeft = 0 
      price[0].style.display = 'none';
      startingAt[0].style.display = 'none';
    }
    
    // ----------
    // TESTING
    //hard code price for local testing
    //comment out before uploading
    lowestfare_faredollaramount="49"
    // -------------
    
    // Alternate text style classes for 3 and 4 characters prices
    // e.g. $250 vs. $1000
    priceText[0].innerHTML = lowestfare_faredollaramount;

    if(lowestfare_faredollaramount.toString().length > 3) {
      priceText[0].classList.add('fourCharPrice')
      dollarSign[0].classList.add('fourCharDollar')
      oneWay[0].classList.add('fourCharOneWay')
      priceHolder[0].classList.add('fourCharPriceHolder')
    }
  }
  myFT.dispatch('RL2_ready_to_play');

}



myFT.on('RL2_play' , function(){
  console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  animate();
  setRollover();

}

function animate() {
  myFT.dispatch('show_RL2');
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true })
  .set(["#cta"], { force3D: true, rotation: .001 })
  .addLabel('frame_4', "1")
  // .from(['#main_content'], .6, { y:"+=250", ease: Back.easeOut.config(.3)})
  .from(['.copy1'], 0.5, {left: '-70px', ease: Power1.easeInOut }, 'frame_4')
  .to(['.circle_plane'], 0.5, {scale: 1, ease: Power1.easeInOut }, 'frame_4')
  .to(['.line2'], 0.5, {width: '100%', ease: Power1.easeInOut }, 'frame_4+=.5')
  .to(['.circle_plane'], 1, {left: '41px', ease: Power1.easeInOut }, 'frame_4+=1')
  .to(['.line1'], 1, {width: '60%', ease: Power1.easeInOut }, 'frame_4+=1')
  .from(['.copy2'], 1, {left: '-250px', ease: Power1.easeInOut }, 'frame_4+=1')
  .staggerTo(['#priceHolder', '#cta'], 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, 0.3, 'frame_4+=2')
}

// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}

// End timer

function endTime() {
  myFT.dispatch('stopTimer')
  // show total banner animation time in browser console.

  // var  = new Date();
  // console.log(
  //    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  // );
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/

