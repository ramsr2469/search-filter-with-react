import {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import axios from "axios";
import Card from "./Card";


function App() {

  const [data, setData] = useState<any>({});
  const [searchInput, setSearchInput] = useState<string>('');

  const [paginations, setPaginations] = useState<any>([]);

  const preparePagination = (pages =0) => {
   const links = [];
    if(pages > 0) {
      for(let i=1; i<=pages; i++){
        links.push(`https://www.swapi.tech/api/people?page=${i}&limit=10`);
      }
      setPaginations(links);
    } 
    console.log(paginations);
  }

  useEffect(() => {
    fetchData("https://www.swapi.tech/api/people?page=1&limit=10")
  }, []);

  const fetchData = async (url: string) => {
    setData([]);
    const response = await axios.get(url);
    setData(response.data);
    preparePagination(response.data.total_pages);

  };

  const getFilteredResults = () => {
    if(!searchInput) {
      return data.results;
    } else {
    return data.results?.filter((result:any) => result.name?.toLowerCase().includes(searchInput.toLowerCase()));
    }
  }

  
  return (
    <div className="App text-center">
      <h1>Star War Heros</h1>
      <input type="text" placeholder="Seach your star" value={searchInput} onChange={(e) =>setSearchInput(e.target.value)}/>
      <ul className="list-group my-4">
        {getFilteredResults()?.length > 0 ?
          getFilteredResults()?.map((starWar: any) => {
            // return <Card key={starWar.uid} starWar={starWar} />;
            return <li className="list-item" key={starWar.uid}>{starWar.name}</li>
          }): 'No results found'}
      </ul>
     <div className="btn-group">
      {data.previous && (
        <button className="btn btn-light" onClick={() => fetchData(data.previous)}>Prev </button>
      )}
      {paginations.length > 0 && paginations.map((page:string,index:number) => {
       return <button className="btn btn-light" key={`p-${index}`} onClick={() => fetchData(page)}>{index +1}</button> 
      })}
      {data.next && (
        <button className="btn btn-light" onClick={() => fetchData(data.next)}> Next </button>
      )}
      </div>

    </div>
  );
}

export default App;
