var num = 15, i;
var numI = 2;
var result = [14, 16, 15, 17, 10, 26, 20, 22, 18, 19];
var allButton = [];
var partiesAvg = [];
function partySection(id, name, percent, vid, sub, app, Color, numMem, avgMonth, avgWeek) {
	return {
		id : id,
		name : name,
		percent : percent,
		answers : [0, 0, 0, 0, 0, 0, 0, 0, 0],
		video : vid,
		rulesSubmission : sub,
		rulesApprove : app,
		color : Color,
		members : numMem,
		average_monthly_committee_presence : avgMonth,
		average_weekly_presence : avgWeek

	};
};
function Party(name, id, numberOS, mem) {
	return {
		name : name,
		id : id,
		number_of_seats : numberOS,
		members : mem,
	};
}

var parties = [];
function avgParty(id, avgMonth, avgWeek) {
	return {
		id : id,
		average_monthly_committee_presence : avgMonth,
		average_weekly_presence : avgWeek
	};
}

var tempName = [partySection(14, "הליכוד", "", "//www.youtube.com/embed/ZA23LiWIHzM", 49.3, 3.2, "#22599c", 10), partySection(16, "המחנה הציוני", "", "//www.youtube.com/embed/J5eDRryp9uY", 61.7, 2.9, "#265da0", 10), partySection(15, "יש עתיד", "", "//www.youtube.com/embed/pKVrFwJ2CVc", 29.3, 2.1, "#16477e", 10), partySection(17, "הבית היהודי", "", "//www.youtube.com/embed/oSwCtvH9838", 38.5, 2.7, "#a2c739", 10), partySection(10, "כולנו", "", "//www.youtube.com/embed/YujaXY3jyKM", 0, 0, "#30b4e7", 10), partySection(26, "ישראל ביתנו", "", "//www.youtube.com/embed/5hO4mnG-wLU", 39.5, 2.4, "#255a70", 10), partySection(20, "מרצ", "", "//www.youtube.com/embed/IF2yLwB0Qa0", 119.7, 5, "#3d9c3f", 10), partySection(22, "הרשימה הערבית", "", "//www.youtube.com/embed/ZxPuED8HZIk", 215, 5.5, "#009138", 10), partySection(18, 'ש"ס', "", "//www.youtube.com/embed/ZxPuED8HZIk", 53, 2.2, "#000000", 10), partySection(19, "יהדות התורה", "", "//www.youtube.com/embed/ZxPuED8HZIk", 58.9, 3.0, "#1578ba", 10)];

