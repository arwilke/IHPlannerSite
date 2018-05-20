var battle = (function(attackTeam, defendTeam) {
  var myState = new battleState(cloneObject(attackTeam), cloneObject(defendTeam))
  //Battle Steps
  function startRoundPhase() {
    //Start Round Phase
    //  While round < 15
    //    round++
    if(myState.round >= 15) {
      return eROUNDLIMIT;
    }
    myState.round++;
    myState.actingHero = -1;
    myState.actingSkill = -1;
    myState.actingSkillMajEffs = 0;
    myState.actingSkillTargetGroups = 0;
    for(var i = 0; i < fighters.length; i++) {
      if(myState.fighters[i].exists() && ) {
        myState.fighters[i].acted = false;
      }
    }
    return myState.round;
    //console.log('Starting Round: ' + startRoundPhase());
  }
  function monsterPhase() {
    //console.log('Starting Monster Phase');
    //Pet Phase
    //Use Pet if bar is full, else nothing
    return 0;
  }
  function upkeepPhase() {
    /*Upkeep Phase - When to check for hero death?
      For each hero
        For each active effect on the hero
          resolve the effect and reduce its duration by 1
        end each active effect
      end each hero
      Check for End Condition*/
      return checkEnd();
      //console.log('Starting Upkeep Phase');
  }
  function checkEnd() {
    var numAlive = 0;
    for(var i = 0; i < myState.fighters.length; i++) {
      if(myState.fighters[i].alive()) {
        numAlive++;
      }
    }
    if(numAlive == 0){
      return 1;
    } else {
      return 0;
    }
  }
  function actionPhase() {  //EMPTY
    /*Action Phase
      while 1 or more heroes have not acted*/
    //Maybe bundle all of the action phase stuff in here for convenience?
  }
  function nextHeroSPhase() {
    /*Determine Next to Act SubPhase (Deterministic) {
      Of the heroes who are alive and unacted, find the one with the highest
      speed stat.  if there is a tie, the hero with the lowest position
      wins.  The hero is the next to act.*/
      //console.log("Finding Next Hero...");
      nextHeroSpd = -1;
      myState.actingHero = -1;
      for(var i = 0; i < myState.fighters().length; i++) {
        if(myState.fighters[i].exists()){
          if(myState.fighters[i].alive && !fighters[i].acted) {
            if(myState.fighters[i].bStats().spd > nextHeroSpd) {
              nextHeroSpd = myState.fighters[i].bStats().spd;
              myState.actingHero = i;
          }
        }
      }
    }
    return myState.actingHero;
  }
  function heroActsSPhase() { //EMPTY
    /*
        Hero Acts SubPhase {*/
  }
  function detSkillUsed() {
    /*if the hero is not controlled (CC'd) (except silence)
      Determine Skill Step (Deterministic)
        If energy is 100 or more, and if the hero is not silenced, use
        Active Skill, otherwise use Basic Skill*/
    if(!myState.fighters[myState.nextHero].ctrld()) {
      if(myState.fighters[myState.nextHero].energy >= 100 && !myState.fighters[myState.nextHero].slnt()) {
        myState.actingSkill = 1; //Active Skill Used
      } else {
        myState.actingSkill = 0; //Basic Skill Used
      }
    } else {
      myState.actingSkill = -1;  //No Skill Used, hero is Controlled
    }
    return myState.actingSkill;
  }
  function countEffects() {
    var effNum = -1;
    switch(myState.actingSkill) {
      case 1: //Active Skill Used
        myState.activeSkillMajEffs = 1;
        effNum = myState.activeSkillMajEffs;
        while(effNum > 0){
          if(myState.fighters[myState.nextHero].actSkill.details.['effect' + effNum] != undefined) {
            myState.activeSkillMajEffs ++;
            effNum++;
          } else {
            effNum = -1;
          }
        }
        break;
      case 0: //Basic Skill Used
        myState.activeSkillMajEffs = 1; //Need to add basic attack support once I get basic attack data
        break;
      default: //No Skill Used
    }
    return myState.activeSkillMajEffs;
  }
  function detTargetGroups() {
    targetGroups = [];
    for(var i = 0; i < myState.activeSkillMajEffects; i++) {
      targetGroups[i] = myState.fighters[myState.nextHero].actSkill.details.['obj'+(i + 1)];
      /*  switch(myState.fighters[myState.nextHero].actSkill.details.['obj'+(i + 1)]) {
          case 1:
            break;
          case 3:
            break;
          case 4:
            break;
          case 9:
            break;
          case 11:
            break;
          case 12:
            break;
          case 13:
            break;
          case 18:
            break;
          case 19:
            break;
          case 20:
            break;
          case 22:
            break;
          case 24: //Random out of all Enemies
            break;
          case 26:
            break;
          case 27:
            break;
          case 28:
            break;
          case 29:
            break;
          case 30:
            break;
          default:
        }*/
      }
    }
  }



            /*Determine Targets Step (Random)
              For each 'thing' the Skill does (effect, effect2, ...)
                Determine Targets SubStep (Random)
                  If the Skill targets enemies, determine which enemies are
                  targetted
                    skill.details.obj1 = Target Zone
                    skill.details.rand1 = How many targets in that zone are targetted
            **All Skills Always Hit Now**
            Resolve Skill Effects Step
              For each 'thing' (effect1, effect2, ...)
                For each target
                  For each Effect
                    Determine if Effect Occured SubStep (Random)
                      skill.details.effect.1.ratio = chance of the Effect Occuring
                    Determine if Crit or Hit SubStep (Random)
                      If the Skill can Crit, it has a hero.crit chance of being a Crit
                        skill.details.noCrit1 = 1/true if the Skill cannot Crit
                    Determine if Block or Unblocked SubStep (Random)
                    Determine Effect Result SubStep (Deterministic)
                      A culmination of all of the above SubSteps
                    Check for Other Skills Being Triggered SubStep (Deterministic)
                      For each hero, for each skill, check to see if the effect resolution was triggered
        }
        Other Heroes React if Triggered SubPhase {
          Repeat until there are no more triggered skills
          Resolve Any Skills Triggered by the Hero using the Skills (Random)
            For each skill triggered...
              if the hero is not controlled (CC'd) (except silence)
                Determine Targets Step (Random)
                Resolve Skill Effects Step
        }
        Check for End Conditions
      Loop Action Phase





    End Round Phase
      Check for End Condition
  */
  return {


    }
});
