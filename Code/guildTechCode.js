var guildTech = (function() {
	var techCosts = [
		{'maxLevel':60,'startGC':10,  'startGold':5000,  'levelGC':10, 'levelGold':5000},
		{'maxLevel':50,'startGC':50,  'startGold':30000, 'levelGC':12, 'levelGold':6000},
		{'maxLevel':40,'startGC':100, 'startGold':60000, 'levelGC':14, 'levelGold':7500},
		{'maxLevel':30,'startGC':160, 'startGold':100000,'levelGC':18, 'levelGold':10000},
		{'maxLevel':20,'startGC':240, 'startGold':150000,'levelGC':30, 'levelGold':20000},
		{'maxLevel':20,'startGC':800, 'startGold':200000,'levelGC':100,'levelGold':30000},
		{'maxLevel':20,'startGC':1000,'startGold':300000,'levelGC':160,'levelGold':30000},
		{'maxLevel':20,'startGC':1400,'startGold':400000,'levelGC':200,'levelGold':30000}
	];
	var warriorTech = [
		{'Name':'HP','stats':{'hpP':0.005}},
		{'Name':'Attack','stats':{'atkP':0.005}},
		{'Name':'Crit','stats':{'crit':10}},
		{'Name':'Block','stats':{'block':5}},
		{'Name':'Skill Damage','stats':{'sklP':10}},
		{'Name':'Speed','stats':{'spd':4}},
		{'Name':'Constitution','stats':{'hpP':0.01,'atkP':0.01}},
		{'Name':'Mind','stats':{'hpP':0.01,'sklP':10}}
	];
	var mageTech = [
		{'Name':'HP','stats':{'hpP':0.005}},
		{'Name':'Attack','stats':{'atkP':0.005}},
		{'Name':'Crit','stats':{'crit':10}},
		{'Name':'Precision','stats':{'precision':5}},
		{'Name':'Skill Damage','stats':{'sklP':10}},
		{'Name':'Speed','stats':{'spd':4}},
		{'Name':'Constitution','stats':{'hpP':0.01,'atkP':0.01}},
		{'Name':'Mind','stats':{'hpP':0.01,'sklP':10}}
	];
	var rangerTech = [
		{'Name':'HP','stats':{'hpP':0.005}},
		{'Name':'Attack','stats':{'atkP':0.005}},
		{'Name':'Block','stats':{'block':5}},
		{'Name':'Precision','stats':{'precision':5}},
		{'Name':'Skill Damage','stats':{'sklP':10}},
		{'Name':'Speed','stats':{'spd':4}},
		{'Name':'Constitution','stats':{'hpP':0.01,'atkP':0.01}},
		{'Name':'Mind','stats':{'hpP':0.01,'sklP':10}}
	];
	var assassinTech = [
		{'Name':'HP','stats':{'hpP':0.005}},
		{'Name':'Crit Damage','stats':{'critTime':10}},
		{'Name':'Crit','stats':{'crit':10}},
		{'Name':'Armor Pierce','stats':{'brk':5}},
		{'Name':'Skill Damage','stats':{'sklP':10}},
		{'Name':'Speed','stats':{'spd':4}},
		{'Name':'Constitution','stats':{'hpP':0.01,'atkP':0.01}},
		{'Name':'Mind','stats':{'hpP':0.01,'sklP':10}}
	];
	var priestTech = [
		{'Name':'HP','stats':{'hpP':0.005}},
		{'Name':'Block','stats':{'block':5}},
		{'Name':'Crit','stats':{'crit':10}},
		{'Name':'Speed','stats':{'spd':2}},
		{'Name':'Skill Damage','stats':{'sklP':10}},
		{'Name':'Speed','stats':{'spd':1, 'atkP':0.005}},
		{'Name':'Constitution','stats':{'hpP':0.01,'atkP':0.01}},
		{'Name':'Mind','stats':{'hpP':0.01,'sklP':10}}
	];
var masterTech = [warriorTech,mageTech,rangerTech,assassinTech,priestTech];
var techLevels = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
];
	return {
		setTechLevels:function(newTechLevels){
			techLevels = newTechLevels;
		},
		getTechLevels:function(){
			return techLevels;
		},
		getTechStats:function(job){
			var curJobTech = cloneObject(masterTech[job-1]);
			//var curJobTech = masterTech[job-1];
			//console.log('In GT: ' + masterTech[job-1][7].Name);
			var curTechStats = [{}];
			//console.log(techLevels[0][1]);
			for(var i = 0; i < 8; i++){
				//console.log('In GT: ' + curJobTech[i].Name);
				Object.keys(curJobTech[i].stats).map(function(key, index) {
					//console.log('GT Loop: ' + curJobTech[i].stats.hpP + ' Level: ' + techLevels[job,i]);
					curJobTech[i].stats[key] *= techLevels[job-1][i];

				});
				//console.log('GT Loop: ' + curJobTech[i].stats.hpP + ' Level: ' + techLevels[job-1][i]);
				//console.log('GT Old: ' + masterTech[job-1][i].stats.hpP + ' Level: ' + techLevels[job-1][i]);
				curTechStats[i] = curJobTech[i].stats;
			}
			return curTechStats;
		}
	}
});
