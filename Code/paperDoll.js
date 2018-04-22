var paperDoll = (function(hero, tier, level){
	var setsEquipped = [0,0,0,0,0,0,0,0,0,0,0,0];
	var tierMod = 2.2;
	var spdTierMod = 1.6;  // Need to add function for this
	var equippedWeapon = NONE_ITEM;
	var equippedArmor = NONE_ITEM;
	var equippedShoes = NONE_ITEM;
	var equippedAccessory = NONE_ITEM;
  var equippedArtifactType =  NONE_ITEM;
  var equippedArtifactLevel = -1;
  var equippedTreasureType =  NONE_ITEM;
  var equippedTreasureLevel = -1;
	var equippedSkin =  NONE_ITEM;
	function addSetPiece(setName) {
		for(var i = 0; i < gearSets.length; i++) {
			if(gearSets[i].Name === setName) {setsEquipped[i]++;}
		}
	}
	function removeSetPiece(setName) {
		for(var i = 0; i < gearSets.length; i++) {
			if((gearSets[i].Name === setName) && (setsEquipped[i] > 0)) {	setsEquipped[i]--;}
		}
	}
	function addLevelStat(statKey) {
		switch(statKey) {
			case 'atk':
				return Math.floor((hero.baseAtk + (level - 1) * hero.growAtk) * tierMod);
				break;
			case 'hp':
				return Math.floor((hero.baseHp + (level - 1) * hero.growHp) * tierMod);
				break;
			case 'arm':
				return Math.floor(hero.baseArm + (level - 1) * hero.growArm);
				break;
			case 'spd':
				return Math.floor((hero.baseSpd + (level - 1) * hero.growSpd) * spdTierMod);
				break;
			default:
			return 0;
		}
	}
	function getAdditiveStat(statKey) {
		//console.log(statKey + ': ' + equippedWeapon[])
		var additiveStat = 0;
		additiveStat += addLevelStat(statKey);
		additiveStat += addGuildTechStat(statKey);
		additiveStat += addGearSetStat(statKey);
		additiveStat += addArtifactStat(statKey);
		additiveStat += addTreasureStat(statKey);
		additiveStat += addSkinStat(statKey);
		additiveStat += addAuraStat(statKey);
		additiveStat += addPassiveStat(statKey);
		if(equippedWeapon[statKey]!== undefined) {additiveStat += equippedWeapon[statKey];}
		if(equippedArmor[statKey] !== undefined) {additiveStat += equippedArmor[statKey];}
		if(equippedShoes[statKey] !== undefined) {additiveStat += equippedShoes[statKey];}
		if(equippedAccessory[statKey] !== undefined) {additiveStat += equippedAccessory[statKey];}
		/*if((equippedArtifactType.stats !== undefined) && (equippedArtifactLevel >= 0)) {
			if(equippedArtifactType.stats[equippedArtifactLevel][statKey] !== undefined){
				additiveStat += equippedArtifactType.stats[equippedArtifactLevel][statKey];
			}
		}*/
		/*if((equippedTreasureType.stats !== undefined) && (equippedTreasureLevel >= 0)) {
			if(equippedTreasureType.stats[equippedTreasureLevel][statKey] !== undefined){
				additiveStat += equippedTreasureType.stats[equippedTreasureLevel][statKey];
			}
		}*/
		/*if(equippedSkin[statKey] !== undefined) {additiveStat += equippedSkin[statKey];}*/
		return additiveStat;
	}
	function addPassiveStat(statKey) {
		var statValue = 0;
		if(hero.disiSkill !== undefined) {
			heroSkillList = hero.disiSkill[0];
			for(var i = 0; i < heroSkillList.length; i++) {
				if(heroSkillList[i].details !== undefined) {
					if(heroSkillList[i].details.attrPas === 1 && heroSkillList[i].details.effect !== undefined) {
						var passiveEffects = Object.entries(heroSkillList[i].details.effect);
						for(var k = 0; k < passiveEffects.length; k++) {
							if(passiveEffects[k][1].type !== undefined && passiveEffects[k][1].round !== undefined && passiveEffects[k][1].num !== undefined) {
								if(passiveEffects[k][1].type === statKey && passiveEffects[k][1].round === 0) {
									statValue	+= passiveEffects[k][1].num;
								}
							}
						}
					}
				}
			}
		}
		return statValue;
	}
	function addGearSetStat(statKey) {
		var statValue = 0;
		for(var i = 0; i < setsEquipped.length; i++) {
			if((setsEquipped[i] >= 2) && (gearSets[i].bonus2 !== undefined)) {
				if(gearSets[i].bonus2[statKey] !== undefined) {
						statValue += gearSets[i].bonus2[statKey];
				}
			}
			if((setsEquipped[i] >= 3) && (gearSets[i].bonus3 !== undefined)) {
				if(gearSets[i].bonus3[statKey] !== undefined) {
						statValue += gearSets[i].bonus3[statKey];
				}
			}
			if((setsEquipped[i] >= 4) && (gearSets[i].bonus4 !== undefined)) {
				if(gearSets[i].bonus4[statKey] !== undefined) {
						statValue += gearSets[i].bonus4[statKey];
				}
			}
		}
		return statValue;
	}
	function addGuildTechStat(statKey) {
		var statValue = 0;
		//var outputAtk = inputAtk;
		myTechStats = myTech.getTechStats(hero.job);
		for (var i=0; i <= 7; i++) {
			if(myTechStats[i][statKey] !== undefined) {
				statValue += myTechStats[i][statKey];
			}
		}
		return statValue;
	}
	function addArtifactStat(statKey) {
		var statValue = 0;
		if((equippedArtifactType.stats !== undefined) && (equippedArtifactLevel > -1)) {
			if(equippedArtifactType.stats[equippedArtifactLevel][statKey] !== undefined) {
				statValue += equippedArtifactType.stats[equippedArtifactLevel][statKey];
			}
		}
		return statValue;
	}
	function addTreasureStat(statKey) {
		var statValue = 0;
    if((equippedTreasureType.stats !== undefined) && (equippedTreasureLevel > -1)) {
      if(equippedTreasureType.stats[equippedTreasureLevel][statKey] !== undefined) {
				statValue += equippedTreasureType.stats[equippedTreasureLevel][statKey];
      }
    }
    return statValue;
  }
	function addSkinStat(statKey) {
		var statValue = 0;
		if(equippedSkin.stats !== undefined) {
			if(equippedSkin.stats[statKey] !== undefined) {
				statValue += equippedSkin.stats[statKey];
			}
		}
		return statValue;
	}
	function addAuraStat(statKey) {
		return 0; //Need Aura
	}
	function getMultiplicativeStat(statKey,order) {
		var multiStat = getAdditiveStat(statKey);
		var altStatKey = statKey + 'P';
		//console.log('In Get Mult Stat, ' + altStatKey + ': ' + multiStat);
		if(order === 'sheet') { //Skin, Gear, Tech, Pass, Arti, Trea
			multiStat = multSkinStat(multiStat,altStatKey);
			multiStat = multGearSetStat(multiStat,altStatKey);
			multiStat = multGuildTechStat(multiStat,altStatKey);
			multiStat = multPassiveStat(multiStat,altStatKey);
			multiStat = multArtifactStat(multiStat,altStatKey);
			multiStat = multTreasureStat(multiStat,altStatKey);
		} else if(order === 'battle') { //Tech, Pass, Aura, Gear, Trea, Arti, Skin
			multiStat = multGuildTechStat(multiStat,altStatKey);
			multiStat = multPassiveStat(multiStat,altStatKey);
			multiStat = multAuraStat(multiStat,altStatKey);
			multiStat = multGearSetStat(multiStat,altStatKey);
			multiStat = multTreasureStat(multiStat,altStatKey);
			multiStat = multArtifactStat(multiStat,altStatKey);
			multiStat = multSkinStat(multiStat,altStatKey);
			multiStat = multMonsterStat(multiStat,altStatKey);
		}
		return multiStat;
	}
	function multGearSetStat(inputStat,statKey) {
		for(var i = 0; i < setsEquipped.length; i++) {
			if((setsEquipped[i] >= 2) && (gearSets[i].bonus2 !== undefined)) {
				if(gearSets[i].bonus2[statKey] !== undefined) {
					inputStat = Math.floor(inputStat * (1 + gearSets[i].bonus2[statKey]));
				}
			}
			if((setsEquipped[i] >= 3) && (gearSets[i].bonus3 !== undefined)) {
				if(gearSets[i].bonus3[statKey] !== undefined) {
					inputStat = Math.floor(inputStat * (1 + gearSets[i].bonus3[statKey]));
				}
			}
			if((setsEquipped[i] >= 4) && (gearSets[i].bonus4 !== undefined)) {
				if(gearSets[i].bonus4[statKey] !== undefined) {
					inputStat = Math.floor(inputStat * (1 + gearSets[i].bonus4[statKey]));
				}
			}
		}
		return inputStat;
	}
	function multGuildTechStat(inputStat,statKey) {
		//var outputAtk = inputAtk;
		myTechStats = myTech.getTechStats(5);
		for (var i=0; i <= 7; i++) {
			if(myTechStats[i][statKey] !== undefined) {
				inputStat = Math.floor(inputStat * (1 + myTechStats[i][statKey]));
			}
		}
		return inputStat;
	}
	function multArtifactStat(inputStat,statKey) {
    if((equippedArtifactType.stats !== undefined) && (equippedArtifactLevel > -1)) {
			if(equippedArtifactType.stats[equippedArtifactLevel][statKey] !== undefined) {
      		inputStat = Math.floor(inputStat * (1 + equippedArtifactType.stats[equippedArtifactLevel][statKey]));
      }
    }
    return inputStat;
  }
	function multTreasureStat(inputStat,statKey) {
		if((equippedTreasureType.stats !== undefined) && (equippedTreasureLevel > -1)) {
			if(equippedTreasureType.stats[equippedTreasureLevel][statKey] !== undefined) {
					//console.log('In Treasure Stats ' + equippedTreasureType.stats[equippedTreasureLevel][statKey]);
					inputStat = Math.floor(inputStat * (1 + equippedTreasureType.stats[equippedTreasureLevel][statKey]));
			}
		}
		return inputStat;
	}
	function multSkinStat(inputStat,statKey) {
		if(equippedSkin.stats !== undefined) {
			if(equippedSkin.stats[statKey] !== undefined) {
				inputStat = Math.floor(inputStat * (1 + equippedSkin.stats[statKey]));
			}
		}
		return inputStat;
	}
	function multPassiveStat(inputStat, statKey) {
		if(hero.disiSkill !== undefined) {
			heroSkillList = hero.disiSkill[0];
			for(var i = 0; i < heroSkillList.length; i++) {
				if(heroSkillList[i].details !== undefined) {
					if(heroSkillList[i].details.attrPas === 1 && heroSkillList[i].details.effect !== undefined) {
						var passiveEffects = Object.entries(heroSkillList[i].details.effect);
						for(var k = 0; k < passiveEffects.length; k++) {
							if(passiveEffects[k][1].type !== undefined && passiveEffects[k][1].round !== undefined && passiveEffects[k][1].num !== undefined) {
								if(passiveEffects[k][1].type === statKey && passiveEffects[k][1].round === 0) {
									if(statKey === 'atkP' || statKey === 'hpP') {
										inputStat = Math.floor(inputStat * (1 + passiveEffects[k][1].num));
									} else {
										inputStat	+= passiveEffects[k][1].num;
									}
								}
							}
						}
					}
				}
			}
		}
		return inputStat;
	}
	function multAuraStat(inputStat,statKey) {
		return Math.floor(inputStat * (1 + 0)); //Need Aura
	}
	function multMonsterStat(inputStat,statKey) {
		return Math.floor(inputStat * (1 + 0)); //Need Aura
	}
	return {
		getSetsEquipped:function(){
			return setsEquipped;
		},
		equipWeapon:function(weaponItem) {
			if(!(equippedWeapon.set === undefined)) {removeSetPiece(equippedWeapon.set);}
			if(!(weaponItem.set === undefined)) {addSetPiece(weaponItem.set);}
			equippedWeapon = weaponItem;
		},
		equipArmor:function(armorItem) {
			if(!(equippedArmor.set === undefined)) {
        removeSetPiece(equippedArmor.set);}
			if(!(armorItem.set === undefined)) {
        addSetPiece(armorItem.set);}
			equippedArmor = armorItem;
		},
		equipShoes:function(shoesItem) {
			if(!(equippedShoes.set === undefined)) {removeSetPiece(equippedShoes.set);}
			if(!(shoesItem.set === undefined)) {addSetPiece(shoesItem.set);}
			equippedShoes = shoesItem;
		},
		equipAccessory:function(accessoryItem) {
			if(!(equippedAccessory.set === undefined)) {removeSetPiece(equippedArmor.set);}
			if(!(accessoryItem.set === undefined)) {addSetPiece(accessoryItem.set);}
			equippedAccessory = accessoryItem;
		},
		equipArtifact:function(artifactItem, artifactLevel) {
			equippedArtifactType = artifactItem;
			equippedArtifactLevel = artifactLevel;
		},
		equipTreasure:function(treasureItem, treasureLevel) {
			equippedTreasureType = treasureItem;
			equippedTreasureLevel = treasureLevel;
		},
		equipSkin:function(skinItem) {
			equippedSkin = skinItem;
		},
		getEquippedWeapon:function() {return equippedWeapon;},
		getEquippedArmor:function() {return equippedArmor;},
		getEquippedShoes:function() {return equippedShoes;},
		getEquippedAccessory:function() {return equippedAccessory;},
    getEquippedArtifact:function() {return [equippedArtifactType, equippedArtifactLevel];},
    getEquippedTreasure:function() {return [equippedTreasureType, equippedTreasureLevel];},
		getEquippedSkin:function() {return equippedSkin;},
		getStat:function(statKey,order) {
			var myStat = 0;
			if(statKey === 'atk' || statKey === 'hp' || statKey === 'arm' || statKey === 'spd') {
				myStat = getMultiplicativeStat(statKey,order);
			} else {
				myStat = getAdditiveStat(statKey);
			}
			return myStat;
		},
		getBattleStat:function(statKey) {
			var battleStat = 0;
			if(statKey === 'atk' || statKey === 'hp' || statKey === 'arm' || statKey === 'spd') {
				battleStat = getMultiplicativeStat(statKey,'sheet');
			} else {
				battleStat = getAdditiveStat(statKey);
			}
			return battleStat;
		},
		getBattleAtk:function() {
			var battleAtk = getAdditiveStat('atk');
			battleAtk = addGuildTechStat(battleAtk,'atkP');
			battleAtk = addPassiveStat(battleAtk,'atkP');
			battleAtk = addAuraStat(battleAtk,'atkP'); //NEED
			battleAtk = addGearStat(battleAtk,'atkP');
			battleAtk = addTreasureStat(battleAtk,'atkP');
			battleAtk = addArtifactStat(battleAtk,'atkP');
			battleAtk = addSkinStat(battleAtk,'atkP');  // Might be different location
			return battleAtk;
		},
		getBattleHp:function() {
			var battleHp = getAdditiveStat('hp');
			battleHP = addGuildTechStat(battleHp,'hpP');
			battleHP = addPassiveStat(battleHp,'hpP');
			battleHP = addAuraStat(battleHp,'hpP'); //NEED
			battleHP = addGearStat(battleHp,'hpP');
			battleHP = addTreasureStat(battleHp,'hpP');
			battleHP = addArtifactStat(battleHp,'hpP');
			battleHP = addSkinStat(battleHp,'hpP');  // Might be different location
			return battleHp;
		},
		getSheetStats:function() {
			sheetStats = {
				'atk':this.getStat('atk','sheet'),
				'hp':this.getStat('hp','sheet'),
				'energy':this.getStat('energy','sheet'),
				'arm':this.getStat('arm','sheet'),
				'spd':this.getStat('spd','sheet'),
				'sklP':this.getStat('sklP','sheet'),
				'precision':this.getStat('precision','sheet'),
				'block':this.getStat('block','sheet'),
				'crit':this.getStat('crit','sheet'),
				'critTime':this.getStat('critTime','sheet'),
				'brk':this.getStat('brk','sheet'),
				'free':this.getStat('free','sheet'),
				'decDmg':this.getStat('decDmg','sheet'),
				'trueAtk':this.getStat('trueAtk','sheet')
			}
			return sheetStats;
		},
		getName:function() {
			return hero.heroName;
		},
		getLevel:function() {
			return level;
		}
	}
});
