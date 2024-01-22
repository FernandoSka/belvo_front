import { Component } from "react";
import { MDBContainer } from 'mdb-react-ui-kit';

import BankList from "./BankList/BankList";

class Home extends Component {
    render() {
      return (
        <MDBContainer fluid>
            <BankList user_name={this.props.user_name} BELVO_URL={this.props.BELVO_URL} BELVO_ID={this.props.BELVO_ID} BELVO_PASS={this.props.BELVO_PASS}/>

        </MDBContainer>
      );
    }
  }
export default Home; 