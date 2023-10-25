import { useState } from "react";
import PropTypes from "prop-types";
import * as Styled from "./Input.style";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const InputComponent = ({
  label,
  type,
  id,
  placeholder,
  options,
  register,
  error,
  blurFunc,
  value,
  readOnly,
  list
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Styled.InputGroup>
      <Styled.Label $color={error && "danger"} htmlFor={id}>
        {label}
      </Styled.Label>

      {type !== "textarea" && type !== "select" && (
        <Styled.InputContainer>
          {readOnly === true ? (
            <Styled.Input
              $color={error && "danger"}
              type={showPassword ? "text" : type}
              id={id}
              placeholder={placeholder}
              {...register}
              onBlur={blurFunc}
              list={list}
              value={value}
              readOnly
            />
          ) : (
            <Styled.Input
              $color={error && "danger"}
              type={showPassword ? "text" : type}
              id={id}
              placeholder={placeholder}
              {...register}
              onBlur={blurFunc}
              list={list}
              value={value}
            />
          )}
          {type === "password" && (
            <Styled.Icon
              $color={error && "danger"}
              type="button"
              onClick={handleShowPassword}
            >
              {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </Styled.Icon>
          )}
        </Styled.InputContainer>
      )}

      {type === "textarea" && (
        <Styled.TextArea
          $color={error && "danger"}
          id={id}
          placeholder={placeholder}
          {...register}
        />
      )}

      {type === "select" && (
        <Styled.Select
          defaultValue={options[0].value}
          $color={error && "danger"}
          id={id}
          {...register}
        >
          <option value="default" disabled hidden>
            {options[0].label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Styled.Select>
      )}
    </Styled.InputGroup>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  list: PropTypes.any,
  register: PropTypes.any,
  error: PropTypes.any,
  blurFunc: PropTypes.func,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};
