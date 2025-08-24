import { Link } from "react-router-dom"

function Header() {

  return (
    <nav className="navbar navbar-expand-lg bg-[#dedede] flex w-full p-6">
      <div className="container mx-auto">
          <Link className="navbar-brand" to="/">Crypto App</Link>
      </div>
    </nav>
  )
}

export default Header