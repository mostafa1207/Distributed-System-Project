import "./FormInput.css"

export const FormInput = ({
    label,placeholder,type,multiline,name,defaultValue
}
) =>{
    return (
        <>
            {multiline ?
                <div className="form-input-container multiline">
                    <label htmlFor={label} className="form-input-label">{label}</label>
                    {type == "paragraph" ?
                        <textarea className="form-input-input" rows="3" placeholder={placeholder} name={name} defaultValue={defaultValue} required></textarea>
                    :
                        <input type={type} id={label} name={name} defaultValue={defaultValue} className="form-input-input" placeholder={placeholder} required/>
                    }
                </div>
            :
            <div className="form-input-container">
                <label htmlFor={label} className="form-input-label">{label}</label>
                {type == "image" ? 
                    <button className="form-input-input">Upload</button>
                :
                    <input type={type} id={label} name={name} defaultValue={defaultValue} className="form-input-input" placeholder={placeholder} required/>
                }
            </div>
            }           
        </>
    );
}