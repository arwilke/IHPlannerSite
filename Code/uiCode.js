var buttonIDs = ['randButton','passButton','failButton','randTargetButton','forceTargetButton','targetPos1Box','targetPos2Box','targetPos3Box','targetPos4Box','targetPos5Box','targetPos6Box'];
var targetNameSpans = ['targetPos1Name','targetPos2Name','targetPos3Name','targetPos4Name','targetPos5Name','targetPos6Name'];

function forceButton(outcome) {
  switch(outcome) {
    case 1: //Force Pass
      break;
    case 0: //Force Fail
      break;
    case -1: //Random
      myBattle.myState.outcome = getRandomInt(1);
      break;
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function disableButtons(buttonNum = -1) {
  if(buttonNum >= 0 && buttonNum < buttonIDs.length) {
    document.getElementById(buttonIDs[buttonNum]).disabled = true;
  } else {
    for(var i = 0; i < buttonIDs.length; i++) {
      document.getElementById(buttonIDs[i]).disabled = true;
    }
  }
  showTargetOptions();
}
function showTargetOptions() {
  for(var i = 0; i < targetNameSpans.length; i++) {
    document.getElementById(targetNameSpans[i]).innerHTML = i;
  }
}
