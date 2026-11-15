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


# --- Flask handlers: request data reaching dangerous sinks ---
import hashlib, os, random, subprocess
import requests
from flask import Flask, request, send_file

app = Flask(__name__)
SECRET_KEY = "placeholder-not-a-real-secret"


@app.route("/search")
def search():
    conn = sqlite3.connect("app.db")
    return str(conn.execute(f"SELECT * FROM items WHERE name = '{request.args['q']}'").fetchall())


@app.route("/ping")
def ping():
    return subprocess.check_output("ping -c 1 " + request.args["host"], shell=True)


@app.route("/files")
def files():
    return send_file(os.path.join("/var/data", request.args["name"]))


@app.route("/fetch")
def fetch():
    return requests.get(request.args["url"], verify=False).text


@app.route("/calc")
def calc():
    return str(eval(request.args["expr"]))


def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()


def new_reset_token():
    reset_token = str(random.random())
    return reset_token


if __name__ == "__main__":
    app.run(debug=True)
