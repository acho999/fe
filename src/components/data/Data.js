import { AppContext } from "../../App";
import Result from "../results/Result";
import { useContext, useState } from "react";
import "./Data.scss";

function Data (props) {

    const {token} = useContext(AppContext);
    var isOk = false;
    var response;
    const bearer = localStorage.getItem('token');//'Bearer ' + token;

    const [result, setResult] = useState('');

    // useEffect(()=>{
    //     console.log(result);  
    // }, [result])

    async function handleOnSubmitQuery(event){
        event.preventDefault();
        let fileObj = event.target;
        var data = new FormData()
        data.append('name', event.target.elements.name.value);
        data.append('startDate', event.target.elements.startDate.value);
        data.append('endDate', event.target.elements.endDate.value);

        var data1 = JSON.stringify(Object.fromEntries(data));

        const resp = await fetch(
        //`https://jsonplaceholder.typicode.com/posts?title_like=${query}`
        'http://localhost:8080/data/getTotal', {
        method: 'POST',
        cache: 'no-cache',
        body: data1,
        headers: {'Authorization': bearer,'Content-Type': 'application/json' , 'Access-Control-Allow-Origin':'*','Accept': 'application/json, text/plain, */*'},
        });
        isOk = resp.status === 200;
        setResult(await resp.text());
        response = isOk ? resp.ok : "No data query!"
    }

    async function handleOnSubmitUpload(event){
        event.preventDefault();
        let fileObj = event.target[0].files[0];

        var data = new FormData()
        data.append('file', fileObj)

        const resp = await fetch(
            //`https://jsonplaceholder.typicode.com/posts?title_like=${query}`
            'http://localhost:8080/files/upload', {
            method: 'POST',
            cache: 'no-cache',
            body: data,
            headers: {'Authorization': bearer, 'Access-Control-Allow-Origin':'*','Accept': '*/*'},
            });
            isOk = resp.status === 200;
            var text = await resp.text();
            if(isOk){
                alert(text);
            }
    }

    return(
        <div className="form">
              <form className='upload' onSubmit={handleOnSubmitUpload} encType='multipart/form-data'>
                <div className="input-container">
                    <label>Upload file </label>
                    <input type="file" name="file" required/>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>

            <br/>
            <form className='query' onSubmit={handleOnSubmitQuery}  encType='application/x-www-form-urlencoded'>
                <div className="input-container">
                    <label>Server name </label>
                    <input type="text" name="name" required/>
                </div>
                <div className="input-container">
                    <label>Start date </label>
                    <input type="datetime-local" name="startDate" required/>
                </div>
                <div className="input-container">
                    <label>End date </label>
                    <input type="datetime-local" name="endDate" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>

            <br/>

            <div>
                {result ? <Result response={result}/> : ""}
            </div>
        </div>
    )

}

export default Data;