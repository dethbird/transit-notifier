"""Trip update methods."""

import datetime

import google.protobuf
from google.protobuf.json_format import MessageToDict
import requests

from logic import gtfs_realtime_pb2
import config


def update_trip_stop_info(trip_update_info, update_type, update, stop, vehicle):
    if (trip_update_info['STOPS'][update_type] is None):
        trip_update_info['STOPS'][update_type] = {
            'TOTAL_SECONDS': None,
            'TYPE': None,
            'TIMESTAMP': None,
            'STOP': stop,
            'VEHICLE': vehicle
        }

    timestamp = None
    if 'arrival' in update:
        timestamp = datetime.datetime.fromtimestamp(int(update['arrival']['time']))
        trip_update_info['STOPS'][update_type]['TYPE'] = 'arrival'
        trip_update_info['STOPS'][update_type]['TIMESTAMP'] = int(update['arrival']['time'])
    if 'departure' in update:
        timestamp = datetime.datetime.fromtimestamp(int(update['departure']['time']))
        trip_update_info['STOPS'][update_type]['TYPE'] = 'departure'
        trip_update_info['STOPS'][update_type]['TIMESTAMP'] = int(update['departure']['time'])
    time_diff = datetime.datetime.now() - timestamp
    trip_update_info['STOPS'][update_type]['TOTAL_SECONDS'] = time_diff.total_seconds()


def fetch_trip_update_data(c, trip_update_data):
    parser = gtfs_realtime_pb2.FeedMessage()
    try:
        content = requests.get(config.API_ENDPOINT['TRIP_UPDATES'], timeout=3).content
    except requests.exceptions.ConnectionError:
        print ('not connected to the Internet')
        return
    except:
        print ('unknown error, possibly a timeout?')
        return
    parser.ParseFromString(content)
    trip_update_info = None
    trip_update_info = config.DEFAULT_TRIP_UPDATE_INFO
    for message in parser.entity:
        entity = MessageToDict(message)
        if entity['tripUpdate']['trip']['routeId'] == config.ROUTE_ID:
            for update in entity['tripUpdate']['stopTimeUpdate']:
                c.execute('SELECT * FROM stops WHERE stop_id = ?',
                    (update['stopId'],))
                stop = dict(c.fetchone())
                if update['stopId'] == config.INBOUND_TRIGGER_STOP_ID:
                    update_trip_stop_info(trip_update_info, 'INBOUND_TRIGGER', update, stop, entity['tripUpdate']['vehicle'])
                if update['stopId'] == config.INBOUND_TARGET_STOP_ID:
                    update_trip_stop_info(trip_update_info, 'INBOUND_TARGET', update, stop, entity['tripUpdate']['vehicle'])
                if update['stopId'] == config.OUTBOUND_TRIGGER_STOP_ID:
                    update_trip_stop_info(trip_update_info, 'OUTBOUND_TRIGGER', update, stop, entity['tripUpdate']['vehicle'])
                if update['stopId'] == config.OUTBOUND_TARGET_STOP_ID:
                    update_trip_stop_info(trip_update_info, 'OUTBOUND_TARGET', update, stop, entity['tripUpdate']['vehicle'])
    trip_update_data['STOPS'] = trip_update_info['STOPS']
    return trip_update_data


