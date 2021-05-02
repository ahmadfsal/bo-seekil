import Logo from '@assets/images/seekil-logo-white.png';

const Navbar = () => {
    return (
        <nav
            className='navbar is-black is-fixed-top'
            role='navigation'
            aria-label='main navigation'
        >
            <div className='navbar-brand'>
                <a className='navbar-item brand' href='/'>
                    <img src={Logo} alt='logo' />
                </a>
            </div>

            <div className='navbar-menu'>
                <div className='navbar-end'>
                    <div className='navbar-item'>Hello, Ittang!</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
