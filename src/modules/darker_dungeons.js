'use strict';

const BIRKIN = require('./birkin.js');
const KENNEDY = require('./kennedy.js');
const FRANKENSTEIN = require('./frankenstein.js');

const DarkerDungeons = (function() {

	/**
	 * Apply project-specific functions
	 * @param {object} html DOM
	 * @param {string} format output format
	 * @param {string} language output language
	 * @return {object} html DOM
	 */
	function apply (html, format, language) {
		FRANKENSTEIN.createMonsters(html);
		FRANKENSTEIN.createMonsterInfo(html);

		// Render diseases
		BIRKIN.createDiseases(html);
		html.querySelectorAll('.table--diseases-contents tbody').forEach(function (element) {
			const diseases = [ 'Bubonic Plague', 'Chickenpox', 'Cholera', 'Diphtheria', 'Dysentery', 'Influenza', 'Smallpox', 'Stonescale', 'Syphilis', 'Tapeworm', 'Typhoid Fever', 'Whooping Cough' ];
			diseases.forEach(function (name) {
				const disease = BIRKIN.getDisease(name);
				element.innerHTML += `
					<tr>
						<td>${disease.name}</td>
						<td>${disease.description.short}</td>
						<td>${disease.rarity}</td>
						<td>${disease.dc}</td>
						<td>${disease.incubation}</td>
						<td>${disease.transmission}</td>
					</tr>
				`;
			});
		});

		// Render rookies tables
		html.querySelectorAll('.table--level-0 tbody').forEach(function (element) {
			KENNEDY.getRookies().forEach(function (rookie) {
				element.innerHTML += `
					<tr>
						<td>${rookie.background}</td>
						<td>${rookie.hp.static} + CON</td>
						<td>1${rookie.hp.die}</td>
						<td>+2</td>
						<td>${rookie.proficiencies.armor == '—' ? `<span class='empty'>—</span>` : rookie.proficiencies.armor}</td>
						<td>${rookie.proficiencies.weapons}</td>
						<td>${rookie.proficiencies.spells == '—' ? `<span class='empty'>—</span>` : rookie.proficiencies.spells}</td>
					</tr>
				`;
			});
		});

		return html;
	}

	return {
		apply: apply
	}
})();

module.exports = DarkerDungeons;


