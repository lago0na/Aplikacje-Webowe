import {useState} from "react";
import * as React from "react";

const Password = () => {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [username,setUsername]=useState("");

    const handleLogin = () => {
        if(password!== repeatPassword){
            alert("Hasła niezgodne");
        } else {
            alert("Zalogowano poprawnie :)");
        }

    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };

    return(
        <div>
            <div>
                <label>Nazwa Użytkownika</label>
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Hasło</label>
                <input type="text" value={password} onChange={handlePassword}/>
            </div>
            <div>
                <label>Powtórz hasło</label>
                <input type="text" value={repeatPassword} onChange={handleRepeatPassword}/>
            </div>

            <button disabled={ !username || !password || !repeatPassword} onClick={handleLogin}>Login</button>
        </div>
    );
};
export default Password;