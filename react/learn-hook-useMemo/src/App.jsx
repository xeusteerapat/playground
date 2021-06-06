import React, { useState, useEffect, useMemo } from 'react';

function getLongestName(users) {
  if (!users) return [];

  console.log('compute longest name');

  let longestName = '';

  users.forEach((user) => {
    if (user.name.length > longestName.length) {
      longestName = user.name;
    }
  });

  return longestName;
}

const App = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  // Comment code below and replace `longestUsername` with `getLongestName(users)`
  // see the result in the console

  const longestUsername = useMemo(
    () => getLongestName(users),
    [getLongestName, users],
  );

  return (
    <div>
      <h3>
        Page has been open for <code>{count}</code> seconds.
      </h3>
      <h3>{longestUsername}</h3>
    </div>
  );
};

export default App;
