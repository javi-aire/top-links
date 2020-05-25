import React, { useState } from 'react';
import LoginCard from './LoginCard'
import {
	Button,
	Collapse,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	Nav, 
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
	
} from 'reactstrap';

const AppNavbar = (props) => {
	const [collapsed, setCollapsed] = useState(true);
	const [modal, setModal] = useState(false);
	
	const toggleNav = () => {
		setCollapsed(!collapsed);
	}

	const toggleModal = () => setModal(!modal);


	return (
		<div>
			<Navbar color="dark" dark expand="sm" className="mb-5">
				<Container fluid="md">
					<NavbarBrand href="/">Top Links</NavbarBrand>
					<NavbarToggler onClick={toggleNav} />
					<Collapse isOpen={!collapsed} navbar>
						<Nav className="ml-auto align-items-center" navbar>
							<NavItem className="mr-5">
								<NavLink>
									<Button color="primary" onClick={toggleModal}>Login</Button>
									<LoginCard isOpen={modal} toggle={toggleModal} />
								</NavLink>
							</NavItem>
							<NavItem>
								<InputGroup>
									<Input placeholder="Search by #hashtag..." />
									<InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
								</InputGroup>
							</NavItem>							
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default AppNavbar;