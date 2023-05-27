const Navbar = () => {
  return (
    <nav className='flex justify-between m-6 '>
      <img
        src='../../public/logo-white.png'
        alt='Company Logo'
        className='h-8  p-1'
      />
      <ul className='flex space-x-5 items-center font-medium'>
        <li>For Creators</li>
        <li>For Developers</li>
        <li>Products</li>
        <li>Resources</li>
        <li>How it Works</li>
      </ul>
      <ul className='flex space-x-4 items-center font-medium'>
        <li>Download App</li>
        <li>
          <button className='bg-primary hover:opacity-80 font-semibold text-white px-4 py-2 rounded-lg hover:bg-primary-dark'>
            Sign In
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