def update_signals(trip_update_data):
    signals = {
        'INBOUND': {
            'value': 'off',
            'reason': None
        },
        'OUTBOUND': {
            'value': 'off',
            'reason': None
        }
    }
    if trip_update_data['STOPS']['INBOUND_TRIGGER'] is None and trip_update_data['STOPS']['INBOUND_TARGET'] is None:
        signals['INBOUND']['value'] = 'off'
        signals['INBOUND']['reason'] = 'No info for INBOUND_TRIGGER or INBOUND_TARGET'
    if trip_update_data['STOPS']['INBOUND_TRIGGER'] is None and trip_update_data['STOPS']['INBOUND_TARGET'] is not None:
        if trip_update_data['STOPS']['INBOUND_TARGET']['TOTAL_SECONDS'] <= 0:
            signals['INBOUND']['value'] = 'on'
            signals['INBOUND']['reason'] = 'No info for INBOUND_TRIGGER, INBOUND_TARGET still to depart'
        if trip_update_data['STOPS']['INBOUND_TARGET']['TOTAL_SECONDS'] > 0:
            signals['INBOUND']['value'] = 'off'
            signals['INBOUND']['reason'] = 'No info for INBOUND_TRIGGER, INBOUND_TARGET has departed'
    if trip_update_data['STOPS']['INBOUND_TRIGGER'] is not None and trip_update_data['STOPS']['INBOUND_TARGET'] is None:
        if trip_update_data['STOPS']['INBOUND_TRIGGER']['TOTAL_SECONDS'] <= 0:
            signals['INBOUND']['value'] = 'on'
            signals['INBOUND']['reason'] = 'No info for INBOUND_TARGET, INBOUND_TRIGGER still to depart'
        if trip_update_data['STOPS']['INBOUND_TRIGGER']['TOTAL_SECONDS'] > 0:
            signals['INBOUND']['value'] = 'off'
            signals['INBOUND']['reason'] = 'No info for INBOUND_TARGET, INBOUND_TRIGGER has departed'
    if trip_update_data['STOPS']['INBOUND_TRIGGER'] is not None and trip_update_data['STOPS']['INBOUND_TARGET'] is not None:
        if trip_update_data['STOPS']['INBOUND_TARGET']['TOTAL_SECONDS'] > 0:
            signals['INBOUND']['value'] = 'off'
            signals['INBOUND']['reason'] = 'Info for INBOUND_TARGET & INBOUND_TRIGGER, INBOUND_TARGET has departed'
        if trip_update_data['STOPS']['INBOUND_TARGET']['TOTAL_SECONDS'] <= 0:
            signals['INBOUND']['value'] = 'on'
            signals['INBOUND']['reason'] = 'Info for INBOUND_TARGET & INBOUND_TRIGGER, INBOUND_TARGET still to depart'
        if trip_update_data['STOPS']['INBOUND_TRIGGER']['TOTAL_SECONDS'] <= -360:
            signals['INBOUND']['value'] = 'on'
            signals['INBOUND']['reason'] = 'Info for INBOUND_TARGET & INBOUND_TRIGGER, INBOUND_TRIGGER still to depart for > 3 min'
    
    if trip_update_data['STOPS']['OUTBOUND_TRIGGER'] is None and trip_update_data['STOPS']['OUTBOUND_TARGET'] is None:
        signals['OUTBOUND']['value'] = 'off'
        signals['OUTBOUND']['reason'] = 'No info for OUTBOUND_TRIGGER or OUTBOUND_TARGET'
    if trip_update_data['STOPS']['OUTBOUND_TRIGGER'] is None and trip_update_data['STOPS']['OUTBOUND_TARGET'] is not None:
        if trip_update_data['STOPS']['OUTBOUND_TARGET']['TOTAL_SECONDS'] <= 0:
            signals['OUTBOUND']['value'] = 'on'
            signals['OUTBOUND']['reason'] = 'No info for OUTBOUND_TRIGGER, OUTBOUND_TARGET still to depart'
        if trip_update_data['STOPS']['OUTBOUND_TARGET']['TOTAL_SECONDS'] > 0:
            signals['OUTBOUND']['value'] = 'off'
            signals['OUTBOUND']['reason'] = 'No info for OUTBOUND_TRIGGER, OUTBOUND_TARGET has departed'
    if trip_update_data['STOPS']['OUTBOUND_TRIGGER'] is not None and trip_update_data['STOPS']['OUTBOUND_TARGET'] is None:
        if trip_update_data['STOPS']['OUTBOUND_TRIGGER']['TOTAL_SECONDS'] <= 0:
            signals['OUTBOUND']['value'] = 'on'
            signals['OUTBOUND']['reason'] = 'No info for OUTBOUND_TARGET, OUTBOUND_TRIGGER still to depart'
        if trip_update_data['STOPS']['OUTBOUND_TRIGGER']['TOTAL_SECONDS'] > 0:
            signals['OUTBOUND']['value'] = 'off'
            signals['OUTBOUND']['reason'] = 'No info for OUTBOUND_TARGET, OUTBOUND_TRIGGER has departed'
    if trip_update_data['STOPS']['OUTBOUND_TRIGGER'] is not None and trip_update_data['STOPS']['OUTBOUND_TARGET'] is not None:
        if trip_update_data['STOPS']['OUTBOUND_TARGET']['TOTAL_SECONDS'] > 0:
            signals['OUTBOUND']['value'] = 'off'
            signals['OUTBOUND']['reason'] = 'Info for OUTBOUND_TARGET & OUTBOUND_TRIGGER, OUTBOUND_TARGET has departed'
        if trip_update_data['STOPS']['OUTBOUND_TARGET']['TOTAL_SECONDS'] <= 0:
            signals['OUTBOUND']['value'] = 'on'
            signals['OUTBOUND']['reason'] = 'Info for OUTBOUND_TARGET & OUTBOUND_TRIGGER, OUTBOUND_TARGET still to depart'
        if trip_update_data['STOPS']['OUTBOUND_TRIGGER']['TOTAL_SECONDS'] <= -360:
            signals['OUTBOUND']['value'] = 'on'
            signals['OUTBOUND']['reason'] = 'Info for OUTBOUND_TARGET & OUTBOUND_TRIGGER, OUTBOUND_TRIGGER still to depart for > 3 min'


    trip_update_data['SIGNALS'] = signals
    return trip_update_data
