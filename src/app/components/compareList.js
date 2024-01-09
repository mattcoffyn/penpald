import Film from './film';

export default function CompareList(matchList) {
  const list = matchList.matchList;

  return (
    <div>
      {list.map((film, i) => {
        return (
          <Film
            key={i}
            title={film.title}
            releaseDate={film.releaseDate}
            blurb={film.blurb}
          />
        );
      })}
    </div>
  );
}
