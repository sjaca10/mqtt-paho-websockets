// Creating a client instance
client = new Paho.MQTT.Client('stream.kliento.mx', 1884, 'kclient-web')

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client
client.connect(
    {
        onSuccess:onConnect
    }
);

// Called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message
    $('#mqtt-info').append('onConnect')
    client.subscribe('kimetrics/test');
    message = new Paho.MQTT.Message('{ "user": "web", "mechanism": "WebSocket" }');
    message.destinationName = 'kimetrics/test';
    client.send(message)
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        $('#mqtt-info').append('<p> We are having some trouble to establish connection </p>')
        // console.log('onConnectionLost: ' + responseObject.errorMessage)
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    $('#mqtt-info').append('<p>' + message.payloadString + '</p>')
}