function calcResidence() {
	$.getJSON("../js/party.json", function(data) {
		var kneset = data.kneset;
		$.each(kneset, function(index, value) {
			parties.push(Party(value.name, value.id, value.number_of_seats, value.members));
		});
		$.each(parties, function(index, value) {
			var calcWeek = 0;
			var calcComm = 0;
			$.each(value.members, function(index, value) {
				calcComm += parseInt(value.average_monthly_committee_presence, 10);
				if (value.average_weekly_presence_hours) {
					calcWeek += parseInt(value.average_weekly_presence_hours, 10);
				}
				parties.push(Party(value.id, value.number_of_seats, value.members));
			});
			var y = calcWeek / value.number_of_seats;
			var x = calcComm / value.number_of_seats;
			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == value.id) {
					tempName[i].average_monthly_committee_presence = y;
					tempName[i].average_weekly_presence = x;
				}
			}
		});
	});
};
$(document).ready(function() {

	calcResidence();
	$(function() {
		$.each(result, function(index, val) {
			if (val == 10)
				return;
			var progressbar = $("#" + val + "ProgressBar");
			$("#" + val + "ProgressBar").progressbar({
				max : 100,
			});
			$("#" + val + "ProgressBar").css({
				"background" : "#a6a6a6"
			});
		});
	});
	updateButton()

	$(".answer0 #button0").click(function() {
		$("div.fullAns0").slideToggle("fast");
		// $(this).next().slideToggle("fast");
	});
	$(".answer1 #button1").click(function() {
		$("div.fullAns1").slideToggle("fast");
	});
	$(".answer2 #button2").click(function() {
		$("div.fullAns2").slideToggle("fast");
	});
	$(".answer3 #button3").click(function() {
		$("div.fullAns3").slideToggle("fast");
	});
	$(".answer4 #button4").click(function() {
		$("div.fullAns4").slideToggle("fast");
	});
	$(".answer5 #button5").click(function() {
		$("div.fullAns5").slideToggle("fast");
	});
	$(".answer6 #button6").click(function() {
		$("div.fullAns6").slideToggle("fast");
	});
	$(".answer7 #button7").click(function() {
		$("div.fullAns7").slideToggle("fast");
	});
	$(".answer8 #button8").click(function() {
		$("div.fullAns8").slideToggle("fast");
	});
	var images = [];
	for ( j = 1; j < tempName[numI].members + 1; j++) {
		images[j] = '../images/' + num + '/' + num + '.' + j + '.png';
	}
	var sHTML = "";
	for ( j = 1; j < images.length; j++) {
		sHTML += '<li><img src="' + images[j] + '" /></li>';
	};
	$('#imagesList').html(sHTML);
	$('#logo').attr('src', "../images/logo" + num + ".png");
	$('#formHeader h1').html(tempName[numI].name);
	$('#list h4').css({
		"color" : tempName[numI].color
	});
	$('#activity h4').css({
		"color" : tempName[numI].color
	});
	$('#questionnaire h4').css({
		"color" : tempName[numI].color
	});
	$('#questionnaire h4').html("עמדת "+tempName[numI].name+" בסוגיות הכלכליות הבוערות");
	$("#" + num + "ProgressBar").css({
		"background" : ((tempName[numI].color))
	});
	$('#comboBox').css({
		"background" : tempName[numI].color
	});

	$.getJSON("../js/full.json", function(d) {
		var dataFull = d.fullAnswers;
		//$('#fullAns' + index).html(v);
		$.each(result, function(index, val) {
			if (val == num) {
				$.each(dataFull[index], function(x, v) {
					$('#fullAns' + x).html(v);
				});
			}
			return;
		});
	});
	for ( u = 0; u < 9; u++) {
		$('#button' + u).html("עמדת " + tempName[numI].name)

	}
	$(function() {
		$("#comboBox").on("change", function() {
			console.log($("#comboBox").val());
			if ($("#comboBox").val() == "committee")
				$('#committee').click();
			if ($("#comboBox").val() == "residence")
				$('#residence').click();
			if ($("#comboBox").val() == "submission")
				$('#submission').click();
			if ($("#comboBox").val() == "approve")
				$('#approve').click();
		}).trigger("change");
	});
	updateData();
});
function updateButton() {
	allButton = ["committee", "residence", "submission", "approve"];
	//check menu state and show according to state
	$(document).on('click', "li button", function() {
		for ( i = 0; i < 4; i++) {
			if ($("#" + allButton[i]).hasClass('selected2')) {
				$('.selected2').css({
					"background" : "#FFFFFF",
					color : "#000000",
					"z-index" : "0"
				});
				$("#" + allButton[i]).removeClass('selected2');
			}
		};
		//change manu button according to party color
		$(this).addClass('selected2');
		$(this).css({
			"background-image" : "url('../images/button" + num + ".png')",
			color : "#ffffff",
			"z-index" : "2",
			"position" : "relative"
		});
		$("#" + num + "ProgressBar").css({
			"background" : ((tempName[numI].color))
		});
	});
	$('li button').mouseover(function() {
		if (!$(this).hasClass('selected2'))
			$(this).css({
				"background-image" : "url('../images/buttonHover" + num + ".png')",
				'color' : "#ffffff"
			});
	});
	$('li button').mouseout(function() {
		if (!$(this).hasClass('selected2'))
			$(this).css({
				"background-image" : "none",
				'color' : "#000000"
			});
	});

	//update bar according to the menu state
	$("button#residence").click(function() {
		$("button#residence").addClass('selected2');
		$('#hour').html("*שעות שבועיות");
		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
				case 14: {
					$("#14ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#14ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 15: {
					$("#15ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#15ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 16: {
					$("#16ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#16ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 17: {
					$("#17ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#17ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 10: {
					break;
				}
				case 26: {
					$("#26ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#26ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 20: {
					$("#20ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#20ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 22: {
					$("#22ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#22ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 18: {
					$("#18ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#18ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
				case 19: {
					$("#19ProgressBar").animate({
						"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
					});
					$("#19ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
					break;
				}
			}
		}
	});
	$("button#committee").click(function() {
		$(this).addClass('selected2');
		$('#hour').html("*שעות שבועיות");

		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
				case 14: {
					$("#14ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#14ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 15: {
					$("#15ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#15ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 16: {
					$("#16ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#16ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 17: {
					$("#17ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#17ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 10: {
					break;
				}
				case 26: {
					$("#26ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#26ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 20: {
					$("#20ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#20ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 22: {
					$("#22ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#22ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 18: {
					$("#18ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#18ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
				case 19: {
					$("#19ProgressBar").animate({
						"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
					});
					$("#19ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
					break;
				}
			}
		}

	});
	$("button#approve").click(function() {
		$(this).addClass('selected2');
		$('#hour').html('*ממוצע לח"כ במפלגה');

		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
				case 14: {
					$("#14ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#14ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 15: {
					$("#15ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#15ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 16: {
					$("#16ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#16ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 17: {
					$("#17ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#17ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 10: {
					break;
				}
				case 26: {
					$("#26ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#26ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 20: {
					$("#20ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#20ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 22: {
					$("#22ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#22ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
				case 18: {
					$("#18ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#18ProgressBar").html(parseInt(tempName[i].rulesApprove));
					break;
				}
				case 19: {
					$("#19ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#19ProgressBar").html(parseInt(tempName[i].rulesApprove));
					break;
				}
			}
		}
	});
	$("button#submission").click(function() {
		$(this).addClass('selected2');
		$('#hour').html('*ממוצע לח"כ במפלגה');

		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
				case 14: {
					$("#14ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission ) * 1.5) + "px"
					});
					$("#14ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 15: {
					$("#15ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#15ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 16: {
					$("#16ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#16ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 17: {
					$("#17ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#17ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 10: {
					break;
				}
				case 26: {
					$("#26ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#26ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 20: {
					$("#20ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.2 ) + "px"
					});
					$("#20ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 22: {
					$("#22ProgressBar").animate({
						"width" : tempName[i].rulesSubmission + "px"
					});
					$("#22ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
				case 18: {
					$("#18ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#18ProgressBar").html(parseInt(tempName[i].rulesSubmission));
					break;
				}
				case 19: {
					$("#19ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 1.5) + "px"
					});
					$("#19ProgressBar").html(parseInt(tempName[i].rulesSubmission));
					break;
				}
			}
		}
	});
}

function updateData() {
	setTimeout(function() {
		$("#committee").trigger("click");
	}, 1000);
}
