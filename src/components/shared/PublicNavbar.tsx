import Button from "./Button";

interface PublicNavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

function PublicNavbar({ onLoginClick, onRegisterClick }: PublicNavbarProps) {
  return (
    <nav className="home-nav">
      <h1 className="home-logo">HomeFix</h1>

      <div className="home-nav-botones">
        <Button text="Iniciar sesión" onClick={onLoginClick} />
        <Button text="Registrarse" onClick={onRegisterClick} variant="primary" />
      </div>
    </nav>
  );
}

export default PublicNavbar;