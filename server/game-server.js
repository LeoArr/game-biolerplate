module.exports = {
  games: {},
  setupConnection: (ws) => {

    const gameId = "abc123"
    if (this.games[gameId]) {
      this.games[gameId].players.push(ws)
    } else {
      this.games[gameId] = {
        players: [ws]
      }
    }

    ws.on("message", function message(data) {
      console.log("received: %s", data);
    });
    
    ws.send(JSON.stringify({"gameId": gameId}));
  }
}