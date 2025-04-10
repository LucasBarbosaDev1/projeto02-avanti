import style from './UserFound.module.css';

interface Props {
  name: string | undefined;
  avatar_url: string | undefined;
  bio: string | undefined;
}

const UserFound = ({ name, avatar_url, bio}: Props) => {
  
  return (
    <div className={style.card}>
      <img src={avatar_url} alt={`imagem-perfil-${name}`} />

      <div className={style.infosProfile}>
        <h1>{name}</h1>

        <p>{bio}</p>
      </div>
    </div>
  );
};

export default UserFound