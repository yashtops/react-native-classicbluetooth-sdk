"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOnDataReceived = void 0;
var _react = require("react");
var _reactNativeBluetoothClassic = _interopRequireDefault(require("react-native-bluetooth-classic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useOnDataReceived = address => {
  const [data, setData] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    if (!address) {
      console.error('Device address is required');
      return;
    }
    const onDataReceived = event => {
      setData(event.data);
    };
    const subscription = _reactNativeBluetoothClassic.default.onDeviceRead(address, onDataReceived);
    return () => subscription.remove();
  }, [address]);
  return [data, () => {}];
};
exports.useOnDataReceived = useOnDataReceived;
//# sourceMappingURL=event.js.map