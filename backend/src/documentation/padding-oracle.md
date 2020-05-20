# Padding Oracle Attack

For this section is important that you read and understand the [XOR docs](/docs/xor). 


## The Basics

Firstly, to understand the _padding oracle attack_ also known as _Vaudenay attack_ it is important to know clearly the meaning of **padding** and **oracle**. 

### Padding

The CBC mode encrypts blocks with the same block length. As you may think, certainly not all the plaintext messages length are a multiple of the cipher block length. So, how this problem can be solved? How a 14-byte message is encrypted where cipher blocks are 8 bytes? One of the techniques used is **padding**.

The **padding** makes the ciphertext longer than the plaintext to maintain each block with the same size allowing to encrypt a message of any length. For block ciphers, padding is applied according to the [PKCS#7](https://en.wikipedia.org/wiki/Padding_(cryptography)#PKCS#5_and_PKCS#7) standard and [RFC 5652](https://tools.ietf.org/html/rfc5652#section-6.3). The standard says, the value to pad with is the number of bytes of padding that remains to fill a block. More technically, the message is expanded and extra bytes are added to the plaintext in order to complete a block. 

> Take in mind that one char is one byte in size. As an example, 8 chars are equal to 8 bytes. 

For example, let's try to encrypt `FAKEGUY` with a block size of 8 bytes (or 8 characters). The message would be padded to `FAKEGUY\x01`. Why `\x01` at the end? According to the standard mentioned above, if there is one byte to complete the block, the message is padded with `\x01`. If there were two bytes the pad would be with `\x02`. Let's show a practical example of how this works with different message lengths and their pads.



```
Block size: 8 bytes

     Message                     Padded Message
     
     FAKEGUY (7 bytes)   -->      FAKEGUY\x01
     
     FAKEGU (6 bytes)    -->      FAKEGU\x02\x02
     
     FAKE   (4 bytes)    -->      FAKE\x04\x04\x04\x04
```

Now with a message longer than 8 bytes.

```
     FAKEGUYROCKS (12 bytes)     -->    FAKEGUYROCKS\x04\x04\x04\x04

```

The message `FAKEGUYROCKS` is 12 bytes (or 12 characters) long so, the message is split into two blocks with a total of 16 bytes (8 + 8 bytes). The padding was added due to in the last block was not complete. Thus, a pad of `\x04\x04\x04\x04` was added because four bytes were remaining.

Additionally, if the message is a complete multiple of the size block, **padding is still added**, an empty block to be more precise. This looks a nonsense feature, I can feel your brain-blowing, right now.

> _Why adding a pad if the message length is a multiple of the block size?_ 

Well, imagine if your plaintext is literally `POTATO\x02\x02`. How could you distinguish a plaintext which content is `POTATO` (6 bytes) and `POTATO\x02\x02` (the `\x02\x02` at the end it seems  padding, but in reality it's part of the string). As a result, a full length block like `POTATOES` (8 bytes or chars) is padded to `POTATOES\x08\x08\x08\x08\x08\x08\x08\x08`.

### **Oracle**

An Oracle is a system (e.g. Web Application) that accepts arbitrary ciphertexts and it gives **different responses** where the padding in a CBC-encrypted ciphertext is **valid** or **not**. This system will perform cryptographic operations on behalf of the user or attackers like a black box which returns success or error responses. In other words, a padding oracle takes encrypted data or ciphertext from the user, tries to decrypt it, then responds if the padding was correct or not. The attacker can use this information to decrypt the original message.


> Now you have the main knowledge to understand how this attack is performed. Let's get to the point.


## The Attack

To perform this attack is not needed to know the key, any plaintext or be an expert in math. Just access to a ciphertext you want to decrypt is enough. Firstly, pay attention to the diagram shown below of how the CBC mode decrypts a given ciphertext.

![CBC Decryption](img/cbc_decrypt.png "CBC Decryption")

The most relevant point is how each block decryption ends. 

> **The ciphertext passes throught the block cipher decryption and then its output is XORed with the previous ciphertext block**. The XOR of this two strings with the correct padding gives the plaintext message.


Image you have made a random request to a web application you use with the following **encrypted cookie value** and you want to decrypt it to know its content:

> 6A211E234529238AA323D4D562B35056

Assume the application is encryptiong this value in CBC mode and PKCS#7 standard. The application receives this value, decrypts it and sends the response based on it. The perfect scenario for a padding oracle attack! 

With this knowledge, there are 3 possible cases:

1. The ciphertext is valid - a successfull response is sent;

2. Invalid ciphertext (with improper padding) -  error message;

3. Valid ciphertext with invalid padding -  error message.

To make this clear, if you can send different ciphertexts and result in different upon its decryption you know if the padding is valid or not. With this kind of knowdlege the attacker has the to decrypt any ciphertext.

To conclude, the goal is to find the correct ciphertext payload to get a successful response (200 OK), meaning we have the right value for the byte we want to decrypt. If it responds with an error (usually 500 error), it means the tampered ciphertext does not decrypt to a valid message. We can try other payloads to find a proper match.

Look for the example below, where the ciphertext is divided through the different blocks. 

![Ciphertext Block Division](img/cipher_padding_oracle.png "Ciphertext Block Division")

As you can see the second cipher block drcyption output is directly XORed with the first cipher block which the attacker has control. So, let's try to decrypt the second cipher block.

You can pickup a random C1 and substitutes it with the original ciphertext first block (**C1** || C2 || C3) and send to the oracle. The **X** points to the output of D(E,C2), the decrypted value of C2 which the value we are trying to figure out.

An example for the ciphertext payload is shown in the image below.

> The payload: **00000000**4529238AA323D4D562B35056

![Padding Oracle Attack Payload](img/payload_padding_oracle.png "Padding Oracle Attack Payload")

With C1 = 00000000, the cipher decrypted to the following plaintext value.

C1 block

> 00 | 00 | 00 | 00 | 00 | 00 | 00 | 00

Decrypted Value

> 47 | D4 | 12 | 73 | A8 | 09 | F7 | **2C** 

Notice that that the last  byte of C1 decrypts to a plaintext with invalid padding, **2C**.


Let's try another value by incrementing the last byte.

C1 block

> 00 | 00 | 00 | 00 | 00 | 00 | 00 | **01**

Decrypted value

> 47 | D4 | 12 | 73 | A8 | 09 | F7 | **2D** 


The output is another padding but with a different decrypted value **2D** since we change the last byte of C1.

If we continue to increment the last of C1 (until FF) we will find for sure a value that matches a valid padding sequence. When this value is hitted it will produce a successfull response. This value is unique, so the response it will be different than the other 255 values.

Pay attention to the following case.

C1 block

> 00 | 00 | 00 | 00 | 00 | 00 | 00 | **2D**

Decrypted value

> 47 | D4 | 12 | 73 | A8 | 09 | F7 | **01** 

The last byte of C1 with the value of **2D** decrypted to a valid padding because the last byte of decrypted is **01**. According to the PKCS#7 standard this a valid padding so, we found the value we want!

> But how can we use this information to decrypt the C2 block?

Now is the easy part. We know the C1 last bytes that outputs a valid padding **2D** and we know the plaintext output of it which is **01**. Now we can infer the value of X, the output of D(E,C2). If you have noticed, we can do that because the X value XORed with C1 to output the plaintext. At this point, you may know XOR is a commutative operation. 

If,

> Plaintext = C1 XOR X

Then,

> C1 XOR Plaintext = X

And that's how we get the value of X (D(E,C2)).

In our example,

> 0x01 = 0x2D XOR X

So,

> X = 0x2D XOR 0x01

Finally,

> X = 0x2C

0x01 is plaintext[15] and 0x2D is C1[15].

We know the value of X (2C) and we are able to deduce the final value of the plaintext last byte. Simply XOR X with the previous original ciphertext block which is **6A211E23**. Confused? Compare these steps with the diagram of CBC decryption shown above.



