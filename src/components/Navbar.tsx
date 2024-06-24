
const Navbar = () => {

  const ScrollToSelection = (elementId: any) => {
    document.getElementById(`${elementId.Item}`)?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  const Navitems = ["About", "Educational Qualifications", "Skills", "Projects", "Contact Me"]

  return (
    <div className='navbar'>
      <nav>
        {
          Navitems.map((Item) =>
            <span className="navbar_item" onClick={() => ScrollToSelection({ Item })}>
               {Item}
            </span>
          )
        }
      </nav>
    </div>

  )
}



export default Navbar