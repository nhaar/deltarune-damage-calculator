import { useContext, useState } from 'react'
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
import { CharacterName } from './data'
import { AppContext } from './context/AppContext'

const CHAPTERS = 3;

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
    mag: 0,
    ch: 1
  },
  'Woodblade': {
    atk: 0,
    def: 0,
    mag: 0,
    ch: 1
  },
  'AutoAxe': {
    atk: 4,
    def: 0,
    mag: 0,
    ch: 2
  },
  'BounceBlade': {
    atk: 2,
    def: 1,
    mag: 0,
    ch: 2
  },
  'BraveAx': {
    atk: 2,
    def: 0,
    mag: 0,
    ch: 1
  },
  'BrokenSwd': {
    atk: 0,
    def: 0,
    mag: 0,
    ch: 2
  },
  'CheerScarf': {
    atk: 1,
    def: 0,
    mag: 2,
    ch: 2
  },
  'DaintyScarf': {
    atk: 0,
    def: 0,
    mag: 2,
    ch: 1
  },
  'Devilsknife': {
    atk: 5,
    def: 0,
    mag: 4,
    ch: 1
  },
  'EverybodyWeapon': {
    atk: 12,
    def: 6,
    mag: 8,
    ch: 1
  },
  'FiberScarf': {
    atk: 2,
    def: 0,
    mag: 2,
    ch: 1
  },
  'FreezeRing': {
    atk: 4,
    def: 0,
    mag: 4,
    ch: 2
  },
  'MechaSaber': {
    atk: 4,
    def: 0,
    mag: 0,
    ch: 2
  },
  'PuppetScarf': {
    atk: 10,
    def: 0,
    mag: -6,
    ch: 2
  },
  'Ragger': {
    atk: 2,
    def: 0,
    mag: 0,
    ch: 1
  },
  'Ragger2': {
    atk: 5,
    def: 0,
    mag: -1,
    ch: 2
  },
  'RedScarf': {
    atk: 0,
    def: 0,
    mag: 0,
    ch: 1
  },
  'SnowRing': {
    atk: 0,
    def: 0,
    mag: 0,
    ch: 2
  },
  'SpookySword': {
    atk: 2,
    def: 0,
    mag: 0,
    ch: 1
  },
  'ThornRing': {
    atk: 14,
    def: 0,
    mag: 12,
    ch: 2
  },
  'Trefoil': {
    atk: 4,
    def: 0,
    mag: 0,
    ch: 1
  },
  'TwistedSwd': {
    atk: 16,
    def: 0,
    mag: 0,
    ch: 2
  },
  'Saber10': {
    atk: 6,
    def:0,
    mag: 0,
    ch: 3
  },
  'ToxicAxe': {
    atk: 6,
    def:0,
    mag: 0,
    ch: 3
  },
  'FlexScarf': {
    atk: 4,
    def: 0,
    mag: 1,
    ch: 3
  },
  'BlackShard': {
    atk: 16,
    def: 0,
    mag: 0,
    ch: 3
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
    'MechaSaber',
    'Saber10'
  ],
  'Susie': [
    'Mane Ax',
    'BraveAx',
    'Devilsknife',
    'AutoAxe',
    'ToxicAxe'
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
    'PuppetScarf',
    'FlexScarf'
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
    mag: 0,
    ch: 1
  },
  'Amber Card': {
    atk: 0,
    def: 1,
    mag: 0,
    ch: 1
  },
  'B.ShotBowtie': {
    atk: 0,
    def: 2,
    mag: 1,
    ch: 2
  },
  'Chainmail': {
    atk: 0,
    def: 3,
    mag: 0,
    ch: 2
  },
  'Dealmaker': {
    atk: 0,
    def: 5,
    mag: 5,
    ch: 2
  },
  'Dice Brace': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 1
  },
  'Frayed Bowtie': {
    atk: 1,
    def: 1,
    mag: 1,
    ch: 2
  },
  'Glow Wrist': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 2
  },
  'Iron Shackle': {
    atk: 1,
    def: 2,
    mag: 0,
    ch: 1
  },
  'Jevilstail': {
    atk: 2,
    def: 2,
    mag: 2,
    ch: 1
  },
  'Mannequin': {
    atk: 0,
    def: 0,
    mag: 0,
    ch: 2
  },
  'Pink Ribbon': {
    atk: 0,
    def: 1,
    mag: 0,
    ch: 2
  },
  'Royal Pin': {
    atk: 0,
    def: 3,
    mag: 1,
    ch: 2
  },
  'Silver Card': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 2
  },
  'Silver Watch': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 2
  },
  'SpikeBand': {
    atk: 2,
    def: 1,
    mag: 0,
    ch: 2
  },
  'Tension Bow': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 2
  },
  'Twin Ribbon': {
    atk: 0,
    def: 3,
    mag: 0,
    ch: 2
  },
  'White Ribbon': {
    atk: 0,
    def: 2,
    mag: 0,
    ch: 1
  }
}



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
  'FreezeRing' |
  'Saber10' |
  'ToxicAxe' |
  'FlexScarf' |
  'BlackShard'

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
  def: number,
  ch: number;
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
  'Spamton NEO [Snowgrave]' |
  'Knight' |
  'Tenna'

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
  },
  'Knight': {
    hp: 7300,
    df: 0
  },
  'Tenna': {
    hp: 5500,
    df: 0
  }
}

