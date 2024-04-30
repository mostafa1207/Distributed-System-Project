import "./HistoryItem.css"
export const HistoryItem = ({
    Date,Address,Amount
}
) =>{
    return (
        <>
           {/* <div class="rounded-rectangle"> */}
            {/* <h4>Purchased history</h4> */}
            {/* <div class="solid-line"></div> */}
            <div class="solid-line"></div>
            <div class="Item_Info">
            <paragraph>Date: {Date}</paragraph>
            <paragraph>Address: {Address}</paragraph>
            <paragraph>Total Amount: {Amount}</paragraph>
            </div>
            <h5></h5>
        {/* </div> */}
        </>
    );
}
//