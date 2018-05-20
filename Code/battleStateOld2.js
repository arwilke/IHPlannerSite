//battleState
//Keeps track of all aspects of the battle at any point in time
var battleState = (function(attTeam, defTeam) {
	function applyTeamAura(team){
		var teamStartPos = 0;
		switch(team) {
			case 'def':
				teamStartPos = 6;
				break;
			case 'att':
			default:
		}
		//Team Aura Code
	}
	var round = 0;
	var curPhase = 0; //0 Start of Round, 1 Monster Finished, 2 Buffs finished, 3 Heroes Finished
	var heroList = [{},{},{},{},{},{},{},{},{},{},{},{}];
	//Something to set the members of attTeam and defTeam to heroList
	//var attMonster = attTeam.monster;
	//attMonster.energy = 0;
	//var defMonster = defTeam.monster;
	//defMonster.energy = 0;
	applyTeamAura('att');
	applyTeamAura('def');
	var skillQueue = []; //An array of actionInstance() objects, position 0 is the skill currently being resolved
	//skillQueue.push adds to the end/bottom of the stack, skillQueue.shift removes the from the start/top of the queue

	return {
		getHeroList:function(){return heroList;},
		setHeroList:function(newHeroList){
			heroList = newHeroList;
			return 1;
		},
		getAttMonster:function(){return attMonster;},
		setAttMonster:function(newAttMonster){
			attMonster = newAttMonster;
			return 1;
		},
		getDefMonster:function(){return defMonster;},
		setDefMonster:function(newDefMonster){
			defMonster = newDefMonster;
			return 1;
		},
		getSkillQueue:function(){return skillQueue;},
		setSkillQueue:function(newSkillQueue){
			skillQueue = newSkillQueue;
			return 1;
		},
		getRound:function(){return round;},
		nextRound:function(){
			round++;
			curPhase = 0;
			return 1;
		},
		getPhase:function(){return curPhase;},
		nextPhase:function(){
			curPhase++;
			return 1;
		}
	}
});

var actionInstance = (function(actorPos, action) {
	var targetsE1 = [];
	var targetsE2 = [];
	return {
		getActor:function(){
			return actorPos;
		},
		setActor:function(newActorPos){
			actorPos = newActor;
			return 1;
		},
		getAction:function(){
			return action;
		},
		setAction:function(newAction){
			action = newAction;
			return 1;
		},
		getTargetsE1:function(){
			return targetsE1;
		},
		setTargetsE1:function(newTargetsE1){
			targetsE1 = newTargetsE1;
			return 1;
		},
		getTargetsE2:function(){
			return targetsE2;
		},
		setTargetsE2:function(newTargetsE2){
			targetsE2 = newTargetsE2;
			return 1;
		}
	}
});

var effectTarget = (function(pos){
	var tarResolved = false;
	var checkList = [{}]; //{'check':crit,'state':-1} -1 for not checked, 0 for checked and failed, 1 for checked and passed
	return {
		getPos:function() {
			return pos;
		},
		setPos:function(newPos) {
			pos = newPos;
			return 1;
		},
		getCheckList:function() {
			return checkList;
		},
		setCheckList:function(newCheckList) {
			checkList = newCheckList;
			return 1;
		},
		getResolved:function() {
			return tarResolved;
		},
		setResolved:function(newResolved) {
			resolved = newResolved;
			return 1;
		}
	}
});

/*
Involved Hero Teams
	2 Hero Teams (Attacking Team, Defending Team)
		6 Heros per team
			Which position (1 to 6) the hero is in
			Whether the hero is alive
			Whether the hero has acted this round
			Whether the hero is controlled
		Team Aura (if applicable)
		Monster

Round
	0 during battle set up, battle ends at the end of Round 15

Monster Summon Bar
	Separate for Attackers and Defenders

Acting Hero - Which hero is currently Acting (maybe track by position)

skillStack - Add a skillUse to the skillStack every time a trigger is met
skillStack = [{"userPos":skillUserPos, "trigPos":skillTriggererPos, "skillSlot":actSkill},...];

targetList - list of target objects for current skill

targetList[i] = new target(targetPos,skill.details.effect,);


Acting Hero Has Target 1 - (Target Object, see below)
*/
