import "./Results.scss"

function Result (props) {
    var resp = JSON.parse(props.response);
    console.log(resp['name']);
    return(
        <div>
             <table className='resultTable'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total</th>
                        <th>GPU Total</th>
                        <th>HDD Total</th>
                    </tr>
                    <tr>
                        <td>{resp['name']}</td>
                        <td>{resp['startDate']}</td>
                        <td>{resp['endDate']}</td>
                        <td>{resp['total']}</td>
                        <td>{resp['gpuTtotal']}</td>
                        <td>{resp['hddTotal']}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Result;