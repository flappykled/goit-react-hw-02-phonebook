import { Component } from "react";
import { nanoid } from "nanoid";
import propTypes from "prop-types";

import styles from './ContactForm.module.css';

export class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    onChangeName = evt => {
        this.setState({ name: evt.target.value });
    };

    onChangeNumber = evt => {
        this.setState({ number: evt.target.value });
    };

    onSubmit = evt => {
        evt.preventDefault();
        const id = nanoid();
        const contact = { id, name: this.state.name, number: this.state.number }

        this.props.onAddContact(contact);

        this.setState({
            name: '',
            number: ''
        });
    };
    
    render() {
        return (
            <form className={styles.contactsForm} onSubmit={this.onSubmit}>
                <h2 className={styles.title}>Phonebook</h2>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                        onChange={this.onChangeName}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={this.state.name}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Number</label>
                    <input
                        onChange={this.onChangeNumber}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={this.state.number}
                    />
                </div>
                <button className={styles.submitButton} type='submit'>Add contact</button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onAddContact: propTypes.func.isRequired
};