# react-native-system-color-picker

System color picker for react-native

## Installation

```sh
npm install react-native-system-color-picker
or
yarn add react-native-system-color-picker
```

# Shortcuts
![open](https://raw.githubusercontent.com/RockyF/react-native-system-color-picker/master/assets/shortcut0.png)

## Usage

```js
import {pickColor} from "react-native-system-color-picker"

// ...

pickColor(
	(c) => {
		...onPickColor
	}, color, 
	(c) => {
		...onColorChange
	}, {showsAlpha: true,}
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
