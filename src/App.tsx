import { useEffect, useState } from 'react';
import { PokemonCard } from './components/PokemonCard';

type PokemonProps = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string;
  abilities: string;
};
//   {
//     id: 1,
//     name: "bulbasaur",
//     height: 7,
//     weight: 69,
//     types: "grass, poison",
//     abilities: "overgrow, chlorophyll"
//   },
//   {
//     id: 4,
//     name: "charmander",
//     height: 6,
//     weight: 85,
//     types: "fire",
//     abilities: "blaze, solar-power"
//   },
//   {
//     id: 7,
//     name: "squirtle",
//     height: 5,
//     weight: 90,
//     types: "water",
//     abilities: "torrent, rain-dish"
//   },
//   {
//     id: 25,
//     name: "pikachu",
//     height: 4,
//     weight: 60,
//     types: "electric",
//     abilities: "static, lightning-rod"
//   }
// ];

function App() {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        console.log("api call")
        const response = await fetch("http://localhost:8000/api/pokemon")
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        setPokemons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(poke => 
    poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poke.types.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading Pokémon data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPokemons.map((poke: PokemonProps) => (
            <PokemonCard key={poke.id} {...poke} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
