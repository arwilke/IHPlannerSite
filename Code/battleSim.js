var battle = (function(attackTeam, defendTeam) {
  var fighters = [{},{},{},{},{},{},{},{},{},{},{},{}];
  for(var i = 0; i < attackTeam.getHero().length; i++) {
    fighters[i] = cloneObject(attackTeam.getHero(i+1));
  }
  for(var i = 0; i < defendTeam.getHero().length; i++) {
    fighters[i+6] = cloneObject(defendTeam.getHero(i+1));
  }
  for(var i = 0; i < fighters.length; i++) {
    if(fighters[i].cStats != undefined) {
      fighters[i].alive = true;
      fighters[i].acted = false;
      fighters[i].ctrld = function(){
        return false;
      }
      fighters[i].curHp = fighters[i].bStats().hp;
      fighters[i].curEn = fighters[i].bStats().energy + 50;
      console.log('In Pos ' + (i + 1) + ':');
      fighters[i].printHeroStats('b');
      console.log('Cur Hp: ' + fighters[i].curHp + ', Cur Energy: ' + fighters[i].curEn + ', Alive: ' + fighters[i].alive + ', Acted: ' + fighters[i].acted + ', Controlled: ' + fighters[i].ctrld());
    } else {
      console.log('In Pos ' + (i + 1) + ':');
      console.log('Empty');
    }
  }
  var round = 0;
  var nextStepPointer = 'findNext';

  function battleStep(fighters, stepPointer = nextStepPointer, actingHero = {'pos':0,'spd':-1}, outcomeForced = 0, round = 0) {
    if(stepPointer === 'findNext') {//Determine which hero acts Next
      console.log("Finding Next Hero... (stepPointer === 'findNext')");
      actingHero = {'pos':-1,'spd':-1};
      for(var i = 0; i < fighters.length; i++) {
        if(fighters[i].cStats != undefined){
          if(fighters[i].alive && !fighters[i].acted) {
            if(fighters[i].bStats().spd > actingHero.spd) {
              actingHero.spd = fighters[i].bStats().spd;
              actingHero.pos = i;
            } else if(fighters[i].bStats().spd == actingHero.spd && i < actingHero.pos) {
              actingHero.spd = fighters[i].bStats().spd;
              actingHero.pos = i;
            }
          }
        }
      }
      if(actingHero.pos != -1) {
        console.log('Next Hero: ' + fighters[actingHero.pos].cStats.heroName + ' (pos: ' + (actingHero.pos + 1) + ')');
        nextStepPointer = 'heroAct';
      } else {
        console.log('All Heroes Acted, next round...');
        nextStepPointer = 'nextRound'
      }
    }
    if(stepPointer === 'heroAct') {//let the next hero act
      console.log("Letting Hero Act... (stepPointer === 'heroAct')");
      fighters[actingHero.pos].acted = true;
      nextStepPointer = 'findNext';
    }




    if(stepPointer === 'nextRound') {
      console.log("Going to Next Round... (stepPointer === '" + stepPointer + "')");
      if(round >= 15) {
        nextStepPointer = 'battleEnded';
      } else {
        nextStepPointer = 'findNext';
        round++;
        console.log('Round: ' + round);
      }
    }
    console.log('nextStepPointer: ' + nextStepPointer);
    //stepPointer = nextStepPointer;
  }
  return {
    stepAll:function() {

    },
    stepRound:function() {

    },
    stepAction:function() {
      battleStep(fighters);
    }
  }
});
