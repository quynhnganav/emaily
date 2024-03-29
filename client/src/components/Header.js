import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
         switch (this.props.auth) {
             case null:
                return;
             case false:
                return <li><a href="/auth/google">Loggin With Google</a></li>;
             default:
                 return [
                  <li key="1"><Payments /></li>,
                  <li key ="3" style={{margin: '0 10px'}}>
                    credits: {this.props.auth.credits}

                  </li>,
                  <li key="2"><a href="/api/logout">Logged Out</a></li>
                 ];
        
                }

    }
    render() {
       
        return (
            <nav>
    <div class="nav-wrapper">
      <Link to={this.props.user ? '/surveys' : '/'} 
      className="left brand-logo">
      Emaily
      </Link>
      <ul id="nav-mobile" class="right">
        {this.renderContent()}
        
      </ul>
    </div>
  </nav>
        );
    }
}


function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps) (Header);