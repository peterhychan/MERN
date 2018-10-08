import React, {Component} from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap'

class AppNavbar extends Component{
	state = {
		isOpen: false
	}

	toggle = () => {
		this.setState({isOpen: !this.state.isOpen})
	}

	render(){
		return(
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">
							<i className="fa fa-check-square-o" aria-hidden="true"> InstaCheck</i>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="https://github.com/peterhychan/">
										<i className="fa fa-github fa-lg" aria-hidden="true"> GitHub</i>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="https://twitter.com/peterhychan/">
										<i className="fa fa-twitter fa-lg" aria-hidden="true"> Twitter</i>
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		)
	}
}



export default AppNavbar