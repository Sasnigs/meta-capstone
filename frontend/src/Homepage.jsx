import Search from "./Search"
import MovieList from "./Movielist"
import { useState } from "react"


export default function Homepage(){
    const [moviesToshow, setMoviesToShow] = useState([])
    console.log(moviesToshow)
    return(
        <div>
            <Search setMoviesToShow= {setMoviesToShow} />
            <MovieList moviesToshow={moviesToshow} />

        </div>
    )
}