const CHARACTER_INFO: Record<CharacterName, {
  lvInfo: Partial<Record<number, CharacterStats>>;
  chapter: number;
  weaponImage: string;
  charImage: string;
}> = {
  'Kris': {
    lvInfo: {
      1: {
        atk: 10,
        def: 2,
        mag: 0
      },
      2: {
        atk: 12,
        def: 2,
        mag: 0
      },
      3: {
        atk: 14,
        def: 2,
        mag: 0
      }
    },
    chapter: 1,
    weaponImage: Sword,
    charImage: Kris
  },
  'Susie': {
    lvInfo: {
      1: {
        atk: 14,
        def: 2,
        mag: 1
      },
      2: {
        atk: 16,
        def: 2,
        mag: 1
      },
      3: {
        atk: 18,
        def: 2,
        mag: 2
      }
    },
    chapter: 1,
    weaponImage: Axe,
    charImage: Susie
  },
  'Ralsei': {
    lvInfo: {
      1: {
        atk: 8,
        def: 2,
        mag: 7
      },
      2: {
        atk: 10,
        def: 2,
        mag: 9
      },
      3: {
        atk: 12,
        def: 2,
        mag: 11
      }
    },
    chapter: 1,
    weaponImage: Scarf,
    charImage: Ralsei
  },
  'Noelle': {
    lvInfo: {
      2: {
        atk: 3,
        def: 1,
        mag: 11
      },
      3: {
        atk: 3,
        def: 1,
        mag: 11
      }
    },
    chapter: 2,
    weaponImage: Ring,
    charImage: Noelle
  }
}

