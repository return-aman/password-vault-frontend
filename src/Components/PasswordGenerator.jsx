import { useState } from 'react';
const PasswordGenerator = ({ onGenerate }) => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~';
    let char = letters;
    if (includeNumbers) char += numbers;
    if (includeSymbols) char += symbols;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += char.charAt(Math.floor(Math.random() * char.length));
    }
    onGenerate(password);
  };
  return (
    <div>
      <h3>Password Generator</h3>
      <input
        type='range'
        min='6'
        max='30'
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <p>Length:{length}</p>
      <label>
        <input
          type='checkbox'
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />{""} Include Numbers
      </label>
      <br />
      <label>
        <input
          type='checkbox'
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />{""} Include Symbols
      </label>
      <br />
      <button onClick={generatePassword}>Generate</button>
    </div>
  );
};

export default PasswordGenerator;