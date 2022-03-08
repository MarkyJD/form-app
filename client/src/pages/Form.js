import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import { submitPost } from '../services';

export default function Form() {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [formSubmission, setFormSubmission] = useState({
    content: {
      subscribe: false,
    },
    debug: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPost(formSubmission.content);
    navigate('/thank-you', { state: formSubmission.content });
  };

  const handleChange = (newValue) => {
    setFormSubmission((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        ...newValue,
      },
    }));
  };

  useEffect(() => {
    fetch('/fields')
      .then((res) => res.json())
      .then((data) => setFields(data[0].fields));
  }, []);

  const { content, debug } = formSubmission;
  const isValid =
    content?.name && content?.email && content?.select && content?.number;
  return (
    fields.length > 0 && (
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-2xl text-center pt-5">Form</h1>
        <form className="flex flex-col space-y-5 mt-10 bg-gray-200 rounded py-5 px-5">
          {fields.map((field, i) => (
            <Field key={i} field={field} onChange={handleChange} />
          ))}
          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit}
            className={`${
              isValid ? 'hover:bg-blue-600 ' : ' opacity-50 cursor-default'
            } py-2 bg-blue-500 font-bold text-white rounded shadow `}
          >
            Submit
          </button>
        </form>
        {debug && (
          <div>
            <div>Name: {content.name}</div>
            <div>Email: {content.email}</div>
            <div>Number: {content.number}</div>
            <div>Select: {content.select}</div>
            <div>Subscribe: {content.subscribe ? 'yes' : 'no'}</div>
          </div>
        )}
      </div>
    )
  );
}
