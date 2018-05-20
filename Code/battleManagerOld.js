//battleManager.js
//Executes a battle by adjusting the data in a battleState object
var battleManager = (function(bState) {
	function pushActionQueue(action) {
		//Adds a new action to the end of the queue
		var actQueue = bState.getSkillQueue();
		actQueue.push(action);
		return bState.setSkillQueue(actQueue);
	}
	function shiftActionQueue() {
		//Used when an action has been resolved and needs removed from the queue
		var actQueue = bState.getSkillQueue();
		actQueue.shift();
		return bState.setSkillQueue(actQueue);
	}
	function incRound() {
		//Moves on to the next round
		return bState.nextRound();
	}
	function stepActionQueue() {
		var actQueue = bState.getSkillQueue();
		if(actQueue.length === 0) {
			return false;
		}
		console.log('The Action Queue is not empty.');
		//Add resolving action queue code here
		//check for targetsE1
		var action = actQueue[0].getAction();
		var actor = actQueue[0].getActor();
		var targetsE1 = actQueue[0].getTargetsE1();
		var targetsE2 = actQueue[0].getTargetsE2();
		if((targetsE1.length === 0) || (action.details.effect2 !== undefined && targetsE2.length === 0)) {
			//Need targets
			detTargets(action,actor);
		} else {
			var newCheckMade = false;
			newCheckMade = stepTargetList(targetsE1, newCheckMade);
			newCheckMade = stepTargetList(targetsE2, newCheckMade);
		}
		return 1;
	}
	function stepTargetList(targetList, newCheckMade) {
		for(var i = 0; i < targetList.length; i++) {
				if(!targetList[i].getResolved() && !newCheckMade) {
					newCheckMade = stepTargetRes(targetList[i],newCheckMade);
					if(!newCheckMade) {
						resTarget(targetList[i]);
					}
				}
			}
		return newCheckMade;
	}
	function stepTargetRes(target, newCheckMade) {
		var tarCheckList = target.getCheckList();
		for(var i = 0; i < tarCheckList.length; i++) {
			if(tarCheckList[i].comp === -1 && !newCheckMade) {
				tarCheckList[i].comp = resolveCheck(tarCheckList[j].check);
				newCheckMade = true;
			}
		}
		return newCheckMade;
	}
	function resTarget(target) {
		//Calculation to determine effect on target
		console.log('Target in pos ' + target.getPos());
		for(var i = 0; i < target.getCheckList().length; i++) {
			console.log('    ' + target.getCheckList()[i].check + ': ' + target.getCheckList()[i].state);
		}
	}
	function detTargets(action, actorPos) {
		
	}
	function resCheck(checkType) {
		var checkOutcome = 0; //0 means failed check, 1 means passed
		return checkOutcome;
	}
	function stepHeroPhase() {
		if(!stepActionQueue()) { //Means action queue is empty
			console.log('Choosing next hero to act...')
			var heroList = bState.getHeroList();
			//Find out who the fastest viable hero is
			var nextHeroSpd = -1;
			var nextHeroPos = 99;
			for(var i = 0; i < heroList.length; i++) {
				if(heroList[i].alive && !heroList[i].acted && heroList[i].bStats !== undefined) {
					if((heroList[i].bStats.spd > nextHeroSpd) || (heroList[i].bStats.spd == nextHeroSpd && i < nextHeroPos)) {
						nextHeroSpd = heroList[i].bStats.spd;
						nextHeroPos = i;
					}
				}
			}
			//Check to see if that hero is using a basic attack or active skill
			if(heroList[i].bStats.energy >= 100) {
				heroAction = heroList[i].actSkill;
				console.log('Next hero to act is ' + heroList[nextHeroPos].cStats.name + ' using their Active Skill!');
			} else {
				heroAction = heroList[i].atkSkill;
				console.log('Next hero to act is ' + heroList[nextHeroPos].cStats.name + ' using their Basic Attack!');
			}
			pushActionQueue(actionInstance(nextHeroPos, heroAction));
		}
	}
	function stepBuffPhase() {
		if(!stepActionQueue()) { //Means action queue is empty
			//Add resolving buff code here
		}
	}
	function stepMonsPhase() {
		if(!stepActionQueue()) { //Means action queue is empty
			//Add resolving buff code here
		}
	}
	function checkUnActed() {
		//Check to see if there are any heroes who can still act this turn
		var heroList = bState.getHeroList();
		var unActedCheck = true;
		for(var i = 0; i < heroList.length; i++) {
			unActedCheck = unActedCheck && heroList[i].acted;
		}
		return unActedCheck;
	}
	function checkAlive(team) {
		//Check to see if any heroes on the team are alive
		var heroList = bState.getHeroList();
		var teamStart = 0;
		var aliveCheck = false;
		switch(team) {
			case 'def':
				teamStart = 6;
				break;
			case 'atk':
			default:
		}
		for(var i = 0 + teamStart; i < (6 + teamStart); i++) {
			aliveCheck = aliveCheck || heroList[i].alive;	
		}
		return aliveCheck;
	}
	function detNextStep() {
		phase = bStats.getPhase();
		round = bState.getRound();
		//Check for end battle conditions
		if(!checkAlive('atk')) { //Lose conditions: attacking team is dead
			console.log('Attackers Lose!');
		} else if(round > 15 || (round === 15 && phase === 3)) { //Stalemate conditions: Round has passed 15 (error), round is 15 and everyone has acted
			console.log('Attackers Lose (by stalemeate!');
		} else if(!checkAlive('def')) { //Win Conditions: defending team is dead;
			console.log('Attackers Win!')
		} else if(phase === 3) {
			//Round is done, go to next round
			incRound();
		} else if(phase === 2) {
			//Inside the hero phase
			stepHeroPhase();
		} else if(phase === 1) {
			//Inside the buff/debuff phase
			stepBuffPhase();
		} else if(phase === 0) {
			//Inside the monster phase
			stepMonsPhase();
		} else {
			console.log('Error, invalid phase');
		}
		
	}
	return {
		
	}
});
