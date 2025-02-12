import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceEvent
} from "react-native-bluetooth-classic";
import { checkAllPermissions } from "./permission";
import { ToastAndroid } from "react-native";

type Subscription = {
  remove: () => void;
};

export const isBluetoothEnabled = async () => {
  try {
    return await RNBluetoothClassic.isBluetoothEnabled();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to check if Bluetooth is enabled");
  }
};

export const enableBluetooth = async () => {
  try {
    await RNBluetoothClassic.requestBluetoothEnabled();
  } catch (error) {
    console.error("Error enabling Bluetooth", error);
    throw new Error("Failed to enable Bluetooth");
  }
};

export const startDiscovery = async () => {
  const isBLenabled = await isBluetoothEnabled();
  const allPermission = await checkAllPermissions();
  if (!isBLenabled) {
    const enableBL = await enableBluetooth();
    return enableBL;
  } else if (!allPermission) {
    return allPermission;
  } else {
    try {
      const unpaired = await RNBluetoothClassic.startDiscovery();
      return unpaired;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await RNBluetoothClassic.cancelDiscovery();
      console.log("Discovery stopped");
    }
  }
};

export const stopDiscovery = async () => {
  try {
    const cancelled = await RNBluetoothClassic.cancelDiscovery();
    console.log(cancelled);
  } catch (error) {
    ToastAndroid.show(
      `Error occurred while attempting to cancel discover devices`,
      ToastAndroid.BOTTOM
    );
  }
};
export const connectDevice = async (deviceId: string) => {
  try {
    const connected = await RNBluetoothClassic.connectToDevice(deviceId, {
      delimiter: "\r",
    });
    if (!connected) {
      throw new Error(`Failed to connect to device: ${deviceId}`);
    }
    console.log(`Connected to device: ${deviceId}`);
    return connected;
  } catch (error) {
    ToastAndroid.show(
      `Error connecting to device: ${deviceId}`,
      ToastAndroid.BOTTOM
    );
    return false;
  }
};

export const disconnectDevice = async (deviceId: string) => {
  try {
    const disconnected = await RNBluetoothClassic.disconnectFromDevice(
      deviceId
    );
    if (!disconnected) {
      throw new Error(`Failed to disconnect from device: ${deviceId}`);
    }
    console.log(`Disconnected from device: ${deviceId}`);
    return disconnected;
  } catch (error) {
    console.error(`Error disconnecting from device: ${deviceId}`, error);
    throw error;
  }
};

export const pairDevice = async (deviceId: string) => {
  try {
    const paired = await RNBluetoothClassic.pairDevice(deviceId);
    if (!paired) {
      throw new Error(`Failed to pair with device: ${deviceId}`);
    }
    return paired;
  } catch (error) {
    console.error(`Error pairing with device: ${deviceId}`, error);
    throw error;
  }
};

export const unPairDevice = async (deviceId: string) => {
  try {
    const unpaired = await RNBluetoothClassic.unpairDevice(deviceId);
    if (!unpaired) {
      throw new Error(`Failed to unpair with device: ${deviceId}`);
    }
    return unpaired;
  } catch (error) {
    console.error(`Error unpairing with device: ${deviceId}`, error);
    throw error;
  }
};

export const getPairedDevices = async () => {
  try {
    const pairedDevices = await RNBluetoothClassic.getBondedDevices();
    return pairedDevices;
  } catch (err) {
    console.error("Error getting paired devices", err);
    return [];
  }
};

export const getConnectedDevice = async () => {
  try {
    const connectedDevices = await RNBluetoothClassic.getConnectedDevices();
    return connectedDevices;
  } catch (err) {
    console.error("Error getting connected devices", err);
    return [];
  }
};

export const getBondedDevices = async (): Promise<BluetoothDevice[]> => {
  try {
    const bondedDevices = await RNBluetoothClassic.getBondedDevices();
    return bondedDevices;
  } catch (error) {
    console.error("Error fetching bonded devices:", error);
    throw new Error("Failed to fetch bonded devices");
  }
};

export const onBluetoothEnabled = (callback: () => void): Subscription => {
  const subscription = RNBluetoothClassic.onBluetoothEnabled(callback);
  return subscription;
};

export const onBluetoothDisabled = (callback: () => void): Subscription => {
  const subscription = RNBluetoothClassic.onBluetoothDisabled(callback);
  return subscription;
};

export const onStateChanged = (
  callback: (event: BluetoothDeviceEvent) => void
): Subscription => {
  const subscription = RNBluetoothClassic.onStateChanged(callback);
  return subscription;
};

export const onDeviceConnected = (
  callback: (device: BluetoothDeviceEvent) => void
): Subscription => {
  const subscription = RNBluetoothClassic.onDeviceConnected(callback);
  return subscription;
};

export const onDeviceDisconnected = (
  callback: (device: BluetoothDeviceEvent) => void
): Subscription => {
  const subscription = RNBluetoothClassic.onDeviceDisconnected(callback);
  return subscription;
};

export const openBluetoothSettings = async (): Promise<void> => {
  try {
    await RNBluetoothClassic.openBluetoothSettings();
    ToastAndroid.show("Bluetooth settings opened", ToastAndroid.SHORT);
  } catch (error) {
    console.error("Error opening Bluetooth settings:", error);
    throw new Error("Failed to open Bluetooth settings");
  }
};

export const cleanupSubscriptions = (subscriptions: Subscription[]): void => {
  subscriptions.forEach((subscription) => subscription.remove());
};

export const read = async (device: BluetoothDevice): Promise<any> => {
  try {
    if (!device) throw new Error("No device connected.");
    const data = await device.read();
    console.log(`Data read from device: ${data}`);
    return data;
  } catch (error) {
    console.error("Error reading data from device:", error);
    throw new Error("Failed to read data from device");
  }
};

export const write = async (
  device: BluetoothDevice,
  data: string
): Promise<boolean> => {
  try {
    if (!device) throw new Error("No device connected.");
    const success = await device.write(data);
    if (success) {
      console.log(`Data written to device: ${data}`);
    }
    return success;
  } catch (error) {
    console.error(`Error writing data to device: ${data}`, error);
    throw new Error("Failed to write data to device");
  }
};

export const available = async (device: BluetoothDevice): Promise<number> => {
  try {
    if (!device) throw new Error("No device connected.");
    const bytesAvailable = await device.available();
    console.log(`Bytes available to read: ${bytesAvailable}`);
    return bytesAvailable;
  } catch (error) {
    console.error("Error checking available bytes:", error);
    throw new Error("Failed to check available bytes");
  }
};

export const clear = async (device: BluetoothDevice): Promise<boolean> => {
  try {
    if (!device) throw new Error("No device connected.");
    const cleared = await device.clear();
    console.log("Buffer cleared");
    return cleared;
  } catch (error) {
    console.error("Error clearing buffer:", error);
    throw new Error("Failed to clear buffer");
  }
};
