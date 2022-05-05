/** @jsx jsx */
import { jsx } from 'theme-ui';
import images from '../../../../images';
import styles from './styles';
interface IProps {
  value: number;
  prefixSymbol?: boolean;
  total?: number;
}

export default function VotingPowerSection(props: IProps) {
  const { value, prefixSymbol, total } = props;
  const hasTotal = total !== undefined;
  const displayValue = `${prefixSymbol ? '+ ' : ''}${props.value.toFixed(4)}`;

  const className = value > 0 ? 'positive' : '';
  console.log(total)
  return (
    <div sx={styles.wrapper}>
      <img sx={styles.img} src={images.iconSealedHakka} />
      <span className={className}>{displayValue}</span>
      {hasTotal && (
        <span sx={styles.total}>Total: {total?.toFixed(4)}</span>
      )}
    </div>
  );
}
