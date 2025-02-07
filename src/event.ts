import { useEffect, useState } from 'react';
import RNBluetoothClassic, { BluetoothEventSubscription, } from 'react-native-bluetooth-classic';

export const useOnDataReceived = (address: string): [string, () => void] => {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        if(!address) {
            console.error('Device address is required')
            return;
        }
        const onDataReceived = (event: { data: string }) => {
            setData(event.data);
        }

        const subscription: BluetoothEventSubscription = RNBluetoothClassic.onDeviceRead(address, onDataReceived);
        return () => subscription.remove();
        
    }, [address])

    return [data, () => { }];
}