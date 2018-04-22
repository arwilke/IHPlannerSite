function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}
/* Stat dictionary
Game Stat - code stat, Game to Code Ration
Scalar Attack - atk, 1 : 1
Percent Attack - atkP, 1% : 0.01
Scalar HP - hp, 1 : 1
Percent HP - hpP, 1% : 0.01

Percent Armor - armP, 1% : 0.01

Scalar Speed - spd, 1 : 1

Energy - energy, 1 : 1

Skill Damage - sklP, 1% : 10

Precision - precision, 1% : 10
Block - block, 1% : 10

Crit - crit, 1% : 20
Crit Damage - critTime, 1% : 20
Armor Break - brk, 1% : 10

Control Immune - free, 1% : 10
Holy Damage - trueAtk, 1% : 10

Extra vs Ranger - yx
Extra vs Mage - fs
Extra vs Warrior - zs
Extra vs Assassin - ck
Extra vs Priest - ms










*/

var NONE_ITEM = {'Name':'None'};
var JOB_LIST = ['None','Warrior','Mage','Ranger','Assassin','Priest'];

var SLID_WEAPON = 1;
var SLID_ARMOR = 2;
var SLID_SHOES = 3;
var SLID_ACCESSORY = 4;
var SLID_ARTIFACT = 5;
var SLID_TREASURE = 6;
var SLID_SKIN = 7;



//    0 F_Atk, 1 P_Atk, 2 F_HP, 3 P_HP, 4 F_Armor, 5 P_Armor, 6 Speed, 7 SkDmg,
//   8 Prec, 9 Block,  10 Crit,  11 CrDmg, 12 ArmBrk, 13 ContImm, 14 RedDmg,
//  15 HolyDmg, 16 Energy, 17 DMG War, 18 DMG Mag, 19 DMG Ran, 20 Dmg Ass, 21 Dmg Pri]
var STID_EMPTYSTAT = -1;
var STID_ATTACK = 0;
var STID_HP = 1;
var STID_ARMOR = 2;
var STID_SPEED = 3;
var STID_ENERGY = 4;

var STID_SKILLDAMAGE = 5;
var STID_PRECISION = 6;
var STID_BLOCK = 7;
var STID_CRIT = 8;
var STID_CRITDAMAGE = 9;
var STID_ARMORBREAK = 10;
var STID_CONTROLIMMUNE = 11;
var STID_REDUCEDAMAGE = 12;
var STID_HOLYDAMAGE = 13;

var STID_DAMAGE2WARRIOR = 14;
var STID_DAMAGE2MAGE = 15;
var STID_DAMAGE2RANGER = 16;
var STID_DAMAGE2ASSASSIN = 17;
var STID_DAMAGE2PRIEST = 18;

var STID_DAMAGE2FROZEN = 18;
var STID_DAMAGE2STUNNED = 19;
var STID_DAMAGE2PETRIFIED = 20;
var STID_DAMAGE2SILENCE = 21;
var STID_DAMAGE2BURNED = 22;
var STID_DAMAGE2POISONED = 23;
var STID_DAMAGE2BLEEDING = 24;

// stat_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
