/* -----------------------
--------- VUE JS ---------
--------------------------*/

var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        table: "",
        controlNotifications: false,
        apartado: 1,
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
        changeTable: function(direccion){
            if (direccion == "menos"){
                mesa = parseInt(this.table);
                if(mesa > 0) mesa -= 1;
                this.table = mesa.toString();
            } if (direccion == "mas") {
                mesa = parseInt(this.table);
                mesa += 1;
                this.table = mesa.toString();
            } else {
                
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

function sendTableIssue() {
    socket.emit('issue', app.table);
    console.log("Issue sent from table:"+app.table)
    app.apartado += 1;
}

