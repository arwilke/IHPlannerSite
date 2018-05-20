//battleState
//Keeps track of all aspects of the battle at any point in time
var battleState = (function(attTeam, defTeam) {
	var heroList = [{},{},{},{},{},{},{},{},{},{},{},{}];
	for(var i = 0; i < attTeam.getHero().length; i++) {
		heroList[i] = cloneObject(attTeam.getHero(i+1));
	}
	for(var i = 0; i < defTeam.getHero().length; i++) {
		heroList[i+6] = cloneObject(defTeam.getHero(i+1));
	}
	//Something to set the members of attTeam and defTeam to heroList
	var monsList = [{},{}];
	if(attTeam.monster !== undefined) {
		monsList[0] = attTeam.monster
	}
	if(defTeam.monster !== undefined) {
		monsList[1] = defTeam.monster
	}
	var round = 0;
	var phase = 0; //0 Start of Round, 1 Monster Finished, 2 Buffs finished, 3 Heroes Finished

	for(var i = 0; i < heroList.length; i++) {
		if(heroList[i].exists) {
			heroList[i].curHp = heroList[i].bStats().hp;
			heroList[i].curEn = heroList[i].bStats().energy + 50;
			heroList[i].alive = true;
			heroList[i].acted = false;
			heroList[i].frozen = false;
			heroList[i].stunned = false;
			heroList[i].petrified = false;
			heroList[i].silenced = false;
			heroList[i].poisoned = false;
			heroList[i].burning = false;
			heroList[i].bleeding = false;
			heroList[i].ctrld = (function() {
				return (this.frozen || this.stunned || this.petrified);
			});
			heroList[i].applyDmg = (function(dmg) {
				this.curHp = Math.max(0,this.curHp - dmg);
				if(this.curHp === 0) {
					this.alive = false;
				}
				return 1;
			});
			console.log('In Pos ' + (i + 1) + ':');
			heroList[i].printHeroStats('b');
			console.log('Cur Hp: ' + heroList[i].curHp + ', Cur Energy: ' + heroList[i].curEn + ', Alive: ' + heroList[i].alive + ', Acted: ' + heroList[i].acted + ', Controlled: ' + heroList[i].ctrld());
		} else {
			console.log('In Pos ' + (i + 1) + ':');
			console.log('Empty');
		}
	}

	var actionStack = []; //An array of actionInstance() objects, position 0 is the skill currently being resolved
	//actionStack.push adds to the end/bottom of the stack, actionStack.shift removes the from the start/top of the queue

	return {
		getHeroList:function(){return heroList;},
		setHeroList:function(newHeroList){
			heroList = newHeroList;
			return 1;
		},
		getMonster:function(side = 0){
			if(side) {
				return defMonster;
			} else {
				return attMonster
			}
		},
		setMonster:function(newMonster,side = 0){
			if(side) {
				defMonster = newMonster;
				return 1;
			} else {
				attMonster = newMonster;
				return 1
			}
		},
		getActionStack:function(){return actionStack;},
		setActionStack:function(newActionStack){
			actionStack = newActionStack;
			return 1;
		},
		getRound:function(){return round;},
		nextRound:function(){
			round++;
			phase = 0;
			return 1;
		},
		getPhase:function(){return phase;},
		nextPhase:function(){
			phase++;
			return 1;
		}
	}
});

var actionInstance = (function(actorPos, action) {
	console.log('action: ' + action);
	console.log('actorPos: ' + actorPos);
	var targetsE1 = [];
	var targetsE2 = [];
	return {
		getActor:function(){return actorPos;},
		getAction:function(){return action;},
		getTargets:function(eff = 1){
			if(eff !== 2) {
				return targetsE1;
			} else {
				return targetsE2;
			}
		},
		setTargets:function(newTargets,eff = 1){
			if(eff !== 2) {
				targetsE1 = newTargets;
				return 1;
			} else {
				targetsE2 = newTargets;
				return 1;
			}
		}
	}
});

var effectTarget = (function(pos){
	var tarResolved = false;
	var checkList = [{}]; //{'check':'crit','state':-1} -1 for not checked, 0 for checked and failed, 1 for checked and passed
	return {
		getPos:function() {return pos;},
		getCheckList:function() {return checkList;},
		setCheckList:function(newCheckList) {
			checkList = newCheckList;
			return 1;
		},
		getResolved:function() {
			var resolved = true;
			for(var i = 0; i < checkList.length; i++) {
				resolved = resolved && (checkList[i].state >= 0);
			}
			return resolved;
		}
	}
});
