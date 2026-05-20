import Button from "./Button";

interface PublicNavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

function PublicNavbar({ onLoginClick, onRegisterClick }: PublicNavbarProps) {
  return (
    <header className="public-navbar">
      <div className="public-navbar-brand">
        <span className="public-navbar-logo">⚡</span>
        <h1>HomeFix</h1>
      </div>

      <nav className="public-navbar-links">
        <a href="#servicios">Servicios</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#beneficios">Beneficios</a>
      </nav>

      <div className="public-navbar-actions">
        <Button text="Inicia sesión" onClick={onLoginClick} />
        <Button text="Regístrate" onClick={onRegisterClick} variant="primary" />
      </div>
    </header>
  );
}

export default PublicNavbar;