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
    case "list": {
      const contacts = await listContacts();
      console.table(contacts);
      break;
    }

    case "get": {
      const getContacts = await getContactById(id);
      console.table(getContacts);
      break;
    }

    case "add": {
      const newContacts = await addContact(name, email, phone);
      console.table(newContacts);
      break;
    }

      case "remove": {
          const deleteContact = removeContact(id);
          console.table(deleteContact);

          break;
    }
     

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


