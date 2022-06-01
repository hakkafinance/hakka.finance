/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { memo, useState, useMemo, useEffect, useRef } from 'react';
import styles from './styles';
import { dateRangeCal, getExpectedDay } from '../../../../utils/dateRangeCal';
import { SEC_OF_FOUR_YEARS } from '../../../../constants';
import { useCallback } from 'react';
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

const yearsPeriod = [4, 3, 2, 1, 0];
const monthsPeriod = [9, 6, 3, 0];

const monthlyTimeStampTransfer = (month: number) => month * 30 * 24 * 60 * 60;
const yearlyTimeStampTransfer = (years: number) => years * 8766 * 60 * 60;

const periodsGroup = [
  [4, 0],
  [3, 9],
  [3, 6],
  [3, 3],
  [3, 0],
  [2, 9],
  [2, 6],
  [2, 3],
  [2, 0],
  [1, 9],
  [1, 6],
  [1, 3],
  [1, 0],
  [0, 9],
  [0, 6],
  [0, 3],
]
  .map(([years, months]) => ({
    years,
    months,
    timestamp:
      yearlyTimeStampTransfer(years) + monthlyTimeStampTransfer(months),
  }))
  .reduce((prev, { years, months, timestamp }) => {
    if (prev[timestamp]) prev[timestamp][years] = months;
    else prev[timestamp] = { [years]: months };
    return prev;
  }, {} as Record<string, { [x: number]: number }>);
const keysOfPeriod = Object.keys(periodsGroup);
// time unit is seconds
// maximum 4 years timestamp
const maximumDuration = SEC_OF_FOUR_YEARS;
// minimum 30 minutes timestamp
const minimumDuration = 30 * 60;

export default function LockPeriodOptions(props: IProps) {
  const { onChange, timeLeft = 0 } = props;
  const [lockYear, setLockYear] = useState(4);
  const [lockMonth, setLockMonth] = useState(0);

  const firstMount = useRef(true);
  const initSelect = useRef(true);

  const timeStamp = useMemo(() => {
    return (
      monthlyTimeStampTransfer(lockMonth) + yearlyTimeStampTransfer(lockYear)
    );
  }, [lockMonth, lockYear]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    // transfer to seconds
    onChange(timeStamp);
  }, [timeStamp]);

  const { yearOptions, monthOptions } = useMemo(() => {
    // block timestamp

    const availablePeriods = initSelect.current
      ? keysOfPeriod.filter(time => {
          return +time <= timeLeft && +time > minimumDuration;
      }) : keysOfPeriod;

    console.log(timeLeft, availablePeriods);

    const availableYears = availablePeriods.map(time => periodsGroup[time]);
    const availableMonths = availablePeriods.map(({ months }) => months);

    const yearOptions = yearsPeriod.map((year) => {
      return {
        value: year,
        label: year,
        active: lockYear === year,
        disabled: !availableYears.includes(year),
      };
    });

    const monthOptions = monthsPeriod.map((month) => {
      return {
        value: month,
        label: month,
        active: lockMonth === month,
        disabled: !availableMonths.includes(month),
      };
    });
    return { yearOptions, monthOptions };
  }, [lockYear, lockMonth, timeLeft]);

  const until = useMemo(() => {
    return getExpectedDay(new Date(), timeStamp * 1000);
  }, [timeStamp]);

  const onLockYearChange = useCallback((year: number) => {
    setLockYear(year);
    initSelect.current = false;
  }, []);

  return (
    <div>
      <p sx={styles.title}>
        Locked period until <strong>{until}</strong>
        {process.env.GATSBY_ENV === 'development' && (
          <button
            onClick={() => {
              onChange(30 * 60 + 70);
            }}
          >
            set 30mins
          </button>
        )}
      </p>
      <div sx={styles.optionContainer}>
        <div sx={styles.wrapper} className="option-block" data-label="Year(s)">
          {yearOptions.map((option) => (
            <LockPeriod
              key={option.value}
              onClick={onLockYearChange}
              disabled={option.disabled}
              active={option.active}
              value={option.value}
              label={option.label}
            />
          ))}
        </div>
        {!initSelect.current && (
          <Fragment>
            <div sx={styles.wrapper} data-label="" style={{ margin: '0 8px' }}>
              +
            </div>
            <div
              sx={styles.wrapper}
              className="option-block"
              data-label="Month(s)"
            >
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
          </Fragment>
        )}
      </div>
    </div>
  );
}
