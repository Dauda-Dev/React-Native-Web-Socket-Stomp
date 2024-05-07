
import UserSetting from './components/SecondComponent';
import { StompProvider } from './services/react-stompjs/stomp';
function App() {


  return (
    <StompProvider>
      <UserSetting />
   </StompProvider>
  );
}

export default App;
