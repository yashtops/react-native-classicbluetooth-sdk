# React Native Classic Bluetooth SDK

This SDK provides functionalities to connect with classic Bluetooth devices and handle permissions required for Bluetooth and location access.

## Installation

To install the SDK, run:

```sh
npm install react-native-classicbluetooth-sdk
```
## Permissions

Add the required permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
<uses-feature android:name="android.hardware.bluetooth" android:required="true"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

## SDK Functions

### Bluetooth Functions (bluetooth.ts)

| Method                 | Description |
|---------------------- |-------------|
| `enableBluetooth`    | Requests to enable Bluetooth. |
| `isBluetoothEnabled` | Checks if Bluetooth is enabled. |
| `startDiscovery`     | Starts discovering Bluetooth devices. |
| `stopDiscovery`      | Cancels the discovery process. |
| `connectDevice`      | Connects to a specific device. |
| `disconnectDevice`   | Disconnects from a device. |
| `pairDevice`         | Pairs with a Bluetooth device. |
| `unPairDevice`       | Unpairs a previously paired device. |
| `getPairedDevices`   | Retrieves a list of paired devices. |
| `getConnectedDevice` | Retrieves a list of connected devices. |
| `getBondedDevices`   | Fetches bonded (trusted) devices. |
| `onBluetoothEnabled` | Listens for Bluetooth being enabled. |
| `onBluetoothDisabled`| Listens for Bluetooth being disabled. |
| `onStateChanged`     | Listens for Bluetooth state changes. |
| `onDeviceConnected`  | Listens for device connections. |
| `onDeviceDisconnected` | Listens for device disconnections. |
| `openBluetoothSettings` | Opens Bluetooth settings on the device. |
| `cleanupSubscriptions` | Cleans up event subscriptions. |
| `read`               | Reads data from a connected device. |
| `write`              | Writes data to a connected device. |
| `available`          | Checks available bytes for reading. |
| `clear`              | Clears the Bluetooth buffer. |

### Permission Functions (permissions.ts)

| Method                 | Description |
|---------------------- |-------------|
| `requestAllPermissions` | Requests Bluetooth and location permissions. |
| `checkAllPermissions`   | Checks the status of required permissions. |
| `requestLocationService` | Requests location service to be enabled. |

## Usage in React Native

### Initializing Bluetooth and Permissions
```javascript
import { 
    enableBluetooth, 
    isBluetoothEnabled, 
    requestAllPermissions,
    checkAllPermissions, 
    startDiscovery, 
    requestLocationService
} from 'react-native-classicbluetooth-sdk';

const App = () =>{ 
    const [permissionStatus,setPermissionStatus] = useState()
    const [bluetoothEnabled,setBluetoothEnabled] = useState()
    
    useEffect(()=>{
        checkPermission()
    },[])

    const checkPermission = async () => {
        const permissionStatus = await checkAllPermissions()
        setPermissionStatus(permissionStatus)

        if(!permissionStatus){
           const isPermissionGranted = await requestAllPermissions()
           setPermissionStatus(isPermissionGranted)
        }
    }

    useEffect(() => {
        if (permissionStatus) {
            checkBluetoothStatus()      
        }
    }, [permissionStatus])

    useEffect(() => {
        if (bluetoothEnabled) {
            getBluetoothDevice()
        } else{
            enableBluetooth()
        }
    }, [bluetoothEnabled])

    const checkBluetoothStatus = async () => {
        const check = await isBluetoothEnabled()
        setBluetoothEnabled(check)
    }

    const getBluetoothDevice = async () => {
        const isLocationEnabled = await requestLocationService()
        if (!isLocationEnabled) {
            return
        }
        const device = await startDiscovery();
    }
}
```

### Connecting and Communicating with Devices
```javascript
import { 
    read,
    write,
    connectToDevice
} from 'react-native-classicbluetooth-sdk';

const connectToDevice = async (deviceId) => {
  try {
    await connectDevice(deviceId);
    console.log(`Connected to: ${deviceId}`);
  } catch (error) {
    console.error("Failed to connect", error);
  }
};

const sendDataToDevice = async (device, data) => {
  try {
    await write(device, data);
    console.log("Data sent successfully");
  } catch (error) {
    console.error("Failed to send data:", error);
  }
};

const readDataFromDevice = async (device) => {
  try {
    const data = await read(device);
    console.log("Received data:", data);
  } catch (error) {
    console.error("Failed to read data:", error);
  }
};
```