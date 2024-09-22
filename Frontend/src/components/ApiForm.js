import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { motion } from 'framer-motion';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

const ApiForm = () => {
  const [inputData, setInputData] = useState('{"data": ["M", "1", "334", "4", "B"]}');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate JSON input
      const parsedData = JSON.parse(inputData);

      // Make API request
      const result = await axios.post('http://localhost:3000/bfhl', parsedData);
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ is_success: false, message: 'Invalid JSON input or server error.' });
    }
  };

  // Filter response based on selected options
  const filterResponse = () => {
    if (!response || !response.is_success) return null;

    const filtered = {};
    selectedOptions.forEach(option => {
      if (response[option.value]) {
        filtered[option.label] = response[option.value];
      }
    });
    return filtered;
  };

  return (
    <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg max-w-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">RA2111003030437</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full max-w-3xl h-40 p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          rows="4"
          placeholder="Enter your JSON data here"
        />
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
          className="w-full sm:w-3/4 mb-4"
          placeholder="Select options"
        />
        <motion.button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105 mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>

      {response && (
        <div className="response-card mt-8 p-6 bg-gray-100 rounded-md shadow-inner text-left">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Response:</h2>
          <pre className="bg-gray-200 p-4 rounded text-gray-800 text-sm overflow-auto">{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiForm;
