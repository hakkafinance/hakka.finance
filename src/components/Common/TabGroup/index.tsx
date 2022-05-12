/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChainId } from '../../../constants';
import styles from './styles';
import images from '../../../images';
interface IProps {
  list: { icon: string; title: string, value: ChainId }[];
  active: ChainId;
  onChange: (value: ChainId) => void;
}

export const TabGroup = (props: IProps) => {
  const { list, active } = props;
  return (
    <div sx={styles}>
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => props.onChange(item.value)}
          className={`tab-item ${active === item.value ? 'active' : ''}`}
        >
          <img src={images[item.icon]} />
          <span className="tab-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
};
