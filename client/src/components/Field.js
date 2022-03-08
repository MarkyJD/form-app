import { useState } from 'react';
import Select from 'react-select';

export default function Field({ field, onChange }) {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  let options = [];
  const {
    field_type: type,
    field_id: id,
    field_label: label,
    field_placeholder: placeholder,
  } = field;

  const styles = 'py-2 px-3 rounded';

  if (field?.field_options) {
    options.push({
      label: 'Select a type:',
      value: 'select',
    });
    field.field_options.forEach((opt) => {
      options.push({
        value: opt.option_label,
        label: opt.option_label,
      });
    });
  }

  if (type === 'checkbox') {
    return (
      <label className="flex flex-col">
        {id}
        <input
          type="checkbox"
          className={styles}
          id={id}
          checked={checked}
          onChange={({ target }) => {
            setChecked(target.checked);
            onChange({ subscribe: target.checked });
          }}
        />
      </label>
    );
  }

  if (type === 'select') {
    return (
      <label className="flex flex-col">
        {id}
        <Select
          className={styles + ' -mx-3 '}
          options={options}
          defaultValue={options[0]}
          onChange={(value) => onChange({ select: value.label })}
        />
      </label>
    );
  }

  return (
    <label className="flex flex-col">
      {id}
      <input
        className={styles}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => {
          setValue(target.value);
          onChange({ [id]: target.value });
        }}
      />
    </label>
  );
}
