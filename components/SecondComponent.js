

import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StompContext, StompEventTypes, StompProvider, useStomp} from '../services/react-stompjs/stomp';
import { BlueButton } from './Button';

const UserSetting = () => {
    const [status, setStatus] = useState('Not Connected');
    const [session, setSession] = useState(null);

    const { newStompClient, addStompEventListener, removeStompEventListener } = useContext(StompContext);
   
    const EventPropType = {
            eventId: "",
            from: "dauda",
            to: "oziegbe",
            eventDt: "",
            payload: "drizzy got bodied by a short nicca"
          }

  useEffect(() => {
    const connectListener = () => setStatus('Connected');
    const disconnectListener = () => setStatus('Disconnected');
    const webSocketCloseListener = () => setStatus('Disconnected (not graceful)');

   addStompEventListener(StompEventTypes.Connect, connectListener);
   addStompEventListener(StompEventTypes.Disconnect, disconnectListener);
   addStompEventListener(StompEventTypes.WebSocketClose, webSocketCloseListener);

    setSession(newStompClient(
      'https://isw-psb-test-sc-superstore-sales-nano.azuremicroservices.io/websocket',
      {
        token: 'abc',
        userId: '123',
      },
      '/host'
    ));

    // Cleanup
    return () => {
      removeStompEventListener(StompEventTypes.Connect, connectListener);
      removeStompEventListener(StompEventTypes.Disconnect, disconnectListener);
      removeStompEventListener(StompEventTypes.WebSocketClose, webSocketCloseListener);
    };
  }, []);

  const handleSendMessage = () => {
    console.log('sending message.......');
   
    session.publish({
        destination: '/app/sendmessage',
        body: JSON.stringify(EventPropType),
    });
  }

   
      
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <View><Text>Status: {status}</Text></View>
        <BlueButton onPress={handleSendMessage} />
      </View>
    )


}

export default UserSetting;