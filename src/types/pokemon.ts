export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string[];
  base: PokemonBase;
}

export interface PokemonBase {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
