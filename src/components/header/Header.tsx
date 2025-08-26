import { Link } from "react-router-dom"

function Header() {

  return (
    <nav className="navbar navbar-expand-lg bg-[#eff0f3] flex w-full p-6">
      <div className="container mx-auto flex items-center">
        <img src="/logo.svg" alt="Crypto Tracker Logo" width={40} />
          <Link className="navbar-brand [font-variant:petite-caps]" to="/">Crypto Tracker</Link>
      </div>
    </nav>
  )
}

export default Header