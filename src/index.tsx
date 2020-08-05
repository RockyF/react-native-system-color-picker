import {NativeModules, NativeEventEmitter} from 'react-native';

const SystemColorPicker = NativeModules.SystemColorPicker;
const SystemColorPickerEmitter = new NativeEventEmitter(SystemColorPicker);

const subscriptions = {};
SystemColorPickerEmitter.addListener('colorChange', ({cmdID, color}) => {
	let subscription = subscriptions[cmdID];
	subscription && subscription(color);
});

interface Options {
	showAlpha?: boolean,
}

export function pickColor(onPick, color: number, options?: Options) {
	SystemColorPicker.open(color, options).then(id => {
		subscriptions[id] = onPick
	});
}
