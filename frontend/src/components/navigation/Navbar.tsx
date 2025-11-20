import { Link, NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const roleDashboardMap = {
  student: '/student',
  instructor: '/instructor',
  admin: '/admin',
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const dashboardPath = user ? roleDashboardMap[user.role] : '/login';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-display font-semibold text-primary">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            ET
          </span>
          Ethio Tech Hub
        </Link>
        <nav className="hidden gap-8 md:flex">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `text-sm font-semibold ${
                  isActive ? 'text-primary' : 'text-stone-500 hover:text-stone-900'
                }`
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="secondary" className="hidden md:inline-flex">
                <Link to={dashboardPath}>Dashboard</Link>
              </Button>
              <button
                onClick={handleLogout}
                className="hidden rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-500 hover:text-primary md:inline-flex"
              >
                Logout
              </button>
              <Link
                to={dashboardPath}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary hover:bg-primary/5"
                title="Dashboard"
              >
                <FaRegUserCircle size={20} />
              </Link>
            </>
          ) : (
            <>
              <Button asChild variant="secondary" className="hidden md:inline-flex">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="hidden md:inline-flex">
                <Link to="/register">Join now</Link>
              </Button>
              <Link
                to="/login"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary hover:bg-primary/5"
                title="Login"
              >
                <FaRegUserCircle size={20} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

