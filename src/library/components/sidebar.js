import SidebarList from './sidebar-list';
import { sidebarMenus } from '@constants/sidebar.constant';

const Sidebar = () => {
    return (
        <aside className='sidebar menu'>
            <p className='menu-label'>General</p>
            <ul className='menu-list' style={{ overflowY: 'auto' }}>
                {sidebarMenus.map((menu, index) => (
                    <SidebarList {...menu} key={index} />
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
