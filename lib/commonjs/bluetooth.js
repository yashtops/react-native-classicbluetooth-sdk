"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unPairDevice = exports.stopDiscovery = exports.startDiscovery = exports.pairDevice = exports.isBluetoothEnabled = exports.getPairedDevices = exports.getConnectedDevice = exports.enableBluetooth = exports.disconnectDevice = exports.connectDevice = void 0;
var _reactNativeBluetoothClassic = _interopRequireDefault(require("react-native-bluetooth-classic"));
var _permission = require("./permission.js");
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isBluetoothEnabled = async () => {
  try {
    return await _reactNativeBluetoothClassic.default.isBluetoothEnabled();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to check if Bluetooth is enabled");
  }
};
exports.isBluetoothEnabled = isBluetoothEnabled;
const enableBluetooth = async () => {
  try {
    await _reactNativeBluetoothClassic.default.requestBluetoothEnabled();
  } catch (error) {
    console.error("Error enabling Bluetooth", error);
    throw new Error("Failed to enable Bluetooth");
  }
};
exports.enableBluetooth = enableBluetooth;
const startDiscovery = async () => {
  const isBLenabled = await isBluetoothEnabled();
  const allPermission = await (0, _permission.checkAllPermissions)();
  if (!isBLenabled) {
    const enableBL = await enableBluetooth();
    return enableBL;
  } else if (!allPermission) {
    return allPermission;
  } else {
    try {
      const unpaired = await _reactNativeBluetoothClassic.default.startDiscovery();
      return unpaired;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await _reactNativeBluetoothClassic.default.cancelDiscovery();
      console.log("Discovery stopped");
    }
  }
};
exports.startDiscovery = startDiscovery;
const stopDiscovery = async () => {
  try {
    const cancelled = await _reactNativeBluetoothClassic.default.cancelDiscovery();
    console.log(cancelled);
  } catch (error) {
    _reactNative.ToastAndroid.show(`Error occurred while attempting to cancel discover devices`, _reactNative.ToastAndroid.BOTTOM);
  }
};
exports.stopDiscovery = stopDiscovery;
const connectDevice = async deviceId => {
  try {
    const connected = await _reactNativeBluetoothClassic.default.connectToDevice(deviceId, {
      delimiter: "\r"
    });
    if (!connected) {
      throw new Error(`Failed to connect to device: ${deviceId}`);
    }
    console.log(`Connected to device: ${deviceId}`);
    return connected;
  } catch (error) {
    _reactNative.ToastAndroid.show(`Error connecting to device: ${deviceId}`, _reactNative.ToastAndroid.BOTTOM);
    return false;
  }
};
exports.connectDevice = connectDevice;
const disconnectDevice = async deviceId => {
  try {
    const disconnected = await _reactNativeBluetoothClassic.default.disconnectFromDevice(deviceId);
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
exports.disconnectDevice = disconnectDevice;
const pairDevice = async deviceId => {
  try {
    const paired = await _reactNativeBluetoothClassic.default.pairDevice(deviceId);
    if (!paired) {
      throw new Error(`Failed to pair with device: ${deviceId}`);
    }
    return paired;
  } catch (error) {
    console.error(`Error pairing with device: ${deviceId}`, error);
    throw error;
  }
};
exports.pairDevice = pairDevice;
const unPairDevice = async deviceId => {
  try {
    const unpaired = await _reactNativeBluetoothClassic.default.unpairDevice(deviceId);
    if (!unpaired) {
      throw new Error(`Failed to unpair with device: ${deviceId}`);
    }
    return unpaired;
  } catch (error) {
    console.error(`Error unpairing with device: ${deviceId}`, error);
    throw error;
  }
};
exports.unPairDevice = unPairDevice;
const getPairedDevices = async () => {
  try {
    const pairedDevices = await _reactNativeBluetoothClassic.default.getBondedDevices();
    return pairedDevices;
  } catch (err) {
    console.error("Error getting paired devices", err);
    return [];
  }
};
exports.getPairedDevices = getPairedDevices;
const getConnectedDevice = async () => {
  try {
    const connectedDevices = await _reactNativeBluetoothClassic.default.getConnectedDevices();
    return connectedDevices;
  } catch (err) {
    console.error("Error getting connected devices", err);
    return [];
  }
};
exports.getConnectedDevice = getConnectedDevice;
//# sourceMappingURL=bluetooth.js.map