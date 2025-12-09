import { checkLoginState, loginAsGuest } from '@/services/auth';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        const isLoggedIn = await checkLoginState();
        if (isLoggedIn) {
          setIsReady(true);
        } else {
          const res = await loginAsGuest();
          if (res !== null) {
            await SecureStore.setItemAsync("token", res.token);
            setIsReady(true);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <Stack />;
}
