import { useState } from "react";
import AddonModal from "./Components/AddonModal";
import Table from "./Components/Table";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const addContact = () => {
    //dispatch action
    console.log("added");
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="App">
      <h1>Ayomi</h1>
      <button type="button" onClick={() => setIsModalOpen(true)}>Add contact</button>
      <AddonModal  isModalOpen ={isModalOpen} closeModal={closeModal} addContact={addContact}/>
      <Table />
    </div>
  );
}

export default App;


