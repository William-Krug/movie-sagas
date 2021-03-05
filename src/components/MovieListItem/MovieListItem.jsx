function MovieListItem({ movie }) {
  const goToDetails = () => {
    console.log('*** in goToDetails() ***');
  };

  return (
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} onClick={goToDetails} />
    </div>
  );
}

export default MovieListItem;
