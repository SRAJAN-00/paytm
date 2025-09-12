interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  icon,
}: InputFieldProps) => {
  return (
    <div className="space-y-1 ">
      <label
        className="text-sm font-medium text-gray-700"
        style={{ display: "block" }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-600" style={{ color: "#4b5563" }}>
              {icon}
            </div>
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input-field rounded-full ${icon ? "with-icon" : ""} ${
            error ? "error" : ""
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};
