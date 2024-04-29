import "./FloatingCard.css"

export default function FloatingCard(props) {

    return (
        <>
            <div className="floating-card">
                <h2 className="floating-card-title">{props.title}</h2>
                <div className="items-container">
                    {props.items}
                    {props.total}
                </div>
            </div>
        </>
    );
}