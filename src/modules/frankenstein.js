'use strict';

module.exports = {
	getRoles: getRoles,
	getTraits: getTraits,
	getTypes: getTypes,
	formatNumber: formatNumber,
	formatSaves: formatSaves,
	formatAbilities: formatAbilities,
	getStatsForLevel: getStatsForLevel,
	getMonsterStats: getMonsterStats,
	createMonsters: createMonsters,
	createMonsterInfo: createMonsterInfo,
	removeShortcodes: removeShortcodes
};

const ROLES = [
	{
		name: 'Controller',
		ac: -2,
		hp: 100,
		attack: 0,
		damage: 100,
		speed: 0,
		perception: false,
		stealth: false,
		initiative: true,
		saves: -1,
		powers: [
			{
				name: 'Attraction',
				description: 'Once per turn, when you hit a creature with an attack, you can pull that creature up to 15 ft towards you.'
			},
			{
				name: 'Blinding Strike',
				description: 'Once per turn, when you hit a creature with an attack, that creature is <i>Blinded</i> until the start of your next turn.'
			},
			{
				name: 'Blocker',
				description: 'You can spend a bonus action to create a 15 ft x 15 ft area of difficult terrain within 60 ft of you. The area lasts until the start of your next turn.'
			},
			{
				name: 'Crippling Strike',
				description: 'Once per turn, when you hit a creature with an attack, you can reduce that creature\'s speed to 0 ft until the end of their next turn.'
			},
			{
				name: 'Distraction',
				description: 'Once per turn, when you hit a creature with an attack, you can grant advantage to the next attack roll made against that creature.'
			},
			{
				name: 'Get Into Position',
				description: 'Once per turn, when you hit a creature with an attack, you can allow an ally to spend their reaction and move up to half their speed (without provoking opportunity attacks from your target).'
			},
			{
				name: 'Knockback',
				description: 'Once per turn, when you hit a creature with an attack, you can knock the creature up to 15 ft away from you.'
			},
			{
				name: 'Sidestep',
				description: 'Once per turn, when you hit a creature with an attack, you can move yourself and that creature 5 ft in any direction. This movement doesn\'t provoke opportunity attacks.'
			}
		]
	}, {
		name: 'Defender',
		ac: 2,
		hp: 100,
		attack: 0,
		damage: 100,
		speed: -10,
		perception: true,
		stealth: false,
		initiative: false,
		saves: 1,
		powers: [
			{
				name: 'Counterattack',
				description: 'When a creature misses you with a melee weapon attack misses you, you can spend your reaction to make one attack against that creature.'
			},
			{
				name: 'Don\'t Look Away',
				description: 'When you attack a creature, you can mark them. A marked creature has −2 to any attack roll that doesn\'t include you. You can have one active mark at a time, and marks don\'t stack.'
			},
			{
				name: 'Durable',
				description: 'When you finish a long rest, you gain temporary hit points equal to half your maximum hit points.'
			},
			{
				name: 'Get Behind Me',
				description: 'Allies within 5 ft of you count as being in three-quarters cover.'
			},
			{
				name: 'Got Your Back',
				description: 'If you are unrestrained and standing next to a creature that is the target of an attack (which doesn\'t already include you), you can spend your reaction to redirect the attack onto yourself.'
			},
			{
				name: 'Heavy Defence',
				description: 'You may spend a bonus action to gain +2 AC until the start of your next turn.'
			},
			{
				name: 'Shield Wall',
				description: 'If you are unrestrained and standing next to a creature, you can spend a bonus action to grant that creature total cover until the start of your next turn. You must remain adjacent to the creature to maintain this cover.'
			},
			{
				name: 'You Can\'t Leave',
				description: 'Creatures always provoke opportunity attacks from you, even if they take the <i>Disengage</i> action before leaving your reach. When you hit a creature with an opportunity attack, that creature\'s speed becomes 0 for the rest of the turn.'
			}
		]
	}, {
		name: 'Lurker',
		ac: -4,
		hp: 50,
		attack: 2,
		damage: 150,
		speed: 0,
		perception: true,
		stealth: true,
		initiative: false,
		saves: -2,
		powers: [
			{
				name: 'Backstab',
				description: 'If you have advantage on your attack, you deal extra damage equal to your level ([level]).'
			},
			{
				name: 'Bleed Stamina',
				description: 'When you hit a creature with an attack, that creature must make a Constitution saving throw or gain one level of exhaustion. This exhaustion expires naturally after 1 minute of undisturbed rest.'
			},
			{
				name: 'Camouflage',
				description: 'When you are hidden, creatures can\'t spot you with passive perception and they have disadvantage when making active checks to find you.'
			},
			{
				name: 'Cunning Action',
				description: 'You can <i>Dash</i>, <i>Disengage</i>, or <i>Hide</i> as a bonus action.'
			},
			{
				name: 'Death\'s Fury',
				description: 'When you are reduced to 0 hit points, you can spend your reaction to make one attack against a creature that you can see.'
			},
			{
				name: 'Guerilla',
				description: 'When you make an attack while hidden, you don\'t reveal yourself and can remain in hiding.'
			},
			{
				name: 'Hide in Plain Sight',
				description: 'You can attempt to <i>Hide</i> while behind any form of cover—half, three-quarters, or total. You must be out of direct line-of-sight.'
			},
			{
				name: 'Vanish',
				description: 'You can spend an action to become <i>Invisible</i> until the end of your next turn. You must wait until this effect expires before you can use it again.'
			}
		]
	}, {
		name: 'Sniper',
		ac: 0,
		hp: 75,
		attack: 0,
		damage: 125,
		speed: 0,
		perception: false,
		stealth: true,
		initiative: false,
		saves: 0,
		powers: [
			{
				name: 'Close Quarters',
				description: 'You don\'t suffer disadvantage when making ranged attacks within 5 ft of a hostile creature.'
			},
			{
				name: 'Hold Still',
				description: 'You have advantage on attack rolls you make against any creature that moved less than 10 ft during their last turn.'
			},
			{
				name: 'I Can See You',
				description: 'Your ranged attacks ignore half and three-quarters cover.'
			},
			{
				name: 'Next Time',
				description: 'If you miss an attack against a creature, you have advantage on the next attack you make against that same creature before the end of your next turn.'
			},
			{
				name: 'Pinning Shot',
				description: 'Once per turn, when you hit a creature with an attack, you can reduce that creature\'s speed to 0 until the start of your next turn.'
			},
			{
				name: 'Quarry',
				description: 'You can spend your bonus action to designate a creature as your quarry. When you hit your quarry with an attack, you deal extra damage equal to your level ([level]).'
			},
			{
				name: 'Ricochet',
				description: 'If you miss an attack against a creature, you can spend your reaction to make another attack against a different creature of your choice within 15 ft of the original target.'
			},
			{
				name: 'Scattershot',
				description: 'Once per turn, when you hit a creature with an attack, you can deal damage equal to your level ([level]) to every other creature within 5 ft of your target.'
			}
		]
	}, {
		name: 'Striker',
		ac: -4,
		hp: 125,
		attack: 2,
		damage: 125,
		speed: 0,
		perception: false,
		stealth: false,
		initiative: false,
		saves: -2,
		powers: [
			{
				name: 'Bloodfury',
				description: 'When you are bloodied, you become gain -2 AC and +2 attack.'
			},
			{
				name: 'Cleave',
				description: 'Once per turn, when you deal damage to a creature, you can deal half-as-much damage to a target that is (a) within 5 ft of your target and (b) within your reach.'
			},
			{
				name: 'Deathstrike',
				description: 'When you reduce a creature to 0 hit points, that creature immediately gains one failed death saving throw.'
			},
			{
				name: 'Execute',
				description: 'When you hit a creature that has 50% or fewer hit points, you deal extra damage equal to your level ([level]).'
			},
			{
				name: 'Press the Attack',
				description: 'You have advantage when you make an attack roll against a bloodied creature.'
			},
			{
				name: 'Savage Assault',
				description: 'Once per turn, when you hit a creature with an attack, you can deal extra damage equal to your level ([level]).'
			},
			{
				name: 'Stunning Strike',
				description: 'Your attacks score a critical hit on a roll of 19-20. In addition, when you critically hit a creature, that creature must make a Constitution saving throw or be <i>Stunned</i> until the start of your next turn.'
			},
			{
				name: 'Vengence',
				description: 'When you hit a creature that has attacked you since the end of your last turn, you can deal extra damage equal to your level ([level]).'
			}
		]
	}, {
		name: 'Scout',
		ac: -2,
		hp: 100,
		attack: 0,
		damage: 75,
		speed: 10,
		perception: true,
		stealth: true,
		initiative: true,
		saves: -1,
		powers: [
			{
				name: 'Combat Medic',
				description: 'When a creature would be reduced to 0 hit points, you can spend your reaction to reduce it to 1 hit point instead. You must move up to your speed to a space adjacent to the creature. This movement doesn\'t provoke opportunity attacks.'
			},
			{
				name: 'Dodge',
				description: 'When you are hit by an attack, you can spend your reaction to halve the damage taken.'
			},
			{
				name: 'Explorer',
				description: 'You can climb and move across difficult terrain without any movement penalty.'
			},
			{
				name: 'Hard to Hit',
				description: 'When you are standing and unrestained, attacks against you have disadvantage unless you are adjacent to two or more enemies.'
			},
			{
				name: 'I Saw That Coming',
				description: 'When an ally would be hit by an attack, you can spend your reaction to grant that ally +5 AC against the attack.'
			},
			{
				name: 'Light-footed',
				description: 'You can <i>Disengage</i> or <i>Dash</i> as a bonus action. When an enemy moves adjacent to you, you can spend your reaction to move away up to half your speed.'
			},
			{
				name: 'Pincer Movement',
				description: 'When an ally moves adjacent to an enemy, you can spend your reaction to move up to your speed towards that same enemy.'
			},
			{
				name: 'You Can\'t Hide',
				description: 'You have advantage when you attempt to detect hidden creatures. Any creature that you can see is also visible to your allies.'
			}
		]
	}, {
		name: 'Supporter',
		ac: -2,
		hp: 75,
		attack: 0,
		damage: 75,
		speed: 0,
		perception: false,
		stealth: false,
		initiative: true,
		saves: -1,
		powers: [
			{
				name: 'Armorer',
				description: 'Allies within 10 ft of you reduce the damage they take from attacks by half.'
			},
			{
				name: 'Commander',
				description: 'You can spend a bonus action to command an ally to make an attack against a target of your choice.'
			},
			{
				name: 'Ferocity',
				description: 'Allies within 10 ft of you gain a bonus to damage equal to your level ([level]).'
			},
			{
				name: 'Guidance',
				description: 'Allies within 10 ft of you have advantage on their attacks rolls.'
			},
			{
				name: 'Healer',
				description: 'You can spend a bonus action to grant temporary hit points equal to your level ([level]) to a creature within 30 ft.'
			},
			{
				name: 'Not On My Watch',
				description: 'When a creature that you can see would be reduced to 0 hit points, you can spend your reaction to reduce it to 1 hit point instead. In addition, the creature gains temporary hit points equal to your level ([level]).'
			},
			{
				name: 'Protection',
				description: 'Allies within 10 ft of you gain +2 AC.'
			},
			{
				name: 'Rallying Cry',
				description: 'Once per turn, when you hit a target with an attack, you can remove an ongoing condition from an ally that you can see.'
			}
		]
	}
];

