import client from "@/lib/mongodb/config";

export default async function Top() {
  try {
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray();

    return (
      <div>
        <h1>Top 1000 Movies of All Time</h1>
        <p>
          <small>(According to Metacritic)</small>
        </p>
        <ul>
          {movies.map((movie) => (
            <li key={movie._id.toString()}>
              <h2>{movie.title}</h2>
              <h3>{movie.metacritic}</h3>
              <p>{movie.plot}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (e) {
    console.error(e);
    return {
      props: { movies: [] },
    };
  }
}
