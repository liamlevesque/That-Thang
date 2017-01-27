var sportGrades = [
		{
			yds: "5.1",
			french: "1"
		},
		{
			yds: "5.2",
			french: "2"
		},
		{
			yds: "5.3",
			french: "3-"
		},
		{
			yds: "5.4",
			french: "3"
		},
		{
			yds: "5.5",
			french: "3+"
		},
		{
			yds: "5.6",
			french: "4a"
		},
		{
			yds: "5.7",
			french: "4b"
		},
		{
			yds: "5.8",
			french: "5a"
		},
		{
			yds: "5.9",
			french: "5b"
		},
		{
			yds: "5.10a",
			french: "5c"
		},
		{
			yds: "5.10b",
			french: "6a"
		},
		{
			yds: "5.10c",
			french: "6a+"
		},
		{
			yds: "5.10d",
			french: "6b"
		},
		{
			yds: "5.11a",
			french: "6b+"
		},
		{
			yds: "5.11b",
			french: "6c"
		},
		{
			yds: "5.11c",
			french: "6c+"
		},
		{
			yds: "5.11d",
			french: "7a"
		},
		{
			yds: "5.12a",
			french: "7a+"
		},
		{
			yds: "5.12b",
			french: "7b"
		},
		{
			yds: "5.12c",
			french: "7b+"
		},
		{
			yds: "5.12d",
			french: "7c"
		},
		{
			yds: "5.13a",
			french: "7c+"
		},
		{
			yds: "5.13b",
			french: "8a"
		},
		{
			yds: "5.13c",
			french: "8a+"
		},
		{
			yds: "5.13d",
			french: "8b"
		},
		{
			yds: "5.14a",
			french: "8b+"
		},
		{
			yds: "5.14b",
			french: "8c"
		},
		{
			yds: "5.14c",
			french: "8c+"
		},
		{
			yds: "5.14d",
			french: "9a"
		},
		{
			yds: "5.15a",
			french: "9a+"
		},
	];


	var boulderGrades = [
		{
			vgrade: "VB",
			font: "1"
		},
		{
			vgrade: "V0-",
			font: "3+"
		},
		{
			vgrade: "V0",
			font: "4"
		},
		{
			vgrade: "V0+",
			font: "4+"
		},
		{
			vgrade: "V1",
			font: "5"
		},
		{
			vgrade: "V2",
			font: "5+"
		},
		{
			vgrade: "V3",
			font: "6A"
		},
		{
			vgrade: "V4",
			font: "6B"
		},
		{
			vgrade: "V5",
			font: "6C"
		},
		{
			vgrade: "V6",
			font: "7A"
		},
		{
			vgrade: "V7",
			font: "7A+"
		},
		{
			vgrade: "V8",
			font: "7B"
		},
		{
			vgrade: "V9",
			font: "7C"
		},
		{
			vgrade: "V10",
			font: "7C+"
		},
		{
			vgrade: "V11",
			font: "8A"
		},
		{
			vgrade: "V12",
			font: "8A+"
		},
		{
			vgrade: "V13",
			font: "8B"
		},
		{
			vgrade: "V14",
			font: "8B+"
		},
		{
			vgrade: "V15",
			font: "8C"
		},
	];

rivets.formatters.gradeconversion = function(value, type){
	if(typeof type =="undefined" || typeof value == "undefined") return 0;
	if(type == 'boulder') {
		if(typeof boulderGrades[value] == 'undefined') return boulderGrades[boulderGrades.length-1];
		return boulderGrades[value].vgrade;
	}
	else{
		if(typeof sportGrades[value] == 'undefined') return sportGrades[sportGrades.length-1];
		return sportGrades[value].yds;
	}
};

rivets.binders.checkfirst = function(el, value){
	if(value === 0) $(el).attr("checked","checked"); 
};

rivets.formatters.lengthToBool = function(value){
	if(typeof value == 'undefined') return false;
	if(value.length === 0) return false;
	return true;
};

rivets.formatters.lengthofObject = function(value){
	if(typeof value == 'undefined') return 0;
	return value.length;
};

rivets.formatters.gradesoftype = function(value){
	if(typeof value == "undefined") return 0;
	if(value == 'boulder') return boulderGrades.length - 1;
	else return sportGrades.length - 1;
};

rivets.formatters.compare = function(value, comparison){
	if(typeof value != 'undefined' || value === comparison) return true;
	else return false;
};

rivets.formatters.qrcodeToImage = function(value){
	if(typeof value != "undefined") return "data:image/png;base64," + value;
};