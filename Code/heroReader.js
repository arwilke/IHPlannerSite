var hero = (function(heroCore, level = 250, weapon = {}, armor = {}, shoes = {}, acc = {}, treas = {}, arti = {}, skin  = {}, aura = {}, tech = [{},{},{},{},{},{},{},{}], setBonus = [{},{},{}], pet = {}){

	level = Math.max(1,Math.floor(level));  //Sanitizes level to be a positive integer
	//var tech = myTech.getTechStats(heroCore.job);
	var useSkill = true;
	var tierValue = 2.2;
	var tierSpeed = 1.6;
	var tier = {'atk':tierValue,'hp':tierValue,'spd':tierSpeed}; //Need to figure out where this comes from
	function battleStatOrder() {
		return [tech[0], tech[1], tech[2], tech[3], tech[4], tech[5], tech[6], tech[7],
	  'pass',
	  aura,
	  weapon, armor, shoes, acc,
	  'classWeapon', 'classArmor', 'classShoes', 'classAcc', //Class Gear
	  setBonus[0], setBonus[1], setBonus[2],
	  treas,
	  arti,
	  skin,
	  pet];
	}

	function sheetStatOrder() {
	  return [weapon, armor, shoes, acc,
	  'classWeapon', 'classArmor', 'classShoes', 'classAcc', //Class Gear
	  skin,
	  setBonus[0], setBonus[1], setBonus[2],
	  tech[0], tech[1], tech[2], tech[3], tech[4], tech[5], tech[6], tech[7],
	  'pass',
		arti,
	  treas];
	}

	function guideStatOrder() {
		return ['pass'];
	}

	function addHeroFlatStat(stat){
		var heroFlatStat = 0;
		var myTier = 1;
		if(heroStatPair[stat] != undefined) {
			if(heroCore[heroStatPair[stat][0]] != undefined && heroCore[heroStatPair[stat][1]] != undefined) {
				heroFlatStat = heroCore[heroStatPair[stat][0]] + (level - 1) * heroCore[heroStatPair[stat][1]];
			}
		}
		if(tier[stat] != undefined) {
			myTier = tier[stat];
		}
		return Math.floor(heroFlatStat * myTier);
	}

	function addPassFlatStat(stat) {
		//Need to defined passives
		passFlatStat = 0;
		//console.log('In addPassFlatStat(' + stat + ')');
		for(var i = 0; i < skillKeyList.length; i++) {
			passFlatStat += getSkillStat(skillKeyList[i],stat);
		}
		return passFlatStat;
	}

	function addOtherFlatStat(statSource,stat){
		//Works for Flat Stats from weapons, armors, shoes, accessories, gear sets, gear class stats, treasures, artifacts, pets, tech, skin, aura
		//Does NOT work for heroFlat or passiveFlat
		if(statSource.stats != undefined) {
			if(statSource.stats[stat] != undefined) {
				return statSource.stats[stat];
			}
		}
		return 0;
	}

	function addPassMultStat(curStat,stat) {
		//Need to defined passives
		//console.log('In addPassMultStat(' + stat + ')');
		for(var i = 0; i < skillKeyList.length; i++) {
			curStat = Math.floor(curStat * (1 + getSkillStat(skillKeyList[i],stat)));
		}
		return curStat;
	}

	function prodMultStat(curStat,statSource,stat) {
		if(statSource.stats != undefined) {
			if(statSource.stats[stat] != undefined) {
				return Math.floor(curStat * (1 + statSource.stats[stat]));
			}
		}
		return curStat;
	}

	function getSkillStat(skillKey,stat) {
		effectKeyList = ['1','2','3','4','5'];
		if(heroCore[skillKey] != undefined) {
			//console.log(skillKey + ' Name: ' + heroCore[skillKey].name);
			if(heroCore[skillKey].details != undefined) {
				//console.log(skillKey + ' trigger: ' + heroCore[skillKey].details.trigger);
				if(heroCore[skillKey].details.trigger == 23) {
					if(heroCore[skillKey].details.effect != undefined) {
						//console.log(skillKey + ' effect(' + effectKeyList[i] + ')');
						for(var i = 0; i < effectKeyList.length; i++) {
							//console.log(skillKey + ' effect(' + effectKeyList[i] + ')');
							if(heroCore[skillKey].details.effect[effectKeyList[i]] != undefined) {
								//console.log(skillKey + ' effect(' + effectKeyList[i] + ')2');
								if(heroCore[skillKey].details.effect[effectKeyList[i]].type == stat) {
									//console.log('Skill ' + skillKey + ' has ' + stat + ' of ' + heroCore[skillKey].details.effect[effectKeyList[i]].num);
									return heroCore[skillKey].details.effect[effectKeyList[i]].num;

								}
							}
						}
					}
					if(heroCore[skillKey].details.effect2 != undefined) {
						for(var i = 0; i < effectKeyList.length; i++) {
							if(heroCore[skillKey].details.effect2[effectKeyList[i]] != undefined) {
								if(heroCore[skillKey].details.effect2[effectKeyList[i]].type == stat) {
									//console.log('Skill ' + skillKey + ' has ' + stat + ' of ' + heroCore[skillKey].details.effect2[effectKeyList[i]].num);
									return heroCore[skillKey].details.effect2[effectKeyList[i]].num;

								}
							}
						}
					}
				}
			}
		}
		return 0;
	}

	function getStats(orderCode){
		//console.log('In getStats('+orderCode+')');
		var statOrder = [];
		var myStat = 0;
		var statObject = {};
		/*if(aura.name !== undefined) {
			console.log('(in hero) Aura: ' + aura.name);
		} else {
			console.log('(in hero) Aura: None');
		}*/
		switch(orderCode) {
			case 'b':
				statOrder = battleStatOrder();
				break;
			case 's':
				statOrder = sheetStatOrder();
				break;

			case 'g':
				statOrder = guideStatOrder();
				break;
		}
		for(var i = 0; i < statList.length; i++) {
			myStat = 0;
			//console.log('Calc ' + statList[i] + ': ' + myStat);
			myStat += addHeroFlatStat(statList[i]);
			//if(statList[i] !== 'level') {
				for(var k = 0; k < statOrder.length; k++) {
					//console.log('Calc ' + statList[i] + ' - ' + statOrder[k] + ': ' + myStat);
					switch (statOrder[k]) {
						case 'pass':
							myStat += addPassFlatStat(statList[i]);
							break;
						case 'classWeapon':
							myStat += addOtherFlatStat(weapon,classStatList[statList[i]][heroCore.job]);
							break;
						case 'classArmor':
							myStat += addOtherFlatStat(armor,classStatList[statList[i]][heroCore.job]);
							break;
						case 'classShoes':
							myStat += addOtherFlatStat(shoes,classStatList[statList[i]][heroCore.job]);
							break;
						case 'classAcc':
							myStat += addOtherFlatStat(acc,classStatList[statList[i]][heroCore.job]);
							break;
						default:
							myStat += addOtherFlatStat(statOrder[k],statList[i]);
					}
				}
			//}
			for(var k = 0; k < statOrder.length; k++) {
				switch (statOrder[k]) {
					case 'pass':
						myStat = addPassMultStat(myStat,statAddMultPair[statList[i]]);
						break;
					default:
						myStat = prodMultStat(myStat,statOrder[k],statAddMultPair[statList[i]]);
				}
			}

			statObject[statList[i]] = myStat/statScaling[statList[i]];
		}
		return statObject;
	}

	return {
		bStats:function(){
			return getStats('b');
		},
		sStats:function(){
			return getStats('s');
		},
		gStats:function(){
			return getStats('g');
		},
		cStats:heroCore,
		printHeroStats:function(calcMethod) {
			var printHP = 0;
			var printAtk = 0;
			var printArm = 0;
			var printSpd = 0;
			var printSklP = 0;
			var printPrec = 0;
			var printBlock = 0;
			var printCrit = 0;
			var printCritTime = 0;
			var printBrk = 0;
			var printFree = 0;
			var printDecDmg = 0;
			var printTrueAtk = 0;
			var printEnergy = 0;
			switch(calcMethod) {
				case 's':
					printHP = this.sStats().hp;
					printAtk = this.sStats().atk;
					printArm = this.sStats().arm;
					printSpd = this.sStats().spd;
					printSklP = this.sStats().sklP;
					printPrec = this.sStats().prec;
					printBlock = this.sStats().block;
					printCrit = this.sStats().crit;
					printCritTime = this.sStats().critTime;
					printBrk = this.sStats().brk;
					printFree = this.sStats().free;
					printDecDmg = this.sStats().decDmg;
					printTrueAtk = this.sStats().trueAtk;
					printEnergy = this.sStats().energy;
					break;
				case 'g':
					printHP = this.gStats().hp;
					printAtk = this.gStats().atk;
					printArm = this.gStats().arm;
					printSpd = this.gStats().spd;
					printSklP = this.gStats().sklP;
					printPrec = this.gStats().prec;
					printBlock = this.gStats().block;
					printCrit = this.gStats().crit;
					printCritTime = this.gStats().critTime;
					printBrk = this.gStats().brk;
					printFree = this.gStats().free;
					printDecDmg = this.gStats().decDmg;
					printTrueAtk = this.gStats().trueAtk;
					printEnergy = this.gStats().energy;
					break;
				default:
					printHP = this.bStats().hp;
					printAtk = this.bStats().atk;
					printArm = this.bStats().arm;
					printSpd = this.bStats().spd;
					printSklP = this.bStats().sklP;
					printPrec = this.bStats().prec;
					printBlock = this.bStats().block;
					printCrit = this.bStats().crit;
					printCritTime = this.bStats().critTime;
					printBrk = this.bStats().brk;
					printFree = this.bStats().free;
					printDecDmg = this.bStats().decDmg;
					printTrueAtk = this.bStats().trueAtk;
					printEnergy = this.bStats().energy;
			}
			console.log(this.cStats.heroName + '(' + calcMethod + ') hp: ' + printHP + ' energy: ' + printEnergy + ' atk: ' + printAtk + ' arm: ' + printArm + ' spd: ' + printSpd + ' sklP: ' + printSklP + ' prec: ' + printPrec + ' block: ' + printBlock + ' crit: ' + printCrit + ' critTime: ' + printCritTime + ' brk: ' + printBrk + ' free: ' + printFree + ' decDmg: ' + printDecDmg + ' trueAtk: ' + printTrueAtk);
		},
		setAura:function(newAura){
			aura = newAura;
			return aura;
		},
		exists:true,
		level:level
	}
});
var heroCoreList = [{
	"heroName": "Vesa",
	"starExp1": {
		"1": 50,
		"2": 10000
	},
	"qlt": 6,
	"starLv6": 100,
	"starLv4": 60,
	"xpBase": 100000,
	"baseArm": 60,
	"growArm": 6,
	"energyBase": 50,
	"starExp2": {
		"1": 100,
		"2": 20000
	},
	"name": "维萨5",
	"baseHp": 6032,
	"pasSkill2Id": 2636,
	"pasSkill3Id": 2637,
	"growAtk": 35.4,
	"atkId": 3023,
	"starExp5": {
		"1": 1000,
		"2": 500000
	},
	"material": {
		"1": 5408,
		"2": 5408,
		"3": 6499,
		"4": 9999
	},
	"baseSpd": 200,
	"maxStar": 10,
	"pasTier1": 2,
	"starExp6": {
		"1": 2000,
		"2": 1000000
	},
	"pasTier2": 4,
	"pasSkill1Id": 2635,
	"starExp4": {
		"1": 400,
		"2": 100000
	},
	"heroCard": 1183,
	"disillusSkill": {
		"1": {
			"disi": {
				"1": 1307,
				"2": 2635,
				"3": 2636,
				"4": 2637
			}
		}
	},
	"disillusGrow": {
		"1": {
			"disiG": {
				"1": 35.4,
				"2": 603.2,
				"3": 6,
				"4": 2
			}
		}
	},
	"group": 4,
	"disillusMaterial": {
		"1": {
			"disi": {
				"1": 5408,
				"2": 5408,
				"3": 6499,
				"4": 9999
			}
		}
	},
	"showInGuide": 1,
	"starLv2": 40,
	"maxLv": 250,
	"heroBody": 1183,
	"rune": 12500,
	"stoneMaterial": {
		"1": 10000
	},
	"pasTier3": 6,
	"skinId": {
		"1": 60083
	},
	"actSkillId": 1307,
	"growHp": 603.2,
	"starLv3": 50,
	"job": 5,
	"tierBase": 12500,
	"starExp3": {
		"1": 200,
		"2": 50000
	},
	"starLv1": 30,
	"starLv5": 80,
	"growSpd": 2,
	"baseAtk": 354,
	"id": 75409,
	"atkSkill": {
		"id": 3023,
		"details": {
			"effect": {
				"1": {
					"round": 0,
					"num": 1,
					"ratio": 1,
					"type": "hurt"
				}
			},
			"fxSelf": {
				"1": 1040
			},
			"trigger": 1,
			"fxHurt1": {
				"1": 1042
			},
			"fxMain1": {
				"1": 1041
			},
			"sound": "zisejiguang",
			"obj1": 11,
			"kind": 1
		}
	},
	"actSkill": {
		"id": 1307,
		"name": "Sky collapse",
		"desc": "Active skill: Deals(272% of attack) damage against 4 random enemies and heals allies for(120% of attack) HP, last 6 rounds.",
		"details": {
			"effect": {
				"1": {
					"round": 0,
					"num": 2.72,
					"ratio": 1,
					"type": "hurt"
				}
			},
			"iconId": 245,
			"sound": "siwanglianren",
			"effect2": {
				"1": {
					"round": 5,
					"num": 2.4,
					"ratio": 1,
					"type": "hot"
				}
			},
			"rand1": 4,
			"trigger": 1,
			"fxMain1": {
				"1": 5210,
				"2": 5211
			},
			"fxSelf": {
				"1": 5220
			},
			"obj2": 3,
			"obj1": 24,
			"kind": 1
		}
	},
	"pasSkill1": {
		"id": 2635,
		"name": "Queen's amnesty III",
		"desc": "Passive skill: Increases Attack by 30%, HP by 25% and Crit by 35%.",
		"details": {
			"effect": {
				"1": {
					"round": 0,
					"num": 0.3,
					"ratio": 1,
					"type": "atkP"
				},
				"2": {
					"round": 0,
					"num": 0.25,
					"ratio": 1,
					"type": "hpP"
				},
				"3": {
					"round": 0,
					"num": 700,
					"ratio": 1,
					"type": "crit"
				}
			},
			"iconId": 246,
			"trigger": 23,
			"skiL": 3,
			"attrPas": 1,
			"obj1": 1,
			"kind": 2
		}
	},
	"pasSkill2": {
		"id": 2636,
		"name": "Symphony of stars III",
		"desc": "Passive skill: Each attack heals you for(120% of attack) HP for 3 rounds and grants you +30% Attack for 3 rounds.",
		"details": {
			"effect": {
				"1": {
					"round": 2,
					"num": 2.4,
					"ratio": 1,
					"type": "hot"
				},
				"2": {
					"round": 3,
					"num": 0.3,
					"ratio": 1,
					"type": "atkP"
				}
			},
			"iconId": 247,
			"trigger": 2,
			"skiL": 3,
			"obj1": 1,
			"kind": 2
		}
	},
	"pasSkill3": {
		"id": 2637,
		"name": "Elegy of confusion III",
		"desc": "Passive skill: While below 50% health, has 100% chance to silence for 1 rounds to all enemies and increases own Crit Damage by 60% for 6 rounds.(Can only trigger once)",
		"details": {
			"effect": {
				"1": {
					"round": 1,
					"num": 0,
					"ratio": 1,
					"type": "forbid"
				}
			},
			"iconId": 248,
			"trigger": 17,
			"skiL": 3,
			"obj1": 12,
			"obj2": 1,
			"effect2": {
				"1": {
					"round": 6,
					"num": 600,
					"ratio": 1,
					"type": "critTime"
				}
			},
			"kind": 2
		}
	},
	"disiG": [
		[
			35.4,
			603.2,
			6,
			2
		]
	],
	"disiSkill": [
		[
			{
				"id": 1307,
				"name": "Sky collapse",
				"desc": "Active skill: Deals(272% of attack) damage against 4 random enemies and heals allies for(120% of attack) HP, last 6 rounds.",
				"details": {
					"effect": {
						"1": {
							"round": 0,
							"num": 2.72,
							"ratio": 1,
							"type": "hurt"
						}
					},
					"iconId": 245,
					"sound": "siwanglianren",
					"effect2": {
						"1": {
							"round": 5,
							"num": 2.4,
							"ratio": 1,
							"type": "hot"
						}
					},
					"rand1": 4,
					"trigger": 1,
					"fxMain1": {
						"1": 5210,
						"2": 5211
					},
					"fxSelf": {
						"1": 5220
					},
					"obj2": 3,
					"obj1": 24,
					"kind": 1
				}
			},
			{
				"id": 2635,
				"name": "Queen's amnesty III",
				"desc": "Passive skill: Increases Attack by 30%, HP by 25% and Crit by 35%.",
				"details": {
					"effect": {
						"1": {
							"round": 0,
							"num": 0.3,
							"ratio": 1,
							"type": "atkP"
						},
						"2": {
							"round": 0,
							"num": 0.25,
							"ratio": 1,
							"type": "hpP"
						},
						"3": {
							"round": 0,
							"num": 700,
							"ratio": 1,
							"type": "crit"
						}
					},
					"iconId": 246,
					"trigger": 23,
					"skiL": 3,
					"attrPas": 1,
					"obj1": 1,
					"kind": 2
				}
			},
			{
				"id": 2636,
				"name": "Symphony of stars III",
				"desc": "Passive skill: Each attack heals you for(120% of attack) HP for 3 rounds and grants you +30% Attack for 3 rounds.",
				"details": {
					"effect": {
						"1": {
							"round": 2,
							"num": 2.4,
							"ratio": 1,
							"type": "hot"
						},
						"2": {
							"round": 3,
							"num": 0.3,
							"ratio": 1,
							"type": "atkP"
						}
					},
					"iconId": 247,
					"trigger": 2,
					"skiL": 3,
					"obj1": 1,
					"kind": 2
				}
			},
			{
				"id": 2637,
				"name": "Elegy of confusion III",
				"desc": "Passive skill: While below 50% health, has 100% chance to silence for 1 rounds to all enemies and increases own Crit Damage by 60% for 6 rounds.(Can only trigger once)",
				"details": {
					"effect": {
						"1": {
							"round": 1,
							"num": 0,
							"ratio": 1,
							"type": "forbid"
						}
					},
					"iconId": 248,
					"trigger": 17,
					"skiL": 3,
					"obj1": 12,
					"obj2": 1,
					"effect2": {
						"1": {
							"round": 6,
							"num": 600,
							"ratio": 1,
							"type": "critTime"
						}
					},
					"kind": 2
				}
			}
		]
	]
}
];
