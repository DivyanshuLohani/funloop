import { checkLoginState, loginAsGuest } from '@/services/auth';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from '@/context/AuthContext';
import { ServerData } from '@/types/settings';
import { getDataFromServer } from '@/services/settings';
import { DataProvider } from '@/context/DataProvider';
import { MatchProvider } from '@/context/MatchContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState<ServerData | null>(null);

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
        // const data = await getDataFromServer();
        setData(data);
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

  return <AuthProvider>
    <DataProvider initialData={data || undefined}>
      <MatchProvider>
        <Stack screenOptions={{
          headerShown: false
        }} initialRouteName='(drawer)'>
          <Stack.Screen name="(drawer)" />
        </Stack>
      </MatchProvider>
    </DataProvider>
  </AuthProvider>;
}
