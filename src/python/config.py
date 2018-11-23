UPDATE_FREQUENCY_SECONDS = 10

# Route targets
ROUTE_ID = '100'
INBOUND_TRIGGER_STOP_ID = 'SC-13'
INBOUND_TARGET_STOP_ID = 'SC-14'
OUTBOUND_TRIGGER_STOP_ID = 'SC-06'
OUTBOUND_TARGET_STOP_ID = 'SC-08'

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
