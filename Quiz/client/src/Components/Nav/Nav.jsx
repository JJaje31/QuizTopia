import {useLocation,useParams} from 'react-router' 
const Nav = ({navParams,loggedin,setLoggedIn}) => {
const location = useLocation()

  const signOut = () => {
    setLoggedIn(false)
    document.location.href = '/signin'
    
  }

  const getLinkClass = (path) => 
 location.pathname === path
    ? 'text-gray-200 font-semibold'
    : 'text-gray-400 hover:text-gray-100';
  
  
    return(
        <div className="navbar z-30 bg-base-100 border-2 rounded-l border-gray-400">
  <div className="navbar-start">
   <img className="h-10" src="/images/Quiz.jpeg"/>
    <a className="btn btn-ghost h-10 text-xl">Quiz Topia</a>
  </div>
  <div className="navbar-center hidden md:flex">
    <ul className="menu menu-horizontal space-x-10 flex items-center">
      {loggedin ? (
       <>
        <a className={getLinkClass(`/topics/${navParams}`)} href={`/topics/${navParams}`}>User Interface</a>
        <button className='btn btn-ghost' onClick={signOut}>Sign Out</button>
        </>
       ) : (
        <>
        <a className={getLinkClass('/')} href='/'>Home</a>
        <a className={getLinkClass('/signin')} href='/signin'>Sign In</a>
        <a className={getLinkClass('/signup')} href='/signup'>Sign Up</a>
        </>
       )}

    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm  text-center dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-[35vw] p-2 shadow right-0">
        {loggedin ? (
          <>
        <a className={getLinkClass(`/topics/${navParams}`)}  href={`/topics/${navParams}`}>User Interface</a>
        <button className='btn btn-ghost' onClick={signOut}>Sign Out</button>
        </>) : (
          <>
        <a className={getLinkClass('/')} href='/'>Home</a>
        <a className={getLinkClass('/signin')} href='/signin'>Sign In</a>
        <a className={getLinkClass('/signup')} href='/signup'>Sign Up</a>
        </>
        )}
      </ul>
    </div>
  </div>
</div>
    )
}

export default Nav;