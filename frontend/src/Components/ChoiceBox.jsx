import "./ChoiceBox.css"
export const ChoiceBox = (props) =>{
    return (
        <>
        <div className="choiceboxcontainer">
            <h5 className="sort-header">Sort by :</h5>
            <select className="choiceBox" onChange={(event) => {props.handleSort(event.target.value)}}>
                <option value="" selected hidden>none</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="seller">Seller</option>
            </select>
        </div>
        </>
    );
}
