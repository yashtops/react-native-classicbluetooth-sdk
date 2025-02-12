import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import {
  disconnectDevice,
  useOnDataReceived,
} from "react-native-classicbluetooth-sdk";
import moment from "moment";

const Device = ({ route, navigation }: any) => {
  const device: BluetoothDevice = route.params.device;
  const [barcode, setBarcode] = useState<any>("");
  const [height, setHeight] = useState<any>("");
  const [width, setWidth] = useState<any>("");
  const [length, setLength] = useState<any>("");
  const [receivedData, setReceivedData] = useState<any>([]);
  //it will return the data from the device
  const [data] = useOnDataReceived(device.address);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: "black" }}>{device.name}</Text>,
      headerRight: () => (
        <>
          <TouchableOpacity onPress={() => disconnect()}>
            <Text style={{ color: "black", right: 10 }}>Disconnect</Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, [route]);

  const disconnect = async () => {
    await disconnectDevice(device.address);
    navigation.goBack("Connection");
  };

  useEffect(() => {
    if (data) {
      console.log("Data received", data);
      const tempData = [...receivedData];
      tempData.push(data);
      setReceivedData(tempData);
    }
  }, [data]);

  const clearRow = () => {
    setBarcode("");
    setHeight("");
    setWidth("");
    setLength("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
      <Text style={styles.text}>Device Name: {device.name}</Text>
      <Text style={styles.text}>Address: {device.address}</Text>
      <Text style={styles.text}>Device ID: {device.id}</Text>
      <Text style={styles.text}>Bonded: {device.bonded ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  blackText: {
    color: "black",
  },
  barcodeInput: {
    padding: 5,
    marginLeft: 10,
    height: 35,
    width: "75%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    color: "black",
  },
  dimensionContainer: {
    marginTop: 15,
    width: "25%",
  },
  dimensionInput: {
    marginTop: 10,
    fontSize: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    color: "black",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    width: "50%",
    alignItems: "center",
  },
});

export default Device;
