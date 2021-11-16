const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const main = async () => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(myPlaintextPassword, salt);
  console.log(hashedPassword);

  const check = await bcrypt.compare(myPlaintextPassword, hashedPassword);

  console.log(check);
};

main().catch(err => console.log(err.message));
