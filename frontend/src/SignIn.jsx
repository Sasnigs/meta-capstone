import { Link } from "react-router-dom"
import { useState } from "react"
export default function SignIn(){
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

    return(
       <div>
            <h1>Movie Gran</h1>
            <h3>Sign in</h3>
            <form>
                <input type="text" value={username} placeholder="Username" required onChange={(e) => (setUsername(e.target.value))} />
                <input type="text" value={password} placeholder="password" required onChange={(e) => (setPassword(e.target.value))}/>
                <button type="submit">Sign In</button>
            </form>
            <Link to={"signUp" }>
                 <button >Sign up</button>
            </Link>
            


       </div>
    )
}