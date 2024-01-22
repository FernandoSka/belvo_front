import { Component } from "react";
import {
    MDBCardGroup,
    MDBRow,
} from 'mdb-react-ui-kit';
import BankCard from "./BankCard";
import BankDetail from "../BankDetail/BankDetail";



class BankList extends Component {

    state = {
        banks: null,
    }

    credentials = btoa(this.props.BELVO_ID+":"+this.props.BELVO_PASS);
    componentDidMount() {
          this.get_bank_data();
          
          
      }
    
    get_bank_data(){
        const response = fetch (this.props.BELVO_URL+"/api/institutions/",{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic '+ this.credentials
            }
          }).then((response) =>{
                if (response.ok) {

                    return response.json();
                }
                return Promise.reject(response);
            }).then(result => {
                this.setState({banks: result.results})
            })
    }


      

    render() {
        return (
            <div className="dashboard">
                <div className='p-5 text-center bg-light'>
                <h3 className='mb-3'>hola de nuevo {this.props.user_name}</h3>
                <h1 className='mb-3'>Lista de instituciones</h1>
                {this.state.banks === null ? (<h4 className='mb-3'>Cargando</h4>):(<div></div>)}
                </div>

                <MDBCardGroup>
                
                    <MDBRow className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
                        {this.state.banks === null ? (
                            <div></div>
                        ):(
                            this.state.banks.map((item, index) => (
                                <BankCard key={index} item={item} />
                            ))
                        )}
                    </MDBRow>
                </MDBCardGroup>
            </div>
        );
    }
  }
export default BankList; 