const TRAITS = [
	{
		name: 'Adhesive',
		description: 'You can stick to anything you touch. If a creature equal to or smaller than your size touches you, that creature is <i>Grappled</i> by you. Ability checks made to escape your grapple have disadvantage.'
	},
	{
		name: 'Aggressive',
		description: 'You can spend a bonus action to move up to your speed towards an enemy that you can see.'
	},
	{
		name: 'Alarm',
		description: 'When you take damage, all other monsters of the same type within the immediate area are made aware of your pain.'
	},
	{
		name: 'Alien Mind',
		description: 'You have advantage on Intelligence saving throws.'
	},
	{
		name: 'Amorphous',
		description: 'You can move through a space as narrow as 1 inch wide without squeezing.'
	},
	{
		name: 'Arcane Protection',
		description: 'You are resistant to all magical damage.'
	},
	{
		name: 'Armor Breaker',
		description: 'When you hit a creature with an attack, you deal a cumulative -1 penalty to their AC. This penalty can be removed after 1 hour of repair work.'
	},
	{
		name: 'Aura (Antimagic)',
		description: 'You have a 5/10/15 ft aura. Creatures within your aura have disadvantage when casting spells.'
	},
	{
		name: 'Aura (Damaging)',
		description: 'You have a 5/10/15 ft aura. Creatures that a) enter your aura or b) start their turn within your aura take damage equal to your level ([level]).'
	},
	{
		name: 'Aura (Disruptive)',
		description: 'You have a 5/10/15 ft aura. Creatures within your aura have disadvantage on saving throws.'
	},
	{
		name: 'Aura (Distracting)',
		description: 'You have a 5/10/15 ft aura. Creatures within your aura have disadvantage on concentration saving throws.'
	},
	{
		name: 'Aura (Entangle)',
		description: 'You have a 5/10/15 ft aura. The ground within your aura is difficult terrain. Creatures that start their turn in your aura must succeed on a Strength saving throw or be <i>Restrained</i> until the start of their next turn.'
	},
	{
		name: 'Aura (Leech)',
		description: 'You have a 5/10/15 ft aura. Whenever you deal damage to a creature within your aura, you regain half as many hit points.'
	},
	{
		name: 'Aura (Stench)',
		description: 'You have a 5/10/15 ft aura. Creatures within your aura have disadvantage on attack rolls.'
	},
	{
		name: 'Barbed Hide',
		description: 'At the start of your turn, you may deal piercing damage equal to your level ([level]) to any creature that is grappling you.'
	},
	{
		name: 'Blood Frenzy',
		description: 'You have advantage on melee attack rolls against any creature that doesn\'t have all its hit points.'
	},
	{
		name: 'Charger',
		description: 'If you move more than 20ft in a straight line towards a creature, make your melee attack roll with advantage. On a hit, you knock the creature prone in addition to any other effect.'
	},
	{
		name: 'Constrict',
		description: 'At the start of your turn, you may deal bludgeoning damage equal to your level ([level]) to any creature that you are grappling.'
	},
	{
		name: 'Corrosive Body',
		description: 'Any creature that (a) touches you or (b) makes a melee attack against you takes damage equal to your level ([level]). Any weapon that hits you takes a permanent and cumulative −1 penalty to damage rolls. A weapon is destroyed if the penalty reaches −5.'
	},
	{
		name: 'Critical Defence',
		description: 'Critical hits made against you count as normal hits unless you are already bloodied.'
	},
	{
		name: 'Critical Fury',
		description: 'Your weapon attacks score a critical hit on a roll of 19-20.'
	},
	{
		name: 'Damage Absorption',
		description: 'Choose a damage type. Whenever you would take damage of that type, you instead regain that many hit points.'
	},
	{
		name: 'Damage Transfer',
		description: 'When you take damage from an attack, you can transfer half of the damage to another creature within 5 ft of you.'
	},
	{
		name: 'Dangerous Body',
		description: 'Any creature that (a) touches you or (b) hits you with a melee attack while within 5 ft of you takes damage equal to your level ([level]).'
	},
	{
		name: 'Disintegration',
		description: 'When you die, your body distintegrates into dust. You leave behind your weapons and anything else you are carrying.'
	},
	{
		name: 'Dragonbreath',
		description: 'You can breathe dragonfire.'
	},
	{
		name: 'Earth Glide',
		description: 'You can burrow through nonmagical, unworked earth and stone. While doing so, you don\'t disturb the material you move through.'
	},
	{
		name: 'Escape',
		description: 'When you would be reduced to 0 hit points outside of your lair, you instead escape and flee to your lair. You remain there, paralysed and resting, until you recover at least 50% of your hit points.'
	},
	{
		name: 'Explosive',
		description: 'When you fall to 0 hit points, your body explodes and deals damage to everyone within 5 ft. You can begin detonation on your turn with a bonus action; you explode at the start of your next turn.'
	},
	{
		name: 'False Appearance',
		description: 'When you remain motionless, you are indistinguishable from a piece of the local landscape.'
	},
	{
		name: 'Fey Mind',
		description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.'
	},
	{
		name: 'Flight',
		description: 'You can fly up to your speed. While flying, you must move your entire movement speed or land—unless you can also hover. Launching into flight provokes opportunity attacks, even if you <i>Disengage</i>.'
	},
	{
		name: 'Freedom of Movement',
		description: 'You ignore difficult terrain, and magical effects can\'t reduce your speed or cause it to be restrained. You can spend 5 ft of movement to escape from nonmagical restraints or being grappled.'
	},
	{
		name: 'Grappler',
		description: 'You have advantage on attack rolls against any creature you have grappled. In addition, you can split any damage that you take from an attack 50/50 with one creature that you are grappling.'
	},
	{
		name: 'Hover',
		description: 'You can hover in one spot in the air for up to 6 seconds before you need to move.'
	},
	{
		name: 'Immortal',
		description: 'You can\'t be killed unless you are reduced to 0 hit points by a specific type of attack. Any other form of attack will instead reduce you to 1 hit point.'
	},
	{
		name: 'Immutable Form',
		description: 'You are immune to any spell or effect that would alter your form.'
	},
	{
		name: 'Impenetrable',
		description: 'You are resistant to all forms of non-magical damage.'
	},
	{
		name: 'Incorporeal',
		description: 'You can pass through any solid, non-magical matter. In addition, you can\'t be hit by any non-magical weapon or attack.'
	},
	{
		name: 'Independent',
		description: 'You have advantage on Charisma saving throws.'
	},
	{
		name: 'Indomitable',
		description: 'You are immune to any effects that would alter your mind or will.'
	},
	{
		name: 'Inscrutable',
		description: 'You are immune to any effect that would sense your emotions or read your thoughts, as well as any divination spell that you refuse. Wisdom (Insight) checks made to ascertain your intentions or sincerity have disadvantage.'
	},
	{
		name: 'Invisible',
		description: 'You can\'t be seen by normal sight.'
	},
	{
		name: 'Iron Will',
		description: 'You have advantage on Wisdom saving throws.'
	},
	{
		name: 'Life Eater',
		description: 'When you deal damage that reduces a creature to 0 hit points, that creature can\'t be revived by any means short of a <i>Wish</i> spell.'
	},
	{
		name: 'Magic Resistance',
		description: 'You have advantage on saving throws against spells and other magical effects.'
	},
	{
		name: 'Magic Weapons',
		description: 'Your weapon attacks are magical.'
	},
	{
		name: 'Martial Advantage',
		description: 'Once per turn, when you hit a creature within 5ft of your allies, you may deal extra damage equal to your level ([level]).'
	},
	{
		name: 'Parry',
		description: 'You can spend your reaction to gain +3 AC against one melee attack that you can see.'
	},
	{
		name: 'Powerful Leap',
		description: 'You can jump twice as far and twice as high as would be normal.'
	},
	{
		name: 'Precise',
		description: 'You have advantage on Dexterity saving throws.'
	},
	{
		name: 'Rampage',
		description: 'When you reduce a creature to 0 hit points with a melee attack on your turn, you can spend a bonus action to move up to half your speed and attack a different target.'
	},
	{
		name: 'Reckless',
		description: 'At the start of your turn, you can have advantage on all melee attacks you make for that turn. However, all attacks made against you have advantage until the start of your next turn.'
	},
	{
		name: 'Redirect',
		description: 'When you are within 5 ft of an ally, you can redirect any single attack made against you to your ally instead.'
	},
	{
		name: 'Regeneration',
		description: 'You regain hit points at the start of your turn equal to your maximum hit points / 10. This regeneration stops for 1 turn if you are hit by a specific damage type (fire/acid/lightning/etc) or you are reduced to 0 hit points.'
	},
	{
		name: 'Relentless',
		description: 'The first time you fall to 0 hit points after a long rest, you are instead reduced to 1 hit point.'
	},
	{
		name: 'Reliable Attacker',
		description: 'When you miss with an attack, you can spend your reaction to reroll your attack. You must use the second result.'
	},
	{
		name: 'Shadow Stealth',
		description: 'While in dim light or darkness, you can take the <i>Hide</i> action as a bonus action.'
	},
	{
		name: 'Shifty',
		description: 'You can <i>Disengage</i> as a bonus action.'
	},
	{
		name: 'Siege Monster',
		description: 'You deal double damage to objects and structures.'
	},
	{
		name: 'Slippery',
		description: 'You have advantage on ability checks and saving throws made to escape a grapple.'
	},
	{
		name: 'Spider Climb',
		description: 'You can climb difficult surfaces—including upside down on ceilings—without needing to make an ability check.'
	},
	{
		name: 'Spirit Bond',
		description: 'You share a bond with one or more creatures. Your AC and saving throws are equal to the highest value among all bonded creatures.'
	},
	{
		name: 'Split',
		description: 'When you are bloodied, you split into two smaller copies. Each new copy has hit points equal to half of your remaining hit points, and acts independantly.'
	},
	{
		name: 'Sure-footed',
		description: 'You have advantage on Strength and Dexterity saving throws made against effects that would knock you prone.'
	},
	{
		name: 'Swarm',
		description: 'You can occupy another creature\'s space and vice versa. You gain advantage on attacks against any creature that shares your space.'
	},
	{
		name: 'Teamwork',
		description: 'You have advantage on attack rolls when your target is within 5ft of an unrestrained ally.'
	},
	{
		name: 'Thick Skin',
		description: 'You have advantage on Constitution saving throws.'
	},
	{
		name: 'Throwing Master',
		description: 'Once per turn, when you hit a creature with a ranged attack using a thrown weapon, you can deal extra damage equal to your level ([level]).'
	},
	{
		name: 'Tough',
		description: 'You have advantage on Strength saving throws.'
	},
	{
		name: 'Uncanny Senses',
		description: 'Unless you are incapacitated, you can\'t be surprised.'
	},
	{
		name: 'Undying Fortitude',
		description: 'If damage reduces you to 0 hit points, make a Consititution saving throw with a DC of 5 + the damage taken. On a success, you drop to 1 hit point instead.'
	},
	{
		name: 'Wakeful',
		description: 'You are never caught sleeping.'
	},
	{
		name: 'War Magic',
		description: 'When you use your action to cast a spell, you can make one weapon attack as a bonus action.'
	}
];

