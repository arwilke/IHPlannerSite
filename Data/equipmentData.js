var weapons = [
  {},
  //Class Weapons
  {'Name':"Assassin's Blades",'stats':{'atk':3704,'atkP':0.07,'ckAtkP':0.06,'ckCrit':100},'class':'Assassin','quality':6,'star':3},
  //Orange Weapons
  {'Name':'Thorny Flame Whip','stats':{'atk':3704,'critTime':100},'set':'Thorny Flame Suit','quality':6,'star':6},
  {'Name':'Glory War Sword','stats':{'atk':2464,'critTime':60},'set':'Glory Suit','quality':6,'star':5},
  {'Name':'Sword of the Courageous','stats':{'atk':1519},'set':'Suits of the Courageous','quality':6,'star':4},
  {'Name':'The Heaven Staff','stats':{'atk':1317},'set':'The Heaven Suits','quality':6,'star':3},
  {'Name':"Ilus's Staff",'stats':{'atk':1116},'set':"Ilus's Suits",'quality':6,'star':2},
  {'Name':"The Monster Slayer's Bow",'stats':{'atk':914},'set':"Monster Slayer's Suits",'quality':6,'star':1},
  //Red Weapons
  {'Name':'Guardian Blessing Dagger','stats':{'atk':678},'set':'Guardian Suits','quality':5,'star':4},
  {'Name':'Staff of Prophecy','stats':{'atk':590},'set':'Prophecy Suits','quality':5,'star':3},
  {'Name':'Elemental Wand','stats':{'atk':502},'set':'Elemental Suits','quality':5,'star':2},
  {'Name':'Hunter Crossbow','stats':{'atk':414},'set':'Hunter Suits','quality':5,'star':1},
  //Green Weapons
  {'Name':'Night Blade','stats':{'atk':317},'set':'Night Suits','quality':4,'star':4},
  {'Name':'Courage Hammer','stats':{'atk':267},'set':'Courage Suits','quality':4,'star':3},
  {'Name':'Good Divine Spear','stats':{'atk':218},'quality':4,'star':2},
  {'Name':'Divine Spear','stats':{'atk':168},'quality':4,'star':1},
  //Purple Weapons
  {'Name':'Good Hammer','stats':{'atk':85},'quality':3,'star':2},
  {'Name':'Hammer','stats':{'atk':66},'quality':3,'star':1},
  //Yellow Weapons
  {'Name':'Good War Blade','stats':{'atk':38},'quality':2,'star':2},
  {'Name':'War Blade','stats':{'atk':32},'quality':2,'star':1},
  //Blue Weapons
  {'Name':'Good Iron Dagger','stats':{'atk':18},'quality':1,'star':2},
  {'Name':'Iron Dagger','stats':{'atk':15},'quality':1,'star':1}
];
var armors = [
  {},
  //Class Armors
  {'Name':"Assassin's Cape",'stats':{'hp':52449,'hpP':0.07,'ckHpP':0.06,'ckBrk':200},'class':'Assassin','quality':6,'star':3},
  //Orange Armors
  {'Name':'Flame Armor','stats':{'hp':52449,'decDmg':20},'set':'Thorny Flame Suit','quality':6,'star':6},
  {'Name':'Glory Armor','stats':{'hp':32455,'decDmg':10},'set':'Glory Suit','quality':6,'star':5},
  {'Name':'Plate of the Courageous','stats':{'hp':10632},'set':'Suits of the Courageous','quality':6,'star':4},
  {'Name':'The Heaven Cape','stats':{'hp':9222},'set':'The Heaven Suits','quality':6,'star':3},
  {'Name':"Ilus's Cape",'stats':{'hp':7811},'set':"Ilus's Suits",'quality':6,'star':2},
  {'Name':"Monster Slayer's Cuirass",'stats':{'hp':6401},'set':"Monster Slayer's Suits",'quality':6,'star':1},
  //Red Armors
  {'Name':'Guardian Cuirass','stats':{'hp':4333},'set':'Guardian Suits','quality':5,'star':4},
  {'Name':'Robe of Prophecy','stats':{'hp':3770},'set':'Prophecy Suits','quality':5,'star':3},
  {'Name':'Elemental Cape','stats':{'hp':3207},'set':'Elemental Suits','quality':5,'star':2},
  {'Name':'Hunter Cuirass','stats':{'hp':2645},'set':'Hunter Suits','quality':5,'star':1},
  //Green Armors
  {'Name':'Night Cuirass','stats':{'hp':1826},'set':'Nights Suits','quality':4,'star':4},
  {'Name':'Courage Armor','stats':{'hp':1541},'set':'Courage Suits','quality':4,'star':3},
  {'Name':'Good Dragon Armor','stats':{'hp':1255},'quality':4,'star':2},
  {'Name':'Dragon Armor','stats':{'hp':970},'quality':4,'star':1},
  //Purple Armors
  {'Name':"Good King's Cuirass",'stats':{'hp':434},'quality':3,'star':2},
  {'Name':"King's Cuirass",'stats':{'hp':337},'quality':3,'star':1},
  //Yellow Armor
  {'Name':'Good Plate','stats':{'hp':169},'quality':2,'star':2},
  {'Name':'Plate','stats':{'hp':141},'quality':2,'star':1},
  //Blue Armors
  {'Name':'Good Leader Armor','stats':{'hp':82},'quality':1,'star':2},
  {'Name':'Leader Armor','stats':{'hp':68},'quality':1,'star':1}
];
var shoes = [
  {},
  //Class Shoes
  {'Name':"Assassin's Cape",'stats':{'hp':52449,'hpP':0.07,'ckHpP':0.06,'ckSpd':20},'class':'Assassin','quality':6,'star':3},
  //Orange Shoes
  {'Name':'Flame Boots','stats':{'hp':32367,'block':40},'set':'Thorny Flame Suit','quality':6,'star':6},
  {'Name':'Glory Boots','stats':{'hp':20146,'block':20},'set':'Glory Suit','quality':6,'star':5},
  {'Name':'Boots of the Courageous','stats':{'hp':7088},'set':'Suits of the Courageous','quality':6,'star':4},
  {'Name':'The Heaven Ankle Boots','stats':{'hp':6148},'set':'The Heaven Suits','quality':6,'star':3},
  {'Name':"Ilus's Boots",'stats':{'hp':5207},'set':"Ilus's Suits",'quality':6,'star':2},
  {'Name':"Monster Slayer's Boots",'stats':{'hp':4267},'set':"Monster Slayer's Suits",'quality':6,'star':1},
  //Red Shoes
  {'Name':'Guardian Boots','stats':{'hp':2889},'set':'Guardian Suits','quality':5,'star':4},
  {'Name':'Boots of Prophecy','stats':{'hp':2513},'set':'Prophecy Suits','quality':5,'star':3},
  {'Name':'Elemental Boots','stats':{'hp':2138},'set':'Elemental Suits','quality':5,'star':2},
  {'Name':'Hunter Ankle Boots','stats':{'hp':1763},'set':'Hunter Suits','quality':5,'star':1},
  //Green Shoes
  {'Name':'Night Cuirass','stats':{'hp':1826},'set':'Nights Suits','quality':4,'star':4},
  {'Name':'Courage Armored Boots','stats':{'hp':1027},'set':'Courage Suits','quality':4,'star':3},
  {'Name':"Good Traveler's Boots",'stats':{'hp':837},'quality':4,'star':2},
  {'Name':"Traveler's Boots",'stats':{'hp':647},'quality':4,'star':1},
  //Purple Shoes
  {'Name':'Good Sage Boots','stats':{'hp':289},'quality':3,'star':2},
  {'Name':'Sage Boots','stats':{'hp':225},'quality':3,'star':1},
  //Yellow Shoes
  {'Name':'Good Magic Ankle Boots','stats':{'hp':113},'quality':2,'star':2},
  {'Name':'Magic Ankle Boots','stats':{'hp':94},'quality':2,'star':1},
  //Blue Shoes
  {'Name':'Good Armored Boots','stats':{'hp':54},'quality':1,'star':2},
  {'Name':'Armored Boots','stats':{'hp':45},'quality':1,'star':1}
];
var accessories = [
  {},
  //Class Accessories
  {'Name':"Assassin's Ring",'stats':{'atk':2469,'atkP':0.07,'ckAtkP':0.06,'ckCritTime':100},'class':'Assassin','quality':6,'star':3},
  //Orange Accessories
  {'Name':'Flame Necklace','stats':{'atk':2469,'sklP':50},'set':'Thorny Flame Suit','quality':6,'star':6},
  {'Name':'Glory Ring','stats':{'atk':1643,'sklP':30},'set':'Glory Suit','quality':6,'star':5},
  {'Name':'Pendant of the Courageous','stats':{'atk':1013},'set':'Suits of the Courageous','quality':6,'star':4},
  {'Name':'The Heaven Necklace','stats':{'atk':878},'set':'The Heaven Suits','quality':6,'star':3},
  {'Name':"Ilus's Ring",'stats':{'atk':744},'set':"Ilus's Suits",'quality':6,'star':2},
  {'Name':"Monster Slayer's Ring",'stats':{'atk':610},'set':"Monster Slayer's Suits",'quality':6,'star':1},
  //Red Accessories
  {'Name':'Guardian Heart','stats':{'atk':452},'set':'Guardian Suits','quality':5,'star':4},
  {'Name':'Ring of Prophecy','stats':{'atk':393},'set':'Prophecy Suits','quality':5,'star':3},
  {'Name':'Elemental Amulet','stats':{'atk':335},'set':'Elemental Suits','quality':5,'star':2},
  {'Name':'Hunter Necklace','stats':{'atk':276},'set':'Hunter Suits','quality':5,'star':1},
  //Green Accessories
  {'Name':'Night Ring','stats':{'atk':211},'set':'Night Suits','quality':4,'star':4},
  {'Name':'Courage Medal','stats':{'atk':178},'set':'Courage Suits','quality':4,'star':3},
  {'Name':'Good Brave Badge','stats':{'atk':145},'quality':4,'star':2},
  {'Name':'Brave Badge','stats':{'atk':112},'quality':4,'star':1},
  //Purple Accessories
  {'Name':'Good Rune Ring','stats':{'atk':57},'quality':3,'star':2},
  {'Name':'Rune Ring','stats':{'atk':44},'quality':3,'star':1},
  //Yellow Accessories
  {'Name':'Good Bone Necklace','stats':{'atk':25},'quality':2,'star':2},
  {'Name':'Bone Necklace','stats':{'atk':21},'quality':2,'star':1},
  //Blue Accessories
  {'Name':'Good Iron Ring','stats':{'atk':12},'quality':1,'star':2},
  {'Name':'Iron Ring','stats':{'atk':10},'quality':1,'star':1}
];
var gearSets = [
  //Orange Gear Sets
  {'Name':'Thorny Flame Suit','bonus2':{'hpP':0.16},'bonus3':{'atkP':0.21},'bonus4':{'hpP':0.08}},
  {'Name':'Glory Suit','bonus2':{'hpP':0.15},'bonus3':{'atkP':0.20},'bonus4':{'hpP':0.08}},
  {'Name':'Pendant of the Courageous','bonus2':{'hpP':0.14},'bonus3':{'atkP':0.19},'bonus4':{'hpP':0.07}},
  {'Name':'The Heaven Necklace','bonus2':{'hpP':0.12},'bonus3':{'atkP':0.17},'bonus4':{'hpP':0.70}},
  {'Name':"Ilus's Suit",'bonus2':{'hpP':110},'bonus3':{'atkP':150},'bonus4':{'hpP':60}},
  {'Name':"Monster Slayer's Suit",'bonus2':{'hpP':100},'bonus3':{'atkP':130},'bonus4':{'hpP':50}},
  {'Name':'Guardian Suits','bonus2':{'hpP':80},'bonus3':{'atkP':110},'bonus4':{'hpP':50}},
  {'Name':'Prophecy Suits','bonus2':{'hpP':70},'bonus3':{'atkP':90},'bonus4':{'hpP':40}},
  {'Name':'Elemental Suits','bonus2':{'hpP':50},'bonus3':{'atkP':70},'bonus4':{'hpP':40}},
  {'Name':'Hunter Suits','bonus2':{'hpP':40},'bonus3':{'atkP':50},'bonus4':{'hpP':20}},
  {'Name':'Night Suits','bonus2':{'hpP':30},'bonus3':{'atkP':40},'bonus4':{'hpP':10}},
  {'Name':'Courage Suits','bonus2':{'hpP':20},'bonus3':{'atkP':30},'bonus4':{'hpP':10}}
];
