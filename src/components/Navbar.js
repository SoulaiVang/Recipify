import "./Navbar.css";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" class="title-href">
            <img class="logo" src='../assets/logo.png' alt="Recipify Logo"></img>
            <span className="title-span">Recipify: Turning Your Pantry into Recipes</span>
        </a>

        <ul className="nav-links">
          <li><a href="/">Home</a><img src='../assets/home.png' alt="Icon for home"></img></li>
          <li><a href="/lookup">Recipe Lookup</a><img src='../assets/recipe-book.png' alt='Icon of a recipe book'></img></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