const TYPES = [
	{
		name: 'Minion',
		ac: -2,
		hp: 20,
		attack: -2,
		damage: 75,
		saves: -2,
		dc: -2,
		speed: 0,
		perception: -2,
		stealth: -2,
		initiative: -2,
		xp: 0.0625,
		cr: {
			'-3': 0,
			'-2': 0,
			'-1': 0,
			'0': 0,
			'1': '1/8',
			'2': '1/4',
			'3': '1/2',
			'4': '1/2',
			'5': '1/2',
			'6': '1/2',
			'7': 1,
			'8': 1,
			'9': 1,
			'10': 1,
			'11': 2,
			'12': 2,
			'13': 2,
			'14': 3,
			'15': 3,
			'16': 3,
			'17': 4,
			'18': 4,
			'19': 4,
			'20': 4,
			'21': 5,
			'22': 6,
			'23': 7,
			'24': 8,
			'25': 9,
			'26': 10,
			'27': 11,
			'28': 11,
			'29': 12,
			'30': 12
		}
	}, {
		name: 'Standard',
		ac: 0,
		hp: 100,
		attack: 0,
		damage: 100,
		saves: 0,
		dc: 0,
		speed: 0,
		perception: 0,
		stealth: 0,
		initiative: 0,
		xp: 0.25,
		cr: {
			'-3': 0,
			'-2': 0,
			'-1': 0,
			'0': '1/8',
			'1': '1/4',
			'2': '1/2',
			'3': 1,
			'4': 1,
			'5': 2,
			'6': 2,
			'7': 3,
			'8': 4,
			'9': 4,
			'10': 4,
			'11': 5,
			'12': 5,
			'13': 6,
			'14': 7,
			'15': 7,
			'16': 8,
			'17': 8,
			'18': 9,
			'19': 10,
			'20': 11,
			'21': 12,
			'22': 13,
			'23': 14,
			'24': 15,
			'25': 16,
			'26': 17,
			'27': 18,
			'28': 19,
			'29': 20,
			'30': 21
		}
	}, {
		name: 'Elite',
		ac: 2,
		hp: 200,
		attack: 2,
		damage: 110,
		saves: 2,
		dc: 2,
		speed: 0,
		perception: 2,
		stealth: 2,
		initiative: 2,
		xp: 0.5,
		cr: {
			'-3': 0,
			'-2': 0,
			'-1': '1/8',
			'0': '1/4',
			'1': '1/2',
			'2': 1,
			'3': 2,
			'4': 3,
			'5': 3,
			'6': 4,
			'7': 4,
			'8': 5,
			'9': 6,
			'10': 7,
			'11': 7,
			'12': 8,
			'13': 9,
			'14': 10,
			'15': 10,
			'16': 11,
			'17': 12,
			'18': 13,
			'19': 14,
			'20': 15,
			'21': 16,
			'22': 17,
			'23': 18,
			'24': 19,
			'25': 20,
			'26': 21,
			'27': 22,
			'28': 23,
			'29': 24,
			'30': 25
		}
	}, {
		name: 'Solo',
		ac: 2,
		hp: 400,
		attack: 2,
		damage: 120,
		saves: 2,
		dc: 2,
		speed: 0,
		perception: 4,
		stealth: 2,
		initiative: 4,
		xp: 1,
		cr: {
			'-3': 0,
			'-2': '1/8',
			'-1': '1/4',
			'0': '1/2',
			'1': 1,
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9,
			'10': 10,
			'11': 11,
			'12': 12,
			'13': 13,
			'14': 14,
			'15': 15,
			'16': 16,
			'17': 17,
			'18': 18,
			'19': 19,
			'20': 20,
			'21': 21,
			'22': 22,
			'23': 23,
			'24': 24,
			'25': 25,
			'26': 26,
			'27': 27,
			'28': 28,
			'29': 29,
			'30': 30
		}
	}
];

