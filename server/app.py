import shelve
from subprocess import check_output
import flask
from flask import request, abort, redirect, url_for
from os import environ
import random, string

app = flask.Flask(__name__)
app.debug = True

db = shelve.open("shorten.db")

def hash_gen(n):
    domain = "abcdefghijklmnopqrstuvwxyz"
    temp = ""
    for i in range(0, n):
        temp += domain[random.randrange(0, 26)]
    if db.has_key(temp):
        return hash_gen(n)
    else:
        return temp

def http_check(url):
    url = string.replace(url, "www."    , "")
    url = string.replace(url, "http://" , "")
    url = string.replace(url, "https://", "")
    url = "http://www." + url
    return url


# Home Resource:
# Only supports the GET method, returns a homepage represented as HTML
###
@app.route('/',      methods=['GET'])
@app.route('/short', methods=['GET'])
def home():
    """Builds a template based on a GET request, with some default
    arguements"""
    return flask.render_template(
            'home.html')

@app.route('/short', methods=['POST'])
def short_post():
    short = str (request.form.get('short'))
    url = str (request.form.get('url'))
    url = http_check(url)
    
    if (short == ""):
        short = hash_gen(5)

    if db.has_key(short):
        return flask.render_template('error.html'), 404
 
    db[short] = url
    #print short
    #print url
    return flask.render_template("shorten.html")


@app.route('/short/<short>', methods=['GET'])
def short_get(short):
    if (not (db.has_key(str(short)))):
        return flask.render_template('error.html'), 404
    else: 
        return redirect(db[str(short)])
        
if __name__ == "__main__":
    app.run(port=int(environ['FLASK_PORT']))
