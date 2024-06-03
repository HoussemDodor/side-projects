import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { nl } from "date-fns/locale"

const CustomerCard = (props) => {
  return (
    <>
      <div className="bg-slate-300 m-5 p-5 rounded-2xl shadow-md hover:bg-slate-500">
        <p className="font-bold">{props.customer.name} {props.customer.surname}</p>
        <p>{props.customer.email}</p>
        <br/>
        <p className="italic">{formatDistanceToNow(props.customer.createdAt, {locale: nl})} geleden</p>
      </div>
    </>
  );
};

export default CustomerCard;
