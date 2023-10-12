import init from 'react_native_mqtt'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
     
    sync: {
    }
});
const defaultConnectOptions = {
    reconnect: false,
    cleanSession: true,
    mqttVersion: 3.1,
    keepAliveInterval:60,
    timeout: 60
}

export default class MQTTConnection {
    constructor() {
        this.mqtt = null;
        this.QOS = 0;
        this.RETAIN = true;
    }
    connect(host, port, options = null) {
        if (options) {
            this.QOS = options.qos;
            this.RETAIN = options.retain;
        }
        let currentTime = +new Date();
        let clientID = currentTime + uuid.v1();
        clientID = clientID.slice(0, 23)
        console.log('clientId', clientID);
        this.mqtt = new Paho.MQTT.Client(host, port,"/mqtt", clientID);
        
        this.mqtt.onConnectionLost = (res) => {
            this.onMQTTLost;
        }
        this.mqtt.onMessageArrived = (message) => {
            this.onMQTTMessageArrived(message);
        }
        this.mqtt.onMessageDelivered = (message) => {
            this.onMQTTMessageDelivered(message);
        }
        
        const connectOptions = options ? options : defaultConnectOptions;
        this.mqtt.connect({
            onSuccess: this.onMQTTSuccess,
            onFailure: this.onMQTTFailure,
              userName:"MohamedSaad",
              password:"MS_127RTIF_#$%_e",
            
              useSSL: true,
            ...connectOptions,
            
        })
    }
    onMQTTSuccess=(err)=>{
      
        // this.subscribeChannel("mm")
        this.onMQTTConnect()
        console.log(err,"hhh")
    }
    onMQTTFailure=(err)=>{
       
        this.onMQTTLost()
        console.log(err,"gg")
        
    }
    
    subscribeChannel(channel) {
        console.log("mqtt connection channel", channel)
        let isConnected=this.mqtt.isConnected()
        // if (this.mqtt || !isConnected) {
        //     return;
        // }
        this.mqtt.subscribe(channel, this.QOS);

    }
    unSubscribeChannel(channel) {
        console.log("mqtt connection un sub channel", channel)
        let isConnected=this.mqtt.isConnected()
        if (!this.mqtt || !isConnected) {
            return;
        }
        this.mqtt.unsubscribe(channel);

    }
    send(channel = null, payload) {
        // this.subscribeChannel(channel)
        console.log("mqtt connection send : ",this.mqtt.isConnected())
        let isConnected=this.mqtt.isConnected()
        if (!this.mqtt || !isConnected) {
            return;
        }
        if (!channel || !payload) {
            return false;
        }
        console.log(`mqtt connection send publish channel : ${channel}, payload : ${payload} qos:`)
        this.mqtt.publish(channel, payload, this.QOS, this.RETAIN);
    }
    close(){
        this.mqtt&& this.mqtt.disconnect();
        this.mqtt=null; 
    }

}
MQTTConnection.prototype.onMQTTConnect=null;
MQTTConnection.prototype.onMQTTLost=null;
MQTTConnection.prototype.onMQTTMessageArrived=null;
MQTTConnection.prototype.onMQTTMessageDelivered=null;