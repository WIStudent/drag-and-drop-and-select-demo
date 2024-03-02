import {parse} from "uuid";

interface Color {
  red: number;
  green: number;
  blue: number;
}

export default (uuid: string): Color => {
  const bytes = parse(uuid);
  console.log("uuid", uuid, "bytes", bytes);
  return {
    red: bytes.at(0) ?? 0,
    green: bytes.at(1) ?? 0,
    blue: bytes.at(2) ?? 0
  }
}