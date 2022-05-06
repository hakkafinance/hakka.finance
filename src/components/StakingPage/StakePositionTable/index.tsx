/** @jsx jsx */
import { jsx, Switch } from "theme-ui";
import Table from "rc-table";
import { CurrencyAmount } from "@uniswap/sdk";
import { BigNumber } from "ethers";
import images from "../../../images";
images.iconVault;
const { Column, ColumnGroup } = Table;
interface StakePositionItem {
  index: number;
  sHakkaBalance: CurrencyAmount;
  stakedHakka: BigNumber;
  sHakkaReceived: BigNumber;
  until: BigNumber;
}
interface IProps {
  data: StakePositionItem[];
  onRedeem: (index: number) => void;
  onRestake: (index: number) => void;
}

function ExpiryDate(_: unknown, record: StakePositionItem) {
  const isExpired = record.until.mul(1000).lt(Date.now());

  const text = isExpired
    ? "Expired"
    : `Left ${record.until
        .sub(Date.now() / 1000)
        .div(24 * 60 * 60)
        .toNumber()
        .toString()} days`;
  const date = new Date(record.until.mul(1000).toNumber()).toLocaleString(
    "en-us",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  return (
    <div>
      <strong>{text}</strong>
      <span>{date}</span>
    </div>
  );
}

export default function StakePositionTable(props: IProps) {
  const { data, onRedeem, onRestake } = props;

  return (
    <div>
      <div className="header">
        <h2>Stake Position</h2>
        <Switch label="Show archive"></Switch>
      </div>
      <div>
        <Table>
          <Column<StakePositionItem>
            title=""
            dataIndex="icon"
            render={(_, record) => {
              if (record.sHakkaReceived.eq(0) && record.stakedHakka.eq(0)) {
                return <img src={images.iconVault} alt="vault" />;
              }
              if (record.until.mul(1000).toNumber() < Date.now()) {
                return <img alt="staking" src={images.iconStaking} />;
              }
              return <img alt="" src={images.iconRedeem} />;
            }}
          ></Column>

          <Column<StakePositionItem> title="Expiry date" dataIndex="index" />
        </Table>
      </div>
    </div>
  );
}
