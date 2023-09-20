import React, { useEffect, useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import Toast from 'react-native-toast-message';
//Redux section
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context API
import Auth from './Context/store/Auth';
//Navigators
import Main from './Navigators/Main';

//LogBox.ignoreAllLogs(true); //not recommanded, this just for the sake of thi lesson
//Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
import { WithSplashScreen } from './Shared/SplashScreen';

export default function App() {
  const stare = useRef(undefined);
  const queryClient = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
    <Auth>
      <Provider store={store}>
      <NavigationContainer
      >
      {/* <View style={styles.container}>  ref={(ref) => Toast .setRef(ref)} */}
        <Header />
        <Main />
        <Toast />
      </NavigationContainer>
      </Provider>
    </Auth>
    </WithSplashScreen>
  );
}

