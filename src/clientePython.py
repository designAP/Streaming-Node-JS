
import cv2
import socketio
import base64

"""
	En este caso, 0 quiere decir que queremos acceder
	a la cámara 0. Si hay más cámaras, puedes ir probando
	con 1, 2, 3...
"""


def update():
    import time
    while True:
        cap = cv2.VideoCapture(0)
        sio = socketio.Client()
        sio.connect('http://35.169.65.241:3000')
        leido, frame = cap.read()
        cap = cv2.VideoCapture(0)
        retval, image = cap.read()
        retval, buffer = cv2.imencode('.jpg', image)
        jpg_as_text = base64.b64encode(buffer)
        sio.emit('stream', base64.b64encode(buffer))
        print(jpg_as_text)
        cap.release()
        sio.disconnect()
        print ("Hello World")
        time.sleep(0.5)
        
print("Hello World")
update()