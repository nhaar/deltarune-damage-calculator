import { useState } from 'react'
import Kris from './assets/Kris.png'
import Susie from './assets/Susie.png'
import Ralsei from './assets/Ralsei.png'
import Noelle from './assets/Noelle.png'
import Sword from './assets/Sword.png'
import Axe from './assets/Axe.png'
import Scarf from './assets/Scarf.png'
import Ring from './assets/Ring.png'
import Armor1 from './assets/Armor1.png'
import Armor2 from './assets/Armor2.png'
import './css/main.css';
import './App.css'

const CHAPTERS = 2;

const MAX_LEVEL = 3;

type CharacterStats = {
  atk: number,
  mag: number,
  def: number
}

const WEAPON_INFO: Record<Weapon, Item> = {
  'Mane Ax': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'Woodblade': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'AutoAxe': {
    atk: 4,
    def: 0,
    mag: 0
  },
  'BounceBlade': {
    atk: 2,
    def: 1,
    mag: 0
  },
  'BraveAx': {
    atk: 2,
    def: 0,
    mag: 0
  },
  'BrokenSwd': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'CheerScarf': {
    atk: 1,
    def: 0,
    mag: 2
  },
  'DaintyScarf': {
    atk: 0,
    def: 0,
    mag: 2
  },
  'Devilsknife': {
    atk: 5,
    def: 0,
    mag: 4
  },
  'EverybodyWeapon': {
    atk: 12,
    def: 6,
    mag: 8
  },
  'FiberScarf': {
    atk: 2,
    def: 0,
    mag: 2
  },
  'FreezeRing': {
    atk: 4,
    def: 0,
    mag: 4
  },
  'MechaSaber': {
    atk: 4,
    def: 0,
    mag: 0
  },
  'PuppetScarf': {
    atk: 10,
    def: 0,
    mag: -6
  },
  'Ragger': {
    atk: 2,
    def: 0,
    mag: 0
  },
  'Ragger2': {
    atk: 5,
    def: 0,
    mag: -1
  },
  'RedScarf': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'SnowRing': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'SpookySword': {
    atk: 2,
    def: 0,
    mag: 0
  },
  'ThornRing': {
    atk: 14,
    def: 0,
    mag: 12
  },
  'Trefoil': {
    atk: 4,
    def: 0,
    mag: 0
  },
  'TwistedSwd': {
    atk: 16,
    def: 0,
    mag: 0
  }
}

const CHAR_COLORS: Record<CharacterName, string> = {
  'Kris': '#00a2e8',
  'Susie': '#ea79c8',
  'Ralsei': '#b5e41c',
  'Noelle': '#fcfc04'
};

const STARTING_ITEMS: Record<CharacterName, Character> = {
  'Kris': {
    weapon: 'Woodblade',
    armor1: '------',
    armor2: '------'
  },
  'Susie': {
    weapon: 'Mane Ax',
    armor1: '------',
    armor2: '------'
  },
  'Ralsei': {
    weapon: 'RedScarf',
    armor1: '------',
    armor2: '------'
  },
  'Noelle': {
    weapon: 'SnowRing',
    armor1: 'Silver Watch',
    armor2: 'Royal Pin'
  }
}

const ALLOWED_WEAPONS: Record<CharacterName, Weapon[]> = {
  'Kris': [
    'Woodblade',
    'SpookySword',
    'BounceBlade',
    'MechaSaber'
  ],
  'Susie': [
    'Mane Ax',
    'BraveAx',
    'Devilsknife',
    'AutoAxe'
  ],
  'Noelle': [
    'SnowRing',
    'FreezeRing',
    'ThornRing'
  ],
  'Ralsei': [
    'RedScarf',
    'Ragger',
    'DaintyScarf',
    'FiberScarf',
    'Ragger2',
    'PuppetScarf'
  ]
}

const FORBIDDEN_ARMORS: Record<CharacterName, Armor[]> = {
  'Kris': [],
  'Susie': [
    'White Ribbon',
    'Pink Ribbon',
    'Tension Bow',
    'Twin Ribbon'
  ],
  'Ralsei': [],
  'Noelle': []
}

