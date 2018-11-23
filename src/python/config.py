from dotenv import load_dotenv
from pathlib import Path

import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# Hue Settings
HUE_BRIDGE_IP = os.getenv('HUE_BRIDGE_IP')

# Inbound bulb settings
INBOUND_BULB_ID = int(os.getenv('INBOUND_BULB_ID'))
INBOUND_BULB_HUE_ACTIVE = int(os.getenv('INBOUND_BULB_HUE_ACTIVE'))
INBOUND_BULB_HUE_INACTIVE = int(os.getenv('INBOUND_BULB_HUE_INACTIVE'))
INBOUND_BULB_BRI_ACTIVE = int(os.getenv('INBOUND_BULB_BRI_ACTIVE'))
INBOUND_BULB_BRI_INACTIVE = int(os.getenv('INBOUND_BULB_BRI_INACTIVE'))

# Outbound bulb settings
OUTBOUND_BULB_ID = int(os.getenv('OUTBOUND_BULB_ID'))
OUTBOUND_BULB_HUE_ACTIVE = int(os.getenv('OUTBOUND_BULB_HUE_ACTIVE'))
OUTBOUND_BULB_HUE_INACTIVE = int(os.getenv('OUTBOUND_BULB_HUE_INACTIVE'))
OUTBOUND_BULB_BRI_ACTIVE = int(os.getenv('OUTBOUND_BULB_BRI_ACTIVE'))
OUTBOUND_BULB_BRI_INACTIVE = int(os.getenv('OUTBOUND_BULB_BRI_INACTIVE'))

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
