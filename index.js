import  {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": 
    try {
      const contacts = await listContacts();
      console.table(contacts);
      
    } catch (error) {
      console.log(error.message);
    }
    break;


    case "get":
      try {
      const getContacts = await getContactById(id);
      console.table(getContacts);
      
    } catch (error) {
      console.log(error.message);
    }
    break;


    case "add":
      try {
      const newContacts = await addContact(name, email, phone);
      console.table(newContacts);
      
    } catch (error) {
      console.log(error.message);
    }
    break;


      case "remove": 
      try {
          const deleteContact = await removeContact(id);
          console.table(deleteContact);

          
    } catch (error) {
      console.log(error.message);
    }
    break;

     

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);

