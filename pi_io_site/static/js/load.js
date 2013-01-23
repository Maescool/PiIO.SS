var client;

$(document).ready(function() {
    getAjaxMenu();
    client = new WSClient('ws://localhost:9000/', true);

    interface.rpi_menu_click = function(context) {
        client.request_rpi_stream(context.data.mac);
        getAjaxDisplays(context.data.mac);
    };

    client.rpiOnlineOffline = function(state) {
        getAjaxMenu();
        switch (state) {
            case 'online':
                interface.notify('A raspberry pi has come online', 'info', 5000);
                break;
            case 'offline':
                interface.notify('A raspberry pi has gone offline', 'info', 5000);
                break;
            case 'default':
                break;
        }
    }

    client.rpi_config_change = function(mac) {
        getAjaxDisplays(mac);
    };

    client.onerror = function() {
        interface.notify('Error with websocket connection, is the server running?', 'error');
    };
});
