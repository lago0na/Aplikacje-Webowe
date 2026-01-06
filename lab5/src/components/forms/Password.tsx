import {useState} from "react";
import * as React from "react";

const Password = () => {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };

    let message = "Podaj hasło";

    if (password === "" && repeatPassword === "") {
        message = "Brak hasła";
    } else if (password !== repeatPassword) {
        message = "Hasła nie takie same";
    } else {
        message = "Hasłą wpisane poprawnie :)"
    }

    return(
        <div>
            <div>
                <label>Hasło</label>
                <input type="text" value={password} onChange={handlePassword}/>
            </div>
            <div>
                <label>Powtórz hasło</label>
                <input type="text" value={repeatPassword} onChange={handleRepeatPassword}/>
            </div>

            <div>{message}</div>

        </div>
    );
};
export default Password;