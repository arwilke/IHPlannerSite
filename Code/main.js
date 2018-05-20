console.log('In js');
//var myTech = guildTech();
//var myHero = new hero(heroCoreList[0],250);
	//var tech = myTech.getTechStats(heroCore.job);
var myHero = new hero(heroCoreList[0],250,weapons[2],armors[2],shoes[2],accessories[2],treasures[6],artifacts[6],skins[1],
  	{}, //Aura
  	[{'stats':{'hpP':0.30}}, //Guild Tech 1
  	{'stats':{'block':250}}, //Guild Tech 2
  	{'stats':{'crit':400}}, //Guild Tech 3
  	{'stats':{'spd':60}}, //Guild Tech 4
  	{'stats':{'sklP':200}}, //Guild Tech 5
  	{'stats':{'spd':20,'atkP':0.10}}, //Guild Tech 6
  	{'stats':{'hpP':0.20,'atkP':0.20}}, //Guild Tech 7
  	{'stats':{'hpP':0.20,'sklP':200}}], //Guild Tech 8
  	[{'stats':{'hpP':0.16}}, //Set Bonus 1
  	{'stats':{'atkP':0.21}}, //Set Bonus 2
  	{'stats':{'hpP':0.08}}]); //Set Bonus 3
/*var myHero1 = new hero(heroCoreList[0],250,weapons[2],armors[2],shoes[2],accessories[2],treasures[6],artifacts[6],skins[1],
	{}, //Aura
	[{'stats':{'hpP':0.30}}, //Guild Tech 1
	{'stats':{'block':250}}, //Guild Tech 2
	{'stats':{'crit':400}}, //Guild Tech 3
	{'stats':{'spd':60}}, //Guild Tech 4
	{'stats':{'sklP':200}}, //Guild Tech 5
	{'stats':{'spd':20,'atkP':0.10}}, //Guild Tech 6
	{'stats':{'hpP':0.20,'atkP':0.20}}, //Guild Tech 7
	{'stats':{'hpP':0.20,'sklP':200}}], //Guild Tech 8
	[{'stats':{'hpP':0.16}}, //Set Bonus 1
	{'stats':{'atkP':0.21}}, //Set Bonus 2
	{'stats':{'hpP':0.08}}]); //Set Bonus 3
var myHero2 = cloneObject(myHero1);
var myHero3 = cloneObject(myHero1);
var myHero4 = cloneObject(myHero1);
var myHero5 = cloneObject(myHero1);
var myHero6 = cloneObject(myHero1);*/

//myHero.printHeroStats('b');

//var myHeroLineUp = [myHero];

var myTeam = new heroTeam();
myTeam.addHero(myHero,1);

/*myTeam.addHero(myHero1,1);
myTeam.addHero(myHero2,2);
myTeam.addHero(myHero3,3);
myTeam.addHero(myHero4,4);
myTeam.addHero(myHero5,5);
myTeam.addHero(myHero6,6);
myTeam.getHero(1).printHeroStats('b');
myTeam.getHero(2).printHeroStats('b');
myTeam.getHero(3).printHeroStats('b');
myTeam.getHero(4).printHeroStats('b');
myTeam.getHero(5).printHeroStats('b');
myTeam.getHero(6).printHeroStats('b');*/
//console.log('1: ' + myTeam.lineUp());
myTeam.getHero(1).printHeroStats('b');
console.log('myTeam has ' + myTeam.getHero().length + ' positions!');
//var myBattleState = new battleState(myTeam,myTeam);
var myBattleManager = new battleManager(myTeam,myTeam);
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
myBattleManager.contBattle();
