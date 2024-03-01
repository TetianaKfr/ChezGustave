import authentificate from "./authentificate.test";
import create from "./create.test";
import list from "./list.test";
import modify from "./modify.test";
import remove from "./remove.test";

export default () => describe('Users', () => {
  authentificate();
  create();
  list();
  modify();
  remove();
});

