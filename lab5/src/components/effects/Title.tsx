import {useEffect, useState} from "react";

const Title = () => {

    const [title,setTitle]=useState("");

    useEffect(()=>{
        document.title=title;
    },[title]);

    return(
        <div>
            <input
                type={"text"}
                value={title}
                placeholder={"Wpisz tytuł"}
                onChange={(e)=> setTitle(e.target.value)}
            />
        </div>
    );
};
export default Title;