import Login from "./Login";
import UseLocalStorage from "./hooks/UseLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ChatsProvider } from "../context/ChatsProvider";
import { SocketProvider } from "../context/SocketProvider";


function App() {
  const [id, setId] = UseLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider >
        <ChatsProvider id={id}>
          <Dashboard id={id} />
        </ChatsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
    <div className=" bg-secondary h-[100vh] w-[100%] flex">
      {id ? dashboard : <Login onIdSubmit={setId} />}


    </div>
  );
}

export default App;
