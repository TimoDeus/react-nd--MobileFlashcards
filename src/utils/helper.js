import {Font} from 'expo';
import md5 from 'js-md5';
import {fetchDecks, storeDecks} from './api';

export const loadFonts = () => {
	return Font.loadAsync({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		Ionicons: require("native-base/Fonts/Ionicons.ttf")
	});
};

export const initSampleDataIfRequired = () => {
	fetchDecks().then(
		data => {
			const decks = JSON.parse(data);
			if (!decks || !decks.length) {
				return initSampleData();
			}
		}
	);
};

const initSampleData = () => {
	const sampleData = [{
		name: 'Sample Questions',
		cards: [
			{
				question: 'How awesome is Udacity?',
				answer: 'Very.'
			},
			{
				question: 'How do you spell Udacity?',
				answer: 'U-D-A-C-I-T-Y'
			},
			{
				question: 'What\'s the URL of Udacity?',
				answer: 'www.udacity.com'
			},
			{
				question: 'Who are the React Guides at Udacity?',
				answer: 'Michael, Ryan and Tyler'
			},
			{
				question: 'What will you learn at the React Nanodegree Program?',
				answer: 'React Fundamentals, React & Redux and React Native'
			},
		]
	}];
	return storeDecks(sampleData);
};

export const gravatarImageSrc = (token, size = 32) => {
	return `https://www.gravatar.com/avatar/${md5(token)}?d=identicon&s=${size}`
};

export const shuffleArray = a => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};
