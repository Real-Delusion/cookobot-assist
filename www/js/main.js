var socket = io('http://192.168.1.124:3000');
socket.on('connect', function () { });
socket.on('event', function (data) { });
socket.on('disconnect', function () { });

function sendIssue() {
    let message = document.getElementById('message').value.toString();
    socket.emit('issue', message);
}