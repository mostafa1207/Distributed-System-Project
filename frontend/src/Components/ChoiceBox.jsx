import "./ChoiceBox.css"
export const ChoiceBox = () =>{
    return (
        <>
        <dev className="choiceboxcontainer">
            <h5 className="sort-header">Sort by :</h5>
            <select className="choiceBox" >
                <option value="price">price</option>
                <option value="Name">Name</option>
            </select>
        </dev>
        </>
    );
}
