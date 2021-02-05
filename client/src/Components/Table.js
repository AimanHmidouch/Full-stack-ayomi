import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { listContacts } from '../Actions/contactActions';
import AddonModal from './AddonModal';

export default function Table() {

  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contactList);
  const {loading, error, contacts} = contactList

  useEffect(()=>{
    dispatch(listContacts());
  }, [dispatch]) 

  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteContact = () => {
    setIsModalOpen(true)
  }
  const confirmdelete = () => {
    setIsModalOpen(false)
    console.log("deleted");
  }

  const abortDelete = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Modal isOpen={isModalOpen}  ariaHideApp={false}>
        <h4>Do you want to proceed ?</h4>
        <button type="button" onClick={confirmdelete}>Yes</button>  
        <button type="button" onClick={abortDelete}>No</button>  
      </Modal>
      <table border = "1" cellPadding = "2">
      <tbody>
        <tr>
          <td>N</td>
          <td>First name</td>
          <td>Last name </td>
          <td>Email </td>
          <td>Phone Number </td>
        </tr>
        {
          contacts && 
          contacts.map((contact) =>{
            return (
              <tr key = {contact.id}>
                <td> {contact.id}</td>
                <td> {contact.first_name}</td>
                <td> {contact.last_name}</td>
                <td> {contact.email}</td>
                <td> {contact.phone_number}</td>
                <td> <button type="button" onClick={deleteContact}>Delete</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  )
}
