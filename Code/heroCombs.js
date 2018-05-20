function getHeroCombs(heroPoses, numPicks) {
	/*list = [];
	listEntry = [];
	var depth = 0;
	
	
	for(var i = 0; i < heroPoses.length; i++) {
		depth = 1;
		list.push(heroPoses[i]);
		if(numPicks > depth) {
			for(var j = 0; j < heroPoses.length; j++) {
				depth = 2;
				if(j !== i) {
					list.push(heroPoses[j]);
					if(numPicks > depth) {
						for(var k = 0; k < heroPoses.length; k++) {
							depth = 3;
							if(k !== j && k !== i) {
								list.push(heroPoses[k]);
								if(numPicks > depth) {
									for(var l = 0; l < heroPoses.length; l++) {
										depth = 4;
										if(l !== k && l !== j && l !== i) {
											list.push(heroPoses[l]);
											if(numPicks > depth) {
												for(var m = 0; m < heroPoses.length; m++) {
													depth = 5;
													if(m !== l && m !== k && m !== j && m !== i) {
														list.push(heroPoses[m]);
														listEntry.push(list);
													}
												}
											} else {
												listEntry.push(list);
											}
										}
									}
								} else {
									listEntry.push(list);
								}
							}
						}
					} else {
						listEntry.push(list);
					}
				}
			}
		} else {
			listEntry.push(list);
		}
	}
	return listEntry;
}*/


	
	if(heroPoses.length === 2 && numPicks === 1) {
		return [[heroPoses[0]],
				[heroPoses[1]]];
	} else if(heroPoses.length === 3) {
		if(numPicks === 1) {
			return [[heroPoses[0]],
					[heroPoses[1]],
					[heroPoses[2]]];
		} else if(numPicks === 2) {
			return [[heroPoses[0],heroPoses[1]],
					[heroPoses[0],heroPoses[2]],
					[heroPoses[1],heroPoses[2]]];
		}
	} else if(heroPoses.length === 4) {
		if(numPicks === 1) {
			return [[heroPoses[0]],
					[heroPoses[1]],
					[heroPoses[2]],
					[heroPoses[3]]];
		} else if(numPicks === 2) {
			return [[heroPoses[0],heroPoses[1]],
					[heroPoses[0],heroPoses[2]],
					[heroPoses[0],heroPoses[3]],
					[heroPoses[1],heroPoses[2]],
					[heroPoses[1],heroPoses[3]],
					[heroPoses[2],heroPoses[3]]];
		} else if(numPicks === 3) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2]],
					[heroPoses[0],heroPoses[2],heroPoses[3]],
					[heroPoses[1],heroPoses[2],heroPoses[3]]];
		}
	} else if(heroPoses.length === 5) {
		if(numPicks === 1) {
			return [[heroPoses[0]],
					[heroPoses[1]],
					[heroPoses[2]],
					[heroPoses[3]],
					[heroPoses[4]]];
		} else if(numPicks === 2) {
			return [[heroPoses[0],heroPoses[1]],
					[heroPoses[0],heroPoses[2]],
					[heroPoses[0],heroPoses[3]],
					[heroPoses[0],heroPoses[4]],
					[heroPoses[1],heroPoses[2]],
					[heroPoses[1],heroPoses[3]],
					[heroPoses[1],heroPoses[4]],
					[heroPoses[2],heroPoses[3]],
					[heroPoses[2],heroPoses[4]],
					[heroPoses[3],heroPoses[4]]];
		} else if(numPicks === 3) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2]],
					[heroPoses[0],heroPoses[1],heroPoses[3]],
					[heroPoses[0],heroPoses[1],heroPoses[4]],
					[heroPoses[0],heroPoses[2],heroPoses[3]],
					[heroPoses[0],heroPoses[2],heroPoses[4]],
					[heroPoses[0],heroPoses[3],heroPoses[4]],
					[heroPoses[1],heroPoses[2],heroPoses[3]],
					[heroPoses[1],heroPoses[2],heroPoses[4]],
					[heroPoses[1],heroPoses[3],heroPoses[4]],
					[heroPoses[2],heroPoses[3],heroPoses[4]]];
		} else if(numPicks === 4) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[3]],
					[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[4]],
					[heroPoses[0],heroPoses[1],heroPoses[3],heroPoses[4]],
					[heroPoses[0],heroPoses[2],heroPoses[3],heroPoses[4]],
					[heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[4]]];
		}
	} else if(heroPoses.length === 6) {
		if(numPicks === 1) {
			return [[heroPoses[0]],
					[heroPoses[1]],
					[heroPoses[2]],
					[heroPoses[3]],
					[heroPoses[4]],
					[heroPoses[5]]];
		} else if(numPicks === 2) {
			return [[heroPoses[0],heroPoses[1]],
					[heroPoses[0],heroPoses[2]],
					[heroPoses[0],heroPoses[3]],
					[heroPoses[0],heroPoses[4]],
					[heroPoses[0],heroPoses[5]],
					[heroPoses[1],heroPoses[2]],
					[heroPoses[1],heroPoses[3]],
					[heroPoses[1],heroPoses[4]],
					[heroPoses[1],heroPoses[5]],
					[heroPoses[2],heroPoses[3]],
					[heroPoses[2],heroPoses[4]],
					[heroPoses[2],heroPoses[5]],
					[heroPoses[3],heroPoses[4]],
					[heroPoses[3],heroPoses[5]],
					[heroPoses[4],heroPoses[5]]];
		} else if(numPicks === 3) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2]],
					[heroPoses[0],heroPoses[1],heroPoses[3]],
					[heroPoses[0],heroPoses[1],heroPoses[4]],
					[heroPoses[0],heroPoses[1],heroPoses[5]],
					[heroPoses[0],heroPoses[2],heroPoses[3]],
					[heroPoses[0],heroPoses[2],heroPoses[4]],
					[heroPoses[0],heroPoses[2],heroPoses[5]],
					[heroPoses[0],heroPoses[3],heroPoses[4]],
					[heroPoses[0],heroPoses[3],heroPoses[5]],
					[heroPoses[0],heroPoses[4],heroPoses[5]],
					[heroPoses[1],heroPoses[2],heroPoses[3]],
					[heroPoses[1],heroPoses[2],heroPoses[4]],
					[heroPoses[1],heroPoses[2],heroPoses[5]],
					[heroPoses[1],heroPoses[3],heroPoses[4]],
					[heroPoses[1],heroPoses[3],heroPoses[5]],
					[heroPoses[1],heroPoses[4],heroPoses[5]],
					[heroPoses[2],heroPoses[3],heroPoses[4]],
					[heroPoses[2],heroPoses[3],heroPoses[5]],
					[heroPoses[2],heroPoses[4],heroPoses[5]],
					[heroPoses[3],heroPoses[4],heroPoses[5]]];
		} else if(numPicks === 4) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[3]],
					[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[4]],
					[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[5]],
					[heroPoses[0],heroPoses[1],heroPoses[3],heroPoses[4]],
					[heroPoses[0],heroPoses[1],heroPoses[3],heroPoses[5]],
					[heroPoses[0],heroPoses[2],heroPoses[3],heroPoses[4]],
					[heroPoses[0],heroPoses[2],heroPoses[3],heroPoses[5]],
					[heroPoses[0],heroPoses[3],heroPoses[4],heroPoses[5]],
					[heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[4]],
					[heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[5]],
					[heroPoses[1],heroPoses[2],heroPoses[4],heroPoses[5]],
					[heroPoses[1],heroPoses[3],heroPoses[4],heroPoses[5]],
					[heroPoses[2],heroPoses[3],heroPoses[4],heroPoses[5]]];
		} else if(numPicks === 5) {
			return [[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[4]],
					[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[5]],
					[heroPoses[0],heroPoses[1],heroPoses[2],heroPoses[4],heroPoses[5]],
					[heroPoses[0],heroPoses[1],heroPoses[3],heroPoses[4],heroPoses[5]],
					[heroPoses[0],heroPoses[2],heroPoses[3],heroPoses[4],heroPoses[5]],
					[heroPoses[1],heroPoses[2],heroPoses[3],heroPoses[4],heroPoses[5]]];
		}
	}
}
/*
var heroPoses = [0,1,2,3,4,5];
var numPicks = 1;
console.log('numPicks: ' + numPicks);
console.log(getHeroCombs(heroPoses,numPicks));
numPicks = 2;
console.log('numPicks: ' + numPicks);
console.log(getHeroCombs(heroPoses,numPicks));
numPicks = 3;
console.log('numPicks: ' + numPicks);
console.log(getHeroCombs(heroPoses,numPicks));
numPicks = 4;
console.log('numPicks: ' + numPicks);
console.log(getHeroCombs(heroPoses,numPicks));
numPicks = 5;
console.log('numPicks: ' + numPicks);
console.log(getHeroCombs(heroPoses,numPicks));
*/
function getRandomInt(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}