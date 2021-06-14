'use strict';

module.exports = {
	getRookies: getRookies,
	getRookie: getRookie
};

const ROOKIES = [
	{
		background: 'Acolyte',
		hp: {
			die: 'd4',
			static: 3
		},
		proficiencies: {
			bonus: 1,
			armor: '—',
			weapons: 'Simple',
			spells: '2 cleric or warlock'
		}
	},
	{
		background: 'Charlatan',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light',
			weapons: 'Simple',
			spells: '1 bard or sorcerer'
		}
	},
	{
		background: 'Criminal',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light, Medium',
			weapons: 'Simple',
			spells: '—'
		}
	},
	{
		background: 'Entertainer',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light',
			weapons: 'Simple',
			spells: '1 bard or wizard'
		}
	},
	{
		background: 'Folk Hero',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light',
			weapons: 'Simple, Martial',
			spells: '—'
		}
	},
	{
		background: 'Guild Artisan',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light',
			weapons: 'Simple',
			spells: '1 cleric or wizard'
		}
	},
	{
		background: 'Hermit',
		hp: {
			die: 'd4',
			static: 3
		},
		proficiencies: {
			bonus: 1,
			armor: '—',
			weapons: 'Simple',
			spells: '2 druid or wizard'
		}
	},
	{
		background: 'Noble',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light, Medium',
			weapons: 'Simple, Martial',
			spells: '—'
		}
	},
	{
		background: 'Outlander',
		hp: {
			die: 'd6',
			static: 4
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light',
			weapons: 'Simple, Martial',
			spells: '1 cleric or druid'
		}
	},
	{
		background: 'Sage',
		hp: {
			die: 'd4',
			static: 3
		},
		proficiencies: {
			bonus: 1,
			armor: '—',
			weapons: 'Simple',
			spells: '2 sorcerer or wizard'
		}
	},
	{
		background: 'Sailor',
		hp: {
			die: 'd8',
			static: 5
		},
		proficiencies: {
			bonus: 1,
			armor: 'Light, Medium',
			weapons: 'Simple',
			spells: '—'
		}
	},
	{
		background: 'Soldier',
		hp: {
			die: 'd10',
			static: 6
		},
		proficiencies: {
			bonus: 1,
			armor: 'All Armor, Shields',
			weapons: 'Simple, Martial',
			spells: '—'
		}
	},
	{
		background: 'Urchin',
		hp: {
			die: 'd4',
			static: 3
		},
		proficiencies: {
			bonus: 1,
			armor: '—',
			weapons: 'Simple',
			spells: '2 sorcerer or warlock'
		}
	}
];

/**
 * Get list of rookies.
 * @return {object}
 */
function getRookies () {
	return ROOKIES;
}

/**
 * Get a specific rookie.
 * @param {string} name rookie id
 * @return {object}
 */
function getRookie (name) {
	return ROOKIES.find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}
