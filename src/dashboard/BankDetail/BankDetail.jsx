import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import no_image from '../BankList/no_image_available.png';

const BankDetail = (props) => {
  const [bank, setBank] = useState(null);
  const credentials = btoa(`${props.BELVO_ID}:${props.BELVO_PASS}`);
  const url_params = useParams();
  var bank_data = {};

  useEffect(() => {
    
    
      const get_link_data= async() => {
        const response = await fetch (props.BELVO_URL+"/api/links/",{
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
                bank_data["links"] = result.results.filter(link => link.institution === bank_data.name)
                setBank(bank_data)
            })
    } 
    const get_bank_data =async (id)=>{
        const response = await fetch(props.BELVO_URL+"/api/institutions/"+id,{
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
    
                bank_data=result;
                bank_data["accounts"] = [];
                get_link_data();
                
            })
    }
    if (bank===null) {
        get_bank_data(url_params.id);
    }
    
  });
  /* const get_account_data=(uuid) => {
    const response = fetch (props.BELVO_URL+"/api/accounts/?"+uuid,{
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
            bank_data["accounts"].push(...result.results)
        })
        
} 

  const get_link_data=() => {
    const response = fetch (props.BELVO_URL+"/api/links/",{
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
            bank_data["links"] = result.results.filter(link => link.institution === bank_data.name)
            bank_data["accounts"] = [];
            bank_data["links"].forEach(element => {
                get_account_data(element.id);
                
            });
            console.log(bank_data)
            setBank(bank_data)
        })
} 
const get_bank_data =(id)=>{
    const response = fetch(props.BELVO_URL+"/api/institutions/"+id,{
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

            bank_data=result;
            get_link_data();
            
        })
}
if (bank===null) {
    get_bank_data(url_params.id);
} */
  return (
     bank === null ? (<div>Loading</div>):(
    <MDBContainer>
      <MDBRow className='mb-3'>
        <MDBCol md='4'>
        {bank.icon_logo != null ? (
            <img src={bank.icon_logo} className='img-fluid shadow-4' alt='...' />
        ) :
        (
            <img src={no_image} className='img-fluid shadow-4' alt='...' />
        )
        }

        </MDBCol>
        <MDBCol md='8' style={{display:'block', textAlign:'left'}}>
            <h1>{bank.display_name}</h1>
            <div >
                <p>Tipo: {bank.type}</p>
                <p>Codigo de ciudad: {bank.country_code}</p>
                <p>Sitio web: {bank.website != null ? bank.website : "No"}</p>
            </div>
        </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol md='12'>
            <h2>Links de cuentas</h2>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Link</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {bank.links.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={"/account_list/"+item.id+"/"}>
                                <MDBBtn href='#'>{item.id }</MDBBtn>
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
    
  );
};

export default BankDetail;
