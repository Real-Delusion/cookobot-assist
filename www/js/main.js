/* -----------------------
--------- VUE JS ---------
--------------------------*/

var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        table: ""
    },
    mounted: function () {
        this.table = localStorage.getItem("table");
    },
    watch: {
        table(newTable) {
            localStorage.table = newTable;
        }
    }
})


/* -----------------------
--------- Socket ---------
--------------------------*/
var socket = io('http://192.168.1.124:3000');
socket.on('connect', () => {
    app.connected = true
});
socket.on('event', function (data) { });
socket.on('disconnect', () => {
    app.connected = false
});

function sendIssue() {
    let message = document.getElementById('message').value.toString();
    socket.emit('issue', message);
}

