import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { nl } from "date-fns/locale"
import { Link } from "react-router-dom";

const CustomerCard = (props) => {
  return (
    <>
      <Link to={`/customer/${props.customer._id}`}>
        <div className="bg-slate-300 my-5 p-5 rounded-2xl shadow-md hover:bg-slate-500">
          <p className="font-bold">{props.customer.name} {props.customer.surname}</p>
          <p>{props.customer.email}</p>
          <p className="italic text-right">{formatDistanceToNow(props.customer.createdAt, {locale: nl})} geleden</p>
        </div>
      </Link>
    </>
  );
};

export default CustomerCard;
