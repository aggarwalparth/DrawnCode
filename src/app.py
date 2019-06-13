from flask import Flask, redirect, url_for, request,render_template, send_file
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
import os
app = Flask(__name__,static_url_path='/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT']=0

@app.route("/", methods = ['GET'])
def index():
    return render_template('index.html')

@app.route("/details", methods = ['GET'])
def index2():
    return render_template('index2.html')

@app.route("/download", methods = ['GET'])
def downloadFile():
	path = "templates/index2.html"
	return send_file(path,as_attachment=True)

@app.route('/predict', methods=['GET', 'POST'])
def upload():
	if request.method == 'POST':
		f = request.files['file']
		f.save("index2.png")
		os.system("python3 convert_single_image.py")
		return "Code Generated Successfully."
	return None
# app.run(host='0.0.0.0', port=50000)

if __name__=='__main__':
	http_server = WSGIServer(('',50013),app)
	http_server.serve_forever()