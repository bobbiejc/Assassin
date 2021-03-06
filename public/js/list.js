/**
 * Player List
 */

function createPlayerTableRow(name, role, status, toggle) {
    var state = '';
    var job = '';

    if(role != 'god'){
	if(status == 'alive'){
	    state = '<i class="material-icons">check</i>';
	} else {
	    state = '<i class="material-icons">close</i>';
	}
    } else {
	state = '<i class="material-icons">remove</i>';
    }

    if(role == 'god'){
	job = '<i class="material-icons">flash_on</i>';
    } else {
	job = '<i class="material-icons">person</i>';
    }
    if(toggle){
	return '<tr class = "blue-grey darken-2"><td>' + name + '</td><td class = "center">' + job + '</td><td class = "center">' + state + '</td></tr>';
    } else {
	return '<tr><td>' + name + '</td><td class = "center">' + job + '</td><td class = "center">' + state + '</td></tr>';
    }
}

function createTeamTableRow(name, player1, player2, status, target, currenttarget, toggle) {
  var state = '';
  if(status == 'alive'){
      state = '<i class="material-icons">check</i>';
  } else {
      state = '<i class="material-icons">close</i>';
  }
  var player1name = '';
  if(player1.status == 'alive'){
    player1name = player1.name;
  }
  else {
    player1name = '<s>' + player1.name + '</s>';
  }
  var player2name = '';
  if(player2.status == 'alive'){
    player2name = player2.name;
  }
  else {
    player2name = '<s>' + player2.name + '</s>';
  }
  var newtarget = '<i class="material-icons">remove</i>';
  if(status == 'alive'){
    newtarget = currenttarget;
  }
    if(toggle){
	return '<tr class= "amber darken-3"><td>' + name + '</td><td class = "center">' + player1name + '</td><td class = "center">' + player2name + '</td><td class = "center">' + state + '</td><td class = "center">' + target + '</td><td class = "center">' + newtarget + '</td></tr>';
    } else {
	return '<tr><td>' + name + '</td><td class = "center">' + player1name + '</td><td class = "center">' + player2name + '</td><td class = "center">' + state + '</td><td class = "center">' + target + '</td><td class = "center">' + newtarget + '</td></tr>';
    }
}


function createTargetTableRow(name, player1, player2, target, toggle) {
  if(toggle){
return '<tr class= "red darken-3"><td>' + name + '</td><td class = "center">' + player1 + '</td><td class = "center">' + player2 + '</td><td class = "center">' + target + '</td></tr>';
  } else {
return '<tr><td>' + name + '</td><td class = "center">' + player1 + '</td><td class = "center">' + player2 + '</td><td class = "center">' + target + '</td></tr>';
  }
}

/**
 * Populate the hiscore table by retrieving top 10 scores from the DB.
 * Called when the DOM is fully loaded.
 */
function populatePlayerTable() {
    var table = $("#player_table tr");
    var toggle = true;
    $.get("/playerlist", function(data) {
	var html = '';
	var players = JSON.parse(data);
	players.forEach(function(player) {
	    toggle = !toggle;
	    html = html.concat(createPlayerTableRow(player.name, player.role, player.status, toggle));
	});
	table.last().after(html);
    });
}

function populateTeamTable() {
    var table = $("#team_table tr");
    var toggle = true;
    $.get("/teamlist", function(data) {
	var teams = JSON.parse(data);
	var html = '';
	teams.forEach(function(team) {
	    toggle = !toggle;
	    html = html.concat(createTeamTableRow(team.name, team.player1, team.player2, team.status, team.target.original, team.target.current, toggle));
	});
	table.last().after(html);
    });
}

/**
 * Populate the hiscore table by retrieving top 10 scores from the DB.
 * Called when the DOM is fully loaded.
 */
function populateTargetTable() {
    var table = $("#target_table tr");
    var toggle = true;
    $.get("/teamlist", function(data) {
	     var teams = JSON.parse(data);
	      var html = '';
	teams.forEach(function(team) {
	    if (team.status != "dead") {
		toggle = !toggle;
		console.log("Team is: " + JSON.stringify(team));
		html = html.concat(createTargetTableRow(team.name, team.player1.name, team.player2.name, team.target.current, toggle));
	    }
	});
	table.last().after(html);
    });
}

$(populatePlayerTable);
$(populateTeamTable);
