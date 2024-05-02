import { HistoryItem } from "../Components/HistoryItem";
import UpdateUserForm from "./../features/user/UpdateUserForm"

export default function Profile(props) {


    return (
        <>
            <div className="main-container">{props.userType} Profile</div>
            <UpdateUserForm />
        </>
    );
}
