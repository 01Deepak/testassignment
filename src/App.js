import logo from './logo.svg';
import './App.css';
import UserList from './Components/UserList';
import Form from './Components/Form';
import Register from './Components/Register';

function App() {
  return (
    <>
      <Register/>
      <hr/>
      <UserList/>
    </>
  );
}

export default App;
