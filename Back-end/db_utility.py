import sqlite3

def get_connection():
    try:
        return sqlite3.connect('./Database/emailSubscribe.db')
    except Exception as e:
        print('error connecting database -- {}'.format(str(e)))


def insert_update_delete(conn,query):
    try:
        conn.execute(query);
        conn.commit()
    except Exception as e:
        print('error connecting performing operation -- {}'.format(str(e)))
        if 'UNIQUE' in str(e):
            return "Email already subscribed"

def select(conn,query):
    try:
        cursor = conn.execute(query);
        return cursor
    except Exception as e:
        print('error connecting performing operation -- {}'.format(str(e)))

def close_connection(conn):
    try:
        conn.close()
    except Exception as e:
        print('error closing database -- {}'.format(str(e)))
