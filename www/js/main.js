/* -----------------------
--------- VUE JS ---------
--------------------------*/

var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        table: "",
        controlNotifications: false
    },
    mounted: function () {
        this.table = localStorage.getItem("table");
    },
    methods: {
        hideNotifications: function(type){
            if (type == 'now') {
                this.controlNotifications = false;
            }
            else {
                setTimeout(() => {
                    this.controlNotifications = false
                }, 5000);
            }
            
        },
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
var socket = io('http://localhost:3000');
socket.on('connect', () => {
    app.connected = true;
    app.controlNotifications = true;
    app.hideNotifications('');
});
socket.on('event', function (data) { });
socket.on('disconnect', () => {
    app.connected = false;
    app.controlNotifications = true;
    app.hideNotifications('');

});

function sendIssue() {
    socket.emit('issue', app.table);
    console.log("Issue sent from table:"+app.table)
}

