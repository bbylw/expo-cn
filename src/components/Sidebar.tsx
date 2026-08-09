import { NavLink } from 'react-router-dom';
import { docSections } from '../data/docs';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {docSections.map((section) => (
          <div key={section.title} className="sidebar__section">
            <h3 className="sidebar__heading">{section.title}</h3>
            <ul className="sidebar__list">
              {section.items.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/docs/${item.slug}`}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                    }
                    onClick={onNavigate}
                  >
                    <ChevronRight size={14} className="sidebar__chevron" />
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
