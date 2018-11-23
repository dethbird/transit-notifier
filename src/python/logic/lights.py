"""Logic for lights."""

from phue import Bridge
from phue import PhueRegistrationException

import config

def update_lights_from_signals(trip_update_data):
    
    signals = trip_update_data['SIGNALS']

    try:
        b = Bridge(config.HUE_BRIDGE_IP)
    except OSError:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Could not find Hue Bridge at {}'.format(config.HUE_BRIDGE_IP)
        return trip_update_data
        
    except PhueRegistrationException:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data

    b.connect()
    command1 =  {
        'transitiontime' : 30,
        'on' : True,
        'bri' : config.INBOUND_BULB_BRI_ACTIVE if signals['INBOUND']['value']=='on' else config.INBOUND_BULB_BRI_INACTIVE,
        'hue': config.INBOUND_BULB_HUE_ACTIVE if signals['INBOUND']['value']=='on' else config.INBOUND_BULB_HUE_INACTIVE,
        'sat': 254
    }
    try:
        b.set_light(config.INBOUND_BULB_ID, command1)
    except:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data

    command2 =  {
        'transitiontime' : 30,
        'on' : True,
        'bri' : config.OUTBOUND_BULB_BRI_ACTIVE if signals['OUTBOUND']['value']=='on' else config.OUTBOUND_BULB_BRI_INACTIVE,
        'hue': config.OUTBOUND_BULB_HUE_ACTIVE if signals['OUTBOUND']['value']=='on' else config.OUTBOUND_BULB_HUE_INACTIVE,
        'sat': 254
    }
    b.set_light(config.OUTBOUND_BULB_ID, command2)
    try:
        b.set_light(config.OUTBOUND_BULB_ID, command2)
    except:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data
    
    trip_update_data['hue_bridge']['details'] = b.get_api()
    return trip_update_data

