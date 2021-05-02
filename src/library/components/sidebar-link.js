import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

const SidebarLink = ({ className, label, path }) => {
    const { pathname } = useLocation();
    const isMatch = pathname === path;
    const linkClasses = classnames(
        'sidebar-link',
        isMatch ? 'is-active' : '',
        className
    );

    return (
        <Link to={path} className={linkClasses}>
            {label}
        </Link>
    );
};

export default memo(SidebarLink);
