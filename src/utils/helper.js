import {Font} from 'expo';
import md5 from 'js-md5';

export const loadFonts = () => {
	return Font.loadAsync({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		Ionicons: require("native-base/Fonts/Ionicons.ttf")
	});
};

export const gravatarImageSrc = (token, size = 32) => {
	return `https://www.gravatar.com/avatar/${md5(token)}?d=identicon&s=${size}`
};
