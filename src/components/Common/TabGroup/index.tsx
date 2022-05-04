/** @jsx jsx */
import { jsx } from 'theme-ui';
import { TabsGroup } from './styles';

interface IProps {
  list: { icon: string; title: string }[];
  active: string;
  onChange: (tab: string) => void;
}

export const TabGroup = (props: IProps) => {
  const { list, active } = props;
  return (
    <div sx={TabsGroup}>
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => props.onChange(item.title)}
          className={`tab-item ${active === item.title ? 'active' : ''}`}
        >
          <img src={item.icon} />
          <span className="tab-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
};
