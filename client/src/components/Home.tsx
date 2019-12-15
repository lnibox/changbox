import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import './Home.css';
import {Ping} from '..//utils/http.util';

const Home: React.FC = () => {
  const [greeting, setGreeting] = useState('');

  function getServerData() {
    try {
        Ping().then(response => {
            if (response.data && response.data.greeting) {
                setGreeting(response.data.greeting);
            } else {
                setGreeting('Invalid response');
            }
        });
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServerData();
  }, [greeting]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {greeting}
        </a>
      </header>
    </div>
  );
}

export default Home;
