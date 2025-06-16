import React from 'react';

type PokemonProps = {
  name: string;
  height: number;
  weight: number;
  types: string;
  abilities: string;
};

export const PokemonCard = ({ name, height, weight, types, abilities }: PokemonProps) => {
  const typeColors: { [key: string]: string } = {
    grass: 'bg-green-100 text-green-800',
    fire: 'bg-red-100 text-red-800',
    water: 'bg-blue-100 text-blue-800',
    electric: 'bg-yellow-100 text-yellow-800',
    poison: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <h2 className="text-xl font-bold capitalize mb-2">{name}</h2>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-gray-600 w-20">Height:</span>
            <span>{height / 10}m</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 w-20">Weight:</span>
            <span>{weight / 10}kg</span>
          </div>
          
          <div>
            <span className="text-gray-600 block mb-1">Types:</span>
            <div className="flex flex-wrap gap-2">
              {types.split(',').map((type) => (
                <span 
                  key={type.trim()} 
                  className={`px-2 py-1 rounded-full text-sm ${typeColors[type.trim()] || 'bg-gray-100 text-gray-800'}`}
                >
                  {type.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 block mb-1">Abilities:</span>
            <div className="flex flex-wrap gap-2">
              {abilities.split(',').map((ability) => (
                <span 
                  key={ability.trim()} 
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {ability.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};