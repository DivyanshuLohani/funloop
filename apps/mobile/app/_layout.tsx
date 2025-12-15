import { checkLoginState } from '@/services/auth';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ServerData } from '@/types/settings';
import { DataProvider } from '@/context/DataProvider';
import { MatchProvider } from '@/context/MatchContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState<ServerData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        setIsLoggedIn(await checkLoginState());
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
        }} initialRouteName={
          isLoggedIn ? '(drawer)' : '(screens)/consent'} >
          <Stack.Screen name="(drawer)" />
          <Stack.Screen name="(screens)/consent" />
        </Stack>
      </MatchProvider>
    </DataProvider>
  </AuthProvider>;
}
