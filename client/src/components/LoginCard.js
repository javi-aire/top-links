import React, {useState} from 'react';
import { 
	Button,
	Container,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

const LoginCard = ({ isOpen, toggle }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggle} className="d-flex justify-content-center">
			<ModalHeader isOpen={isOpen} toggle={toggle}>Login to Twitter to use Top Links</ModalHeader>
			<ModalBody>
				Top links displays a Twitter user's timeline, as well as a user-based list of the highest shared tweets and links in a given timeline (goes as far back as 1 week!)
				<br/> <br/> 
				Click 'Authenticate' to enable Twitter to grant access below.
			</ModalBody>
			<ModalFooter>
				<Button color="primary" href="http://localhost:3005/auth/twitter">Authenticate</Button>
				<Button color="secondary" onClick={toggle}>Cancel</Button>
			</ModalFooter>
		</Modal>
	);
}

export default LoginCard;