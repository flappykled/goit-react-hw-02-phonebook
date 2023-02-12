import { Component } from "react";
import { ContactForm } from "./ContactsForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./FilterSearch";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  handleChange = evt => {
   this.setState({
    filter: evt.target.value
   })
  }; 

  onAddContact = contact => {
    const matchedContact = this.state.contacts.find(cnt => cnt.name.toLowerCase() === contact.name.toLowerCase());

    if (matchedContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.state.contacts.push(contact);

    this.setState({
      contacts: this.state.contacts
    });
  }

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  render() {
    const filteredContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    
    return (
      <div>
        <ContactForm onAddContact={this.onAddContact} />
        <Filter 
          filter={this.state.filter}
          onChange={this.handleChange}
        />
        <ContactList 
          contacts={filteredContacts} 
          onClickDelete={this.handleDelete}
        />
      </div>
    );
  }
};