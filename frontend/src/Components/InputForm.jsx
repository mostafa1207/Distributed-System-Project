import "./InputForm.css"
export const InputForm = ({
    label,input,input_type
}
) =>{
    return (
        <>
           
           <div class="container">
            <label for={label} class="lab">{label}</label>
            <input type={input_type} id={label} name="comp_name"  className="inp" placeholder={input} />
            
        </div>
        </>
    );
}