const ARMOR_INFO: Record<Armor, Item> = {
  '------': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'Amber Card': {
    atk: 0,
    def: 1,
    mag: 0
  },
  'B.ShotBowtie': {
    atk: 0,
    def: 2,
    mag: 1
  },
  'Chainmail': {
    atk: 0,
    def: 3,
    mag: 0
  },
  'Dealmaker': {
    atk: 0,
    def: 5,
    mag: 5
  },
  'Dice Brace': {
    atk: 0,
    def: 2,
    mag: 0
  },
  'Frayed Bowtie': {
    atk: 1,
    def: 1,
    mag: 1
  },
  'Glow Wrist': {
    atk: 0,
    def: 2,
    mag: 0
  },
  'Iron Shackle': {
    atk: 1,
    def: 2,
    mag: 0
  },
  'Jevilstail': {
    atk: 2,
    def: 2,
    mag: 2
  },
  'Mannequin': {
    atk: 0,
    def: 0,
    mag: 0
  },
  'Pink Ribbon': {
    atk: 0,
    def: 1,
    mag: 0
  },
  'Royal Pin': {
    atk: 0,
    def: 3,
    mag: 1
  },
  'Silver Card': {
    atk: 0,
    def: 2,
    mag: 0
  },
  'Silver Watch': {
    atk: 0,
    def: 2,
    mag: 0
  },
  'SpikeBand': {
    atk: 2,
    def: 1,
    mag: 0
  },
  'Tension Bow': {
    atk: 0,
    def: 2,
    mag: 0
  },
  'Twin Ribbon': {
    atk: 0,
    def: 3,
    mag: 0
  },
  'White Ribbon': {
    atk: 0,
    def: 2,
    mag: 0
  }
}

type CharacterName = 'Kris' | 
  'Susie' |
  'Ralsei' |
  'Noelle'

type Character = {
  weapon: Weapon
  armor1: Armor
  armor2: Armor
}

type Weapon = 'Woodblade' |
  'Mane Ax' |
  'RedScarf' |
  'EverybodyWeapon' |
  'SpookySword' |
  'BraveAx' |
  'Devilsknife' |
  'Trefoil' |
  'Ragger' |
  'DaintyScarf' |
  'TwistedSwd' |
  'SnowRing' |
  'ThornRing' |
  'BounceBlade' |
  'CheerScarf' |
  'MechaSaber' |
  'AutoAxe' |
  'FiberScarf' |
  'Ragger2' |
  'BrokenSwd' |
  'PuppetScarf' |
  'FreezeRing'

type Armor = '------' |
  'White Ribbon' |
  'Amber Card' |
  'Dice Brace' |
  'Iron Shackle' | 
  'Jevilstail' |
  'Silver Card' |
  'Glow Wrist' |
  'Silver Watch' |
  'Pink Ribbon' |
  'Dealmaker' |
  'Royal Pin' |
  'Frayed Bowtie' |
  'B.ShotBowtie' |
  'Chainmail' |
  'SpikeBand' |
  'Twin Ribbon' |
  'Tension Bow' |
  'Mannequin';

type Item = {
  atk: number,
  mag: number,
  def: number
};

type Enemy = 'Lancer (Castle Town)' |
  'Rudinn' |
  'Hathy' |
  'C. Round' |
  'Jigsawry' |
  'Ponman' |
  'K. Round' |
  'Rabbick' |
  'Bloxer' |
  'Clover (Ch 1)' |
  'Susie' |
  'Lancer (Forest)' |
  'Rudinn Ranger' |
  'Head Hathy' |
  'Jevil' |
  'King' |
  'Clover (Ch 2)' |
  'Werewire' |
  'Tasque' |
  'Virovirokun (Tutor)' |
  'Virovirokun (Regular)' |
  'Berdly (Cyber Field)' |
  'Poppup' |
  'Ambyu-Lance' |
  'Berdly (Cyber City)' |
  'Spamton' |
  'Maus' |
  'Swatchling' |
  'Spamton NEO [Basement]' |
  'Mauswheel' |
  'Queen' |
  'Spamton NEO [Snowgrave]'

