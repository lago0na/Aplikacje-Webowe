import {useState} from "react";
import * as React from "react";

interface Student {
    firstName: string,
    lastName: string,
    year: number
}

interface AddProps {
    add: (student: Student) => void;
}

const Add = ({add}: AddProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [year, setYear] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !year){
            alert("wypełnij wszytskie pola");
            return;
        }

        if(isNaN(Number(year))){
            alert("rocznik musi być liczbą");
            return;
        }

        add({
            firstName: firstName,
            lastName: lastName,
            year:Number(year)
        });

        setFirstName("");
        setLastName("");
        setYear("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Imię"
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nazwisko"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Rocznik"
                value={year}
                onChange={(e)=> setYear(e.target.value)}
            />
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default Add;