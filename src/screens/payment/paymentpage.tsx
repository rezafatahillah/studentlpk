import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';


interface Props {
  dataArray?: string[] | undefined,
  data: Object
}

const App = (props: any, { dataArray, data }: Props) => {

  const navigationStack = useNavigation<StackNavigation>();

  const snapToken = props.route.params.params.snap_token;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{
            html: `<html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <!-- @TODO: replace SET_YOUR_CLIENT_KEY_HERE with your client key -->
              <script type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="Mid-client-r6RZWD5TCsxNDQsR"></script>
              <!-- Note: replace with src="https://app.midtrans.com/snap/snap.js" for Production environment -->
            </head>
          
            <body>
          
              <script type="text/javascript">
              window.snap.pay("${snapToken}");
              </script>
            </body>
          </html>`
          }}
          
        />
        
      </SafeAreaView>
    </>
  );
};

export default App;