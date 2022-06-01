/** @jsx jsx */
import { jsx } from 'theme-ui';
import { memo, useState, useMemo, useEffect, useRef } from 'react';
import styles from './styles';
import { getExpectedDay } from '../../../../utils/dateRangeCal';
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
  [4, [0]],
  [3, [0, 3, 6, 9]],
  [2, [0, 3, 6, 9]],
  [1, [0, 3, 6, 9]],
  [0, [3, 6, 9]],
] as [number, number[]][];

const timestampGroups = periodsGroup
  .map(([years, months]) =>
    months.map((month) => ({
      years,
      months: month,
      timestamp:
        yearlyTimeStampTransfer(years) + monthlyTimeStampTransfer(month),
    }))
  )
  .flat()
  .reduce((prev, { years, months, timestamp }) => {
    prev[timestamp] = { years, months };
    return prev;
  }, {} as Record<string, { [x in 'years' | 'months']: number }>);
const keysOfPeriod = Object.keys(timestampGroups);
// time unit is seconds
// minimum 30 minutes timestamp
const minimumDuration = 30 * 60;

export default function LockPeriodOptions(props: IProps) {
  const { onChange, timeLeft = minimumDuration } = props;
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

  const availableTree = useMemo(() => {
    const _timeLeft = Math.max(timeLeft, minimumDuration);

    const availablePeriods = keysOfPeriod.filter((time) => {
      return +time >= _timeLeft;
    });

    const availableTree = availablePeriods.reduce((prev, timeStamp) => {
      const _tmp = prev.get(timestampGroups[timeStamp].years);
      if (_tmp) {
        _tmp.add(timestampGroups[timeStamp].months);
      } else {
        prev.set(
          timestampGroups[timeStamp].years,
          new Set([timestampGroups[timeStamp].months])
        );
      }
      return prev;
    }, new Map<number, Set<number>>());

    return availableTree;
  }, [timeLeft]);

  useEffect(() => {
    if (!availableTree.has(lockYear)) {
      onLockYearChange(availableTree.keys().next().value);
    }
  }, [timeLeft]);

  const { yearOptions, monthOptions } = useMemo(() => {
    const yearOptions = yearsPeriod.map((year) => {
      return {
        value: year,
        label: year,
        active: lockYear === year,
        disabled: !availableTree.has(year),
      };
    });

    const monthOptions = monthsPeriod.map((month) => {
      return {
        value: month,
        label: month,
        active: lockMonth === month,
        disabled: !availableTree.get(lockYear).has(month),
      };
    });
    return { yearOptions, monthOptions };
  }, [lockYear, lockMonth, availableTree]);

  const until = useMemo(() => {
    return getExpectedDay(new Date(), timeStamp * 1000);
  }, [timeStamp]);

  const lockMonthRef = useRef(lockMonth);
  lockMonthRef.current = lockMonth;

  const onLockYearChange = useCallback((year: number) => {
    setLockYear(year);
    initSelect.current = false;

    if (!availableTree.get(year).has(lockMonthRef.current)) {
      setLockMonth(
        availableTree
          .get(year)
          .values()
          .next().value
      );
    }
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