const XP = {
	'-5': 1,
	'-4': 3,
	'-3': 10,
	'-2': 25,
	'-1': 50,
	'0': 100,
	'1': 200,
	'2': 450,
	'3': 700,
	'4': 1100,
	'5': 1800,
	'6': 2300,
	'7': 2900,
	'8': 3900,
	'9': 5000,
	'10': 5900,
	'11': 7200,
	'12': 8400,
	'13': 10000,
	'14': 11500,
	'15': 13000,
	'16': 15000,
	'17': 18000,
	'18': 20000,
	'19': 22000,
	'20': 25000,
	'21': 33000,
	'22': 41000,
	'23': 50000,
	'24': 62000,
	'25': 75000,
	'26': 90000,
	'27': 105000,
	'28': 120000,
	'29': 135000,
	'30': 155000
};

/**
 * Get a role
 * @param {string} name
 * @return {object} role
 */
function getRole (name) {
	return ROLES.find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}

/**
 * Get a type
 * @param {string} name
 * @return {object} type
 */
function getType (name) {
	return TYPES.find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}

/**
 * Get a trait
 * @param {string} name
 * @return {object} trait
 */
function getTrait (name) {
	return TRAITS.find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}

/**
 * Get a power from a role
 * @param {string} role
 * @param {string} name
 * @return {object} power
 */