type EnemyStats = {
  df: number,
  hp: number,
}

const enemyInfo: Record<Enemy, EnemyStats> = {
  'Lancer (Castle Town)': {
    hp: 540,
    df: 1
  },
  'Rudinn': {
    hp: 120,
    df: 0
  },
  'Hathy': {
    hp: 150,
    df: 0
  },
  'C. Round': {
    hp: 10,
    df: 0
  },
  'Jigsawry': {
    hp: 90,
    df: 0
  },
  'Ponman': {
    hp: 140,
    df: 1
  },
  'K. Round': {
    hp: 1300,
    df: 3
  },
  'Rabbick': {
    hp: 120,
    df: 1
  },
  'Bloxer': {
    hp: 130,
    df: 2
  },
  'Clover (Ch 1)': {
    hp: 270,
    df: 1
  },
  'Susie': {
    hp: 120,
    df: -5
  },
  'Lancer (Forest)': {
    hp: 800,
    df: 1
  },
  'Rudinn Ranger': {
    hp: 170,
    df: 0
  },
  'Head Hathy': {
    hp: 190,
    df: 0
  },
  'Jevil': {
    hp: 3500,
    df: 5
  },
  'King': {
    hp: 2800,
    df: 0
  },
  'Clover (Ch 2)': {
    hp: 1500,
    df: 0
  },
  'Werewire': {
    hp: 240,
    df: 0
  },
  'Tasque': {
    hp: 240,
    df: 0
  },
  'Virovirokun (Tutor)': {
    hp: 90,
    df: 0
  },
  'Virovirokun (Regular)': {
    hp: 240,
    df: 0
  },
  'Berdly (Cyber Field)': {
    hp: 1985,
    df: 0
  },
  'Poppup': {
    hp: 120,
    df: 0
  },
  'Ambyu-Lance': {
    hp: 300,
    df: 0
  },
  'Berdly (Cyber City)': {
    hp: 900,
    df: 0
  },
  'Spamton': {
    hp: 600,
    df: 0
  },
  'Maus': {
    hp: 120,
    df: 8
  },
  'Swatchling': {
    hp: 300,
    df: 0
  },
  'Spamton NEO [Basement]': {
    hp: 4809,
    df: 0
  },
  'Mauswheel': {
    hp: 1753,
    df: 0
  },
  'Queen': {
    hp: 1510,
    df: 0
  },
  'Spamton NEO [Snowgrave]': {
    hp: 4809,
    df: -27
  }
}

const baseStatInfo: Record<CharacterName, [CharacterStats, CharacterStats, CharacterStats]> = {
  'Kris': [
    {
      atk: 10,
      def: 2,
      mag: 0
    },
    {
      atk: 12,
      def: 2,
      mag: 0
    },
    {
      atk: 14,
      def: 2,
      mag: 0
    }
  ],
  'Susie': [
    {
      atk: 14,
      def: 2,
      mag: 1
    },
    {
      atk: 16,
      def: 2,
      mag: 1
    },
    {
      atk: 18,
      def: 2,
      mag: 3
    }
  ],
  'Ralsei': [
    {
      atk: 8,
      def: 2,
      mag: 7
    },
    {
      atk: 10,
      def: 2,
      mag: 9
    },
    {
      atk: 12,
      def: 2,
      mag: 11
    }
  ],
  'Noelle': [
    {
      atk: 3,
      def: 1,
      mag: 11
    },
    {
      atk: 3,
      def: 1,
      mag: 11
    },
    {
      atk: 3,
      def: 1,
      mag: 11
    }
  ]
}

function getBaseStats(name: CharacterName, lv: number): CharacterStats {
  lv = clampInteger(lv, 1, MAX_LEVEL);

  return baseStatInfo[name][lv - 1];
}

