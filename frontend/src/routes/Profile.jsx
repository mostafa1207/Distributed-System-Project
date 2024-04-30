import { HistoryItem } from "../Components/HistoryItem";

export default function Profile(props) {


    return (
        <>
            <div className="main-container">{props.userType} Profile</div>
            <div class="rounded-rectangle">
            <h4>Purchased history</h4>
            {/* <div class="solid-line"></div> */}
                <HistoryItem Date="24/2/2002" Address="ElNozha" Amount="2000"></HistoryItem>
                <HistoryItem Date="24/2/2002" Address="ElNozha" Amount="2000"></HistoryItem>
                <HistoryItem Date="24/2/2002" Address="ElNozha" Amount="2000"></HistoryItem>
                <HistoryItem Date="24/2/2002" Address="ElNozha" Amount="2000"></HistoryItem>
            </div>
        </>
    );
}
