"use strict";

import RNBluetoothClassic from "react-native-bluetooth-classic";
import { checkAllPermissions } from "./permission.js";
import { ToastAndroid } from "react-native";
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
    ToastAndroid.show(`Error occurred while attempting to cancel discover devices`, ToastAndroid.BOTTOM);
  }
};
export const connectDevice = async deviceId => {
  try {
    const connected = await RNBluetoothClassic.connectToDevice(deviceId, {
      delimiter: "\r"
    });
    if (!connected) {
      throw new Error(`Failed to connect to device: ${deviceId}`);
    }
    console.log(`Connected to device: ${deviceId}`);
    return connected;
  } catch (error) {
    ToastAndroid.show(`Error connecting to device: ${deviceId}`, ToastAndroid.BOTTOM);
    return false;
  }
};
export const disconnectDevice = async deviceId => {
  try {
    const disconnected = await RNBluetoothClassic.disconnectFromDevice(deviceId);
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
export const pairDevice = async deviceId => {
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
export const unPairDevice = async deviceId => {
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
//# sourceMappingURL=bluetooth.js.map