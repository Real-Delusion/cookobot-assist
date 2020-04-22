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
        issue: "",
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
        changeView: function(){
            this.apartado += 1;
        },
        selectIssue: function(issue){
            this.issue = issue;
            sendIssue();
            this.changeView();

        }
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
    socket.emit('issue', app.table, app.issue);
    console.log("Issue sent from table:"+app.table)
}

