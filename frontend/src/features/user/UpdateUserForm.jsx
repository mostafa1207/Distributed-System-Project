import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUserData } from "./useUserData";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserForm() {
  const { isLoading, user: { username, city, address, phone } = {} } =
    useUserData();
  const { isUpdating, updateUser } = useUpdateUser();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateUser({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Username">
        <Input
          type="string"
          id="user-name"
          defaultValue={username}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "username")}
        />
      </FormRow>

      <FormRow label="City">
        <Input
          type="string"
          id="user-city"
          defaultValue={city}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "city")}
        />
      </FormRow>

      <FormRow label="Address">
        <Input
          type="string"
          id="user-address"
          defaultValue={address}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "address")}
        />
      </FormRow>

      <FormRow label="Phone No.">
        <Input
          type="number"
          id="phone-number"
          defaultValue={phone}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "phone")}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Submit
        </Button>
        <Button disabled={isUpdating}>Edit User</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserForm;