function getBaseStats(name: CharacterName, lv: number): CharacterStats {
  const originalLv = lv;
  lv = clampInteger(lv, 1, MAX_LEVEL);

  const characterLevelInfo = CHARACTER_INFO[name].lvInfo;

  while (lv <= MAX_LEVEL) {
    const stats = characterLevelInfo[lv];
    if (stats !== undefined) {
      return stats;
    }
    lv++;
  }

  throw new Error(`Character "${name}" could not find stats for level ${originalLv}`);
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

function ItemSelect<ItemT extends string>({ start, onChange, info, allowed, allItems }: {
  start: ItemT,
  onChange: (item: ItemT) => void,
  info: Record<ItemT, Item>,
  allowed: Set<ItemT>,
  allItems: boolean
}) {
  const { chapter } = useContext(AppContext);

  return (
    <select defaultValue={start} onChange={e => onChange(e.target.value as ItemT)}>
      {...Object.entries(info).map((pair) => {
        const [item, info] = pair;
        if (!allItems) {
          if (!allowed.has(item as ItemT)) {
            return undefined;
          }
          if ((info as Item).ch > chapter) {
            return undefined;
          }
        }
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
  let allowed: Weapon[] = Object.keys(WEAPON_INFO) as Weapon[];
  if (!allItems) {
    allowed = ALLOWED_WEAPONS[character];
  }
  return <ItemSelect<Weapon> start={start} onChange={onChange} info={WEAPON_INFO} allowed={new Set(allowed)} allItems={allItems} />
}

function ArmorSelect({ start, onChange, character, allItems }: {
  start: Armor
  onChange: (armor: Armor) => void
  character: CharacterName,
  allItems: boolean;
}) {
  const allowed = new Set<Armor>(Object.keys(ARMOR_INFO) as Armor[]);

  if (!allItems) {
    FORBIDDEN_ARMORS[character].forEach(armor => allowed.delete(armor));
  }

  return <ItemSelect<Armor> start={start} onChange={onChange} info={ARMOR_INFO} allowed={allowed} allItems={allItems} />
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
  const { chapter, damageMultiplier } = useContext(AppContext);

  return (
    <tr>
      <td>
        {label}
      </td>
      {...Object.entries(characterStats).map(pair => {
        const [name, stats] = pair;
        const info = CHARACTER_INFO[name as CharacterName];
        if (chapter < info.chapter) {
          return undefined;
        }
        // the only battle with multiplier uses ceil
        // if a different battle shows up, it can be maybe tweaked
        const damage = damageMultiplier(calculateDamage(distance, stats.atk, enemyDef), name as CharacterName);
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
  const { chapter } = useContext(AppContext);

  return (
    <div>
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>
              Frame
            </th>
            {...Object.keys(characterStats).map((name) => {
              const info = CHARACTER_INFO[name as CharacterName];
              if (chapter < info.chapter) {
                return undefined;
              }
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

type SpellRows = Array<{
  rowName: string;
  // second number returned is damage that can be affected by multiplier, second is static + damage
  rowFormula: (stats: CharacterStats, def: number) => [number, number];
}>;

function SpellTable({
  spellName,
  rows,
  characterStats,
  enemyDef,
  color
}: {
  spellName: string;
  rows: SpellRows,
  color: string;
  characterStats: CharacterStats,
  enemyDef: number;
}) {
  const { rudeBusterMultiplier } = useContext(AppContext);

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
          let [mult, stat] = row.rowFormula(characterStats, enemyDef);
          if (spellName === 'Rude Buster') {
            mult = rudeBusterMultiplier(mult);
            stat = gamemakerRound(stat / 2);
          }
          const damage = mult + stat;
          return (
            <tr>
              <td>
                {row.rowName}
              </td>
              <td style={{ color }}>
                {damage}
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

const SPELLS: Array<{
  name: string;
  chapter: number;
  rows: SpellRows,
  color: string;
  caster: CharacterName;
}> = [
  {
    name: 'Rude Buster',
    chapter: 1,
    rows: [
      {
        rowName: 'Crit Rude',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 30];
        },
      },
      {
        rowName: '1 Frame Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 28];
        },
      },
      {
        rowName: '2 Frames Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 20];
        },
      },
      {
        rowName: '3 Frames Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 13];
        },
      },
      {
        rowName: '4 Frames Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 11];
        },
      },
      {
        rowName: '5 Frames Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 10];
        },
      },
      {
        rowName: '6 Frames Early',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 7];
        },
      },
      {
        rowName: 'Timing Fail',
        rowFormula(stats, def) {
          return [rudeBusterDamage(stats.atk, stats.mag, def), 0];
        },
      }
    ],
    color: '#edb4ec',
    caster: 'Susie'
  },
  {
    name: 'Red Buster',
    rows: [
      {
        rowName: 'Crit Rude',
        rowFormula(stats, def) {
          return [redBusterDamage(stats.atk, stats.mag, def), 30];
        },
      },
      {
        rowName: 'No Mash Z',
        rowFormula(stats, def) {
          return [redBusterDamage(stats.atk, stats.mag, def), 0];
        },
      }
    ],
    chapter: 1,
    color: '#ff0000',
    caster: 'Susie'
  },
  {
    name: 'Ice Shock',
    rows: [
      {
        rowName: 'Highest Roll',
        rowFormula(stats) {
          return [iceShockRoll(stats.mag) + 9, 0];
        },
      },
      {
        rowName: 'Lowest Roll',
        rowFormula(stats) {
          return [iceShockRoll(stats.mag), 0];
        },
      }
    ],
    chapter: 2,
    color: '#00ffff',
    caster: 'Noelle'
  },
  {
    name: 'X-Slash',
    rows: [
      {
        rowName: 'Single Slash',
        rowFormula(stats, def) {
          return [singleXSlash(stats.atk, def), 0];
        },
      },
      {
        rowName: 'Total Damage',
        rowFormula(stats, def) {
          return [2 * singleXSlash(stats.atk, def), 0];
        },
      }
    ],
    chapter: 2,
    color: '#00a2e8',
    caster: 'Kris'
  },
  {
    name: 'Snowgrave',
    rows: [
      {
        rowName: 'Highest Roll',
        rowFormula(stats) {
          return [snowgraveRoll(stats.mag) + 100, 0];
        },
      },
      {
        rowName: 'Lowest Roll',
        rowFormula(stats) {
          return [snowgraveRoll(stats.mag), 0];
        },
      }
    ],
    chapter: 2,
    color: '#c0c0c0',
    caster: 'Noelle'
  }
]

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
  const [knightTurn, setKnightTurn] = useState<number>(1);
  const [susieDown, setSusieDown] = useState<boolean>(false);
  const [ralseiDown, setRalseiDown] = useState<boolean>(false);
  const [didMantleQuest, setDidMantleQuest] = useState<boolean>(false);

  function updateChapter(e: React.ChangeEvent<HTMLInputElement>) {
    setChapter(clampInteger(Number(e.target.value), 1, CHAPTERS));
    setEnemy('');
  }

  function updateKnightTurn(turn: number) {
    setKnightTurn(clampInteger(turn, 1, 15));
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
    case 3:
      enemies = [
        'Tenna',
        'Knight'
      ];
      break;
  }

  // dynamic changes in defense
  let enemyDefModifier = 0;

  // for battles that use a static multiplier in the damage dealt
  let damageMultiplier = (n: number, _: CharacterName) => n;
  let rudeMultiplier = (n: number) => n;

  function getKnightDamageReduction(turns: number) {
    return 0.2 + (turns - 1) * 0.01;
  }

  switch (enemy) {
    case 'Susie':
      // the weapon is accounted for interestingly
      const susie = characters.Susie;
      enemyDefModifier = ARMOR_INFO[susie.armor1].def + ARMOR_INFO[susie.armor2].def + WEAPON_INFO[susie.weapon].def;

      damageMultiplier = (dmg) => Math.ceil(dmg * 0.3);
      break;
    case 'Knight':

      damageMultiplier = (dmg: number, name: CharacterName) => {
        let newdmg = Math.ceil(dmg * getKnightDamageReduction(knightTurn));
        if (name === 'Kris') {
          if (!susieDown && !ralseiDown) {
            return gamemakerRound(newdmg * 0.5);
          } else if (susieDown && ralseiDown) {
            return newdmg * 2;
          }
        }
        return newdmg;
      };
      rudeMultiplier = (dmg: number) => {
        return gamemakerRound(Math.ceil(dmg * (getKnightDamageReduction(knightTurn) + 0.65)) / 2);
      }
      break;
    case 'Tenna':
      damageMultiplier = (dmg: number, name: CharacterName) => {
        if (name === 'Kris') {
          return gamemakerRound(dmg * (didMantleQuest ? 3 : 0.5));
        }
        return dmg;
      }
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
  for (const name of Object.keys(CHARACTER_INFO)) {
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
    <AppContext value={{
      chapter,
      damageMultiplier,
      rudeBusterMultiplier: rudeMultiplier
    }}>
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
            {enemy === 'Knight' && (
              <div>
                <div>
                  <span className='reducer-desc'>Current knight turn (eg 1: has not attacked yet)</span>
                  <input className='reducer-input' type='number' value={knightTurn} onChange={e => updateKnightTurn(Number(e.target.value))} />
                </div>
                <div>
                  <span className='reducer-desc'>Is Susie DOWN?</span>
                  <input type='checkbox' className='reducer-input' checked={susieDown} onChange={e => setSusieDown(e.target.checked)} />
                </div>
                <div>
                  <span className='reducer-desc'>Is Ralsei DOWN?</span>
                  <input type='checkbox' className='reducer-input' checked={ralseiDown} onChange={e => setRalseiDown(e.target.checked)} />
                </div>
              </div>
            )}
            {enemy === 'Tenna' && (
              <div>
                  <span className='reducer-desc'>Completed Mantle Quest?</span>
                  <input type='checkbox' className='reducer-input' checked={didMantleQuest} onChange={e => setDidMantleQuest(e.target.checked)} />
              </div>
            )}
          </div>
          {...Object.entries(CHARACTER_INFO).map(pair => {
            const [name, info] = pair;
            if (chapter >= info.chapter) {
              return <CharacterBox 
                name={name as CharacterName}
                onWeaponChange={updateCharWeapon}
                onArmor1Change={updateCharArmor1}
                onArmor2Change={updateCharArmor2}
                weirdItems={weirdItems}
                stats={characterStats}
                weaponImage={info.weaponImage}
                charImage={info.charImage}
              />
            }
            return undefined;
          })}
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
              {...SPELLS.map(spell => {
                if (chapter < spell.chapter) {
                  return undefined;
                }
                return <SpellTable spellName={spell.name} rows={spell.rows} characterStats={characterStats[spell.caster]} enemyDef={finalDef} color={spell.color} />
              })}
            </div>
          </div>
        </div>
      </>
    </AppContext>
  )
}
