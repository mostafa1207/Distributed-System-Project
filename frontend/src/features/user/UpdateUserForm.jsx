import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUserData } from "./useUserData";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

function UpdateUserForm() {
  const { register, handleSubmit } = useForm();
  const { isLoading, user: { username, city, address, phone } = {} } =
    useUserData();
  const { isUpdating, updateUser } = useUpdateUser();

  if (isLoading) return <Spinner />;

  // function handleUpdate(e, field) {
  //   const { value } = e.target;

  //   if (!value) return;
  //   updateUser({ [field]: value });
  // }

  function onSubmit(data) {
    if (data.phone.length != 11) {
      toast.error("please input a valid phone number");
      return;
    }
    updateUser(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Username">
        <Input
          type="string"
          id="username"
          defaultValue={username}
          disabled={isUpdating}
          {...register("username")}
          // onBlur={(e) => handleUpdate(e, "username")}
        />
      </FormRow>

      <FormRow label="City">
        <Input
          type="string"
          id="city"
          defaultValue={city}
          disabled={isUpdating}
          {...register("city")}
          // onBlur={(e) => handleUpdate(e, "city")}
        />
      </FormRow>

      <FormRow label="Address">
        <Input
          type="string"
          id="address"
          defaultValue={address}
          disabled={isUpdating}
          {...register("address")}
          // onBlur={(e) => handleUpdate(e, "address")}
        />
      </FormRow>

      <FormRow label="Phone No.">
        <Input
          type="number"
          id="phone"
          defaultValue={phone}
          disabled={isUpdating}
          {...register("phone")}
          // onBlur={(e) => handleUpdate(e, "phone")}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Edit User</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserForm;