function getPower (role, name) {
	return role['powers'].find((x) => x.name.toLowerCase().trim() == name.toLowerCase().trim());
}

/**
 * Format a number to show/hide positive/minus signs.
 * @param {number} number
 * @param {boolean} hidePositive
 * @return {string} formatted number
 */
function formatNumber (number, hidePositive) {
	const positive = (hidePositive) ? '' : '+';
	return (number >= 0) ? positive + number : `&minus;${Math.abs(number)}`;
}

/**
 * Format an array of saves.
 * @param {number[]} array
 * @param {boolean} hidePositive
 * @return {string} formatted number
 */
function formatSaves (array, hidePositive) {
	const values = Array.from(new Set(Object.values(array)));
	let output = '';
	values.forEach(function (number, i) {
		output += formatNumber(number, hidePositive);
		if (i != values.length - 1) {
			output += ', ';
		}
	});
	return output;
}

/**
 * Format an array of abilities.
 * @param {number[]} array
 * @param {boolean} hidePositive
 * @return {string} formatted number
 */
function formatAbilities (array, hidePositive) {
	const values = Object.values(array);
	let output = '';
	values.forEach(function (number, i) {
		output += formatNumber(number, hidePositive);
		if (i != values.length - 1) {
			output += ', ';
		}
	});
	return output;
}

