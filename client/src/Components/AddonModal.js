import React, { useState } from 'react'
import Modal from 'react-modal'

export default function AddonModal(props) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const { isModalOpen, closeModal, addContact } = props
    
    const submitHandler = (e) => {
        e.preventDefault();
        //
    }

    return (
        <Modal isOpen={isModalOpen}  ariaHideApp={false}>
        <div>
            <form className="form" onSubmit={addContact}>
                <div>
                    <h1>Create Contact</h1>
                </div>
                <div>
                    <label htmlFor="name">First name</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Enter first name"
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label htmlFor="name">Last name</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Enter last name"
                        required
                        onChange={(e) => setLastname(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label htmlFor="number">Phone number</label>
                    <input 
                        type="tel" 
                        id="phonenumber"
                        placeholder="enter phone number"
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Add contact
                    </button>
                    <button className="primary" type="button" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </form>
        </div>
        </Modal>
    )
}
