'use strict';

module.exports = {
	createDiseases: createDiseases,
	getDisease: getDisease
};

const DISEASES = [
	{
		name: 'Bubonic Plague',
		rarity: 'Rare',
		dc: 25,
		transmission: 'Touch',
		incubation: '1 day',
		description: {
			short: 'Horrible buboes spread across the body',
			long: 'Often mistaken for influenza at first, swollen buboes mark the body and a near-certain death sentence.'
		},
		stages: {
			1: 'Your body aches and you have a slight fever. You have -2 to all ability modifiers.',
			2: 'Painful buboes appear around your arm, groin, and neck. You have disadvantage on all rolls.',
			3: 'Your fever burns extremely hot and you can\'t stop sweating. You fall into a coma.',
			4: 'Your internal organs fail and you die.'
		},
		cured: 'Your body is scarred by the buboes.'
	},
	{
		name: 'Chickenpox',
		rarity: 'Common',
		dc: 20,
		transmission: 'Touch, Air',
		incubation: '2 days',
		description: {
			short: 'Tiny, itchy spots spread across the body',
			long: 'Tiny, itchy spots that spread across your entire body. Very contagious, but not usually life-threatening.'
		},
		stages: {
			1: 'You have a slight fever and feel weak. You have -2 STR and -2 DEX.',
			2: 'You have noticeable pox marks across your body. You have disadvantage on social checks.',
			3: 'You are covered in itchy spots. You have disadvantage on concentration checks.',
			4: 'Your fever is burning hot. You have disadvantage on all rolls.'
		},
		cured: 'You have a few small scars from the pox. You are permanently immune to chickenpox.'
	},
	{
		name: 'Cholera',
		rarity: 'Common',
		dc: 10,
		transmission: 'Touch (excrement)',
		incubation: '1 day',
		description: {
			short: 'Diarrhea and dehydration',
			long: 'One drink of bad water and you\'ll be curled up by the toilet for a week—or die from dehydration.'
		},
		stages: {
			1: 'You feel sick and nauseous, and eating food causes you to vomit. -2 DEX and -2 WIS.',
			2: 'You have diarrhea. -2 STR, -2 CHA, and you gain thirst at twice the normal rate.',
			3: 'You have lost noticeable weight. You are dehydrated and have disadvantage on all rolls.',
			4: 'Your body goes into shock from severe dehydration, and you die.'
		},
		cured: 'You can\'t eat rich food for the next week without being sick.'
	},
	{
		name: 'Diphtheria',
		rarity: 'Rare',
		dc: 15,
		transmission: 'Touch, Air',
		incubation: '3 days',
		description: {
			short: 'A throat infection that can lead to permanent scarring',
			long: 'A nasty infection of the throat that can cause permanent scarring if it penetrates the skin.'
		},
		stages: {
			1: 'You have a sore throat and headache. You have -2 CHA and disadvantage on concentration checks.',
			2: 'You have swollen glands in your neck and it\'s very painful to swallow. You have -2 STR and -2 DEX.',
			3: 'Large, painful ulcers appear on your skin. You have -2 CON and disadvantage on social checks.',
			4: 'Pus-filled blisters appear on your legs, hands, and feet. You have disadvantage on all rolls.'
		},
		cured: 'You have permanent scars from your skin ulcers.'
	},
	{
		name: 'Dysentery',
		rarity: 'Common',
		dc: 20,
		transmission: 'Touch (excrement)',
		incubation: '1 day',
		description: {
			short: 'Stomach cramps and vomiting',
			long: 'Easy to catch and painful to endure, one sip of dirty water can be enough to ruin your whole week.'
		},
		stages: {
			1: 'You suffer painful stomach cramps. You have disadvantage on all saving throws.',
			2: 'You have a mighty need to use the restroom. You have -2 to all ability modifiers.',
			3: 'You can\'t keep any food down. You gain thirst and fatigue at twice the normal rate.',
			4: 'Your body is too weak to stand. Your speed is reduced to 0.'
		},
		cured: 'You can\'t eat rich food during the next week without being sick.'
	},
	{
		name: 'Influenza',
		rarity: 'Common',
		dc: 10,
		transmission: 'Touch, Air',
		incubation: '2 days',
		description: {
			short: 'Fatigue, headaches, and fever',
			long: 'A harmless cough and a slight fever can quickly turn into something much more serious without bed rest.'
		},
		stages: {
			1: 'You have a bad headache and a runny nose. You have -2 INT, and -2 WIS.',
			2: 'Your entire body aches and your throat is sore. You have -2 STR, -2 DEX, and -2 CHA.',
			3: 'You have a terrible fever and hallucinations. You can\'t move under your own power.',
			4: 'Your internal organs fail and, after slipping into a coma, you die within a few hours.'
		},
		cured: 'You have an annoying cough for one week.'
	},
	{
		name: 'Smallpox',
		rarity: 'Rare',
		dc: 15,
		transmission: 'Touch, Air',
		incubation: '4 days',
		description: {
			short: 'Large, pus-filled spots cover the body',
			long: 'Tiny spots that quickly become large, painful blisters across your entire body, leaving you with pox scars.'
		},
		stages: {
			1: 'You have a slight fever and feel weak. You have -2 STR and -2 DEX.',
			2: 'You have a persistent headache and flat, red spots on your face, hands, and forearms. You have -2 INT, -2 WIS, and -2 CON.',
			3: 'Your spots become large, painful, pus-filled blisters. You have disadvantage on all rolls.',
			4: 'Your fever is extremely hot. You fall into a coma.'
		},
		cured: 'You have severe scars from the pox.'
	},
	{
		name: 'Stonescale',
		rarity: 'Mythic',
		dc: 30,
		transmission: 'Touch',
		incubation: '4 weeks',
		description: {
			short: 'The skin turns grey as the mind turns feral',
			long: 'As your skin turns grey and cracked, your mind decays to that of a wild animal. Kill them before they kill you.'
		},
		stages: {
			1: 'The skin around your eyes turns noticeably grey. You have disadvantage on social checks.',
			2: 'Your skin is grey and cracked. Movement is painful. You have -2 to all ability modifiers.',
			3: 'You become very forgetful and increasingly aggressive. You have advantage on all STR rolls, and disadvantage on all INT, WIS, and CHA rolls.',
			4: 'You have lost your mind and become a wild beast.'
		},
		cured: 'Your skin is permanently marked with stonescale.'
	},
	{
		name: 'Syphilis',
		rarity: 'Common',
		dc: 20,
		transmission: 'Touch (sore)',
		incubation: '4 weeks',
		description: {
			short: 'A persistent fever that eventually attacks the mind',
			long: 'The flesh is weak. Let your guard down for one night and you might still be paying for it years later.'
		},
		stages: {
			1: 'A highly-contagious sore opens near your lips or groin. You have disadvantage on social checks.',
			2: 'A rash appears on your hands and feet, and you have a fever. You have -2 DEX and -2 CON.',
			3: 'More sores appear on your body, and you are easily exhausted. You have -2 STR and gain fatigue at twice the normal rate.',
			4: 'You have lost noticeable weight and your mind is fuzzy. You have -2 INT, -2 WIS, and -2 CHA.'
		},
		cured: 'You still carry the disease and can infect others.'
	},
	{
		name: 'Tapeworm',
		rarity: 'Common',
		dc: 15,
		transmission: 'Touch (excrement)',
		incubation: '1 week',
		description: {
			short: 'A parasite that lives inside the body causing weight loss	',
			long: 'Tiny parasites that hide away in rotten meat and excrement. Watch what you eat.'
		},
		stages: {
			1: 'You always seem to be hungry. You gain hunger at twice the normal rate.',
			2: 'You have lost a significant amount of weight. You have -2 CON and -2 STR.',
			3: 'You suffer from terrible headaches and some memory loss. You have -2 INT and -2 WIS.',
			4: 'The parasites have reached your brain. You fall into a coma and die.'
		},
		cured: 'You have painful stomach cramps for one week.'
	},
	{
		name: 'Typhoid Fever',
		rarity: 'Common',
		dc: 15,
		transmission: 'Touch (excrement)',
		incubation: '1 week',
		description: {
			short: 'A bad fever and diarrhea',
			long: 'Sometimes it\'s better to go thirsty than take a drink of filthy water. Don\'t risk it—boil it.'
		},
		stages: {
			1: 'You have a fever, a headache, and frequent nosebleeds. You have -2 to all modifiers.',
			2: 'Red spots appear on your skin and you are easily exhausted. You gain fatigue at twice the rate.',
			3: 'You suffer diarrhea. You gain thirst at twice the rate and have disadvantage to all social checks.',
			4: 'Your fever is burning hot and you are delirious. You can\'t move or act on your own power.'
		},
		cured: 'You feel fragile for the next week.'
	},
	{
		name: 'Whooping Cough',
		rarity: 'Common',
		dc: 15,
		transmission: 'Air',
		incubation: '1 week',
		description: {
			short: 'Coughing fits violent enough to break bone',
			long: 'Fits of violent coughing followed by a \'whooping\' inhale of breathe—and sometimes, broken ribs.'
		},
		stages: {
			1: 'You have a mild cough and disadvantage on concentration checks.',
			2: 'You cough in loud, uncontrollable fits with a gasping inhale. You have -2 STR and -2 DEX.',
			3: 'Your coughing fits are violent enough to cause vomiting. You have disadvantage on all rolls.',
			4: 'Your cough is so violent you have broken some of your ribs. You have 0 hit dice and can\'t move without immense pain.'
		},
		cured: 'You have an annoying cough for the next week.'
	}
];

