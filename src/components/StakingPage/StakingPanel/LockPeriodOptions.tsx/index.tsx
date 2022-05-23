/** @jsx jsx */
import { jsx } from 'theme-ui';
import { memo, useState, useMemo, useEffect, useRef } from 'react';
import styles from './styles';
import { dateRangeCal, getExpectedDay } from '../../../../utils/dateRangeCal';
interface IProps {
  onChange(sec: number): void;
  timeLeft?: number;
}

interface ILockPeriodProps {
  onClick(value: number): void;
  disabled?: boolean;
  active: boolean;
  value: number;
  label: React.ReactNode;
}

const LockPeriod = memo((props: ILockPeriodProps) => {
  const { onClick, disabled, active, value, label } = props;
  const classNames = `${disabled ? 'disabled' : ''} ${
    active ? 'active' : ''
  } period-option`;
  return (
    <div className={classNames} onClick={() => !disabled && onClick(value)}>
      {label}
    </div>
  );
});

const mockingYearsPeriod = [4, 3, 2, 1, 0];
const mockingMonthsPeriod = [9, 3, 1, 0];

// time unit is seconds
// maximum 4 years timestamp
const maximumDuration = 4 * 12 * 30 * 24 * 60 * 60;
// minimum 30 minutes timestamp
const minimumDuration = 30 * 60;

const monthlyTimeStampTransfer = (month: number) => month * 30 * 24 * 60 * 60;
export default function LockPeriodOptions(props: IProps) {
  const { onChange, timeLeft = 0 } = props;
  const [lockYear, setLockYear] = useState(4);
  const [lockMonth, setLockMonth] = useState(0);

  const firstMount = useRef(true);

  const timeStamp = useMemo(() => {
    return (
      monthlyTimeStampTransfer(lockMonth) +
      monthlyTimeStampTransfer(lockYear * 12)
    );
  }, [lockMonth, lockYear]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    };
    // transfer to seconds
    onChange(timeStamp);
  }, [timeStamp]);

  const { yearOptions, monthOptions } = useMemo(() => {
    // block timestamp
    const monthTimestamp = monthlyTimeStampTransfer(lockMonth);
    const yearTimestamp = monthlyTimeStampTransfer(lockYear * 12);
    const yearOptions = mockingYearsPeriod.map((year) => {
      const duration = monthTimestamp + monthlyTimeStampTransfer(year * 12);
      return {
        value: year,
        label: year,
        active: lockYear === year,
        disabled:
          !dateRangeCal(duration, maximumDuration, minimumDuration) ||
          duration < timeLeft,
      };
    });

    const monthOptions = mockingMonthsPeriod.map((month) => {
      const duration = yearTimestamp + monthlyTimeStampTransfer(month);
      return {
        value: month,
        label: month,
        active: lockMonth === month,
        disabled:
          !dateRangeCal(duration, maximumDuration, minimumDuration) ||
          duration < timeLeft,
      };
    });
    return { yearOptions, monthOptions };
  }, [lockYear, lockMonth, timeLeft]);

  const until = useMemo(() => {
    return getExpectedDay(new Date(), (timeLeft + timeStamp) * 1000);
  }, [timeLeft, timeStamp]);

  return (
    <div>
      <p sx={styles.title}>
        Locked period until <strong>{until}</strong>
        {process.env.NODE_ENV === 'development' && <button onClick={() => {
          onChange(30 * 60 + 70);
        }}>set 30mins</button>}
      </p>
      <div sx={styles.optionContainer}>
        <div sx={styles.wrapper} className="option-block" data-label="Year(s)">
          {yearOptions.map((option) => (
            <LockPeriod
              key={option.value}
              onClick={setLockYear}
              disabled={option.disabled}
              active={option.active}
              value={option.value}
              label={option.label}
            />
          ))}
        </div>
        <div sx={styles.wrapper} data-label="" style={{ margin: '0 8px' }}>
          +
        </div>
        <div sx={styles.wrapper} className="option-block" data-label="Month(s)">
          {monthOptions.map((option) => (
            <LockPeriod
              key={option.value}
              onClick={setLockMonth}
              disabled={option.disabled}
              active={option.active}
              value={option.value}
              label={option.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
