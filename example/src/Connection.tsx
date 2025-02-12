import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import {
  enableBluetooth,
  isBluetoothEnabled,
  requestAllPermissions,
  startDiscovery,
  requestLocationService,
  pairDevice,
  getPairedDevices,
  stopDiscovery,
  unPairDevice,
  connectDevice,
} from "react-native-classicbluetooth-sdk";

const Connection = () => {
  const navigation = useNavigation<any>();
  const [devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const [pairedDevices, setPairedDevices] = React.useState<BluetoothDevice[]>(
    []
  );
  const [expandpairedDevice, setExpandPairdDevice] = useState<boolean>(false);
  const [searching, startSearching] = React.useState<boolean>(false);
  const [connectedDevice, setGetConnectedDevice] = React.useState<
    BluetoothDevice[]
  >([]);

  useEffect(() => {
    getPermission();
    return () => {
      stopDiscovery();
    };
  }, []);

  const log = (message: string, data?: any) => {
    console.log(message, data);
  };
  const getPermission = async () => {
    try {
      const permission = await requestAllPermissions();
      if (permission) {
        checkBluetooth();
      } else {
        log("Permission denied");
      }
    } catch (error) {
      log("Error getting permissions", error);
    }
  };

  const checkBluetooth = async () => {
    try {
      const bluetoothStatus = await isBluetoothEnabled();
      if (!bluetoothStatus) {
        log("Bluetooth not enabled");
        enableBluetooth();
      } else {
        const pairedDevices = await getPairedDevices();

        log("Paired devices", pairedDevices);
        setPairedDevices(pairedDevices);
      }
    } catch (error) {
      log("Error checking Bluetooth", error);
    }
  };

  const discoveryDevice = async () => {
    startSearching(true);
    try {
      const isLocationEnabled = await requestLocationService();
      if (!isLocationEnabled) {
        return;
      }
      log("Discovery started");
      const discovery = await startDiscovery();
      log("Discovery ended", discovery);
      if (discovery) {
        setDevices(discovery as BluetoothDevice[]);
      } else {
        ToastAndroid.show("No device found", ToastAndroid.BOTTOM);
        log("Discovery failed");
      }
    } catch (error) {
      log("Error during device discovery", error);
    } finally {
      startSearching(false);
    }
  };

  const pairConnectDevice = async (item: BluetoothDevice) => {
    log("Pair device");
    if (item.bonded) {
      try {
        const unpairedDevice = await unPairDevice(item.address);
        log("*****", unpairedDevice);
        setPairedDevices((prevDevices) =>
          prevDevices.filter((device) => device.address !== item?.address)
        );
      } catch (error) {
        log("Error unpairing device", error);
      }
    } else {
      try {
        const pairedDevice = await pairDevice(item.address);
        log("Paired device", pairedDevice);
        setDevices((prevDevices) =>
          prevDevices.filter(
            (device) => device.address !== pairedDevice?.address
          )
        );
        setPairedDevices((prevDevices) => [...prevDevices, pairedDevice]);
      } catch (error) {
        log("Error pairing device", error);
      }
    }
  };

  const connectToDevice = async (address: string) => {
    const connections = await connectDevice(address);
    log("connection", JSON.stringify(connections));
    if (connections) {
      navigation.navigate("Device", { device: connections });
    }
  };

  const Deviceist = ({ item }: { item: BluetoothDevice }) => {
    return (
      <View style={styles.deviceList} key={item.address}>
        <TouchableOpacity onPress={() => connectToDevice(item.address)}>
          <Text style={styles.deviceText}>{item.name}</Text>
          <Text style={styles.deviceText}>{item.address}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pairConnectDevice(item)}>
          <Text style={styles.deviceText}>
            {item.bonded ? "Unpair" : "Pair"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const cancelDiscovery = async () => {
    await stopDiscovery();
    startSearching(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {pairedDevices.length > 0 && (
        <>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "black", padding: 10 }}>Paired Devices</Text>
            <TouchableOpacity
              onPress={() => setExpandPairdDevice(!expandpairedDevice)}
            >
              <Text style={{ color: "black", fontSize: 30 }}>
                {expandpairedDevice ? "-" : "+"}
              </Text>
            </TouchableOpacity>
          </View>
          {expandpairedDevice && (
            <View>
              <FlatList
                contentContainerStyle={{ paddingBottom: 150 }}
                data={pairedDevices}
                renderItem={Deviceist}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 1, backgroundColor: "gray" }} />
                )}
              />
            </View>
          )}
        </>
      )}
      {devices.length > 0 && (
        <>
          <Text style={{ color: "black", padding: 10 }}>Available Devices</Text>
          <FlatList
            data={devices}
            renderItem={Deviceist}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "gray" }} />
            )}
          />
        </>
      )}
      {searching && (
        <Text style={styles.searchingText}>Searching for device...</Text>
      )}
      <TouchableOpacity
        style={styles.discoveryButton}
        onPress={searching ? cancelDiscovery : discoveryDevice}
      >
        <Text style={styles.deviceText}>
          {searching ? "Cancel Discovery" : "Start Discovery"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  deviceList: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceText: {
    color: "black",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  searchingText: {
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
  discoveryButton: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    width: "100%",
  },
});
export default Connection;
