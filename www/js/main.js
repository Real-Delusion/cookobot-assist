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
        this.table = "1";//localStorage.getItem("table");
        this.showNotifications();
        this.hideNotifications();
    },
    methods: {
        hideNotifications: function(type){
            if (type == 'now') {
                this.controlNotifications = false;
            }
            else {
                if(this.connected != false){
                    setTimeout(() => {
                        this.controlNotifications = false
                    }, 5000);
                }
            }
            
        },
        showNotifications: function(){
            this.controlNotifications = true;
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
            if(this.apartado >= 4){
                setTimeout(() => {
                    this.apartado = 2;
                }, 5000);

            }
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
var socket = io('http://localhost:3000');
socket.on('connect', () => {
    app.connected = true;
    app.showNotifications();
    app.hideNotifications('');
});
socket.on('event', function (data) { });
socket.on('disconnect', () => {
    app.connected = false;
    app.showNotifications();
    app.hideNotifications('');

});

function sendIssue() {
    socket.emit('issue', app.table, app.issue);
    console.log("Issue sent from table:"+app.table)
}

