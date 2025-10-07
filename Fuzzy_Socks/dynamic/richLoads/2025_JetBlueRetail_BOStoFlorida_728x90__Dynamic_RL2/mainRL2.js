var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
// var startTime;

// Timeline reference
var tl;


//@FT VARIABLE DECLARATIONS
var deploy = true,
    showDefault=false,
    thisFeedLoaded=false,
    ctURL = "",
    defaultPrice = "69",
    origin_formatted="",
    lowestfare_faredollaramount="",
    destination_formatted="";

var price = myFT.$("#price"),
    startingAt = myFT.$("#starting_at"),
    priceHolder = myFT.$("#priceHolder"),
    priceText = myFT.$("#priceText"),
    dollarSign = myFT.$("#dollar"),
    subhead = myFT.$("#subhead"),
    terms = myFT.$("#terms"),
    oneWay = myFT.$(".one_way"),
    default_exit = myFT.$("#default_exit"),
    h4 = myFT.$("#h4");
    cta = myFT.$("#cta")

//@FT Setting local variable values using FT dynamic variables (instantAds)
ctURL           = myFT.instantAds.Retail_default_clickTag_URL
headline_color  = myFT.instantAds.headline_color;
subhead_color   = myFT.instantAds.subhead_color;
price_color     = myFT.instantAds.price_color;
oneWay_color    = myFT.instantAds.oneWay_color;
legal_color     = myFT.instantAds.legal_color;
oneWay_txt      = myFT.instantAds.one_way_text;
terms_txt       = myFT.instantAds.restrictions_text;

headline1_txt   = myFT.instantAds.headline1_text + myFT.instantAds.headline2_text;

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) {
    return true
  } else {
    return false
  }
}

function setupContent() {

  if (deploy === false) {

    h4[0].innerHTML = "Fly from<br><span class='city'>" + origin_formatted + "</span> <span class='to'>to</span> <span class='city'>" + destination_formatted + "</span>"; // - Populates main headline


    oneWay[0].innerHTML = oneWay_txt; // - Populates the 'one-way' text
    terms[0].innerHTML = ''; // - Populates the 'Restrictions Apply.' text

    const myCity = document.getElementsByClassName('city')
    myCity[0].style.fontSize = "19px"
    myCity[1].style.fontSize = "19px"
    priceText[0].innerHTML = "XXX";

  }
  else {

    oneWay[0].innerHTML = oneWay_txt; // - Populates the 'one-way' text
    terms[0].innerHTML = terms_txt; // - Populates the 'Restrictions Apply.' text

    // ------------------
    // TESTING

    //  Longest possible places names
    // origin_formatted = 'Boston'
    // destination_formatted = 'Florida'

    //  Longest possible places names
    // origin_formatted = 'Providenciales, Turks and Caicos (PLS)'
    // destination_formatted = 'Providenciales, Turks and Caicos (PLS)'

    //  Median places names
    // origin_formatted = 'Sacramento, CA (SMF)'
    // destination_formatted = 'Sacramento, CA (SMF)'

    // Shortest possible places
    // origin_formatted = 'Miami, FL (MIA)'
    // destination_formatted = 'Miami, FL (MIA)'
    // -------------------

    if (showDefault) {
      h4[0].innerHTML = '<span>Go with</span> JetBlue'; // - Populates main headline
      h4[0].classList.add('defaultEndframe')
      // reposition CTA
      cta[0].style.marginLeft = 0
      cta[0].style.marginTop = "-10px"
      terms[0].innerHTML = '' // Populate Terms

      // Turn off Price holder etc.
      price[0].style.display = 'none';
      startingAt[0].style.display = 'none';
    } else {
      h4[0].innerHTML = "Fly from<br><span class='city'>" + origin_formatted + "</span><br><span class='to'>to</span> <span class='city'>" + destination_formatted + "</span>"; // - Populates main headline

      // dynamic resize
      const myCity = document.getElementsByClassName('city')

      const myCityOriginLength = myCity[0].innerHTML.split('&')[0].length
      const myCityDestLength = myCity[1].innerHTML.length

      const myCityCharLength = myCityOriginLength > myCityDestLength ? myCityOriginLength : myCityDestLength;

      if (myCityCharLength > 22) {
      } else if (myCityCharLength > 14) {
        myCity[0].style.fontSize = "14px"
        myCity[1].style.fontSize = "14px"
      } else if (myCityCharLength > 10) {
        myCity[0].style.fontSize = "17px"
        myCity[1].style.fontSize = "17px"
      } else {
        myCity[0].style.fontSize = "19px"
        myCity[1].style.fontSize = "19px"
      }

    }

    // ----------
    // TESTING
    //hard code price for local testing
    //comment out before uploading
    // lowestfare_faredollaramount="4444"
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

//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

//@FT Feed data callback function
function feedLoaded(feed){
  if(!thisFeedLoaded){
    thisFeedLoaded=true;
    try{
        lowestfare_faredollaramount = feed[0].lowestfare_faredollaramount;
        origin_formatted = feed[0].origin_formatted;
        destination_formatted = feed[0].destination_formatted;
        ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feed[0]['url'];

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

myFT.on('RL2_play' , function(){
  //console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  // startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  tl.set(['#terms2'], {autoAlpha: 0 });
  animate();
  setRollover();

}
function animate() {
  myFT.dispatch('show_RL2');
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true })
  .set(["#cta"], { force3D: true, rotation: .001 })
  .addLabel('frame_4')
  // .from(['#main_content'], .6, { y:"+=250", ease: Back.easeOut.config(.3)})
  .staggerTo(['#h4', '#priceHolder', '#cta', '#terms', '#terms_container'], 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, 0.3, 'frame_4')

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
  //dispatch event to notify RL1 (where timer resides) to stop and console.log
  //banner duration time
  myFT.dispatch('stopTimer')
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/
