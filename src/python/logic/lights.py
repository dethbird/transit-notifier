"""Logic for lights."""

from phue import Bridge
from phue import PhueRegistrationException

import config

def update_lights_from_signals(app_settings, trip_update_data):
    
    import pdb; pdb.set_trace()
    signals = trip_update_data['SIGNALS']

    try:
        b = Bridge(app_settings['hue_bridge_ip'])
    except OSError:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Could not find Hue Bridge at {}'.format(app_settings['hue_bridge_ip'])
        return trip_update_data
        
    except PhueRegistrationException:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data

    b.connect()
    command1 =  {
        'transitiontime' : app_settings['inbound_bulb_transition_time'],
        'on' : True,
        'bri' : app_settings['inbound_bulb_bri_active'] if signals['INBOUND']['value']=='on' else app_settings['inbound_bulb_bri_inactive'],
        'hue': app_settings['inbound_bulb_hue_active'] if signals['INBOUND']['value']=='on' else app_settings['inbound_bulb_hue_inactive'],
        'sat': app_settings['inbound_bulb_sat_active'] if signals['INBOUND']['value']=='on' else app_settings['inbound_bulb_sat_inactive']
    }
    try:
        b.set_light(app_settings['inbound_bulb_id'], command1)
    except:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data

    command2 =  {
        'transitiontime' : app_settings['outbound_bulb_transition_time'],
        'on' : True,
        'bri' : app_settings['outbound_bulb_bri_active'] if signals['OUTBOUND']['value']=='on' else app_settings['outbound_bulb_bri_inactive'],
        'hue': app_settings['outbound_bulb_hue_active'] if signals['OUTBOUND']['value']=='on' else app_settings['outbound_bulb_hue_inactive'],
        'sat': app_settings['outbound_bulb_sat_active'] if signals['OUTBOUND']['value']=='on' else app_settings['outbound_bulb_sat_inactive']
    }

    try:
        b.set_light(app_settings['outbound_bulb_id'], command2)
    except:
        trip_update_data['hue_bridge']['status'] = 'error'
        trip_update_data['hue_bridge']['message'] = 'Press the link button on the Hue Bridge'
        return trip_update_data
    
    trip_update_data['hue_bridge']['details'] = b.get_api()
    return trip_update_data

