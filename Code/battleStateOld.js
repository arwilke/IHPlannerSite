var battleState = (function(attackTeam, defendTeam) {
  var fighters = [{},{},{},{},{},{},{},{},{},{},{},{}];
  for(var i = 0; i < attackTeam.getHero().length; i++) {
    fighters[i] = cloneObject(attackTeam.getHero(i+1));
  }
  for(var i = 0; i < defendTeam.getHero().length; i++) {
    fighters[i+6] = cloneObject(defendTeam.getHero(i+1));
  }
  for(var i = 0; i < fighters.length; i++) {
    if(fighters[i].exists()) {
      fighters[i].alive = true;
      fighters[i].acted = false;
      fighters[i].ctrld = function(){
        return false;
      }
      fighters[i].slnt = function(){
        return false;
      }
      fighters[i].curHp = fighters[i].bStats().hp;
      fighters[i].curEn = fighters[i].bStats().energy + 50;
      console.log('In Pos ' + (i + 1) + ':');
      fighters[i].printHeroStats('b');
      console.log('Cur Hp: ' + fighters[i].curHp + ', Cur Energy: ' + fighters[i].curEn + ', Alive: ' + fighters[i].alive + ', Acted: ' + fighters[i].acted + ', Controlled: ' + fighters[i].ctrld());
    } else {
      console.log('In Pos ' + (i + 1) + ':');
      console.log('Empty');
    }
  }
  var round = 0;
  var actingHero = -1;
  var actingSkill = -1;
  var activeSkillMajEffs = 0
  return {

  }
});
