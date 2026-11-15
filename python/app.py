# INTENTIONALLY INSECURE TEST FIXTURE — never run.
# Not covered by the demo's rules (JS/TS only): expected to be reported as a coverage limitation.
import pickle, sqlite3, yaml

def find_user(user_id):
    conn = sqlite3.connect("app.db")
    return conn.execute("SELECT * FROM users WHERE id = '%s'" % user_id).fetchall()

def load_session(blob):
    return pickle.loads(blob)

def load_config(text):
    return yaml.load(text)
