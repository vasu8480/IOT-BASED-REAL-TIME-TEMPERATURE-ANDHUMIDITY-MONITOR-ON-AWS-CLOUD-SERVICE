from paho.mqtt.client import *
import json
import mysql.connector
from datetime import datetime, timezone
from dateutil import tz



def on_message(client,userdata,msg):
    print("topic :", msg.topic)
    message = str(msg.payload.decode('utf-8'))
    print("message: ", message)
    data = json.loads(message)
    print('Device Id: ',data['deviceid'])
    print('Temperature: ',data['temp'])
    print('Humidity: ',data['hum'])
    adddata(data['temp'],data['hum'])


def adddata(temp,hum):
    from_zone = tz.gettz('UTC')
    to_zone = tz.gettz('Asia/Kolkata')
    utc = datetime.now().replace(tzinfo=from_zone)
    dt = utc.astimezone(to_zone)
    dt=str(dt)
    out=datetime.strptime(dt,'%Y-%m-%d %H:%M:%S.%f+05:30')
    out=out.strftime("%d-%m-%y (%a) %H:%M:%S")
    print(out)
    try:
        connection=mysql.connector.connect(host='localhost',database='vasu',user='root',password='vasu',auth_plugin='mysql_native_password')
        print(connection)
        cursor=connection.cursor()
        query="INSERT INTO vasu_wms (temp,hum,dataupdate) VALUES ('"+str(temp)+"','"+str(hum)+"','"+str(out)+"')";
        cursor.execute(query)
        connection.commit()
        print('Record inserted')
    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))
    finally:
        if(connection.is_connected()):
           cursor.close()
           connection.close()
           print('MySQL is  disconnected')






client=Client('node1')
mqttcon=client.connect('52.4.22.143',1883)
if mqttcon==0:
    print("MQTT Connected")
    client.subscribe('vasu')
    client.on_message = on_message
    client.loop_forever()
