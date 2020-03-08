import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="max-w-screen-md mx-auto">
      <div
        style={{
          backgroundColor: "#cccccc",
          height: "100rem"
        }}
      ></div>
      <StarWarsTable> </StarWarsTable>
    </div>
  );
}

const StarWarsTable = props => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = React.createRef();

  useScreenEnter(ref, () => {
    // Show loading
    setLoading(true);

    // Fetch data
    fetch("https://swapi.co/api/people?format=json")
      .then(res => res.json())
      .then(data => {
        setChars(data.results);
        setLoading(false);
      });
  });

  return (
    <div ref={ref}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="">
          <thead>
            <tr>
              <td>Name</td>
              <td>Gender</td>
              <td>Height</td>
              <td>Mass</td>
            </tr>
          </thead>
          <tbody>
            {chars.map(person => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default App;

export function useScreenEnter(ref, callback) {
  const [entered, setEntered] = useState(false);

  function activate() {
    if (
      ref.current &&
      isInViewPort(ref.current.getBoundingClientRect()) &&
      !entered
    ) {
      callback();
      setEntered(true);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", activate);
    return () => document.removeEventListener("scroll", activate);
  });
}

function isInViewPort(rect) {
  if (
    window.screen.height >= rect.bottom &&
    window.screen.width >= rect.right &&
    rect.top >= 0 &&
    rect.left >= 0
  )
    return true;
  return false;
}
