import { useState } from 'react'
import Susie from './assets/Susie.png'
import Axe from './assets/Axe.png'
import Armor1 from './assets/Armor1.png'
import Armor2 from './assets/Armor2.png'
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

const ALLOWED_WEAPONS: Record<CharacterName, Weapon[]> = {
  'Susie': [
    'Mane Ax',
    'BraveAx',
    'Devilsknife',
    'AutoAxe'
  ]
}

const FORBIDDEN_ARMORS: Record<CharacterName, Armor[]> = {
  'Susie': [
    'White Ribbon',
    'Pink Ribbon',
    'Tension Bow',
    'Twin Ribbon'
  ]
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

type CharacterName = 'Susie'

type Character = {
  weapon: Weapon
  armor1: Armor
  armor2: Armor
  name: CharacterName
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
  'Virovirokun' |
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
  'Virovirokun': {
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
  console.log(weaponList);
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

export default function App() {
  const [chapter, setChapter] = useState<number>(1);
  const [altLvRegister, setAltLvRegister] = useState<boolean>(false);
  const [enemy, setEnemy] = useState<Enemy | ''>('');
  const [enemyHp, setEnemyHp] = useState<number>(0);
  const [enemyDef, setEnemyDef] = useState<number>(0);
  const [lv, setLv] = useState<number>(1);
  const [weirdItems, setWeirdItems] = useState<boolean>(false);
  const [susie, setSusie] = useState<Character>({
    name: 'Susie',
    weapon: 'Mane Ax',
    armor1: '------',
    armor2: '------'
  });

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
    } else {
      const newEnemy = e.target.value as Enemy;
      setEnemy(newEnemy);
      setEnemyHp(enemyInfo[newEnemy].hp);
      setEnemyDef(enemyInfo[newEnemy].df);
    }
  }

  function updateSusieWeapon(weapon: Weapon) {
    setSusie(s => ({...s, weapon }))
  }

  function updateSusieArmor1(armor: Armor) {
    setSusie(s => ({...s, armor1: armor }))
  }

  function updateSusieArmor2(armor: Armor) {
    setSusie(s => ({...s, armor2: armor }))
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
        'Virovirokun',
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

  if (enemy === 'Susie') {
    // the weapon is accounted for interestingly
    enemyDefModifier = ARMOR_INFO[susie.armor1].def + ARMOR_INFO[susie.armor2].def + WEAPON_INFO[susie.weapon].def;
  }

  const susieStats: CharacterStats = {
    atk: getBaseStats('Susie', lv).atk + ARMOR_INFO[susie.armor1].atk + ARMOR_INFO[susie.armor2].atk + WEAPON_INFO[susie.weapon].atk,
    def: getBaseStats('Susie', lv).def + ARMOR_INFO[susie.armor1].def + ARMOR_INFO[susie.armor2].def + WEAPON_INFO[susie.weapon].def,
    mag: getBaseStats('Susie', lv).mag + ARMOR_INFO[susie.armor1].mag + ARMOR_INFO[susie.armor2].mag + WEAPON_INFO[susie.weapon].mag
  }

  return (
    <>
      <div>
        <h1>
          Settings
        </h1>
        <div>
          <label htmlFor='chapter'>Chapter</label>
          <input type='number' name='chapter' value={chapter} onChange={updateChapter} />
        </div>
        <div>
          <label htmlFor='lv'>Level</label>
          <input type='number' name='lv' value={lv} onChange={updateLevel} />
        </div>
        <div>
          <input type='checkbox' name='weird-items' checked={weirdItems} onChange={e => setWeirdItems(e.target.checked)} />
          <label htmlFor='weird-items'>Show unusual/unused items?</label>
        </div>
        {chapter === 2 && (
          <div>
            <div>
              <input type='checkbox' name='alt-lv-up' checked={altLvRegister} onChange={e => setAltLvRegister(e.target.checked)} />
              <label htmlFor='alt-lv-up'>Use alternate LV up register</label>
            </div>
            {altLvRegister ? (
              <div>
                <div>
                  <label htmlFor='times-stronger'>Times you got stronger</label>
                  <input type='number' name='times-stronger' />
                </div>
                <div>
                  <label htmlFor='noelle-stronger'>Times Noelle got stronger</label>
                  <input type='number' name='noelle-stronger' />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label htmlFor='before-noelle'>Chapter 2 Kills [Before Noelle]</label>
                  <input type='number' name='before-noelle' />
                </div>
                <div>
                  <label htmlFor='after-noelle'>Chapter 2 Kills [After Noelle]</label>
                  <input type='number' name='after-noelle' />
                </div>
              </div>
            )}
          </div>
        )}
        <div>
          <label htmlFor='enemy'>Enemy</label>
          <select name='enemy' value={enemy} onChange={updateEnemy}>
            <option value=''>[Select Enemy]</option>
            {...enemies.map((enemy) => {
              return <option value={enemy}>{enemy}</option>
            })}
          </select>
        </div>
        {
          enemy !== '' && (
            <div>
              <div>
                <span>Enemy DEF</span>
                <span>{enemyDef + enemyDefModifier}</span>
              </div>
              <div>
                <span>Enemy HP</span>
                <span>{enemyHp}</span>
              </div>
            </div>
          )
        }
      </div>
      <div>
        <img src={Susie}></img>
        <span>Susie</span>
        <img src={Axe} />
        <WeaponSelect start={'Mane Ax'} onChange={updateSusieWeapon} character='Susie' allItems={weirdItems} />
        <img src={Armor1} />
        <ArmorSelect start='------' onChange={updateSusieArmor1} character='Susie' allItems={weirdItems} />
        <img src={Armor2} />
        <ArmorSelect start='------' onChange={updateSusieArmor2} character='Susie' allItems={weirdItems} />
        <span>ATK</span>
        <span>{susieStats.atk}</span>
        <span>MAG</span>
        <span>{susieStats.mag}</span>
        <span>DEF</span>
        <span>{susieStats.def}</span>
      </div>
    </>
  )
}
