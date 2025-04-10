import style from './UserNotFound.module.css';

const UserNotFound = () => {
  return (
    <div className={style.alert_card}>
      <p>Nenhum perfil foi encontrado com esse nome de usuário.<br/>
      Tente novamente</p>
    </div>
  );
};

export default UserNotFound;