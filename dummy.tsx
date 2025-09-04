"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Page() {
  const [userId, setUserId] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [imageLink, setImageLink] = useState<string | null>(
    "http://192.168.1.74:5002/api/vultr/proxy/757a01e06196bc3eccd775f7059327ed:c2677f42244e599c410b07d7868626f2:e100d9efaea4562e8b3a8dacc4e0698f"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  function extractToken(fullLink: string): string {
    const regex = /http:\/\/192.168.1.74:5002\/api\/vultr\/proxy\/(.*)/;
    const match = fullLink.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return "";
  }

  // async function handleFetchImage() {
  //   try {
  //     const token = extractToken(fileLink);

  //     if (!token) {
  //       throw new Error("Invalid URL. Token not found.");
  //     }

  //     const response = await fetch(
  //       "http://192.168.1.74:5002/api/vultr/proxy/" + token,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: userId,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       const blob = await response.blob();

  //       const imageUrl = URL.createObjectURL(blob);

  //       setImageLink(imageUrl);
  //       setError("");
  //     } else {
  //       throw new Error("Failed to fetch image from server.");
  //     }
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // }

  useEffect(() => {
    console.log("imageLink", imageLink);
  }, [imageLink]);
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.46:5002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          dauth: "1234567",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        console.log("Token stored:", data.access_token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>

      <h1>Authenticate and Fetch Image</h1>

      <label htmlFor="userId">Enter your User ID:</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="border border-black"
      />

      {/* <label htmlFor="fileLink">Enter the File Link:</label>
      <input
        type="text"
        value={fileLink}
        onChange={(e) => setFileLink(e.target.value)}
        placeholder="Enter Full File Link"
        className="border border-black"
      />

      <button
        onClick={handleFetchImage}
        className="p-2 m-2 border border-black"
      >
        Fetch Image
      </button> */}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageLink && (
        <div>
          <h2>Fetched Image:</h2>
          <Image
            width={500}
            height={500}
            src={imageLink}
            alt="Fetched Image"
            loading="lazy"
          />

          <img
            width={500}
            height={500}
            src="http://192.168.1.74:5002/api/vultr/proxy/757a01e06196bc3eccd775f7059327ed:c2677f42244e599c410b07d7868626f2:e100d9efaea4562e8b3a8dacc4e0698f"
            alt="Fetched Image"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export default Page;
