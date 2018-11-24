UPDATE_FREQUENCY_SECONDS = 10

# Default trip update descriptor
DEFAULT_TRIP_UPDATE_INFO = {
    'STOPS': {
        'INBOUND_TRIGGER': None,
        'INBOUND_TARGET': None,
        'OUTBOUND_TRIGGER': None,
        'OUTBOUND_TARGET': None
    }
}

API_ENDPOINT = {
    'TRIP_UPDATES': 'http://developer.go-metro.com/TMGTFSRealTimeWebService/TripUpdate',
    'VEHICLES': 'http://developer.go-metro.com/TMGTFSRealTimeWebService/vehicle'
}
