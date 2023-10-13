import random

import eventlet
import socketio
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)


sio = socketio.Server(cors_allowed_origins="http://localhost:5173")

CORS(app, resources={r"/socket.io/*": {"origins": "http://localhost:5173"}})


@sio.on('connect')
def handle_connect(sid, environ):
    print(f'Client {sid} connected')


def emit_random_number():
    sio.emit('grault', random.randint(0, 100))
    
    eventlet.spawn_after(2, emit_random_number)


emit_random_number()


@sio.on('disconnect')
def handle_disconnect(sid):
    print(f'Client {sid} disconnected')

if __name__ == '__main__':
    print("Server is running")
    app = socketio.WSGIApp(sio)

    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 8082)), app)
