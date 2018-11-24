import os
import pandas
import sqlite3
import sys
import urllib.request
import zipfile

if sys.version_info[0] < 3:
    raise Exception("Python 3 or a more recent version is required.")

# download transit info
urllib.request.urlretrieve (
    "http://www.go-metro.com/uploads/GTFS/google_transit_info.zip",
    "google_transit_info.zip")

# unzip transit info
with zipfile.ZipFile("google_transit_info.zip","r") as zip_ref:
    zip_ref.extractall("transit_info")
    zip_ref.close()

# read transit info text files
conn = sqlite3.connect('database/transit.db')
c = conn.cursor()

# agency
c.execute('''DROP TABLE IF EXISTS agency''')
c.execute('''CREATE TABLE agency (
    agency_id text,
    agency_name text,
    agency_url text,
    agency_timezone text,
    agency_lang text,
    agency_phone text,
    agency_fare_url text)''')

df = pandas.read_csv('./transit_info/agency.txt', index_col='agency_id')
records = df.to_records()
c.executemany('INSERT INTO agency VALUES (?,?,?,?,?,?,?)', records.tolist())


# calendar
c.execute('''DROP TABLE IF EXISTS calendar''')
c.execute('''CREATE TABLE calendar (
    id INTEGER,
    service_id INTEGER,
    monday INTEGER,
    tuesday INTEGER,
    wednesday INTEGER,
    thursday INTEGER,
    friday INTEGER,
    saturday INTEGER,
    sunday INTEGER,
    start_date STRING,
    end_date STRING)''')

df = pandas.read_csv('./transit_info/calendar.txt', index_col=False)
records = df.to_records()
c.executemany('INSERT INTO calendar VALUES (?,?,?,?,?,?,?,?,?,?,?)', records.tolist())


# calendar_dates
c.execute('''DROP TABLE IF EXISTS calendar_dates''')
c.execute('''CREATE TABLE calendar_dates (
    id INTEGER,
    service_id INTEGER,
    date STRING,
    exception_type INTEGER)''')

df = pandas.read_csv('./transit_info/calendar_dates.txt',  index_col=False)
records = df.to_records()
c.executemany('INSERT INTO calendar_dates VALUES (?,?,?,?)', records.tolist())


# routes
c.execute('''DROP TABLE IF EXISTS routes''')
c.execute('''CREATE TABLE routes (
    route_id INTEGER,
    agency_id TEXT,
    route_short_name TEXT,
    route_long_name TEXT,
    route_desc TEXT,
    route_type TEXT,
    route_url TEXT,
    route_color TEXT,
    route_text_color TEXT)''')
df = pandas.read_csv('./transit_info/routes.txt', index_col='route_id')
records = df.to_records()
c.executemany('INSERT INTO routes VALUES (?,?,?,?,?,?,?,?,?)', records.tolist())


# shapes
c.execute('''DROP TABLE IF EXISTS shapes''')
c.execute('''CREATE TABLE shapes (
    id INTEGER,
    shape_id INTEGER,
    shape_pt_lat REAL,
    shape_pt_lon REAL,
    shape_pt_sequence INTEGER,
    shape_dist_traveled REAL)''')
df = pandas.read_csv('./transit_info/shapes.txt', index_col=False)
records = df.to_records()
c.executemany('INSERT INTO shapes VALUES (?,?,?,?,?,?)', records.tolist())


# stop_times
c.execute('''DROP TABLE IF EXISTS stop_times''')
c.execute('''CREATE TABLE stop_times (
    id INTEGER,
    trip_id INTEGER,
    arrival_time STRING,
    departure_time STRING,
    stop_id STRING,
    stop_sequence INTEGER,
    stop_headsign STRING,
    pickup_type STRING,
    drop_off_type INTEGER,
    shape_dist_traveled REAL)''')
df = pandas.read_csv('./transit_info/stop_times.txt', index_col=False)
records = df.to_records()
c.executemany('INSERT INTO stop_times VALUES (?,?,?,?,?,?,?,?,?,?)', records.tolist())


# stops
c.execute('''DROP TABLE IF EXISTS stops''')
c.execute('''CREATE TABLE stops (
    stop_id STRING,
    stop_code STRING,
    stop_name STRING,
    stop_desc STRING,
    stop_lat REAL,
    stop_lon REAL,
    zone_id STRING,
    stop_url STRING,
    location_type STRING,
    parent_station STRING,
    stop_timezone STRING,
    wheelchair_boarding INTEGER)''')
df = pandas.read_csv('./transit_info/stops.txt', index_col='stop_id')
records = df.to_records()
c.executemany('INSERT INTO stops VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', records.tolist())


# trips
c.execute('''DROP TABLE IF EXISTS trips''')
c.execute('''CREATE TABLE trips (
    id INTEGER,
    route_id INTEGER,
    service_id INTEGER,
    trip_id INTEGER,
    trip_headsign STRING,
    trip_short_name STRING,
    direction_id INTEGER,
    block_id INTEGER,
    shape_id INTEGER,
    wheelchair_accessible INTEGER,
    bikes_allowed INTEGER)''')
df = pandas.read_csv('./transit_info/trips.txt', index_col=False)
records = df.to_records()
c.executemany('INSERT INTO trips VALUES (?,?,?,?,?,?,?,?,?,?,?)', records.tolist())

# settings
c.execute('''DROP TABLE IF EXISTS app_settings''')
c.execute('''CREATE TABLE app_settings (
    id INTEGER PRIMARY KEY,
    hue_bridge_ip STRING,
    inbound_bulb_id INTEGER,
    inbound_bulb_transition_time INTEGER,
    inbound_bulb_hue_active INTEGER,
    inbound_bulb_hue_inactive INTEGER,
    inbound_bulb_bri_active INTEGER,
    inbound_bulb_bri_inactive INTEGER,
    inbound_bulb_sat_active INTEGER,
    inbound_bulb_sat_inactive INTEGER,
    outbound_bulb_id INTEGER,
    outbound_bulb_transition_time INTEGER,
    outbound_bulb_hue_active INTEGER,
    outbound_bulb_hue_inactive INTEGER,
    outbound_bulb_bri_active INTEGER,
    outbound_bulb_bri_inactive INTEGER,
    outbound_bulb_sat_active INTEGER,
    outbound_bulb_sat_inactive INTEGER,
    route_id STRING,
    inbound_trigger_seconds INTEGER,
    inbound_trigger_stop_id STRING,
    inbound_target_stop_id STRING,
    outbound_trigger_seconds INTEGER,
    outbound_trigger_stop_id STRING,
    outbound_target_stop_id STRING
    )''')
c.execute('''INSERT INTO app_settings VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    )
    ''', [
    1,
    '127.0.1.1:8000',
    1,
    30,
    43690,
    7200,
    200,
    146,
    254,
    254,
    2,
    30,
    49381,
    7200,
    200,
    146,
    254,
    254,
    '100',
    360,
    'SC-13',
    'SC-14',
    360,
    'SC-06',
    'SC-08'
])

conn.commit()
conn.close()

os.remove("google_transit_info.zip")
os.system("rm -rf transit_info")
