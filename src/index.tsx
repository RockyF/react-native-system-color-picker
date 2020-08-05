import {NativeModules, NativeEventEmitter} from 'react-native';

const SystemColorPicker = NativeModules.SystemColorPicker;
const SystemColorPickerEmitter = new NativeEventEmitter(SystemColorPicker);

const subscriptions = {};
SystemColorPickerEmitter.addListener('colorChange', ({callID, color}) => {
	let subscription = subscriptions[callID];
	subscription(color);
});

export function pickColor(onPick, defaultColor?: number) {
	SystemColorPicker.open(defaultColor).then(id => {
		subscriptions[id] = onPick
	});
}
