"""Hit the gometro APIs and compile information to turn a signal on/off"""
import json
import os
import sqlite3
import sys
import threading


from logic import lights
from logic import trip_updates

import config

if sys.version_info[0] < 3:
    raise Exception("Python 3 or a more recent version is required.")


def update():
    trip_update_data = {
        'database': {
            'status': 'ok',
            'message': 'Ok'
        },
        'hue_bridge': {
            'status': 'ok',
            'message': 'Ok'
        }
    }
    if os.path.isfile('transit.db'):
        # sqlite connection    
        conn = sqlite3.connect('transit.db')
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        # fetch relevant trip details for the stops we care about
        trip_update_data = trip_updates.fetch_trip_update_data(
            c, trip_update_data)
        
        # calculate the signal info based on the stops
        trip_update_data = trip_updates.update_signals(trip_update_data)

        # # update the lights
        trip_update_data = lights.update_lights_from_signals(trip_update_data)
        
        conn.close()
    else:
        trip_update_data['database']['status'] = 'not_intialized'
        trip_update_data['database']['message'] = 'Please run `python3 src/python/init.py`'
    
    # update the web version of output
    f = open('public/trip-updates.json', 'w')
    f.write(json.dumps(trip_update_data))
    
def main():
    threading.Timer(
        config.UPDATE_FREQUENCY_SECONDS,
        main
    ).start()
    update()

if __name__ == '__main__':
    main()
