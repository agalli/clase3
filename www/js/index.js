var pages=null;
var currentPage="Page1";

loadPages=function(){
    pages={
        Page1:document.getElementById("Page1"),
        Page2:document.getElementById("Page2"),
        Page3:document.getElementById("Page3")
    }
}
document.addEventListener('DOMContentLoaded', function(){
    loadPages();
    FastClick.attach(document.body);
}, false);

/*document.addEventListener('deviceready',function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}, false);*/
function onBatteryStatus(info) {
    document.getElementById("p-battery").innerHTML=info.level;
}
window.addEventListener("batterystatus", onBatteryStatus, false);

var isOpenedMenu=false;

function alert(message) {
    new Windows.UI.Popups.MessageDialog(message).showAsync();
}


function menuButtonClick(){
    if(isOpenedMenu){
        isOpenedMenu=false;
        pages[currentPage].className="body transition center";
    }else{
        pages[currentPage].className="body transition right";
        isOpenedMenu=true;
    }
}
function menu(selectedPage){
    pages[currentPage].className="hide";
    pages[selectedPage].className="body right";
    setTimeout(function(){
       pages[selectedPage].className="body visible transition center";
        currentPage=selectedPage;
        isOpenedMenu=false;
    },0);
}
function showAlert(){
    navigator.notification.alert(
        'Esto es una alerta nativa',  // message
        function(){},         // callback
        'Titulo',            // title
        'De acuerdo'                  // buttonName
    );

}
function showNoNative(){
    alert("Esta es una alerta Javascript");
}
function showGPS(){
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
}

function takePhoto(){
    navigator.camera.getPicture(function(imageData){
        alert(imageData);
        var image = document.getElementById('imagen');
        image.src = imageData;    
    }, function(message){
        alert('Failed because: ' + message);    
    }, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI
                                                   });
}