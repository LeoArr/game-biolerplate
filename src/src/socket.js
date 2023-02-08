export const connect = () => {
  const socketProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const port = window.location.protocol === "https:" ? 3443 : 3000;
  const socketUrl = `${socketProtocol}//${window.location.hostname}:${port}`;
  const socket = new WebSocket(socketUrl);

  socket.onopen = (e) => {
    socket.send(JSON.stringify({ loaded: true }));
  };

  socket.onmessage = (data) => {
    console.log(data.data);
    let parsedData = JSON.parse(data.data);
    console.log(parsedData);
  };

  socket.onerror = (e) => {
    console.log("Error", e);
  };
  return socket;
};
