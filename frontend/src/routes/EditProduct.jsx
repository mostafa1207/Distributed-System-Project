import { InputForm } from "../Components/InputForm";

export default function EditProduct(props) {


    return (
        <>
            Edit Product
            <InputForm label={"price"} input={"2000"} input_type={"number"}></InputForm>
            <InputForm label={"pri"} input={"2000"} input_type={"number"}></InputForm>
            <InputForm label={"pce"} input={"2000"} input_type={"number"}></InputForm>
        </>
    );
}
