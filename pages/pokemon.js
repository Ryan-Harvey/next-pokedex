import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
export default function pokemon({ mon }) {
  return (
    <Layout title={mon.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">
        {mon.id}. {mon.name}
      </h1>
      <img className="mx-auto" src={mon.pokemonImage} alt={mon.name} />
      <p className="text-center">
        <span className="font-bold mr-2">Weight:</span>
        {mon.weight / 10}kg
      </p>
      <p className="text-center">
        <span className="font-bold mr-2">Height:</span>
        {mon.height / 10}m
      </p>
      <h2 className="text-2xl mt-6 mb-2 text-center">Types</h2>
      {mon.types.map((type, index) => (
        <p key="index" className="capitalize text-center">
          {type.type.name}
        </p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  let id = query.id;
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let mon = await res.json();
    let paddedId = ("00" + id).slice(-3);
    mon.pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      props: { mon },
    };
  } catch (err) {
    console.error(err);
  }
}
