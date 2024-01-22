import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';


const AccountList = (props) =>{
    const url_params = useParams();
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [search_transactions, setSearchTransactions] = useState(true);
    const [search_link, setSearchLink] = useState(`${props.BELVO_URL}/api/transactions/?account=${url_params.id}&link=${url_params.link}`);
    const credentials = btoa(`${props.BELVO_ID}:${props.BELVO_PASS}`);
    useEffect(() => {
        const get_transacction_data=async() => {
            const response = await fetch (search_link,{
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
                    setTransactions(result)
                    setSearchTransactions(false)
                })
        }
        const get_account_data=async(uuid) => {
            const response = await fetch (props.BELVO_URL+"/api/accounts/"+uuid,{
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
                    setAccount(result);
                })
        }
        if (account===null) {
            get_account_data(url_params.id, url_params.link);
        }
        if(search_transactions){
            get_transacction_data();
        }
    });
    const get_link_data = (url)=>{
        setSearchTransactions(true);
        setSearchLink(url);
    }

    return (
    <MDBContainer>

        {account === null ? (<div>Loading</div>):(
        <div>
        <MDBRow className='mb-3'>
        <MDBCol sm='12' md='12' style={{display:'block', textAlign:'left'}}>
            <h1>{account.id}</h1>
            <div >
                <p>Institucion: {account.institution.type} {account.institution.name}</p>
                <p>agencia: {account.agency}</p>
                <p>Numero: {account.number}</p>
                <p>Moneda: {account.currency}</p>
                <p>Balance: ${account.balance.current} / ${account.balance.available}</p>
            </div>
        </MDBCol>
        </MDBRow>
        {transactions === null ? (<div>Loading</div>):(
        <div>
        {transactions.previous === null ? (<div></div>):(
            <MDBBtn onClick={()=>get_link_data(`${transactions.previous}`)}>previous</MDBBtn>
        )}
        {transactions.next === null ? (<div></div>):(
            <MDBBtn onClick={()=>get_link_data(`${transactions.next}`)}>next</MDBBtn>
        )}
            
        <MDBRow>
        <MDBCol sm='12' md='12'>
            <h2>Transacciones</h2>
                <MDBTable responsive>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Cantidad</th>
                    <th scope='col'>Balance</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {transactions.results.map((item, index) => (
                    <tr key={index}>
                        <td>{item.created_at}</td>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                        <td>{item.balance}</td>
                    </tr>
                ))}
                </MDBTableBody>
                </MDBTable>
        </MDBCol>
        </MDBRow>
        </div>
        )}
      </div>
    
     )}
     </MDBContainer>
    
  );
};


export default AccountList;
