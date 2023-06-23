import React, { useState } from "react";
import "./App.css";

function App() {

    const [inputarr, setInputarr] = useState([]) //for keeping table elements
    const [inputdata, setInputdata] = useState({ first: "", last: "" })
    const { first, last } = inputdata;
    const [bool, setBool] = useState(true) // which function to use Add or Update
    const [index, setIndex] = useState() //index of inputarr
    const [boolarr, setBoolarr] = useState(true) // it says whether array is empty not
    const [textpresentbool, setTextpresentbool] = useState(false) //it says whether text is present in the text area or not

    /*
    This function helps in putting and tracking the input value in the text area */
    function changehandle(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
        console.log(e.target.value)
        if (e.target.value === '') {
            setTextpresentbool(false)
        } else {
            setTextpresentbool(true)
        }
    }

    /*
    This function helps in updating the first name and last name
    in the text input area */
    function updateinputhandle(i) {
        let { first, last } = inputarr[i]
        setInputdata({ ...inputdata, first, last })
        setIndex(i)
        setBool(false)
        setTextpresentbool(true)
    }

    /* 
    This function helps in updating the table with the given provided data */
    function updatehandleinfo() {
        if (textpresentbool) {
            let total = [...inputarr]
            total.splice(index, 1, { first, last })
            setInputarr(total)
            setBool(true)
            setInputdata({ first: "", last: "" })
            setTextpresentbool(false)
        } else if (first !== '' || last !== '') {
            setTextpresentbool(true)
            let total = [...inputarr]
            total.splice(index, 1, { first, last })
            setInputarr(total)
            setBool(true)
            setInputdata({ first: "", last: "" })
            setTextpresentbool(false)
        }
    }

    /*
    This function helps in deleting the table with index provided */
    function handledelete(i) {
        let newInputarr = [...inputarr]
        newInputarr.splice(i, 1)
        setInputarr(newInputarr)
        if (newInputarr.length === 0) {
            return setBoolarr(true)
        }
    }

    /*
    This function helps in adding the values to the table */
    function addinputhandle() {
        if (textpresentbool) {
            setInputarr([...inputarr, { first, last }])
            setInputdata({ first: "", last: "" })
            setBoolarr(false)
            setTextpresentbool(false)

        } else if ((first !== '' || last !== '')) {
            setTextpresentbool(true)
            setInputarr([...inputarr, { first, last }])
            setInputdata({ first: "", last: "" })
            setBoolarr(false)
            setTextpresentbool(false)
        }
    }

    /*JSX written */
    return (
        <div className="App">
            <input type="text" name="first" autoComplete="off" value={inputdata.first} onChange={changehandle} placeholder="Firstname" />
            <input type="text" name="last" autoComplete="off" value={inputdata.last} onChange={changehandle} placeholder="Lastname" />
            <button onClick={bool ? addinputhandle : updatehandleinfo}>{bool ? 'Add' : 'Update'}</button><br></br>
            <table border={1} cellPadding={10}>
                <tbody>
                    <tr>
                        <td>Firstname</td>
                        <td>Lastname</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>
                    {
                        inputarr.map(
                            (info, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{info.first}</td>
                                        <td>{info.last}</td>
                                        <td>
                                            <button className="Update" type="button" onClick={() => updateinputhandle(index)}>Update</button>
                                        </td>
                                        <td>
                                            <button className="Delete" type="button" onClick={() => handledelete(index)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            <div className="checkarr" >{boolarr ? 'hey! the elements are empty, add some.' : ''}</div>
        </div>
    );
}

export default App;