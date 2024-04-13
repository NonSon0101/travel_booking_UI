export interface IHeader {
  Accept?: string;
  "Content-Length"?: string;
  "User-Agent"?: string;
  "Content-Encoding"?: string;
  Authorization?: string;
  [key: string]: string | undefined; // Index signature to allow additional headers
}
