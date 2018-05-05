var heroTeam = (function(){
  var heroes = [{},{},{},{},{},{}];
  function checkAura(){
    var aura = {};
    var heroGroups = [0,0,0,0,0,0];
    for(var i = 0; i < heroes.length; i++) {
      if(heroes[i].cStats != undefined) {
        if(heroes[i].cStats.group >= 1 && heroes[i].cStats.group <= 6) {
          heroGroups[heroes[i].cStats.group-1]++;
        }
      }
    }
    //console.log('heroGroups: ' + heroGroups);
    if(heroGroups[0] === 6) {
      //Shadow brk:200, hpP:0.20
      aura = {'name':'Shadow','stats':{'brk':200,'hpP':0.20}};
    } else if(heroGroups[1] === 6) {
      //Fortress block:100, hpP:0.20
      aura = {'name':'Fortress','stats':{'block':100,'hpP':0.20}};
    } else if(heroGroups[2] === 6) {
      //Abyss atkP:0.15, hpP:0.20
      aura = {'name':'Abyss','stats':{'atkP':0.15,'hpP':0.20}};
    } else if(heroGroups[3] === 6) {
      //Forest crit:100, hpP:0.20
      aura = {'name':'Forest','stats':{'crit':100,'hpP':0.20}};
    } else if(heroGroups[4] === 6) {
      //Dark free:300, hpP:0.20
      aura = {'name':'Dark','stats':{'free':300,'hpP':0.20}};
    } else if(heroGroups[5] === 6) {
      //Light free:300, hpP:0.20
      aura = {'name':'Light','stats':{'free':300,'hpP':0.20}};
    } else if(heroGroups[0] === 1 && heroGroups[1] === 1 && heroGroups[2] === 1 && heroGroups[3] === 1 && heroGroups[4] === 1 && heroGroups[5] === 1) {
      //Color Mixing atkP:0.10, hpP:0.10
      aura = {'name':'Color Mixing','stats':{'atkP':0.10,'hpP':0.10}};
    } else if(heroGroups[4] === 3 && heroGroups[5] === 3) {
      //Good vs Evil atkP:0.135, hpP:0.16
      aura = {'name':'Good vs Evil','stats':{'atkP':0.135,'hpP':0.16}};
    } else if(heroGroups[0] === 2 && heroGroups[2] === 2 && heroGroups[4] === 2) {
      //Ruin atkP:0.13, hpP:0.11
      aura = {'name':'Ruin','stats':{'atkP':0.13,'hpP':0.11}};
    } else if(heroGroups[1] === 2 && heroGroups[3] === 2 && heroGroups[5] === 2) {
      //Redemption atkP:0.11, hpP:0.13
      aura = {'name':'Redemption','stats':{'atkP':0.11,'hpP':0.13}};
    } else if(heroGroups[1] === 3 && heroGroups[3] === 3) {
      //Justice atkP:0.08, hpP:0.10
      aura = {'name':'Justice','stats':{'atkP':0.08,'hpP':0.10}};
    } else if(heroGroups[0] === 3 && heroGroups[2] === 3) {
      //Evil atkP:0.10, hpP:0.08
      aura = {'name':'Evil','stats':{'atkP':0.10,'hpP':0.08}};
    } else if(heroGroups[2] === 3 && heroGroups[3] === 3) {
      //Pollution atkP:0.09, hpP:0.09
      aura = {'name':'Pollution','stats':{'atkP':0.09,'hpP':0.09}};
    } else if(heroGroups[1] === 3 && heroGroups[2] === 3) {
      //Bound Soul atkP:0.09, hpP:0.09
      aura = {'name':'Bound Soul','stats':{'atkP':0.09,'hpP':0.09}};
    } else if(heroGroups[0] === 3 && heroGroups[3] === 3) {
      //Life and Death atkP:0.09, hpP:0.09
      aura = {'name':'Life and Death','stats':{'atkP':0.09,'hpP':0.09}};
    } else if(heroGroups[0] === 3 && heroGroups[1] === 3) {
      //Old Enemy atkP:0.09, hpP:0.09
      aura = {'name':'Old Enemies','stats':{'atkP':0.09,'hpP':0.09}};
    }
    return aura;
    /*if(aura.name != undefined) {
      console.log('Aura: ' + aura.name);
    } else {
      console.log('Aura: None');
    }*/
  }
	return {
    addHero:function(hero,pos) {
      heroes[pos-1] = hero;
      var myAura = checkAura();
      //console.log('Added ' + heroes[pos-1].cStats.heroName + ' to pos ' + pos);
      for(var i = 0; i < heroes.length; i++) {
        if(heroes[i].cStats != undefined) {
          heroes[i].setAura(myAura);
        }
      }
    },
    getHero:function(pos=0) {
      if(pos === 0) {
        return heroes;
      } else {
      return heroes[pos-1];
      }
    }
  }
});
