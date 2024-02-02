import React from "react";

export default function FormCheckbox({ label, name, defaultValue, size }) {
  return (
    <div className="form-control items-center">
      <label name={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
}
