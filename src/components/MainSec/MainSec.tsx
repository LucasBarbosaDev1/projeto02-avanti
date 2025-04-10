import { ChangeEvent, useEffect, useState } from 'react';
import styles from './MainSec.module.css';
import logo from './../../assets/logo.svg';
import searchIcon from './../../assets/search-icon.svg';
import gifLoading from '../../assets/loading.gif';
import UserFound from '../UserFound/UserFound';
import UserNotFound from '../UserNotFound/UserNotFound';

interface Profile {
  name: string;
  avatar_url: string;
  bio: string;
}

function MainSec() {
  // usuário pesquisado
  const [ search, setSearch ] = useState<string>('');

  // retorno da chamada API
  const [ user, setUser ] = useState<Profile>();

  // status da chamada API
  const [ status, setStatus ] = useState<number>(0);

  const handleSubmit = ( ev: ChangeEvent<HTMLFormElement> ) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData) as { name: string };
    
    setSearch(data.name);

    setStatus(10);
  }

  useEffect(() => {
    // requisição API
    if (search !== '') { 
      fetch(`https://api.github.com/users/${search}`)
        .then(response => {
          
          if (response.ok) {

            setStatus(200);

            return response.json();

          } else {

            setStatus(400);

          }
        })
        .then((data) => setUser(data))
        .catch(() => console.error("Erro: Usuário Inexistente"));

    }
  }, [search]);

  // renderiza o resultado
  function renderResult() {

    if (status === 0) {

      return;

    } else if (status === 10) {
      
      return (
        <img src={gifLoading} alt="gif-loading" className={styles.gif} />
      );

    } else if (status === 200) {

      return (

        <UserFound
          name={user?.name}
          avatar_url={user?.avatar_url}
          bio={user?.bio}
        />

      );
    } else {

      return <UserNotFound />;

    }
  };
    
  return (
    <section className={styles.mainSec}>

      <div className={styles.divSearch}>
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
        />

        <form className={styles.formSearch} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Digite um usuário do Github'
            required
          />

          <button type="submit">
            <img src={searchIcon} alt="pesquisar" />
          </button> 

        </form>

      </div>

      <div className={styles.result}>
        {renderResult()}
      </div>

    </section>    
  );
};

export default MainSec