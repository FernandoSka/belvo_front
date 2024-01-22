import { Component } from "react";
import {Route, Link} from 'react-router-dom'

import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBCol
} from 'mdb-react-ui-kit';

import no_image from './no_image_available.png';

class BankCard extends Component {

    render() {
        return(
            
                <MDBCol>
                <MDBCard className="h-100">
                    {this.props.item.icon_logo != null ? (
                        <MDBCardImage src={this.props.item.icon_logo} position='top' />
                    ) :
                    (
                        <MDBCardImage src={no_image} position='top' />
                    )
                    }
                    <MDBCardBody>
                        <MDBCardTitle>{this.props.item.display_name}</MDBCardTitle>
                        <small className='text-muted'>{this.props.item.country_code}</small>
                        
                    </MDBCardBody>
                    <MDBCardFooter>
                        <Link to={"/bank_detail/"+this.props.item.id}>
                            <MDBBtn href='#'>Detalles</MDBBtn>
                        </Link>
                    </MDBCardFooter>
                </MDBCard>
                </MDBCol>
        )
    }
}
export default BankCard;