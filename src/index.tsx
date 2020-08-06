import {NativeModules, NativeEventEmitter, processColor} from 'react-native';

const SystemColorPicker = NativeModules.SystemColorPicker;
const SystemColorPickerEmitter = new NativeEventEmitter(SystemColorPicker);

const subscriptions = {};
SystemColorPickerEmitter.addListener('colorChange', ({cmdID, color}) => {
	let subscription = subscriptions[cmdID];
	subscription && subscription.onChange(color);
});
SystemColorPickerEmitter.addListener('close', ({cmdID, color}) => {
	let subscription = subscriptions[cmdID];
	subscription && subscription.onPick(color);
	delete subscriptions[cmdID];
});

interface Options {
	showsAlpha?: boolean,
}

export function pickColor(onPick: (color) => void, color, onChange?: (color) => void, options?: Options) {
	SystemColorPicker.open(processColor(color), options).then(id => {
		subscriptions[id] = {
			onPick,
			onChange,
		}
	});
}
