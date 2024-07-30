export default function Navbar() {

  return (
    <>
      <header className="p-1 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a className="navbar-brand ms-4" href="#">
              {/* <img src="./IMG/logo.png" alt="Logo" width="250" height="70" className="d-inline-block align-text-top"> */}

            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 text-secondary">Página Inicial</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Preços</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Especializações</a></li>
              <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Sobre</a></li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..."
                aria-label="Search" />
            </form>

            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">Entrar</button>
              <button type="button" className="btn btn-warning">Cadastre-se</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}