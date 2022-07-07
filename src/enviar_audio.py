import socketio
import sounddevice as sd
import base64
import soundfile as sf

sio = socketio.Client()
sio.connect('http://localhost:3000')

fs=44100
duration = 2  # seconds
while (True):
    myrecording = sd.rec(duration * fs, samplerate=fs, channels=2,dtype='float64')
    print ("Recording Audio")
    sd.wait()
    print ("Audio recording complete")
    #print(myrecording)
    
    #enc = base64.b64encode(open(myrecording, "rb").read())
    sf.write('myfile.wav', myrecording, fs, subtype='PCM_16')
    enc = base64.b64encode(open('audio.wav', "rb").read())
    sio.emit('audio', enc)   
#print(enc)
#sd.play(myrecording, fs)
#sd.wait()
#print ("Play Audio Complete")