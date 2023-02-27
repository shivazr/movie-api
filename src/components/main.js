import React, { useEffect, useState } from "react";
import Card from "./card";


let API_key="api_key=1d56a708c28bb0b62b49477eafe4de3e";
let base_url="https://api.themoviedb.org/3";
// let url = base_url+" /discover/movie?sort_by=popularity.desc"+API_key;
 let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d56a708c28bb0b62b49477eafe4de3e'
let arr =["Popular","Theatre","Kids","Drama","Comedy"]; 

const Main =() =>{
    const [movieData, setData]= useState([]);
    const [url_set , setUrl] = useState(url);
    const [search, setSearch]= useState();


    useEffect(()=>{
      fetch(url_set).then(res=> res.json()).then(data =>{
        // console.log(data.results)
        setData(data.results)
      });
    }, [url_set])

    const getData=(movieType)=>{
        if(movieType =="Popular"){
            url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d56a708c28bb0b62b49477eafe4de3e' 
        }
        if(movieType =="Theatre"){
            url = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=1d56a708c28bb0b62b49477eafe4de3e' 
        }
        if(movieType =="Kids"){
            url = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=1d56a708c28bb0b62b49477eafe4de3e' 
        }
        if(movieType =="Drama"){
            url = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=1d56a708c28bb0b62b49477eafe4de3e' 
        }
        if(movieType =="Comedy"){
            url = 'https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=1d56a708c28bb0b62b49477eafe4de3e' 
        }
        setUrl(url); 
    }

    const searchMovie=(evt)=>{
      if(evt.key=="Enter"){
        // console.log("hello")
        url="https://api.themoviedb.org/3/search/movie?api_key=1fb774ef1c46cffe28dc49b5e9c8f28d&query=" + search;
        setUrl(url)
        setSearch("") 
      }
    }
    return(
        <>
        <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value)=>{
                            return(
                               <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li> 
                            )
                        })
                    }
                  
                </ul>
            </nav>
            <form >
                <div className="search-btn">
                  <input className="inputText" 
                   value={search} 
                  onChange={(e)=>{setSearch(e.target.value)}} 
                  onKeyPress={searchMovie}
                  type="text"  placeholder="Enter Movie Name"  />
                  <button><i className="fa fa-search"></i></button>

                </div>
            </form>    
        </div>
        <div className="container">
            {
                (movieData.length==0) ? <p className="notfound">Not Found</p> :
                movieData.map((res,pos) =>{
                    return(
                        <Card info={res} key={pos} />
                    )
                })
            }
           
        </div>
 
        </>
    )
}
export default Main;