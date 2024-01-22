import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';


const AccountList = (props) =>{
    const [accounts, setAccount] = useState([]);
    const credentials = btoa(`${props.BELVO_ID}:${props.BELVO_PASS}`);
    const url_params = useParams();
    useEffect(() => {
        const get_account_data=async(uuid) => {
            const response = await fetch (props.BELVO_URL+"/api/accounts/?"+uuid,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+ credentials
                }
            }).then((response) =>{
                    if (response.ok) {
        
                        return response.json();
                    }
                    return Promise.reject(response);
                }).then(result => {
                    setAccount(result.results)
                })
        }
        if (accounts.length===0) {
            get_account_data(url_params.id);
        }
    });

    return(
        <MDBContainer>
        <MDBRow>
            <MDBCol md='12'>
                <h2>Cuentas</h2>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Tipo</th>
                        <th scope='col'>Numero</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {accounts.map((item, index) => (
                        
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>
                                <Link to={"/account_detail/"+item.id+"/"+ item.link}>
                                    <MDBBtn href='#'>{item.number }</MDBBtn>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </MDBTableBody>
                    </MDBTable>
                
            
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default AccountList;
