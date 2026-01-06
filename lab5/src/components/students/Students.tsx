interface Student {
    firstName: string,
    lastName: string,
    year: number
}

const Students = () => {
    let student1: Student = {firstName: "Jan", lastName: "Bytnar", year: 1938};
    let student2: Student = {firstName: "Tadeusz", lastName: "Zawadzki", year: 1937};
    let student3: Student = {firstName: "Maciej", lastName: "Dawidowski", year: 1935};

    let Students: Student[] = [student1, student2, student3];

    return (
        <div>
            <h1>Lista Studentów</h1>
            <table>
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rocznik</th>
                </tr>
                </thead>
                <tbody>
                {Students.map((student) => (
                    <tr key={student.lastName}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.year}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;