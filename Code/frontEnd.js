var myTech;
myTech = guildTech();
var paperDoll1;

function initFunction() {
  loadHeroSelect(1);
  loadWeaponSelect(1);
  loadArmorSelect(1);
  loadShoesSelect(1);
  loadAccessoriesSelect(1);
  loadArtifactSelect(1);
  loadTreasureSelect(1);
  loadSkinSelect(1);
  setGuildTech();
}
function makeHero(pos) {
  var myHero = heroData[document.getElementById("heroSelect1").value];
  var myLevel = document.getElementById("levelInput1").value;
  //console.log('My Hero: ' + myHero.heroName);
  var myWeapon = weapons[document.getElementById("weaponSelect1").value];
  //console.log('My Weapon: ' + myWeapon.Name + " : " + myWeapon.hp);
  var myArmor = armors[document.getElementById("armorSelect1").value];
  //console.log('My Armor: ' + myArmor.Name + " : " + myArmor.hp);
  var myShoes= shoes[document.getElementById("shoesSelect1").value];
  //console.log('My Shoes: ' + myShoes.Name + " : " + myShoes.hp);
  var myAccessory = accessories[document.getElementById("accessoriesSelect1").value];
  //console.log('My Accessory: ' + myAccessory.Name + " : " + myAccessory.hp);
  var myArtifactType = artifacts[document.getElementById("artifactTypeSelect1").value];
  var myArtifactLevel = document.getElementById("artifactStarSelect1").value;
  if((myArtifactType.stats !== undefined) && (myArtifactLevel > -1)) {
    //console.log('My Artifact: ' + myArtifactType.Name + " : " + myArtifactType.stats[myArtifactLevel].hpP);
  } else {
    //console.log('My Artifact (alt): ' + myArtifactType.Name);
  }
  var myTreasureType = treasures[document.getElementById("treasureTypeSelect1").value];
  var myTreasureLevel = document.getElementById("treasureStarSelect1").value;
  if((myTreasureType.stats !== undefined) && (myTreasureLevel > -1)) {
    //console.log('My Treasure: ' + myTreasureType.Name + " : " + myTreasureType.stats[myTreasureLevel].hpP);
  } else {
    //console.log('My Treasure (alt): ' + myTreasureType.Name);
  }
  //console.log('Skin Val: ' + document.getElementById("skinSelect1").value);
  var mySkin = skins[document.getElementById("skinSelect1").value];
  //console.log('My Skin: ' + mySkin.Name);
  paperDoll1 = paperDoll(myHero, 6, myLevel);
  paperDoll1.equipWeapon(myWeapon);
  paperDoll1.equipArmor(myArmor);
  paperDoll1.equipShoes(myShoes);
  paperDoll1.equipAccessory(myAccessory);
  paperDoll1.equipArtifact(myArtifactType, myArtifactLevel);
  paperDoll1.equipTreasure(myTreasureType, myTreasureLevel);
  paperDoll1.equipSkin(mySkin);
  //console.log('Doll Hero: ' + paperDoll1.getName());
  //console.log('Doll Artifact: ' + paperDoll1.getArtifact());
  //console.log('Doll Stone Atk: ' + paperDoll1.eqTreasure.atk);
  //console.log('Doll Weapon Atk: ' + paperDoll1.getWeapon.atk);
  //console.log('Sets Equipped: ' + paperDoll1.getSetsEquipped());
  //console.log('Doll Sheet Atk: ' + paperDoll1.getSheetStat('atk'));
  //console.log('Doll Sheet HP: ' + paperDoll1.getSheetHp());
  showHeroStats();
}
function showHeroStats(pos){
  document.getElementById('hero1NameInput').value = paperDoll1.getName();
  document.getElementById('hero1LevelInput').value = paperDoll1.getLevel();
  heroSheetStats = paperDoll1.getSheetStats();
  document.getElementById('hero1HPInput').value = heroSheetStats.hp;
  document.getElementById('hero1EnergyInput').value = heroSheetStats.energy + 50;
  document.getElementById('hero1AttackInput').value = heroSheetStats.atk;
  document.getElementById('hero1ArmorInput').value = heroSheetStats.arm;
  document.getElementById('hero1SpeedInput').value = heroSheetStats.spd;
  document.getElementById('hero1SkillDmgInput').value = heroSheetStats.sklP/10;
  document.getElementById('hero1PrecisionInput').value = heroSheetStats.precision/10;
  document.getElementById('hero1BlockInput').value = heroSheetStats.block/10;
  document.getElementById('hero1CritInput').value = heroSheetStats.crit/20;
  document.getElementById('hero1CritDmgInput').value = heroSheetStats.critTime/20;
  document.getElementById('hero1ArmorBrkInput').value = heroSheetStats.brk/10;
  document.getElementById('hero1CntrlImmInput').value = heroSheetStats.free/10;
  document.getElementById('hero1RedDmgInput').value = heroSheetStats.decDmg/10;
  document.getElementById('hero1HolyDmgInput').value = heroSheetStats.trueAtk/10;
}
function loadHeroSelect(pos) {
  var heroSelect = document.getElementById("heroSelect1");
  clearSelectOptions(heroSelect)
  for (var i = 0; i < heroData.length; i++) {
    var heroOption = document.createElement("option");
    heroOption.setAttribute("value", i);
    var t = document.createTextNode(heroData[i].heroName);
    heroOption.appendChild(t);
    heroSelect.appendChild(heroOption);
  }
}
function loadWeaponSelect(pos) {
  var weaponSelect = document.getElementById("weaponSelect1");
  clearSelectOptions(weaponSelect)
  for (var i = 0; i < weapons.length; i++) {
    var weaponOption = document.createElement("option");
    weaponOption.setAttribute("value",i);
    var t = document.createTextNode(weapons[i].Name);
    weaponOption.appendChild(t);
    weaponSelect.appendChild(weaponOption);
  }
}
function loadArmorSelect(pos) {
  var armorSelect = document.getElementById("armorSelect1");
  clearSelectOptions(armorSelect)
  for (var i = 0; i < armors.length; i++) {
    var armorOption = document.createElement("option");
    armorOption.setAttribute("value",i);
    var t = document.createTextNode(armors[i].Name);
    armorOption.appendChild(t);
    armorSelect.appendChild(armorOption);
  }
}
function loadShoesSelect(pos) {
  var shoeSelect = document.getElementById("shoesSelect1");
  clearSelectOptions(shoeSelect)
  for (var i = 0; i < shoes.length; i++) {
    var shoeOption = document.createElement("option");
    shoeOption.setAttribute("value",i);
    var t = document.createTextNode(shoes[i].Name);
    shoeOption.appendChild(t);
    shoeSelect.appendChild(shoeOption);
  }
}
function loadAccessoriesSelect(pos) {
  var accessoriesSelect = document.getElementById("accessoriesSelect1");
  clearSelectOptions(accessoriesSelect)
  for (var i = 0; i < accessories.length; i++) {
    var accessoriesOption = document.createElement("option");
    accessoriesOption.setAttribute("value",i);
    var t = document.createTextNode(accessories[i].Name);
    accessoriesOption.appendChild(t);
    accessoriesSelect.appendChild(accessoriesOption);
  }
}
function loadArtifactSelect(pos) {
  var artifactTypeSelect = document.getElementById("artifactTypeSelect1");
  clearSelectOptions(artifactTypeSelect);
  for (var i = 0; i < artifacts.length; i++) {
    var artifactTypeOption = document.createElement("option");
    artifactTypeOption.setAttribute("value",i);
    var t = document.createTextNode(artifacts[i].Name);
    artifactTypeOption.appendChild(t);
    artifactTypeSelect.appendChild(artifactTypeOption);
  }
}
function loadTreasureSelect(pos) {
  var treasureTypeSelect = document.getElementById("treasureTypeSelect1");
  clearSelectOptions(treasureTypeSelect);
  for (var i = 0; i < treasures.length; i++) {
    var treasureTypeOption = document.createElement("option");
    treasureTypeOption.setAttribute("value",i);
    var t = document.createTextNode(treasures[i].Name);
    treasureTypeOption.appendChild(t);
    treasureTypeSelect.appendChild(treasureTypeOption);
  }
}
function loadSkinSelect(pos) {
  var skinSelect = document.getElementById("skinSelect1");
  var selectedHero = heroData[document.getElementById("heroSelect1").value];
  clearSelectOptions(skinSelect);
  var skinOption = document.createElement("option");
  skinOption.setAttribute("value",0);
  var t = document.createTextNode('None');
  skinOption.appendChild(t);
  skinSelect.appendChild(skinOption);
  if (selectedHero.skinId !== undefined) {
    //console.log('Hero has skins');
    var heroSkins = Object.entries(selectedHero.skinId);
    for(var i = 0; i < heroSkins.length; i++) {
      for(var k = 0; k < skins.length; k++) {
        if(heroSkins[i][1] === skins[k].skinId) {
          //console.log('Found skin');
          var skinOption = document.createElement("option");
          skinOption.setAttribute("value",k);
          var t = document.createTextNode(skins[k].Name);
          skinOption.appendChild(t);
          skinSelect.appendChild(skinOption);
        }
      }
    }
  }
}
function heroChanged() {
  loadSkinSelect(1);
}
function setGuildTech(){
  warriorTechLevels = [
    document.getElementById('warriorTech1LevelInput').value,
    document.getElementById('warriorTech2LevelInput').value,
    document.getElementById('warriorTech3LevelInput').value,
    document.getElementById('warriorTech4LevelInput').value,
    document.getElementById('warriorTech5LevelInput').value,
    document.getElementById('warriorTech6LevelInput').value,
    document.getElementById('warriorTech7LevelInput').value,
    document.getElementById('warriorTech8LevelInput').value
  ];
  mageTechLevels = [
    document.getElementById('mageTech1LevelInput').value,
    document.getElementById('mageTech2LevelInput').value,
    document.getElementById('mageTech3LevelInput').value,
    document.getElementById('mageTech4LevelInput').value,
    document.getElementById('mageTech5LevelInput').value,
    document.getElementById('mageTech6LevelInput').value,
    document.getElementById('mageTech7LevelInput').value,
    document.getElementById('mageTech8LevelInput').value
  ];
  rangerTechLevels = [
    document.getElementById('rangerTech1LevelInput').value,
    document.getElementById('rangerTech2LevelInput').value,
    document.getElementById('rangerTech3LevelInput').value,
    document.getElementById('rangerTech4LevelInput').value,
    document.getElementById('rangerTech5LevelInput').value,
    document.getElementById('rangerTech6LevelInput').value,
    document.getElementById('rangerTech7LevelInput').value,
    document.getElementById('rangerTech8LevelInput').value
  ];
  assassinTechLevels = [
    document.getElementById('assassinTech1LevelInput').value,
    document.getElementById('assassinTech2LevelInput').value,
    document.getElementById('assassinTech3LevelInput').value,
    document.getElementById('assassinTech4LevelInput').value,
    document.getElementById('assassinTech5LevelInput').value,
    document.getElementById('assassinTech6LevelInput').value,
    document.getElementById('assassinTech7LevelInput').value,
    document.getElementById('assassinTech8LevelInput').value
  ];
  priestTechLevels = [
    document.getElementById('priestTech1LevelInput').value,
    document.getElementById('priestTech2LevelInput').value,
    document.getElementById('priestTech3LevelInput').value,
    document.getElementById('priestTech4LevelInput').value,
    document.getElementById('priestTech5LevelInput').value,
    document.getElementById('priestTech6LevelInput').value,
    document.getElementById('priestTech7LevelInput').value,
    document.getElementById('priestTech8LevelInput').value
  ];
  myTech.setTechLevels([warriorTechLevels,mageTechLevels,rangerTechLevels,assassinTechLevels,priestTechLevels]);
}
function maxWarriorTech(){
  document.getElementById('warriorTech1LevelInput').value = 60;
  document.getElementById('warriorTech2LevelInput').value = 50;
  document.getElementById('warriorTech3LevelInput').value = 40;
  document.getElementById('warriorTech4LevelInput').value = 30;
  document.getElementById('warriorTech5LevelInput').value = 20;
  document.getElementById('warriorTech6LevelInput').value = 20;
  document.getElementById('warriorTech7LevelInput').value = 20;
  document.getElementById('warriorTech8LevelInput').value = 20;
  setGuildTech();
}
function maxMageTech(){
  document.getElementById('mageTech1LevelInput').value = 60;
  document.getElementById('mageTech2LevelInput').value = 50;
  document.getElementById('mageTech3LevelInput').value = 40;
  document.getElementById('mageTech4LevelInput').value = 30;
  document.getElementById('mageTech5LevelInput').value = 20;
  document.getElementById('mageTech6LevelInput').value = 20;
  document.getElementById('mageTech7LevelInput').value = 20;
  document.getElementById('mageTech8LevelInput').value = 20;
  setGuildTech();
}
function maxRangerTech(){
  document.getElementById('rangerTech1LevelInput').value = 60;
  document.getElementById('rangerTech2LevelInput').value = 50;
  document.getElementById('rangerTech3LevelInput').value = 40;
  document.getElementById('rangerTech4LevelInput').value = 30;
  document.getElementById('rangerTech5LevelInput').value = 20;
  document.getElementById('rangerTech6LevelInput').value = 20;
  document.getElementById('rangerTech7LevelInput').value = 20;
  document.getElementById('rangerTech8LevelInput').value = 20;
  setGuildTech();
}
function maxAssassinTech(){
  document.getElementById('assassinTech1LevelInput').value = 60;
  document.getElementById('assassinTech2LevelInput').value = 50;
  document.getElementById('assassinTech3LevelInput').value = 40;
  document.getElementById('assassinTech4LevelInput').value = 30;
  document.getElementById('assassinTech5LevelInput').value = 20;
  document.getElementById('assassinTech6LevelInput').value = 20;
  document.getElementById('assassinTech7LevelInput').value = 20;
  document.getElementById('assassinTech8LevelInput').value = 20;
  setGuildTech();
}
function maxPriestTech(){
  document.getElementById('priestTech1LevelInput').value = 60;
  document.getElementById('priestTech2LevelInput').value = 50;
  document.getElementById('priestTech3LevelInput').value = 40;
  document.getElementById('priestTech4LevelInput').value = 30;
  document.getElementById('priestTech5LevelInput').value = 20;
  document.getElementById('priestTech6LevelInput').value = 20;
  document.getElementById('priestTech7LevelInput').value = 20;
  document.getElementById('priestTech8LevelInput').value = 20;
  setGuildTech();
}
function setHero(value,pos) {
  var starSelect = document.getElementById('starSelect1');
  if(value == 'Vesa') {
    clearSelectOptions(starSelect);
    for (var i = 5; i <= 10; i++) {
      var starOption = document.createElement("option");
      starOption.setAttribute("value", i);
      var t = document.createTextNode(i);
      starOption.appendChild(t);
      starSelect.appendChild(starOption);
    }
  }
}
function clearSelectOptions(mySelect) {
  var numOpts = mySelect.options.length;
  for (i = 0; i < numOpts; i++) {
    mySelect.remove(0);
  }
}
