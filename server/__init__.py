import shelve
from subprocess import check_output
import flask
from flask import request, abort, redirect, url_for, Flask
from os import environ
import random, string
from flaskext.mysql import MySQL

mysql= MySQL()
app = flask.Flask(__name__)
app.debug = True
app.config['MYSQL_DATABASE_USER'] = 'blomouser'
app.config['MYSQL_DATABASE_PASSWORD'] = 'info253'
app.config['MYSQL_DATABASE_DB'] = 'blomo'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

db =["d"] # shelve.open("shorten.db")

def hash_gen(n):
    """Returns a random string of len n alphabets"""
    domain = "abcdefghijklmnopqrstuvwxyz"
    temp = ""
    for i in range(0, n):
        temp += domain[random.randrange(0, 26)]
    if db.has_key(temp):
        return hash_gen(n)
    else:
        return temp

def http_check(url):
    """Checks incoming url for all combinations of "www." and "http://" and unifies an output URL"""
    url = string.replace(url, "www."    , "")
    url = string.replace(url, "http://" , "")
    url = string.replace(url, "https://", "")
    url = "http://www." + url
    return url

@app.route('/', methods=['GET'])
def home():
    """Renders home Page via get request to server/short"""
    return flask.render_template(
            'home.html')

@app.route('/', methods=['POST'])
def short_post():
    """handles Post request for short and Long url and checks for edge cases"""
    short = str (request.form.get('short'))
    url = str (request.form.get('url'))
    url = http_check(url)
    
    if (short == ""):    #Uses random hash url if URL is left blank. 
        short = hash_gen(5)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * from shorts where short='" + short + "'")
    data = cursor.fetchone()

    if data is not None: #Throws 404 if the user tries to set a short URL already in use
        return flask.render_template('error.html', error="Short URL is already in use."), 404
    cursor.execute("INSERT into shorts (url, short, numclicked, lastaccess) VALUES ('" + url + "','" + short + "',0,CURDATE())")
    conn.commit()
    #db[short] = url
    return flask.render_template("shorten.html", short=short, url=url)

@app.route('/<short>', methods=['GET'])
def short_get(short):
    """performs redirect if short url is in db.  returns 404 otherwise. """
    if (not (db.has_key(str(short)))):
        return flask.render_template('error.html', error="Short URL is not valid."), 404
    else: 
        return redirect(db[str(short)])
        
if __name__ == "__main__":
    app.run()
