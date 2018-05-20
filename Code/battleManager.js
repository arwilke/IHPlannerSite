//battleManager.js
//Executes a battle by adjusting the data in a battleState object
var battleManager = (function(attTeam, defTeam) {
	var state = new battleState(attTeam, defTeam);
	var stepResult = 0;
	heros = state.getHeroList();
	console.log('Hero Alive? ' + heros[0].alive);

	function stepHeroPhase() {
		if(!stepActionStack()) { // Tries to step Action Stack, if there are no actions, then finds the next hero
			console.log('Choosing next hero to act...')
			var heroList = state.getHeroList();
			console.log('heroList.length: ' + heroList.length);
			//Find out who the fastest viable hero is
			var nextHeroSpd = -1;
			var nextHeroPos = 99;
			for(var i = 0; i < heroList.length; i++) {
				console.log('nextHeroSpd: ' + nextHeroSpd + ', nextHeroPos: ' + nextHeroPos);
				if(heroList[i].alive && !heroList[i].acted && (heroList[i].bStats() !== undefined)) {
					console.log('In First If, heroList[i].bStats.spd: ' + heroList[i].bStats().spd);
					//heroList[i].bStats.spd
					if((heroList[i].bStats().spd > nextHeroSpd) || (heroList[i].bStats().spd == nextHeroSpd && i < nextHeroPos)) {
						console.log('In Second If');
						nextHeroSpd = heroList[i].bStats().spd;
						nextHeroPos = i;
					}
				}
			}
			console.log('nextHeroSpd: ' + nextHeroSpd + ', nextHeroPos: ' + nextHeroPos);
			//Check to see if that hero is using a basic attack or active skill
			if(heroList[nextHeroPos].energy >= 100) {
				heroAction = heroList[nextHeroPos].cStats.actSkill;
				console.log('Next hero to act is ' + heroList[nextHeroPos].cStats.heroName + ' using their Active Skill!');
			} else {
				heroAction = heroList[nextHeroPos].cStats.atkSkill;
				console.log('Next hero to act is ' + heroList[nextHeroPos].cStats.heroName + ' using their Basic Attack!');
			}
			pushActionStack(actionInstance(nextHeroPos, heroAction));
		}
	}
	function stepActionStack() {
		var actStack = state.getActionStack();
		var e1Complete = false;
		var e2Complete = false;
		if(actStack.length === 0) {
			return false;
		}
		console.log('The Action Stack is not empty.');
		//console.log('actStack[0]: ' + actStack[0]);
		//Add resolving action queue code here
		//check for targetsE1
		var action = actStack[0].getAction();
		var actor = actStack[0].getActor();
		console.log('actStack[0].actor: ' + actor);
		console.log('actStack[0].action: ' + action);
		var targetsE1 = actStack[0].getTargets(1);
		var targetsE2 = actStack[0].getTargets(2);
		if(targetsE1.length === 0) {
			//Need targets
			console.log('Setting targets for effect1');
			targetsE1 = detTargets(action,actor,1);
			targArray = [];
			for(var i = 0; i < targetsE1.length; i++) {
				targArray[i] = targetsE1[i].getPos();
			}
			console.log('effect1 targets: ' + targArray);
			actStack[0].setTargets(targetsE1,1)
			state.setActionStack(actStack);
			//for(var i = 0; i < targetsE1.length;
			return 1
		}
		if(action.details.effect2 !== undefined && targetsE2.length === 0) {
			//Need targets
			console.log('Setting targets for effect2');
			targetsE2 = detTargets(action,actor,2);
			targArray = [];
			for(var i = 0; i < targetsE2.length; i++) {
				targArray[i] = targetsE2[i].getPos();
			}
			console.log('effect 2 targets: ' + targArray);
			actStack[0].setTargets(targetsE2,2)
			state.setActionStack(actStack);
			return 1
		}
		var newCheckMade = false;
		newCheckMade = stepTargetList(targetsE1, newCheckMade,0);
		if(!newCheckMade) {
			e1Complete = true;
		}
		newCheckMade = stepTargetList(targetsE2, newCheckMade,1);
		if(!newCheckMade) {
			e2Complete = true;
			e1Complete = false;
		}
		if(e1Complete) {
			resAction(targetsE1)

		}
		return 1;
	}
	function detTargets(action, actorPos,eff = 1) { //Need to add user input functionality to this
		var heroList = state.getHeroList();
		var actObj = 0;
		var effKey = ['effect','effect2'];
		var objKey = ['obj1','obj2'];
		var randKey = ['rand1','rand2'];
		var noActKey = ['noAct1','noAct2'];
		var noCritKey = ['noCrit1','noCrit2'];
		var targetList = [];
		var row = 0;
		var allies = 0;
		var enemies = 6;
		if(actorPos >= 6) {
			allies = 6;
			enemies = 0;
		}
		var side = enemies;
		if(eff !== 2) {eff = 1} //effect
		console.log(effKey[eff-1] + ' has ' + objKey[eff-1] + ' of ' + action.details[objKey[eff-1]]);
		switch(action.details[objKey[eff-1]]) {
			case 1: //Target Self
				return getSelfTarget(selfPos);
				break;
			case 3: //Target All Allies
				side = allies;
			case 12:
				return getAllTargets(side,row);
				break;

			case 4:  //Target Ally w/ Lowest Hp
				side = allies;
			case 13: //Target Enemy w/ Lowest HP
				return getLowHpTarget(side);
				break;

			case 9: //Target All Front Line Allies
				side = allies;
			case 18: //Target All Front Line Enemies
				row = 1;
				return getAllTargets(side,row);
				break;

			case 10: //Target All Back Line Allies
				side = allies;
			case 19: //Target All Back Line Enemies
				row = 2;
				return getAllTargets(side,row);
				break;

			case 11: //Target First Slot Enemy
				return getFirstTarget(side);
				break;

			case 22: //Target Any N Random Front Line Allies (N comes from rand1/rand2)
				row = 1
			case 20: //Target Any N Random Allies (N comes from rand1/rand2)
				side = allies;
				return getRandTargets(action.details[objKey[eff-1]],action.details[randKey[eff-1]],side,row);
				break;

			case 26: //Target Any N Random Back Line Enemies (N comes from rand1/rand2)
				row = 2;
			case 24: //Target Any N Random Enemies (N comes from rand1/rand2)
				return getRandTargets(action.details[objKey[eff-1]],action.details[randKey[eff-1]],side,row);
				break;

			case 27: //Target Hero who Attacked You (When Taking Damage... reaction skills)
				//break;
			case 28: //Target Hero you Hit with Basic Attack (Passives that add stuff to attacks)
				//break;
			case 29: //Target Hero who Critted agains you (When taking crit damage...)
				//break;
			case 30: //Target Hero you Critted against (Passives that add effects to Crits)
				//break;
			default:
					console.log('New Effect Obj! ' + objKey[eff-1] + ' = ' + action.details[objKey[eff-1]]);
					return getFirstTarget(side);
		}
	}
	function getSelfTarget(pos) {
		var targetList = [];
		targetList.push(new effectTarget(actorPos));
		return targetList;
	}
	function getAllTargets(side,row = 0) {
		var heroList = state.getHeroList();
		var targetList = [];
		var iMin = 0;
		var iMax = 6;
		switch(row) {
			case 1: //Front
				iMax = 2;
				break;
			case 2: //Back
				iMin = 2;
				break;
		}
		for(var i = iMin + side; i < iMax + side; i++) {
			if(heroList[i].alive) {
				targetList.push(new effectTarget(i));
			}
		}
		return targetList;
	}
	function getLowHpTarget(side) {
		var heroList = state.getHeroList();
		var targetList = [];
		var lowestHp = 999999999999999999;
		var lowestHpPos = side;
		for(var i = 0 + side; i < 6 + side; i++) {
			if(heroList[i].bStats.Hp < lowestHp) {
				lowestHp = heroList[i].bStats.Hp;
				lowestHpPos = i;
			}
		}
		targetList.push(new effectTarget(lowestHpPos));
		return targetList;
	}
	function getFirstTarget(side) {
		var heroList = state.getHeroList();
		var targetList = [];
		var i = side;
		while(!heroList[i].alive) {i++;}
		targetList.push(new effectTarget(i));
		return targetList;
	}
	function getRandTargets(obj,rand,side,row = 0) {
		var heroList = state.getHeroList();
		var numAlive = 0;
		var targetList = [];
		var iMin = 0;
		var iMax = 6;
		var heroPoses = [];
		switch(row) {
			case 1: //Front
				iMax = 2;
				break;
			case 2: //Back
				iMin = 2;
				break;
		}
		for(var i = iMin + side; i < iMax + side; i++) {
			if(heroList.alive) {
				numAlive++;
			}
		}
		if(numAlive >= rand){
			return getAllTargets(side,row);
		}
		if(side < 6) {
			switch(obj) {
				case 20:
					heroPoses = [0,1,2,3,4,5];
					break;
				case 22:
					heroPoses = [0,1];
					break;
				case 24:
					heroPoses = [6,7,8,9,10,11];
					break;
				case 26:
					heroPoses = [8,9,10,11];
					break;
			}
		} else {
			switch(obj) {
				case 20:
					heroPoses = [6,7,8,9,10,11];
					break;
				case 22:
					heroPoses = [6,7];
					break;
				case 24:
					heroPoses = [0,1,2,3,4,5];
					break;
				case 26:
					heroPoses = [2,3,4,5];
					break;
			}
		}
		combos = getHeroCombs(heroPoses, rand);
		roll = getRandomInt(0, combos.length)
		for(var i = 0; i < combos[roll].length; i++) {
			targetList.push(new effectTarget(combos[roll][i]));
		}
		return targetList;
	}

	function pushActionStack(action) {
		//Adds a new action to the end of the queue
		var actStack = state.getActionStack();
		actStack.push(action);
		//Create effect CheckList
		/*
		var effectTarget = (function(pos){
			var tarResolved = false;
			var checkList = [{}]; //{'check':'crit','state':-1} -1 for not checked, 0 for checked and failed, 1 for checked and passed
			return {
				getPos:function() {return pos;},
				getCheckList:function() {return checkList;},
				setCheckList:function(newCheckList) {
					checkList = newCheckList;
					return 1;
				}*/
		return state.setActionStack(actStack);
	}
	function shiftActionStack() {
		//Used when an action has been resolved and needs removed from the queue
		var actStack = state.getActionStack();
		actStack.shift();
		return state.setActionStack(actStack);
	}
	function incRound() {
		//Moves on to the next round
		var round = state.getRound();
		if(round < 15) {
			console.log('moving to next round...');
			return state.nextRound();
		} else {
			return 0;
		}
	}
	function incPhase() {
		//Moves on to the next round
		var phase = state.getPhase();
		if(phase < 3) {
			console.log('moving to next phase...');
			return state.nextPhase();
		} else {
			return 0;
		}
	}
	function stepTargetList(targetList, newCheckMade, eff) {
		for(var i = 0; i < targetList.length; i++) {
				if(!targetList[i].getResolved() && !newCheckMade) {
					newCheckMade = stepTargetRes(targetList[i],newCheckMade);
					if(!newCheckMade) {
						resTarget(targetList[i],eff);
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
	function resTarget(target,eff) {
		//Calculation to determine effect on target
		var effKey = ['effect','effect2'];
		var actStack = state.getActionStack();
		var action = actStack[0].getAction();
		var actor = actStack[0].getActor();
		var heroList = state.getHeroList();
		console.log('Target in pos ' + target.getPos());
		for(var i = 0; i < target.getCheckList().length; i++) {
			if(target.getCheckList()[i].check !== undefined){
				console.log('    ' + target.getCheckList()[i].check + ': ' + target.getCheckList()[i].state);
			}
			//Resolve damage
			//for each effect
			//console.log((1).toString());
			//console.log('Action.details: ' + action.details);
			//console.log('Effect1: ' + action.details[effKey[eff]]);
			console.log('Effect1.length: ' + Object.keys(action.details[effKey[eff]]).length);
			for(var k = 1; k < Object.keys(action.details[effKey[eff]]).length + 1; k++) {
				var effType = action.details[effKey[eff]][k.toString()].type;
				var effRound = action.details[effKey[eff]][k.toString()].round;
				var effNum = action.details[effKey[eff]][k.toString()].num;
				var effRatio = action.details[effKey[eff]][k.toString()].ratio;
				console.log('Effect1.' + k + ' Type: ' + effType);
				console.log('Effect1.' + k + ' Round: ' + effRound);
				console.log('Effect1.' + k + ' Num: ' + effRound);
				console.log('Effect1.' + k + ' Ratio: ' + effRatio);
				if(effType === 'hurt') {
					console.log('In Hurt');
					var actAtk = heroList[actor].bStats().atk;
					var targArmor = heroList[target.getPos()].bStats().arm;
					var targDecDmg = heroList[target.getPos()].bStats().decDmg;
					var targLevel = heroList[target.getPos()].level;
					console.log('actor Atk: ' + actAtk);
					console.log('target Armor: ' + targArmor);
					console.log('target Red Dmg: ' + targDecDmg);
					console.log('target Level: ' + targLevel);
					var rawDmg = Math.floor(actAtk * effNum);
					var mitDmg = Math.floor(rawDmg * (1 - targArmor / (20 * targLevel + 180)) * (1 - targDecDmg));
					console.log('rawDmg: ' + rawDmg);
					console.log('mitDmg: ' + mitDmg);
					heroList[target.getPos()].applyDmg(mitDmg);
					heroList[actor].acted = true;
					console.log('targetHp: ' + heroList[target.getPos()].curHp);
				}
			}
		}
		state.setHeroList(heroList);
	}
	function resCheck(checkType) {
		var checkOutcome = 0; //0 means failed check, 1 means passed
		return checkOutcome;
	}
	function stepBuffPhase() {
		console.log('In Buff Phase!');
		/*if(!stepActionStack()) { //Means action queue is empty
			//Add resolving buff code here
		}*/
		incPhase();
	}
	function stepMonsPhase() {
		console.log('In Monster Phase!');
		/*if(!stepActionStack()) { //Means action queue is empty
			//Add resolving monster code here
		}*/
		incPhase();
	}
	function checkUnActed() {
		//Check to see if there are any heroes who can still act this turn
		var heroList = state.getHeroList();
		var unActedCheck = true;
		for(var i = 0; i < heroList.length; i++) {
			unActedCheck = unActedCheck && heroList[i].acted;
		}
		return unActedCheck;
	}
	function checkAlive(team) {
		//Check to see if any heroes on the team are alive
		var heroList = state.getHeroList();
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
	function continueBattle() {
		console.log('In Continue Battle!');
		phase = state.getPhase();
		round = state.getRound();
		//Check for end battle conditions
		if(!checkAlive('atk')) { //Lose conditions: attacking team is dead
			console.log('Attackers Lose!');
			return 'Lose';
		} else if(round > 15 || (round === 15 && phase === 3)) { //Stalemate conditions: Round has passed 15 (error), round is 15 and everyone has acted
			console.log('Attackers Lose (by stalemeate!');
			return 'Stalemate';
		} else if(!checkAlive('def')) { //Win Conditions: defending team is dead;
			console.log('Attackers Win!')
			return 'Win';
		} else if(phase === 3) {
			//Round is done, go to next round
			incRound();
			return 'Round';
		} else if(phase === 2) {
			//Inside the hero phase
			stepHeroPhase();
			return 'Hero';
		} else if(phase === 1) {
			//Inside the buff/debuff phase
			stepBuffPhase();
			return 'Buff';
		} else if(phase === 0) {
			//Inside the monster phase
			stepMonsPhase();
			return 'Mons';
		} else {
			console.log('Error, invalid phase');
			return 'Error';
		}

	}
	return {
		contBattle:function() {
			return continueBattle();
		}
	}
});
