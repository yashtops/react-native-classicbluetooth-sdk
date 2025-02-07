
# React Native Cubetape Sdk

It helps to connect with cubetape bluetooth device.


## Installation

```
  npm install react-native-cubetapsdk
```
## Dependencies

This library needs these dependencies to be installed in your project before you can use it:

```
  npm install react-native-bluetooth-classic @react-native-async-storage/async-storage react-native-fs react-native-geolocation-service
```

## Permission

Add required permissions in `AndroidMainfest.xml`

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

## Usage

```javascript
import { 
    enableBluetooth, 
    isBluetoothEnabled, 
    requestAllPermissions,
    checkAllPermissions, 
    startDiscoveryCubetape, 
    requestLocationService
} from 'react-native-cubetapsdk';

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
        const device = await startDiscoveryCubetape();
    }
}
```


## Methods

| Method                 |Description                                                                                                                 |
|----------------------- |----------------------------------------------------------------------------------------------------------------------------|
| requestAllPermissions  | request Bluetooth and Location permission.                                                                                 |
| checkAllPermissions    | check and return permissions status granted or not.                                                                       |
| isBluetoothEnabled     | check and return if bluetooth is enabled or not.                                                                           |
| enableBluetooth        | Request that Android enable the bluetooth.                                                                                 |
| startDiscovery         | this will resolve with an array of discovered BluetoothDevice(s).                                                          |
| startDiscoveryCubetape | this will resolve with an array of Cubetape BluetoothDevice(s).                                                            |
| stopDiscovery          | cancels the discovery process.                                                                                             |
| pairDevice             | attempts to pair the specified device. Requires Android API level 19 or higher.                                            |
| unPairDevice           | attempts to unpair the specified device. Requires Android API level 19 or higher.                                          |
| connectDevice          | attempt to connect specific device.                                                                                        |
| disconnectDevice       | attempt to disconnect specific device.                                                                                     |
| onDataReceived         | provide a listener for incoming data.                                                                                      |
| storeScanData          | store the data to the AsyncStorage.                                                                                        |
| getScanData            | get the stored data from the AsyncStorage.                                                                                 |
| deleteData             | delete data from the AsyncStorage.                                                                                         |
| genereteCSV            | generate CSV file and stored in the device.                                                                                |
