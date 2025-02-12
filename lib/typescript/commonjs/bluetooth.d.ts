import { BluetoothDevice, BluetoothDeviceEvent } from "react-native-bluetooth-classic";
type Subscription = {
    remove: () => void;
};
export declare const isBluetoothEnabled: () => Promise<boolean>;
export declare const enableBluetooth: () => Promise<void>;
export declare const startDiscovery: () => Promise<unknown>;
export declare const stopDiscovery: () => Promise<void>;
export declare const connectDevice: (deviceId: string) => Promise<false | BluetoothDevice>;
export declare const disconnectDevice: (deviceId: string) => Promise<true>;
export declare const pairDevice: (deviceId: string) => Promise<BluetoothDevice>;
export declare const unPairDevice: (deviceId: string) => Promise<true>;
export declare const getPairedDevices: () => Promise<BluetoothDevice[]>;
export declare const getConnectedDevice: () => Promise<BluetoothDevice[]>;
export declare const getBondedDevices: () => Promise<BluetoothDevice[]>;
export declare const onBluetoothEnabled: (callback: () => void) => Subscription;
export declare const onBluetoothDisabled: (callback: () => void) => Subscription;
export declare const onStateChanged: (callback: (event: BluetoothDeviceEvent) => void) => Subscription;
export declare const onDeviceConnected: (callback: (device: BluetoothDeviceEvent) => void) => Subscription;
export declare const onDeviceDisconnected: (callback: (device: BluetoothDeviceEvent) => void) => Subscription;
export declare const openBluetoothSettings: () => Promise<void>;
export declare const cleanupSubscriptions: (subscriptions: Subscription[]) => void;
export declare const read: (device: BluetoothDevice) => Promise<any>;
export declare const write: (device: BluetoothDevice, data: string) => Promise<boolean>;
export declare const available: (device: BluetoothDevice) => Promise<number>;
export declare const clear: (device: BluetoothDevice) => Promise<boolean>;
export {};
//# sourceMappingURL=bluetooth.d.ts.map