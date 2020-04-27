import BlockReordering from "../BlockReordering/BlockReordering";
import ByteAtATime from "../ByteAtATime/ByteAtATime";
import ChecksumCollision from "../ChecksumCollision/ChecksumCollision";
import ClassicCipher from "../ClassicCipher/ClassicCipher";
import InsecureRandom from "../InsecureRandom/InsecureRandom";
import IvDetection from "../IvDetection/IvDetection";
import KeyDisclosure from "../KeyDisclosure/KeyDisclosure";
import KnownPlaintextAndKeyReuse from "../KnownPlaintextAndKeyReuse/KnownPlaintextAndKeyReuse";
import PaddingOracle from "../PaddingOracle/PaddingOracle";
import WeakHashing from "../WeakHashing/WeakHashing";
import { IChallengeProps } from "./IChallengeProps";

export interface ChallengeData {
  name: string;
  description: string;
  url: string;
  objective: string;
  explanation: string;
  component: (props: IChallengeProps) => JSX.Element;
}


const Challenges: ChallengeData[] = [
  {
    name: "Classic Cipher",
    component: ClassicCipher,
    description: "The oldest form of cryptography takes us back to ancient egypt and the hieroglyph. Some time after some simple substitution ciphers have been created and used frequently during wars.",
    url: "/classic-cipher",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",

  },
  {
    name: "Insecure Random",
    component: InsecureRandom,
    description: "Programming languages usually have a random function to help generating random values. These methods are heavely used used in security related features, but they are usually quite easy to predit",
    url: "/weak-random",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",

  },
  {
    name: "Weak hashing",
    component: WeakHashing,
    description: "Hashing is a good way of protect passwords, since data is lost in the process and its not reversible. Some algorithms are relatively easy to brute force, generate collisions and dictionaries are already available online for them.",
    url: "/weak-hashing",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },
  {
    name: "Known Plaintext",
    component: KnownPlaintextAndKeyReuse,
    description: "Symmetric encryption is heavely based on XOR operations, and XOR has some nice properties, which if wrongly used can be used to retrieve plaintext data, or even keys",
    url: "/known-plaintext-and-key-reuse",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },
  {
    name: "Byte At A Time",
    component: ByteAtATime,
    description: "",
    url: "/byte-at-a-time",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },
  {
    name: "Block Reordering",
    component: BlockReordering,
    description: "ECB Mode of operation encrypts blocks of data independently, which mean that you can easly replace blocks, by other encrypted blocks. And if you know what you're doing, you can cause serious damage",
    url: "/block-reordering",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },

  // {
  //   name: "Chosen Plaintext",
  //   component: Empty,
  //   description: "",
  //   url: "url",
  //   objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
  //   explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  // },
  {
    name: "IV Detection",
    component: IvDetection,
    description: "",
    url: "/iv-detection",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },
  {
    name: "Padding Oracle",
    component: PaddingOracle,
    description: "Oracles give you nice error information, like if the padding is wrong, and if there was an error decrypting. This information can be helpfull if you know how to use it.",
    url: "/padding-oracle",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },

  {
    name: "Key Disclousure",
    component: KeyDisclosure,
    description: "Nearly every project uses Git nowadays. How many times did you see/commit to the repository a password or a key? Who can see it? Did you try to remove it? Is it an open source project?",
    url: "/key-disclosure",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },
  {
    name: "MD5 collisions",
    component: ChecksumCollision,
    description: "MD5 has been considered unsafe for some time. But it is still frequently used for file checksums (among other things) due to its performance. But if the right conditions are met this can be exploited by an attacker.",
    url: "/checksum-collisions",
    objective: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.",
    explanation: "Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat.Esse ea aliqua qui duis et anim in qui dolore ut et cillum nostrud mollit nisi ut voluptate pariatur duis voluptate proident magna veniam excepteur ullamco fugiat."
  },





];


export default Challenges;