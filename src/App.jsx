import React, { useEffect, useState } from "react";
import List from "./components/List";
import Spinner from "./components/Spinner";

function App() {
  const [value, setValue] = useState([]);
  const [btnFetch, setBtnFetch] = useState(null);
  const [byID, setByID] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (btnFetch) {
      setLoading(true);
      let fetchData = async () => {
        let res;

        try {
          if (!byID) {
            res = await fetch(`https://fakestoreapi.com/products`);
            const data = await res.json();
            setValue(data);
          } else {
            res = await fetch(`https://fakestoreapi.com/products/${byID}`);
            const data = await res.json();
            setValue([data]);
          }
        } catch (error) {
          setValue([
            {
              id: `Data doesn't exist for id: ${byID} `,
              title: `Data doesn't exist for id: ${byID} `,
              price: `Data doesn't exist for id: ${byID} `,
            },
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [btnFetch, byID]);

  function handleClick() {
    setBtnFetch("fetch");
  }

  function handleReset() {
    setByID('')
  }
  return (
    <>
    <div className="text-center">
    <h1 className="text-3xl font-bold mb-4 mt-2">Fetching Data from API</h1>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mr-2"
      onClick={handleClick}
    >
      Fetch
    </button> <br />
    <input
      className="border border-gray-400 rounded py-2 px-4 mt-4 mx-auto w-[30%]"
      type="text"
      value={byID}
      placeholder="Enter a id or click fetch for all"
      onChange={(e) => {
        setByID(e.target.value);
      }}
    />

<button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto ml-2"
      onClick={handleReset}
    >
      Reset
    </button>
    <p className="m-2 bg-slate-300 rounded-lg text-sm"
    >Note: *Fetch Btn by default will fetch all data and if id is entered in input and clicked fetch for first time, data will be fetched for that specific id</p>
   <p className="m-2 bg-slate-300 rounded-lg text-sm"
    >After Clicking fetch, enter a id, data will be fetched dynamically</p>
  </div>
    {loading ? (
      <Spinner />
    ) : (
      value.map((element) => <List values={element} key={element.id} />)
    )}
  </>
);
}

export default App;