/**
 * Capitalise a string.
 * @param {string} string
 * @return {string} capitalised string
 */
function capitalise (string) {
	return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

/**
 * Get the monster stats for a specific level.
 * @param {number} level
 * @return {object} level stats
 */
function getStatsForLevel (level) {
	const proficiency = Math.floor((level + 3) / 4) + 1;
	const ability = Math.floor(level / 4) + 3;
	const player = {
		dpr: level > 0 ? Math.max((Math.ceil(level / 4) + (((level - 1) % 4) / 8)) * (4.5 + proficiency), 1) : 4 + level,
		hp: (level * (5 + Math.min(ability - 2, 5))) + 2
	};
	let xp = XP[level];
	if (!xp) {
		if (level < 0) {
			xp = 1;
		} else {
			xp = XP[30];
			for (let i = 0; i < (level - 30); i++) {
				xp *= 1.15;
			}
			xp = Math.floor(xp / 1000) * 1000;
		}
	}

	return {
		level: level,
		proficiency: proficiency,
		abilities: [
			ability,
			Math.floor(ability * 0.75),
			Math.floor(ability * 0.5),
			Math.floor(ability * 0.4),
			Math.floor(ability * 0.3),
			Math.floor((ability * 0.3) - 1)
		],
		ac: Math.ceil((ability + proficiency) * 0.8) + 10,
		saves: [
			ability + proficiency,
			Math.floor((ability + proficiency) * 0.66),
			Math.floor((ability + proficiency) * 0.66),
			Math.floor(((ability + proficiency) * 0.33) - 0.75),
			Math.floor(((ability + proficiency) * 0.33) - 0.75),
			Math.floor(((ability + proficiency) * 0.33) - 0.75)
		],
		attack: ability + proficiency - 2,
		damage: Math.max(Math.ceil(player.hp / 4), 1),
		hp: Math.max(Math.ceil(player.dpr * 4), 1),
		dc: (Math.floor(ability * 0.66)) + proficiency + 8,
		skills: Math.floor(ability * 0.66),
		xp: xp
	};
}

/**
 * Get monster stats.
 * @param {object} options
 * @return {object} monster stats
 */
function getMonsterStats (options) {
	const level = getStatsForLevel(parseInt(options.level));
	const role = getRole(options.role);
	const type = getType(options.type);
	let hp = Math.max(Math.ceil(level.hp * (role.hp / 100) * (type.hp / 100)), 1);
	const players = options.players ? options.players : 4;
	const priorities = options.priorities ? options.priorities.split('|') : [ 'STR', 'CON', 'DEX', 'INT', 'WIS', 'CHA' ];
	const phase = options.phase ? options.phase : 0;
	let xp = Math.max(1, Math.floor(level.xp * type.xp)).toLocaleString();

	if (type.name == 'Solo') {
		hp = Math.max(Math.ceil(level.hp * (role.hp / 100) * Number(players)), 1);
		xp = Math.max(1, Math.floor(level.xp * 0.25 * Number(players))).toLocaleString();
	}

	const traits = [];
	if (type.name == 'Elite') {
		traits.push({
			name: 'Paragon Action',
			description: 'You may take one Paragon Action per round to either move or perform an action.'
		});
	}
	if (type.name == 'Solo') {
		traits.push({
			name: 'Paragon Actions',
			description: `You may take ${players - 1} Paragon Actions per round to either move or perform an action.`
		});
		if (phase == 1 || phase == 2) {
			traits.push({
				name: 'Phase Transition',
				description: 'When reduced to 0 hit points, you may remove all on-going effects on yourself and trigger your next phase transition.'
			});
		} else if (phase != 3) {
			traits.push({
				name: 'Phase Transition',
				description: 'At 66% and 33% hit points, you may remove all on-going effects on yourself and trigger a new phase transition.'
			});
		}
	}
	if (options.traits) {
		options.traits.forEach(function (name) {
			const trait = getTrait(name);
			if (trait) {
				traits.push(trait);
			}
		});
	}
	const powers = [];
	if (options.powers) {
		options.powers.forEach(function (name) {
			const power = getPower(role, name);
			if (power) {
				powers.push(power);
			}
		});
	}

	// Return new monster object
	return {
		name: options.name,
		description: options.description,
		class: options.class,
		role: role,
		type: type,
		level: level,
		players: players,
		xp: xp,
		priorities: priorities,
		stats: {
			proficiency: level.proficiency,
			abilities: {
				str: level.abilities[priorities.indexOf('STR')],
				dex: level.abilities[priorities.indexOf('DEX')],
				con: level.abilities[priorities.indexOf('CON')],
				int: level.abilities[priorities.indexOf('INT')],
				wis: level.abilities[priorities.indexOf('WIS')],
				cha: level.abilities[priorities.indexOf('CHA')]
			},
			ac: level.ac + role.ac + type.ac,
			saves: {
				str: level.saves[priorities.indexOf('STR')] + type.saves + role.saves,
				dex: level.saves[priorities.indexOf('DEX')] + type.saves + role.saves,
				con: level.saves[priorities.indexOf('CON')] + type.saves + role.saves,
				int: level.saves[priorities.indexOf('INT')] + type.saves + role.saves,
				wis: level.saves[priorities.indexOf('WIS')] + type.saves + role.saves,
				cha: level.saves[priorities.indexOf('CHA')] + type.saves + role.saves
			},
			attack: level.attack + role.attack + type.attack,
			damage: Math.max(Math.ceil(level.damage * (role.damage / 100) * (type.damage / 100)), 1),
			hp: {
				max: hp,
				bloodied: Math.ceil(hp / 2),
				phase: Math.ceil(hp / 3)
			},
			dc: {
				primary: level.dc + type.dc + role.attack,
				secondary: level.dc + type.dc + role.attack - 3
			},
			perception: level.skills + (role.perception ? level.proficiency : 0) + type.perception,
			initiative: level.skills + (role.initiative ? level.proficiency : 0) + type.initiative,
			stealth: level.skills + (role.stealth ? level.proficiency : 0) + type.stealth,
			speed: 30 + role.speed
		},
		traits: traits,
		powers: powers,
		cr: type.cr[level.level],
		phase: phase,
		vulnerabilities: options.vulnerabilities,
		immunities: options.immunities,
		senses: options.senses,
		languages: options.languages
	};
}

/**
 * Render a monster block.
 * @param {object} monster
 * @param {string} innerHtml
 * @param {boolean} hideDetails
 * @return {string} html
 */
function renderMonster (monster, innerHtml, hideDetails) {
	let traits = '';
	if (!hideDetails) {
		monster.traits.forEach(function (trait) {
			traits += `
				<div class='monster__trait'>
					<p class='monster__trait__title'><strong>${trait.name}</strong></p>
					<p class='monster__trait__description'>${trait.description}</p>
				</div>
			`;
		});
	}

	let powers = '';
	if (!hideDetails) {
		monster.powers.forEach(function (power) {
			powers += `
				<div class='monster__power'>
					<p class='monster__power__title'><strong>${power.name}</strong></p>
					<p class='monster__power__description'>${power.description}</p>
				</div>
			`;
		});
	}

	const monsterHp = (monster.type.name == 'Solo' && monster.phase != 0) ? monster.stats.hp.phase : (monster.stats.hp.max + ((monster.stats.hp.max > 1) ? ` (${(monster.type.name == 'Solo') ? `3x ${monster.stats.hp.phase}` : monster.stats.hp.bloodied})` : ''));

	let formattedInnerHtml = (innerHtml) ? innerHtml : '';
	formattedInnerHtml = formattedInnerHtml.replace(/\[attack\]/g, formatNumber(monster.stats.attack));
	formattedInnerHtml = formattedInnerHtml.replace(/\[damage(,[\d\.]+)?\]/g, function (token) {
		let multiplier = 1;
		if (token.includes(',')) {
			multiplier = Number(token.substring(token.indexOf(',') + 1, token.length - 1));
		}
		return Math.floor(monster.stats.damage * multiplier);
	});
	formattedInnerHtml = formattedInnerHtml.replace(/\[dc-primary\]/g, monster.stats.dc.primary);
	formattedInnerHtml = formattedInnerHtml.replace(/\[dc-secondary\]/g, monster.stats.dc.secondary);

	// Replace shortcodes
	traits = traits.replace(/\[level\]/g, monster.level.level);
	powers = powers.replace(/\[level\]/g, monster.level.level);

	return `
		<monster class='panel panel--monster ${monster.type.name.toLowerCase()} ${monster.class ? monster.class : ``}'>
			<header class='panel__header'>
				<div class='panel__header__upper'>
					<h4 class='panel__title'>${monster.name}</h4>
					<span class='monster__level'>Level ${monster.level.level} ${monster.role.name}</span>
				</div>
				<div class='panel__header__lower'>
					<span class='monster__description'>
						<ul class='panel__tags'>
							<li>${monster.description}</li>
						</ul>
					</span>
					<span class='monster__xp'>${monster.type.name} ${(monster.type.name === 'Solo') ? ` vs ${monster.players}` : ``} (${monster.xp} XP)</span>
				</div>
			</header>
			<section class='panel__body'>
				<ul class='monster__attributes'>
					<li><strong>Armor Class</strong>${monster.stats.ac}</li>
					<li><strong>Attack Bonus</strong>${formatNumber(monster.stats.attack)}</li>
					<li><strong>Hit Points</strong>${monsterHp}</li>
					<li><strong>Damage</strong>${monster.stats.damage}</li>
					<li><strong>Speed</strong>${monster.stats.speed} ft</li>
					<li><strong>Spell DCs</strong>${monster.stats.dc.primary},  ${monster.stats.dc.secondary}</li>
				</ul>
				<div class='monster__abilities'>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Str</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.str)}</span>
					</div>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Dex</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.dex)}</span>
					</div>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Con</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.con)}</span>
					</div>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Int</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.int)}</span>
					</div>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Wis</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.wis)}</span>
					</div>
					<div class='monster__ability'>
						<span class='monster__ability__name'>Cha</span>
						<span class='monster__ability__modifier'>${formatNumber(monster.stats.abilities.cha)}</span>
					</div>
				</div>
				<div class='monster__saves'><strong>Saving Throws</strong>
					${capitalise(monster.priorities[0])} ${formatNumber(monster.stats.saves[monster.priorities[0].toLowerCase()])}, ${capitalise(monster.priorities[1])}/${capitalise(monster.priorities[2])} ${formatNumber(monster.stats.saves[monster.priorities[1].toLowerCase()])}, ${capitalise(monster.priorities[3])}/${capitalise(monster.priorities[4])}/${capitalise(monster.priorities[5])} ${formatNumber(monster.stats.saves[monster.priorities[3].toLowerCase()])}</td>
				</div>
				<div class='monster__skills'><strong>Skills</strong>
					 Initiative ${formatNumber(monster.stats.initiative)},
					 Perception ${formatNumber(monster.stats.perception)},
					 Stealth ${formatNumber(monster.stats.stealth)}
				</div>
				${monster.vulnerabilities ? `<div class='monster__vulnerabilities'><strong>Vulnerabilities</strong> ${monster.vulnerabilities}</div>` : ``}
				${monster.immunities ? `<div class='monster__immunities'><strong>Immunities</strong> ${monster.immunities}</div>` : ``}
				${monster.senses ? `<div class='monster__senses'><strong>Senses</strong> ${monster.senses}</div>` : ``}
				${monster.languages ? `<div class='monster__languages'><strong>Languages</strong> ${monster.languages}</div>` : ``}
				${(traits || powers) ? `<div class='monster__traits'>${traits}${powers}</div>` : ``}
				${formattedInnerHtml}
			</section>
		</monster>
	`;
}

/**
 * Get all monster roles.
 * @return {object[]} roles
 */
function getRoles () {
	return ROLES;
}

/**
 * Get all monster traits.
 * @return {object[]} traits
 */
function getTraits () {
	return TRAITS;
}

/**
 * Get all monster types.
 * @return {object[]} types
 */
function getTypes () {
	return TYPES;
}

/**
 * Create monsters found in html DOM.
 * @param {object} html DOM
 * @return {object} html DOM
 */
function createMonsters (html) {
	html.querySelectorAll('monster:not(.premade)').forEach(function (monster) {
		try {
			const options = {
				name: monster.getAttribute('data-name'),
				description: monster.getAttribute('data-description'),
				level: monster.getAttribute('data-level') === null ? 1 : Number(monster.getAttribute('data-level')),
				role: monster.getAttribute('data-role'),
				traits: monster.getAttribute('data-traits') === null ? [] : monster.getAttribute('data-traits').split(','),
				powers: monster.getAttribute('data-powers') === null ? [] : monster.getAttribute('data-powers').split(','),
				type: monster.getAttribute('data-type') === null ? 'Standard' : monster.getAttribute('data-type'),
				priorities: monster.getAttribute('data-priorities') === null ? [] : monster.getAttribute('data-priorities'),
				phase: monster.getAttribute('data-phase') === null ? 0 : monster.getAttribute('data-phase'),
				vulnerabilities: monster.getAttribute('data-vulnerabilities'),
				immunities: monster.getAttribute('data-immunities'),
				senses: monster.getAttribute('data-senses'),
				languages: monster.getAttribute('data-languages'),
				class: monster.getAttribute('data-class')
			};

			const stats = getMonsterStats(options);
			const hide = monster.getAttribute('data-hide') === null ? false : monster.getAttribute('data-hide');
			monster.outerHTML = renderMonster(stats, monster.innerHTML, hide);
		} catch (err) {
			console.error('Could not create monster block', err);
		}
	});
	return html;
}

/**
 * Create monster info found in html DOM.
 * @param {object} html DOM
 * @return {object} html DOM
 */
function createMonsterInfo (html) {
	html.querySelectorAll('monster-info').forEach(function (monster) {
		try {
			const options = {
				level: monster.getAttribute('data-level') === null ? 1 : Number(monster.getAttribute('data-level')),
				role: monster.getAttribute('data-role'),
				type: monster.getAttribute('data-type') === null ? 'Standard' : monster.getAttribute('data-type')
			};

			const stats = getMonsterStats(options);
			const multiplier = monster.getAttribute('data-multiplier') === null ? 1 : Number(monster.getAttribute('data-multiplier'));
			switch (monster.getAttribute('data-field')) {
			case 'damage':
				monster.innerHTML = Math.floor(stats.stats.damage * multiplier);
				break;
			case 'hp-max':
				monster.innerHTML = Math.floor(stats.stats.hp.max * multiplier);
				break;
			case 'attack':
				monster.innerHTML = formatNumber(Math.floor(stats.stats.attack * multiplier));
				break;
			}
		} catch (err) {
			console.error('Could not create monster block', err);
		}
	});
	return html;
}

/**
 * Remove monster shortcodes from a string.
 * @param {string} string
 * @return {string} formatted string
 */
function removeShortcodes (string) {
	return string.replace(/ \(\[level\]\)/g, '');
}