function clampInteger(value: number, min: number, max: number): number {
  value = Math.round(value);
  if (isNaN(value)) {
    return min;
  }
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

function ItemSelect<ItemT extends string>({ start, onChange, list }: {
  start: ItemT,
  onChange: (item: ItemT) => void,
  list: ItemT[]
}) {
  return (
    <select defaultValue={start} onChange={e => onChange(e.target.value as ItemT)}>
      {...list.map((item) => {
        return (
          <option value={item}>
            {item}
          </option>
        )
      })}
    </select>
  )
}

function WeaponSelect({ start, onChange, character, allItems }: {
  start: Weapon
  onChange: (weapon: Weapon) => void
  character: CharacterName
  allItems: boolean
}) {
  let weaponList: Weapon[] = Object.keys(WEAPON_INFO) as Weapon[];
  if (!allItems) {
    weaponList = ALLOWED_WEAPONS[character];
  }
  return <ItemSelect<Weapon> start={start} onChange={onChange} list={weaponList} />
}

function ArmorSelect({ start, onChange, character, allItems }: {
  start: Armor
  onChange: (armor: Armor) => void
  character: CharacterName,
  allItems: boolean
}) {
  let armors: Armor[] = Object.keys(ARMOR_INFO) as Armor[];

  if (!allItems) {
    armors = armors.filter((armor) => !FORBIDDEN_ARMORS[character].includes(armor));
  }


  return <ItemSelect<Armor> start={start} onChange={onChange} list={armors} />
}

function CharacterBox({ 
  name,
  onWeaponChange,
  onArmor1Change,
  onArmor2Change,
  weirdItems,
  stats,
  weaponImage,
  charImage
} : {
  name: CharacterName,
  onWeaponChange: (n: CharacterName, w: Weapon) => void,
  onArmor1Change: (n: CharacterName, a: Armor) => void,
  onArmor2Change: (n: CharacterName, a: Armor) => void,
  weirdItems: boolean,
  stats: Record<CharacterName, CharacterStats>,
  weaponImage: string,
  charImage: string
}) {
  return (
    <div className='info-box'>
      <div className='icon-row'>
        <img src={charImage}></img>
        <span>{name}</span>
      </div>
      <div className='icon-row'>
        <img src={weaponImage} />
        <WeaponSelect start={STARTING_ITEMS[name].weapon} onChange={(w) => onWeaponChange(name, w)} character={name} allItems={weirdItems} />
      </div>
      <div className='icon-row'>
        <img src={Armor1} />
        <ArmorSelect start={STARTING_ITEMS[name].armor1} onChange={(a) => onArmor1Change(name, a)} character={name} allItems={weirdItems} />
      </div>
      <div className='icon-row'>
        <img src={Armor2} />
        <ArmorSelect start={STARTING_ITEMS[name].armor2} onChange={(a) => onArmor2Change(name, a)} character={name} allItems={weirdItems} />
      </div>
      <div className='stats'>
        <span>ATK</span>
        <span>{stats[name].atk}</span>
        <span>DEF</span>
        <span>{stats[name].def}</span>
        <span className='magic-stat'>
            <span>MAG</span>
            <span>{name === 'Kris' ? 0 : stats[name].mag}</span>
        </span>
      </div>
    </div>
  )
}

function floatEqualDelta(num1: number, num2: number): boolean {
  return Math.abs(num1 - num2) < 0.00001;
}

function gamemakerRound(num: number): number {
  const truncated = Math.floor(num);
  const decimal = num % 1
  if (decimal < 0.5) {
    return truncated;
  } else if (floatEqualDelta(decimal, 0.5)) {
    return truncated % 2 === 0 ? truncated : truncated + 1;
  } else {
    return truncated + 1;
  }
}

function calculateDamage(distance: number, atk: number, def: number): number {
  let points = 0;
  if (distance === 0) {
    points = 150;
  } else if (distance === 1) {
    points = 120;
  } else if (distance === 2) {
    points = 110;
  } else if (distance < 15) {
    points = 100 - (distance * 2);
  }

  return gamemakerRound((atk * points / 20) - 3 * def);
}

function DamageRow({ label, characterStats, distance, enemyDef }: {
  label: string,
  characterStats: Record<CharacterName, CharacterStats>,
  distance: number,
  enemyDef: number
}) {
  return (
    <tr>
      <td>
        {label}
      </td>
      {...Object.entries(characterStats).map(pair => {
        const [name, stats] = pair;
        const damage = calculateDamage(distance, stats.atk, enemyDef);
        return (
          <td style={{
            color: CHAR_COLORS[name as CharacterName]
          }}>{damage}</td>
        )
      })}
    </tr>
  )
}

function DamageTable({ characterStats, enemyDef }: {
  characterStats: Record<CharacterName, CharacterStats>,
  enemyDef: number
}) {
  ;

  return (
    <div>
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>
              Frame
            </th>
            {...Object.keys(characterStats).map((name) => {
              return <th style={{
                color: CHAR_COLORS[name as CharacterName]
              }}>{name} Attack</th>
            })}
          </tr>
        </thead>
        <tbody>
          <DamageRow label='Perfect' distance={0} characterStats={characterStats} enemyDef={enemyDef} />
          {...Array.from({ length: 14}, (_, i) => i + 1).map((number) => {
            return (
              <DamageRow label={`${number} frames off`} distance={number} characterStats={characterStats} enemyDef={enemyDef} />
            )
          })}
          <DamageRow label='Miss' distance={15} characterStats={characterStats} enemyDef={enemyDef} />
        </tbody>
      </table>
    </div>
  )
}

function SpellTable({
  spellName,
  rows,
  characterStats,
  enemyDef,
  color
}: {
  spellName: string;
  rows: Array<{
    rowName: string;
    rowFormula: (stats: CharacterStats, def: number) => number;
  }>,
  characterStats: CharacterStats,
  enemyDef: number;
  color: string;
}) {
  return (
    <table border={2} cellPadding={10}>
      <thead>
        <tr>
          <th colSpan={2} style={{ color }}>
            {spellName}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          return (
            <tr>
              <td>
                {row.rowName}
              </td>
              <td style={{ color }}>
                {row.rowFormula(characterStats, enemyDef)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function iceShockRoll(mag: number) {
  return 30 * (mag - 10) + 90 + 1
}

function snowgraveRoll(mag: number) {
  return Math.ceil(mag * 40 + 600);
}

function singleXSlash(atk: number, def: number) {
  return gamemakerRound((atk * 150 / 20 - 3 * def) * 1.25);
}

function rudeBusterDamage(atk: number, mag: number, def: number) {
  return 11 * atk + 5 * mag - 3 * def;
}

function redBusterDamage(atk: number, mag: number, def: number) {
  return 13 * atk + 6 * mag - 6 * def + 90;
}

export default function App() {
  const [chapter, setChapter] = useState<number>(1);
  const [altLvRegister, setAltLvRegister] = useState<boolean>(false);
  const [ch2Kills, setCh2Kills] = useState<{ beforeNoelle: number; afterNoelle: number }>({
    beforeNoelle: 0,
    afterNoelle: 0
  });
  const [ch2GotStronger, setCh2GotStronger] = useState<{
    noelle: number;
    you: number;
  }>({ noelle: 0, you: 0 });

  const [enemy, setEnemy] = useState<Enemy | ''>('');
  const [enemyHp, setEnemyHp] = useState<number>(0);
  const [enemyDef, setEnemyDef] = useState<number>(0);
  const [lv, setLv] = useState<number>(1);
  const [weirdItems, setWeirdItems] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Record<CharacterName, Character>>({ ...STARTING_ITEMS })

  // saving progress for variables that you can increment to reduce defense (eg spending lots of turns in a battle)
  const [defenseReducers, setDefenseReducers] = useState<Partial<Record<Enemy, number>>>({});

  function updateChapter(e: React.ChangeEvent<HTMLInputElement>) {
    setChapter(clampInteger(Number(e.target.value), 1, CHAPTERS));
    setEnemy('');
  }

  function updateLevel(e: React.ChangeEvent<HTMLInputElement>) {
    setLv(clampInteger(Number(e.target.value), 1, MAX_LEVEL));
  }

  function updateEnemy(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === '') {
      setEnemy('');
      setEnemyDef(0);
      setEnemyHp(0);
    } else {
      const newEnemy = e.target.value as Enemy;
      setEnemy(newEnemy);
      setEnemyHp(enemyInfo[newEnemy].hp);
      setEnemyDef(enemyInfo[newEnemy].df);
    }
  }

  function updateCharWeapon(character: CharacterName, weapon: Weapon) {
    setCharacters(c => {
      const changingStats = c[character];
      return {
        ...c,
        [character]: { ...changingStats, weapon }
      }  
    })
  }

  function updateCharArmor1(character: CharacterName, armor: Armor) {
    setCharacters(c => {
      const changingStats = c[character];
      return {
        ...c,
        [character]: { ...changingStats, armor1: armor }
      }  
    })
  }

  function updateCharArmor2(character: CharacterName, armor: Armor) {
    setCharacters(c => {
      const changingStats = c[character];
      return {
        ...c,
        [character]: { ...changingStats, armor2: armor }
      }  
    })
  }

  let enemies: Enemy[] = [];

  switch (chapter) {
    case 1:
      enemies = [
        'Lancer (Castle Town)',
        'Rudinn',
        'Hathy',
        'C. Round',
        'Jigsawry',
        'Ponman',
        'K. Round',
        'Rabbick',
        'Bloxer',
        'Clover (Ch 1)',
        'Susie',
        'Lancer (Forest)',
        'Rudinn Ranger',
        'Head Hathy',
        'Jevil',
        'King'
      ];
      break;
    case 2:
      enemies = [
        'Clover (Ch 2)',
        'Werewire',
        'Tasque',
        'Virovirokun (Tutor)',
        'Virovirokun (Regular)',
        'Berdly (Cyber Field)',
        'Poppup',
        'Ambyu-Lance',
        'Maus',
        'Berdly (Cyber City)',
        'Spamton',
        'Swatchling',
        'Spamton NEO [Basement]',
        'Mauswheel',
        'Queen',
        'Spamton NEO [Snowgrave]'
      ]
      break;
  }

  // dynamic changes in defense
  let enemyDefModifier = 0;

  switch (enemy) {
    case 'Susie':
      // the weapon is accounted for interestingly
      const susie = characters.Susie;
      enemyDefModifier = ARMOR_INFO[susie.armor1].def + ARMOR_INFO[susie.armor2].def + WEAPON_INFO[susie.weapon].def;
      break;
  }

  const enemyDefenseReducers: Partial<Record<Enemy, {
    multiplier: number;
    // number of times, not the value cap
    cap: number;
    description: string;
  }>> = {
    'Jevil': {
      multiplier: 4,
      cap: 6,
      description: 'Number of pirouettes that lowered Jevil\'s defense'
    },
    'Spamton NEO [Basement]': {
      multiplier: 3,
      cap: 4,
      description: 'Number of turns past turn 15'
    },
    'Queen': {
      multiplier: 5,
      cap: 5,
      description: 'Number of turns past turn 14'
    }
  }

  if (enemy !== '') {
    const info = enemyDefenseReducers[enemy];
    if (info !== undefined) {
      enemyDefModifier = -info.multiplier * (defenseReducers[enemy] ?? 0);
      if (enemyDefModifier < -info.cap * info.multiplier) {
        enemyDefModifier = -info.cap * info.multiplier;
      }
    }
  }

  let youStrongTimes = 0;
  let noelleStrongTimes = 0;
  if (chapter === 2) {
    if (altLvRegister) {
      youStrongTimes = ch2GotStronger.you;
      noelleStrongTimes = ch2GotStronger.noelle;
    } else {
      const kills = ch2Kills.beforeNoelle + ch2Kills.afterNoelle;
      youStrongTimes = Math.floor(kills / 10);
      noelleStrongTimes = Math.floor(kills / 4) - Math.floor(ch2Kills.beforeNoelle / 4);
    }
  }

  const stats: Record<string, CharacterStats> = {};
  for (const name of Object.keys(baseStatInfo)) {
    const character = name as CharacterName;
    const char = characters[character as CharacterName];

    const strongIncrement = character === 'Noelle' ? noelleStrongTimes : youStrongTimes;

    stats[character] = {
      atk: getBaseStats(character, lv).atk + ARMOR_INFO[char.armor1].atk + ARMOR_INFO[char.armor2].atk + WEAPON_INFO[char.weapon].atk + strongIncrement,
      def: getBaseStats(character, lv).def + ARMOR_INFO[char.armor1].def + ARMOR_INFO[char.armor2].def + WEAPON_INFO[char.weapon].def,
      mag: getBaseStats(character, lv).mag + ARMOR_INFO[char.armor1].mag + ARMOR_INFO[char.armor2].mag + WEAPON_INFO[char.weapon].mag + strongIncrement
    }
  }

  const characterStats = stats as Record<CharacterName, CharacterStats>;
  const finalDef = enemyDef + enemyDefModifier;

  return (
    <>
      <div className='info-boxes'>
        <div className='info-box'>
          <h1>
            Settings
          </h1>
          <div className='number-row'>
            <label htmlFor='chapter'>Chapter</label>
            <input type='number' name='chapter' value={chapter} onChange={updateChapter} />
          </div>
          <div className='number-row'>
            <label htmlFor='lv'>Level</label>
            <input type='number' name='lv' value={lv} onChange={updateLevel} />
          </div>
          <div>
            <input type='checkbox' name='weird-items' checked={weirdItems} onChange={e => setWeirdItems(e.target.checked)} />
            <label htmlFor='weird-items'>Show unusual/unused items?</label>
          </div>
          {chapter === 2 && (
            <div id='ch2-info'>
              <div>
                <input type='checkbox' name='alt-lv-up' checked={altLvRegister} onChange={e => setAltLvRegister(e.target.checked)} />
                <label htmlFor='alt-lv-up'>Use alternate kills register</label>
              </div>
              {altLvRegister ? (
                <div className='lvl-up-info'>
                  <div className='number-row'>
                    <label htmlFor='times-stronger'>Times you got stronger</label>
                    <input type='number' name='times-stronger' value={ch2GotStronger.you} onChange={(e) => {
                      setCh2GotStronger(c => ({ ...c, you: Number(e.target.value) }));
                    }} />
                  </div>
                  <div className='number-row'>
                    <label htmlFor='noelle-stronger'>Times Noelle got stronger</label>
                    <input type='number' name='noelle-stronger' value={ch2GotStronger.noelle} onChange={(e) => {
                      setCh2GotStronger(c => ({ ...c, noelle: Number(e.target.value) }));
                    }} />
                  </div>
                </div>
              ) : (
                <div className='lvl-up-info'>
                  <div className='number-row'>
                    <label htmlFor='before-noelle'>Chapter 2 Kills [Before Noelle]</label>
                    <input type='number' name='before-noelle' value={ch2Kills.beforeNoelle} onChange={(e) => {
                      setCh2Kills(c => ({ ...c, beforeNoelle: Number(e.target.value) }));
                    }} />
                  </div>
                  <div className='number-row'>
                    <label htmlFor='after-noelle'>Chapter 2 Kills [After Noelle]</label>
                    <input type='number' name='after-noelle' value={ch2Kills.afterNoelle} onChange={(e) => {
                      setCh2Kills(c => ({ ...c, afterNoelle: Number(e.target.value) }));
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='select-row'>
            <label htmlFor='enemy'>Enemy</label>
            <select name='enemy' value={enemy} onChange={updateEnemy}>
              <option value=''>[Select Enemy]</option>
              {...enemies.map((enemy) => {
                return <option value={enemy}>{enemy}</option>
              })}
            </select>
          </div>
          <div>
            <div className='number-row'>
              <span>Enemy DEF</span>
              <span>{finalDef}</span>
            </div>
            <div className='number-row'>
              <span>Enemy HP</span>
              <span>{enemyHp}</span>
            </div>
          </div>
          {...Object.entries(enemyDefenseReducers).map((pair) => {
            const [enemyName, enemyInfo] = pair;
            return enemy === (enemyName) && enemy !== '' && (
              <div>
                <span className='reducer-desc'>{enemyInfo.description}{` (max: ${enemyInfo.cap})`}</span>
                <input className='reducer-input' type='number' value={defenseReducers[enemy] ?? 0} onChange={(e) => {
                  setDefenseReducers(d => ({ ...d, [enemy]: Number(e.target.value) }));
                }} />
              </div>
            );
          })}
        </div>
        <CharacterBox 
          name='Kris'
          onWeaponChange={updateCharWeapon}
          onArmor1Change={updateCharArmor1}
          onArmor2Change={updateCharArmor2}
          weirdItems={weirdItems}
          stats={characterStats}
          weaponImage={Sword}
          charImage={Kris}
        />
        <CharacterBox 
          name='Susie'
          onWeaponChange={updateCharWeapon}
          onArmor1Change={updateCharArmor1}
          onArmor2Change={updateCharArmor2}
          weirdItems={weirdItems}
          stats={characterStats}
          weaponImage={Axe}
          charImage={Susie}
        />
        <CharacterBox 
          name='Ralsei'
          onWeaponChange={updateCharWeapon}
          onArmor1Change={updateCharArmor1}
          onArmor2Change={updateCharArmor2}
          weirdItems={weirdItems}
          stats={characterStats}
          weaponImage={Scarf}
          charImage={Ralsei}
        />
        <CharacterBox 
          name='Noelle'
          onWeaponChange={updateCharWeapon}
          onArmor1Change={updateCharArmor1}
          onArmor2Change={updateCharArmor2}
          weirdItems={weirdItems}
          stats={characterStats}
          weaponImage={Ring}
          charImage={Noelle}
        />
      </div>

      <div id='tables'>
        <div id='damage-table'>
          <div className='table-title'>Damage Table</div>
          <DamageTable characterStats={characterStats} enemyDef={finalDef} />
        </div>
        <div>
          <div className='table-title'>
            Spells
          </div>
          <div id='spell-tables'>
            <SpellTable spellName='Rude Buster' rows={[
              {
                rowName: 'Mash Z',
                rowFormula(stats, def) {
                  return rudeBusterDamage(stats.atk, stats.mag, def) + 30;
                },
              },
              {
                rowName: 'No Mash Z',
                rowFormula(stats, def) {
                  return rudeBusterDamage(stats.atk, stats.mag, def);
                },
              }
            ]} characterStats={characterStats.Susie} enemyDef={finalDef} color='#edb4ec' />
            <SpellTable spellName='Red Buster' rows={[
              {
                rowName: 'Mash Z',
                rowFormula(stats, def) {
                  return redBusterDamage(stats.atk, stats.mag, def) + 30;
                },
              },
              {
                rowName: 'No Mash Z',
                rowFormula(stats, def) {
                  return redBusterDamage(stats.atk, stats.mag, def);
                },
              }
            ]} characterStats={characterStats.Susie} enemyDef={finalDef} color='#ff0000' />
            <SpellTable spellName='Ice Shock' rows={[
              {
                rowName: 'Highest Roll',
                rowFormula(stats) {
                  return iceShockRoll(stats.mag) + 9;
                },
              },
              {
                rowName: 'Lowest Roll',
                rowFormula(stats) {
                  return iceShockRoll(stats.mag);
                },
              }
            ]} characterStats={characterStats.Noelle} enemyDef={finalDef} color='#00ffff' />
            <SpellTable spellName='X-Slash' rows={[
              {
                rowName: 'Single Slash',
                rowFormula(stats, def) {
                  return singleXSlash(stats.atk, def);
                },
              },
              {
                rowName: 'Total Damage',
                rowFormula(stats, def) {
                  return 2 * singleXSlash(stats.atk, def);
                },
              }
            ]} characterStats={characterStats.Kris} enemyDef={finalDef} color='#00a2e8' />
            <SpellTable spellName='Snowgrave' rows={[
              {
                rowName: 'Highest Roll',
                rowFormula(stats) {
                  return snowgraveRoll(stats.mag) + 100;
                },
              },
              {
                rowName: 'Lowest Roll',
                rowFormula(stats) {
                  return snowgraveRoll(stats.mag);
                },
              }
            ]} characterStats={characterStats.Noelle} enemyDef={finalDef} color='#c0c0c0' />
          </div>
        </div>
      </div>
    </>
  )
}
