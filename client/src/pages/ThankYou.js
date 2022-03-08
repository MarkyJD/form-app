import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(location.state);
  }, [location.state]);

  return (
    data && (
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-2xl text-center pt-5">Thank You</h1>
        <h2 className="text-xl text-center text-gray-600">
          Here are the results:
        </h2>
        <hr className="my-5" />

        {Object.keys(data)
          .sort()
          .map((field, i) => {
            let key = field + ':';
            let value = data[field];

            if (field === 'subscribe') {
              value = data[field] ? 'yes' : 'no';
            }

            if (field === 'select') {
              key = 'Phone Type:';
            }

            return (
              <div key={i} className="font-bold first-letter:uppercase">
                {key}{' '}
                <span className="font-normal normal-case ml-2">{value}</span>
              </div>
            );
          })}

        <div className="flex justify-center my-3">
          <button
            className="w-1/2 text-center rounded shadow font-bold text-white py-2 bg-blue-500 hover:bg-blue-600"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    )
  );
}
