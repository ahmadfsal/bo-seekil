import SidebarLink from './sidebar-link';

const SidebarList = ({ ...menu }) => {
    return (
        <li>
            <SidebarLink label={menu.title} path={menu.path} />
            {menu.child.length > 0 &&
                menu.child.map((item, index) => {
                    return (
                        <ul key={index}>
                            <li>
                                <SidebarLink
                                    label={item.title}
                                    path={item.path}
                                />
                            </li>
                        </ul>
                    );
                })}
        </li>
    );
};

export default SidebarList;
