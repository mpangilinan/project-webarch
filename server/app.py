#!/usr/bin/env python

import shelve
from subprocess import check_output
import flask
from flask import request, abort, redirect, url_for
from os import environ

app = flask.Flask(__name__)
app.debug = True

db = shelve.open("shorten.db")


###
# Home Resource:
# Only supports the GET method, returns a homepage represented as HTML
###
@app.route('/short', methods=['GET'])
@app.route('/', methods=['GET'])
def home():
    """Builds a template based on a GET request, with some default
    arguements"""
    return flask.render_template(
            'home.html')

@app.route('/short', methods=['POST'])
def short_post():
    short = str (request.form.get('short'))
    url = str (request.form.get('url'))
    db[short] = url
    print short
    print url
    return "Stored " + url + " in " + short


@app.route('/short/<short>', methods=['GET'])
def short_get(short):
    if (not (db.has_key(str(short)))):
       abort(404)
    else: 
        return redirect(db[str(short)])

if __name__ == "__main__":
    app.run(port=int(environ['FLASK_PORT']))
