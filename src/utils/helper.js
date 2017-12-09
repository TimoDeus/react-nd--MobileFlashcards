import {Font} from 'expo';

export const loadFonts = () => {
	return Font.loadAsync({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		Ionicons: require("native-base/Fonts/Ionicons.ttf")
	});
};
