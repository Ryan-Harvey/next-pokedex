import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <Layout title="Home">
      <h1 className="text-4xl mb-8 text-center ">The Next.js Pokédex</h1>
      <ul>
        {pokemon.map((mon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  src={mon.pokemonImage}
                  alt={mon.name}
                  className="w-20 h-20 mr-3"
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {mon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=893");
    let { results } = await res.json();
    let pokemon = results.map((result, index) => {
      let paddedIndex = ("00" + (index + 1)).slice(-3);
      let pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return { ...result, pokemonImage };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}
