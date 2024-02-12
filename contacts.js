import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsJson);
  } catch (error) {}
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
}
   
export async function removeContact(contactId) {
    try {
        const strContactId = String(contactId);
        const contacts = await listContacts();
        const indexRemovedCont = contacts.findIndex((el) => el.id === strContactId);
    
        if (indexRemovedCont === -1)
          return `null`;
    
        const [removedContact] = contacts.splice(indexRemovedCont, 1);
    
        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
        return removedContact;
      } catch (error) {
        console.log(error);
      }
    }

export async function addContact(name, email, phone) {
  try {
    if (!name) return `Name is required`;
    if (!email) return `Email is required`;
    if (!phone) return `Phone is required`;

    const contacts = await listContacts();
    const newContact = { id: `${Date.now()}`, name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return newContact;
  } catch (error) {
    console.log(error);
  }
}