/**
 * Get a disease by name.
 * @param {string} name
 * @return {object} disease
 */
function getDisease (name) {
	return DISEASES.find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}

/**
 * Create all disease blocks in a html DOM.
 * @param {object} html DOM
 * @return {object} DOM
 */
function createDiseases (html) {
	html.querySelectorAll('disease:not(.premade)').forEach(function (element) {
		const name = element.getAttribute('data-name');
		const disease = getDisease(name ? name : '');
		if (disease) {
			element.outerHTML = `
				<disease class='panel panel--disease'>
					<header class='panel__header'>
						<h4 class='panel__title'>${disease.name}</h4>
						<ul class='panel__tags'>
							<li>Disease</li>
							<li>${disease.rarity}</li>
						</ul>
						<span class='panel__incubation'><i class='far fa-clock'></i>${disease.incubation}</span>
						<span class='panel__dc'>${disease.transmission} · DC ${disease.dc}</span>
					</header>
					<section class='panel__body'>
						<p>${disease.description.long}</p>
						<div class='panel__table-wrapper'>
							<table class='table table--disease-stages'>
								<thead>
									<tr>
										<th>Stage</th>
										<th>Effect</th>
									</tr>
								</thead>
								<tbody>
									<tr data-stage='1'>
										<td><span>1</span></td>
										<td>${disease.stages[1]}</td>
									</tr>
									<tr data-stage='2'>
										<td><span>2</span></td>
										<td>${disease.stages[2]}</td>
									</tr>
									<tr data-stage='3'>
										<td><span>3</span></td>
										<td>${disease.stages[3]}</td>
									</tr>
									<tr data-stage='4'>
										<td><span>4</span></td>
										<td>${disease.stages[4]}</td>
									</tr>
									<tr data-stage='cured'>
										<td>Cured</td>
										<td>${disease.cured}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>
				</disease>
			`;
		} else {
			console.error(`No disease details for [${name}]`);
		}
	});
	return html;
}
